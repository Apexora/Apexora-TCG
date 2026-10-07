import { collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, ensureUser } from './firebase';
import { applyMove, initialState, toWire, type Seat } from './sync';
import type { Action, State } from '../engine/types';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0/O/1/I
const newCode = () => Array.from({ length: 4 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
const KEY = 'tcgRoom';

export interface OnlineHandlers {
  /** Cambió el estado real (ya con todas las jugadas aplicadas). `fresh` = jugadas nuevas desde la última vez, con el estado previo a cada una. */
  onMoves(g: State, fresh: { before: State; action: Action; seat: Seat }[]): void;
  onStatus(msg: string): void;       // "Esperando rival…", "Rival conectado", errores…
  onReady(): void;                    // ambos dentro: empieza la partida
}

export class Online {
  code = ''; seat: Seat = 0; uid = '';
  g!: State;
  private host = ''; private guest = ''; private seed = 0;
  private applied = 0; private sending = false; private sentAt = -1; private unsubs: (() => void)[] = [];
  private ready = false;
  constructor(private h: OnlineHandlers) {}

  static savedCode() { try { return localStorage.getItem(KEY); } catch { return null; } }
  private save() { try { localStorage.setItem(KEY, this.code); } catch { /* ignorar */ } }
  static clearSaved() { try { localStorage.removeItem(KEY); } catch { /* ignorar */ } }

  async create() {
    const u = await ensureUser(); this.uid = u.uid; this.seat = 0;
    this.seed = Math.floor(Math.random() * 2 ** 31);
    for (let tries = 0; tries < 8; tries++) {
      const code = newCode();
      if ((await getDoc(doc(db, 'tcgGames', code))).exists()) continue;
      await setDoc(doc(db, 'tcgGames', code), { host: u.uid, guest: null, seed: this.seed, status: 'waiting', createdAt: serverTimestamp() });
      this.code = code; this.save(); this.h.onStatus(`Sala ${code}: esperando rival…`); this.listen(); return code;
    }
    throw new Error('No se pudo crear la sala, inténtalo de nuevo');
  }

  async join(codeRaw: string) {
    const code = codeRaw.trim().toUpperCase(), u = await ensureUser(); this.uid = u.uid;
    const ref = doc(db, 'tcgGames', code), snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Esa sala no existe');
    const d = snap.data();
    if (d.host === u.uid) this.seat = 0;
    else if (d.guest === u.uid) this.seat = 1;
    else if (d.guest) throw new Error('La sala ya está llena');
    else { await updateDoc(ref, { guest: u.uid, status: 'playing' }); this.seat = 1; }
    this.code = code; this.save(); this.listen();
  }

  /** Volver a una sala guardada tras recargar. */
  async resume(code: string) { await this.join(code); }

  private listen() {
    const gref = doc(db, 'tcgGames', this.code);
    this.unsubs.push(onSnapshot(gref, s => {
      const d = s.data(); if (!d) return;
      this.host = d.host; this.guest = d.guest ?? ''; this.seed = d.seed;
      if (d.status === 'playing' && this.guest && !this.ready) {
        this.ready = true; this.g = initialState(this.seed); this.applied = 0;
        this.h.onReady(); this.h.onStatus(`Sala ${this.code}: ¡partida en marcha!`);
        // solo se escuchan las jugadas cuando ya hay dos jugadores (así las reglas dejan leer)
        this.unsubs.push(onSnapshot(collection(gref, 'moves'), { includeMetadataChanges: true }, ms => this.pull(ms.docs)));
      }
    }, e => this.h.onStatus('Error de conexión: ' + e.message)));
  }

  /** Aplica en orden las jugadas ya CONFIRMADAS por el servidor (nunca las pendientes locales). */
  private pull(docs: { id: string; data(): any; metadata: { hasPendingWrites: boolean } }[]) {
    const byN = new Map<number, any>();
    for (const d of docs) if (!d.metadata.hasPendingWrites) byN.set(Number(d.id), d.data());
    const fresh: { before: State; action: Action; seat: Seat }[] = [];
    while (byN.has(this.applied)) {
      const m = byN.get(this.applied), seat: Seat | -1 = m.by === this.host ? 0 : m.by === this.guest ? 1 : -1;
      const before = this.g, after = applyMove(before, seat, m.action);
      if (after !== before && seat !== -1) fresh.push({ before, action: m.action, seat });
      this.g = after; this.applied++;
    }
    if (this.sending && this.applied > this.sentAt) this.sending = false; // mi jugada ya volvió confirmada
    if (fresh.length || this.applied === 0) this.h.onMoves(this.g, fresh);
  }

  /** Envía una jugada (en formato de la UI). Devuelve false si todavía hay una en vuelo. */
  async send(a: Action): Promise<boolean> {
    if (this.sending || !this.ready) return false;
    this.sending = true;
    const n = this.applied; this.sentAt = n;
    try {
      await setDoc(doc(db, 'tcgGames', this.code, 'moves', String(n)), { by: this.uid, action: JSON.parse(JSON.stringify(toWire(a, this.seat))), t: Date.now() });
      return true;
    } catch {
      this.sending = false;
      this.h.onStatus('Tu jugada coincidió con la del rival o falló; revisa el tablero y repítela.');
      return false;
    }
  }
  get busy() { return this.sending; }

  close() { this.unsubs.forEach(u => u()); this.unsubs = []; Online.clearSaved(); }
}
