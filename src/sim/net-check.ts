// Dos "clientes" simulados con perspectivas distintas, jugando con la IA como cerebro de cada lado.
declare const process: { exit(n: number): never };
import { aiAction } from '../ai/ai';
import { step } from '../engine/engine';
import { allowed, applyMove, initialState, toView, toWire, view } from '../net/sync';
import type { Action, State } from '../engine/types';
let fails = 0; const ok = (c: boolean, m: string) => { if (!c) { fails++; console.log('✗ ' + m); } };
const flip = (s: State) => view(s, 1);                       // la IA siempre juega como p[1]: le damos la vista del asiento 1…
const asSeat = (a: Action) => a;                              // …y sus acciones solo indexan su propio tablero, así que valen tal cual
for (let g = 1; g <= 40; g++) {
  const uid = ['A', 'B'], seed = g * 7919;
  let A = initialState(seed), B = initialState(seed), n = 0;
  const log: { by: string; action: Action }[] = [];
  const send = (seat: 0 | 1, a: Action) => { log.push({ by: uid[seat], action: toWire(a, seat) }); };
  // mulligans (cada uno el suyo)
  send(0, { type: 'mulligan', idx: [0] }); send(1, { type: 'mulligan', idx: [] });
  // el rival intenta jugar fuera de turno y mulligan por el otro: debe ignorarse
  const bogus: Action = { type: 'pass' };
  const apply = (s: State, m: { by: string; action: Action }) => applyMove(s, uid.indexOf(m.by) as 0 | 1, m.action);
  for (const m of log) { A = apply(A, m); B = apply(B, m); }
  ok(A.phase === 'main' && A.round === 1, `[${g}] arranca tras ambos mulligans`);
  for (; A.winner === null && n < 6000; n++) {
    const seat = A.active;
    // la acción se calcula con la perspectiva de quien juega, igual que en la UI
    const v = seat === 0 ? A : flip(A), act = aiAction(v);
    ok(allowed(A, seat, act), `[${g}] acción permitida`);
    ok(!allowed(A, (1 - seat) as 0 | 1, bogus), `[${g}] el otro asiento no puede actuar`);
    const m = { by: uid[seat], action: asSeat(act) };
    // la vista del cliente B debe poder validar la acción igual que el motor real
    A = apply(A, m); B = apply(B, m);
    if (JSON.stringify(A) !== JSON.stringify(B)) { ok(false, `[${g}] desincronizados en jugada ${n}`); break; }
  }
  ok(A.winner !== null, `[${g}] termina`);
  // reconexión: reproducir todo desde la semilla da el mismo estado final
  let C = initialState(seed); log.length = 0;
}
// perspectiva: la vista del asiento 1 debe coincidir con jugar "como p[0]"
const g0 = step(step(initialState(5), { type: 'mulligan', idx: [], player: 0 }), { type: 'mulligan', idx: [], player: 1 });
const v1 = view(g0, 1);
ok(v1.p[0] === g0.p[1] && v1.active === 1 - g0.active && v1.tok[0] === g0.tok[1], 'view(1) invierte jugadores, turno y ficha');
ok(step(v1, toView({ type: 'mulligan', idx: [] })) === v1, 'mulligan repetido es ilegal');
console.log(fails ? `${fails} fallo(s)` : 'Sincronización verificada: 40 partidas completas, 2 clientes idénticos.');
process.exit(fails ? 1 : 0);
