import './style.css';
import './fx.css';
import './v3.css';
import { initFx } from './ui/fx';
import { CARDS, DECKS } from './data/cards';
import { aiAction } from './ai/ai';
import { atkOf, canPlay, curHp, newGame, step, targetKind } from './engine/engine';
import type { Action, Keyword, Player, SpellSpeed, State, Unit } from './engine/types';
import { imageOf, nameOf } from './ui/skins';
import { LocalChannel } from './ui/chat';
import { isMuted, setTension, sfx, toggleMute } from './ui/sound';
import { Online } from './net/online';
import { applyMove, toView, view, type Seat } from './net/sync';
import { closeMenu, menuStatus, openOnlineMenu, setRoomTag } from './net/onlineUi';

const app = document.getElementById('app')!;
const pv = document.createElement('div'); pv.className = 'preview'; document.body.append(pv);
const KWN: Record<Keyword, string> = { barrera: 'Barrera', robovida: 'Robo de vida', arrollar: 'Arrollar', letal: 'Letal', rapido: 'Ataque rápido', duro: 'Duro', elusivo: 'Elusivo', temible: 'Temible', retador: 'Retador', regenera: 'Regeneración', efimero: 'Efímero' };
const KWD: Record<Keyword, string> = {
  barrera: 'anula el siguiente daño que recibiría y luego se pierde.', robovida: 'el daño que inflige cura a tu Nexo.', arrollar: 'el daño sobrante sobre su bloqueador va al Nexo.',
  letal: 'destruye cualquier unidad a la que dañe.', rapido: 'al atacar, golpea antes que su bloqueador.', duro: 'recibe 1 de daño menos de cada fuente.',
  elusivo: 'solo puede ser bloqueada por unidades elusivas.', temible: 'solo la bloquean unidades con 3 o más de poder.', retador: 'al atacar, elige qué enemigo debe bloquearla.',
  regenera: 'se cura por completo al final de cada ronda.', efimero: 'muere al golpear o al acabar la ronda.',
};
const KWI: Record<Keyword, string> = { barrera: '🛡', robovida: '🩸', arrollar: '🐗', letal: '☠', rapido: '⚡', duro: '🪨', elusivo: '🌫', temible: '👁', retador: '⚔', regenera: '♻', efimero: '⏳' };
const SPN: Record<SpellSpeed, string> = { burst: 'Ráfaga', focus: 'Enfoque', fast: 'Rápido', slow: 'Lento' };
const SPD: Record<SpellSpeed, string> = {
  burst: 'Ráfaga: se resuelve al instante, no pasa la prioridad y sirve como reacción.', focus: 'Enfoque: se resuelve al instante, no pasa la prioridad; solo como acción original.',
  fast: 'Rápido: va a la pila; el rival puede responder. Sirve como reacción.', slow: 'Lento: va a la pila; solo como acción original (con la pila vacía).',
};
const esc = (t: string) => t.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const newS = () => newGame([DECKS.Luminarae, DECKS.Umbra], Date.now());
let s: State = newS();
let sel = new Set<number>(), mulSel = new Set<number>(), chatOpen = false, busy = false, ended = false, gameId = 0;
let tgt: { hand: number; kind: 'enemy' | 'ally' } | null = null, selAtk: number | null = null, pend: { side: number; idx: number[] } | null = null;
let prev = [20, 20], seen = new Set<number>(), prevPlayed = [0, 0], lastRound = 0, prevHp = new Map<number, [number, number]>(), lastBoard: number[][] = [[], []], prevS: State = s;
const htmlCache = new Map<number, string>();
// ---------- Online ----------
let online: Online | null = null, ME: Seat = 0;
const fac = (i: number) => (i + ME) % 2;                         // 0 = Luminarae, 1 = Umbra (según el asiento)
const facName = (i: number) => (fac(i) ? 'Umbra' : 'Luminarae');
const react = (k: 'cast' | 'win' | 'lose') => { if (!online) chat.react(k); };  // las reacciones del chat son de la IA

function vfx(cls: string, text = '') { const d = document.createElement('div'); d.className = 'vfx ' + cls; d.textContent = text; document.body.append(d); setTimeout(() => d.remove(), 1400); }
function toast(t: string) { document.querySelectorAll('.toast').forEach(e => e.remove()); const d = document.createElement('div'); d.className = 'vfx toast'; d.textContent = t; document.body.append(d); setTimeout(() => d.remove(), 1800); }

// ---------- Chat / registro ----------
const chat = new LocalChannel();
const chatEl = document.createElement('aside'); chatEl.className = 'chat';
chatEl.innerHTML = `<div class="tabs"><button data-t="chat" class="on">Chat</button><button data-t="log">Registro</button></div>
  <div class="msgs" id="msgs"></div><div class="logv" id="logv" hidden></div>
  <div class="inp"><input id="chat-in" maxlength="140" placeholder="Escribe un mensaje…" autocomplete="off"><button id="chat-send">➤</button></div>`;
document.body.append(chatEl);
const msgs = chatEl.querySelector<HTMLElement>('#msgs')!, logv = chatEl.querySelector<HTMLElement>('#logv')!, inp = chatEl.querySelector<HTMLInputElement>('#chat-in')!;
chat.onMessage(m => {
  const d = document.createElement('div'); d.className = 'msg ' + m.side;
  if (m.side === 'sys') d.textContent = m.text; else { const b = document.createElement('b'); b.textContent = m.from + ':'; d.append(b, document.createTextNode(m.text)); }
  msgs.append(d); msgs.scrollTop = msgs.scrollHeight; if (m.side === 'foe') sfx('msg');
});
const sendChat = () => { const v = inp.value.trim(); if (v && online) chat.sys('El chat entre jugadores llegará en la próxima versión.'); else if (v) chat.send(v); inp.value = ''; };
chatEl.querySelector('#chat-send')!.addEventListener('click', sendChat);
inp.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); e.stopPropagation(); });
chatEl.querySelectorAll<HTMLElement>('.tabs button').forEach(b => b.addEventListener('click', () => {
  const isLog = b.dataset.t === 'log'; logv.hidden = !isLog; msgs.hidden = isLog; chatEl.querySelector<HTMLElement>('.inp')!.hidden = isLog;
  chatEl.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('on', x === b));
}));
chat.sys('Chat local: escribe y el rival te responderá. Más adelante puede conectarse a Firebase.');

// ---------- Tarjetas ----------
function rules(id: string, kws: Keyword[], hand = -1): string {
  const c = CARDS[id], r = kws.map(k => `<p><b>${KWN[k]}:</b> ${KWD[k]}</p>`), tk = targetKind(id);
  if (c.type === 'spell') r.push(`<p>✦ ${SPD[c.speed ?? 'fast']}</p>`); else r.push('<p>Puede atacar nada más jugarla. Solo el jugador con la ficha de ataque puede atacar.</p>');
  if (tk) r.push(`<p>🎯 Eliges tú el objetivo (${tk === 'enemy' ? 'unidad enemiga' : 'unidad aliada'}). Si desaparece antes de resolverse, el hechizo se disipa.</p>`);
  if (c.fx.some(e => e.t === 'sacDraw' || e.t === 'sacDmg')) r.push('<p>⚠ Sacrifica a tu unidad más débil.</p>');
  if (hand >= 0 && !canPlay(s, 0, hand)) {
    const pl = s.p[0], avail = c.type === 'spell' ? pl.mana + pl.spell : pl.mana;
    r.push(`<p>⛔ ${c.cost > avail ? `Maná insuficiente: cuesta ${c.cost}, tienes ${avail}.` : s.active !== 0 ? 'Ahora no tienes la prioridad.' : c.type === 'unit' ? (pl.board.length >= 6 ? 'Tu tablero está lleno.' : 'Solo se juegan unidades con la pila vacía, en tu turno.') : 'Ahora no puedes jugarla (¿necesita objetivo o pila vacía?).'}</p>`);
  }
  return `<div class="rules">${r.join('')}</div>`;
}
const artHTML = (id: string) => { const f = id.slice(0, 3);
  return `<div class="art"><span class="glyph">${CARDS[id].type === 'spell' ? '✦' : f === 'lum' ? '☀' : '☾'}</span><img src="${imageOf(id)}" onerror="this.remove()"></div>`; };
function card(id: string, attr = '', cls = '', u?: Unit, extra = ''): string {
  const c = CARDS[id], f = id.slice(0, 3), kws = u ? u.kw : c.kw, dmg = u && u.dmg > 0 ? 'dmg' : '';
  const kn = (c.type === 'spell' ? [SPN[c.speed ?? 'fast']] : []).concat(kws.map(k => KWN[k])).join(' · ');
  return `<div class="card ${c.type} ${f} ${cls}" ${attr}>${artHTML(id)}
    <div class="side"><i class="cost">${c.cost}</i>${kws.map(k => `<i class="ki">${KWI[k]}</i>`).join('')}</div>
    <div class="panel"><div class="nm">${nameOf(id)}</div><div class="orn"></div><p class="tx"><em>${kn}</em>${c.text}</p></div>
    ${c.type === 'unit' ? `<b class="atk ${u && u.ta ? 'tmp' : ''}">${u ? atkOf(u) : c.atk}<s>⚔</s></b><b class="hp ${dmg}">${u ? curHp(u) : c.hp}<s>♥</s></b>` : ''}${extra}</div>`;
}
function spot(id: string, side: number, u?: Unit) {
  document.querySelectorAll('.spot').forEach(e => e.remove());
  const d = document.createElement('div'); d.className = 'vfx spot';
  d.innerHTML = `<div class="spot-l">${side ? 'Rival juega' : 'Juegas'}</div>${card(id, '', '', u)}`;
  document.body.append(d); setTimeout(() => d.remove(), 1250);
}
function portrait(p: Player, i: number, label: string): string {
  const fl = p.nexus < prev[i] ? 'hit' : p.nexus > prev[i] ? 'heal' : '', d = p.nexus - prev[i];
  const gems = Array.from({ length: p.maxMana }, (_, k) => `<u class="${k < p.mana ? 'on' : ''}"></u>`).join('');
  return `<div class="pt ${i ? 'foe' : 'me'}"><div class="ava"><span>${fac(i) ? '☾' : '☀'}</span><img src="${import.meta.env.BASE_URL}img/avatar_${fac(i) ? 'umb' : 'lum'}.webp" onerror="this.remove()"></div>
    <div class="orb ${fl}">${Math.max(0, p.nexus)}${d ? `<span class="fx">${d > 0 ? '+' : ''}${d}</span>` : ''}</div>
    <div class="pname">${label}</div><div class="pmana">${gems}<span class="sm">${[0, 1, 2].map(k => `<i class="${k < p.spell ? 'on' : ''}"></i>`).join('')}</span></div></div>`;
}

// ---------- Ataques con animación + informe ----------
function runAttack(units: number[], side: number) {
  if (s.phase !== 'main') return;
  if (online) { dispatch({ type: 'attack', units }); return; }  // online: la animación se hace al llegar la jugada confirmada
  const gid = gameId; busy = true; pend = { side, idx: units }; sfx('attack');
  vfx('banner small', `⚔ ${side ? 'El rival ataca' : 'Atacas'} con ${units.length}`); render();
  setTimeout(() => {
    if (gid !== gameId) return;
    pend = null; busy = false; const n = step(s, { type: 'attack', units });
    if (n === s) { toast('No puedes atacar ahora'); sel.clear(); render(); return; }
    s = n; sel.clear(); render(); loop();
  }, 900);
}
function report(b: State, a: State) {
  const at = b.token, df = 1 - at, dmg = b.p[df].nexus - a.p[df].nexus;
  const dead = (i: number) => b.p[i].board.filter(u => !a.p[i].board.some(x => x.uid === u.uid)).map(u => nameOf(u.card));
  const mine = dead(0), theirs = dead(1), n = b.attackers.length;
  const parts = [`${at ? 'El rival atacó' : 'Atacaste'} con ${n}`, dmg > 0 ? `${at ? 'Tu Nexo' : 'Nexo rival'} −${dmg}` : 'sin daño al Nexo'];
  if (mine.length) parts.push('Tuyas caídas: ' + mine.join(', ')); if (theirs.length) parts.push('Rivales caídas: ' + theirs.join(', '));
  const txt = '⚔ ' + parts.join(' · ');
  const d = document.createElement('div'); d.className = 'vfx report' + (at ? '' : ' good'); d.textContent = txt; document.body.append(d); setTimeout(() => d.remove(), 3600); chat.sys(txt);
}

// ---------- Render ----------
function render() {
  pv.style.display = 'none'; setTension(s.phase === 'block' || s.stack.length ? 1 : 0);
  const me = s.p[0], foe = s.p[1], myTurn = s.active === 0 && s.winner === null && !busy && s.phase !== 'mulligan';
  const defMe = s.phase === 'block' && s.token === 1 && s.active === 0;
  const blockers = new Set(Object.values(s.blocks)), atkSet = new Set(s.attackers);
  const inCombat = (u: Unit, side: number, i: number) => side === s.token ? atkSet.has(u.uid) || (side === 0 && sel.has(i) && s.phase === 'main') : blockers.has(u.uid);
  const unit = (u: Unit, i: number, side: number) => {
    const mine = side === 0, o = prevHp.get(u.uid), eff = curHp(u);
    let fx = '', fc = ''; if (o && s.round === lastRound) { if (eff < o[1]) { fc = 'hurt'; fx = String(eff - o[1]); } else if (eff > o[1] || atkOf(u) > o[0]) { fc = 'boost'; fx = '+' + (eff > o[1] ? eff - o[1] : atkOf(u) - o[0]); } }
    htmlCache.set(u.uid, card(u.card, '', 'mini dying', u));
    const valid = tgt && ((tgt.kind === 'enemy' && !mine) || (tgt.kind === 'ally' && mine));
    const a = valid ? 'tgt' : mine ? 'unit' : defMe && atkSet.has(u.uid) ? 'enemy-unit' : 'view';
    const can = mine && myTurn && s.phase === 'main' && s.tok[0] && !s.attackers.length;
    const cls = `mini ${sel.has(i) && mine ? 'sel ' : ''}${can ? 'can ' : ''}${seen.has(u.uid) ? '' : 'enter '}${fc} ${valid ? 'tgtok ' : ''}${!mine && selAtk === i ? 'blocktarget ' : ''}${mine && blockers.has(u.uid) ? 'assignedblock ' : ''}${s.forced.includes(u.uid) || (s.forced.some(f => s.blocks[String(f)] === u.uid)) ? 'forced ' : ''}${atkSet.has(u.uid) ? 'atkr ' : ''}${pend && pend.side === side && pend.idx.includes(i) ? 'attacking ' + (side ? 'down' : 'up') : ''}`;
    return card(u.card, `data-u="${side}:${i}" data-a="${a}" data-i="${i}" data-uid="${u.uid}"`, cls, u, fx ? `<span class="fx">${fx}</span>` : '');
  };
  const lanes = (p: Player, side: number) => {
    const back: string[] = [], comb: string[] = [];
    p.board.forEach((u, i) => (inCombat(u, side, i) ? comb : back).push(unit(u, i, side)));
    const ghosts = lastBoard[side].filter(uid => !p.board.some(u => u.uid === uid)).map(uid => htmlCache.get(uid) ?? '');
    const slots = Array.from({ length: Math.max(0, 6 - p.board.length) }, (_, k) => `<div class="slot ${side ? 'umb' : 'lum'}">${ghosts[k] ?? ''}</div>`).join('');
    return { back: back.join('') + slots, comb: comb.join('') };
  };
  const F = lanes(foe, 1), M = lanes(me, 0);
  const phaseName = s.phase === 'mulligan' ? 'Mulligan' : s.phase === 'main' ? 'Prioridad' : s.phase === 'block' ? 'Bloqueos' : 'Pila';
  const msg = s.winner !== null ? (s.winner === -1 ? 'Empate' : s.winner === 0 ? '¡Victoria!' : 'Derrota')
    : tgt ? `Elige objetivo para ${nameOf(me.hand[tgt.hand])} · Esc cancela`
    : s.phase === 'stack' ? (myTurn ? `Responde o pulsa OK · ${s.stack.length} en la pila` : `Pila · ${s.stack.length}`)
    : s.phase === 'block' ? (defMe ? 'Toca un atacante y luego tu bloqueador' : s.active === 0 ? 'Rival bloqueó: puedes responder o resolver' : 'El rival asigna bloqueos…')
    : myTurn ? (s.passes === 1 ? 'El rival pasó: pasa también para cerrar la ronda' : s.tok[0] ? 'Tu turno: juega cartas o selecciona unidades y ataca' : 'Tu turno: juega cartas o pasa') : 'El rival tiene la prioridad…';
  const log = s.log.slice(-14).map(l => l.replace(/\{(\w+)\}/g, (_, id) => `<b>${nameOf(id)}</b>`)).join('<br>');
  const bs = s.attackers.length ? `<div class="blocksummary"><b>⚔ Combate</b>${s.attackers.map(uid => {
    const a = s.p[s.token].board.find(u => u.uid === uid), bid = s.blocks[String(uid)], b = bid === undefined ? undefined : s.p[1 - s.token].board.find(u => u.uid === bid);
    return `<span>${a ? nameOf(a.card) : '?'} <i>→</i> ${b ? nameOf(b.card) : '<em>Sin bloquear</em>'}</span>`; }).join('')}</div>` : '';
  // botón principal contextual
  let label = 'RIVAL', mode = 'wait';
  if (myTurn) {
    if (s.phase === 'main') { if (sel.size) { label = `ATACAR ${sel.size}`; mode = 'atk'; } else { label = s.passes === 1 ? 'FIN DE RONDA' : 'PASAR'; mode = 'go'; } }
    else if (s.phase === 'block') { label = defMe ? (Object.keys(s.blocks).length ? 'BLOQUEAR' : 'SIN BLOQUEO') : 'RESOLVER'; mode = 'go'; }
    else { label = 'OK'; mode = 'go'; }
  }
  const stack = s.stack.length ? `<div class="stacktray"><b>✦ Pila</b>${[...s.stack].reverse().map(x => `<span class="stackitem">${nameOf(x.card)} · ${x.owner ? 'Rival' : 'Tú'}</span>`).join('')}</div>` : '';
  const n = me.hand.length, fan = me.hand.map((id, i) => { const r = i - (n - 1) / 2;
    return `<div class="slotc" data-a="hand" data-i="${i}" style="--rot:${(r * 3.2).toFixed(1)}deg;--y:${(r * r * 2.6).toFixed(1)}px" aria-label="${esc(nameOf(id))}, coste ${CARDS[id].cost}">${card(id, '', `${myTurn && canPlay(s, 0, i) ? 'ok' : 'no'} ${tgt?.hand === i ? 'sel' : ''}`)}</div>`; }).join('');
  const mullHTML = s.phase === 'mulligan' && s.mull[0] ? `<div class="mull"><h2>Mulligan</h2><p>Esperando al rival…</p></div>` : s.phase === 'mulligan' ? `<div class="mull"><h2>Mulligan</h2><p>Toca las cartas que quieras reemplazar (0 a 4)</p><div class="mrow">${me.hand.map((id, i) => card(id, `data-a="mul" data-i="${i}"`, mulSel.has(i) ? 'sel swap' : '')).join('')}</div><button class="btn" data-a="mulgo">${mulSel.size ? `Reemplazar ${mulSel.size}` : 'Conservar mano'}</button></div>` : '';
  app.innerHTML = `<header><div class="brand"><span class="brand-mark">✦</span><h1>Cartas <small>ALFA</small></h1></div><div class="header-state"><span class="rd">Ronda ${s.round}/40</span><span class="phase-chip">${phaseName}</span><span class="tok">${s.tok[0] ? '⚑ Tienes la ficha de ataque' : s.tok[1] ? '⚑ Ficha de ataque: rival' : '⚑ Ficha gastada'}</span></div>
    <nav class="toolbar"><button class="ghost" data-a="chat">${chatOpen ? '✕ Cerrar' : '☰ Chat / registro'}</button><button class="ghost icon-btn" data-a="mute">${isMuted() ? '🔇' : '🔊'}</button><button class="ghost" data-a="online">🌐 Online</button><button class="ghost" data-a="new">↻ Nueva partida</button></nav></header>` +
    `<main class="stage ${tgt ? 'targeting' : ''}">
      <div class="foehand">${Array.from({ length: foe.hand.length }, () => '<i></i>').join('')}</div>${portrait(foe, 1, `${facName(1)} · Rival`)}
      <div class="plane-wrap"><div class="plane"><div class="lane foeback">${F.back}</div><div class="lane foecomb">${F.comb}</div><div class="lane mycomb">${M.comb}</div><div class="lane myback">${M.back}</div></div></div>
      <div class="pile p1" title="Mazo rival"><b>${foe.deck.length}</b></div><div class="pile p0" title="Tu mazo"><b>${me.deck.length}</b></div>
      <div class="msgbar"><span class="pill ${myTurn ? 'go' : ''}">${msg}</span></div>${bs}${stack}
      ${portrait(me, 0, `${facName(0)} · Tú`)}
      <div class="manapanel"><div class="mrow2"><b>MANÁ</b><span>${me.mana}/${me.maxMana}</span></div><div class="gems">${Array.from({ length: Math.max(me.maxMana, 1) }, (_, k) => `<u class="${k < me.mana ? 'on' : ''}"></u>`).join('')}</div>
        <div class="mrow2"><b>HECHIZO</b><span>${me.spell}/3</span></div><div class="gems sp">${[0, 1, 2].map(k => `<u class="${k < me.spell ? 'on' : ''}"></u>`).join('')}</div></div>
      <button class="endbtn ${mode}" data-a="${mode === 'atk' ? 'attack' : 'go'}" ${mode === 'wait' ? 'disabled' : ''}><span>${label}</span></button>
      <div class="fan">${fan}</div></main>` + mullHTML +
    (s.winner !== null ? `<div class="over"><h2>${msg}</h2><button class="btn" data-a="new">Jugar de nuevo</button></div>` : '');
  // --- efectos y sonidos por transición de estado ---
  const fresh = s.p.some(p => p.board.some(u => !seen.has(u.uid))), gone = lastBoard.some(l => l.some(uid => !s.p.some(p => p.board.some(u => u.uid === uid))));
  if (fresh) sfx('summon'); if (gone) sfx('death');
  s.p.forEach((p, i) => p.board.filter(u => !seen.has(u.uid)).forEach(u => spot(u.card, i, u)));
  if (me.nexus < prev[0]) vfx('vhit'); else if (me.nexus > prev[0]) vfx('vheal');
  if (me.nexus < prev[0] || foe.nexus < prev[1]) sfx('hurt'); if (me.nexus > prev[0] || foe.nexus > prev[1]) sfx('heal');
  s.p.forEach((p, i) => { const id = p.played[p.played.length - 1]; if (p.played.length > prevPlayed[i] && id && CARDS[id].type === 'spell') { vfx('cast ' + id.slice(0, 3)); sfx('spell_' + id.slice(0, 3)); spot(id, i); if (i === 1) react('cast'); } });
  if (s.round !== lastRound && s.round > 0) { vfx('banner', `Ronda ${s.round}`); sfx('round'); }
  if (prevS.attackers.length && !s.attackers.length && prevS.round === s.round) report(prevS, s);
  prev = [me.nexus, foe.nexus]; prevPlayed = s.p.map(p => p.played.length); lastRound = s.round; prevS = s;
  prevHp = new Map(); lastBoard = [[], []];
  s.p.forEach((p, i) => p.board.forEach(u => { seen.add(u.uid); prevHp.set(u.uid, [atkOf(u), curHp(u)]); lastBoard[i].push(u.uid); }));
  if (s.winner !== null && !ended) { ended = true; if (online) Online.clearSaved(); sfx(s.winner === 0 ? 'win' : 'lose'); if (s.winner === 0) react('win'); else if (s.winner === 1) react('lose'); }
  logv.innerHTML = log; chatEl.hidden = !chatOpen;
}
// ---------- Acciones ----------
function dispatch(a: Action) {
  if (online) {
    if (busy || online.busy) return;
    if (!online.isReady) { toast('Esperando al rival… Para jugar contra la IA, sal de la sala desde 🌐 Online'); return; }
    const n = step(s, toView(a));                                 // validación local sobre la vista propia
    if (n === s) { toast(a.type === 'block' ? 'Ese bloqueo no es válido (Elusivo/Temible/ya asignado)' : a.type === 'play' ? 'No puedes jugar eso ahora' : 'Acción no válida'); return; }
    if (a.type === 'pass' || a.type === 'confirmBlocks') sfx('pass');
    busy = true; sel.clear(); tgt = null; selAtk = null; render();
    online.send(a).then(ok => { if (!ok) { busy = false; render(); } });
    return;                                                       // el estado cambia cuando vuelve la jugada confirmada
  }
  const n = step(s, a);
  if (n === s) { toast(a.type === 'block' ? 'Ese bloqueo no es válido (Elusivo/Temible/ya asignado)' : a.type === 'play' ? 'No puedes jugar eso ahora' : 'Acción no válida'); return; }
  if (a.type === 'pass' || a.type === 'confirmBlocks') sfx('pass');
  s = n; sel.clear(); tgt = null; selAtk = null; render(); loop();
}
function loop() {
  if (online) return;
  if (s.winner !== null || s.active !== 1 || s.phase === 'mulligan') return;
  const gid = gameId;
  setTimeout(() => {
    if (gid !== gameId || busy || s.winner !== null || s.active !== 1) return;
    const a = aiAction(s);
    if (a.type === 'attack') { runAttack(a.units, 1); return; }
    s = step(s, a); render(); loop();
  }, 1200);
}
function go() {
  const myTurn = s.active === 0 && s.winner === null && !busy; if (!myTurn) return; sfx('click');
  if (s.phase === 'main' && sel.size) runAttack([...sel], 0);
  else if (s.phase === 'block' && s.token === 1) dispatch({ type: 'confirmBlocks' });
  else dispatch({ type: 'pass' });
}
app.addEventListener('click', e => {
  const t = (e.target as HTMLElement).closest<HTMLElement>('[data-a]');
  if (tgt && t?.dataset.a !== 'tgt') { tgt = null; render(); if (!t || t.dataset.a === 'hand') return; }
  if (!t) return;
  const a = t.dataset.a, i = Number(t.dataset.i), myTurn = s.active === 0 && s.winner === null && !busy && s.phase !== 'mulligan';
  if (a === 'chat') { chatOpen = !chatOpen; sfx('click'); render(); }
  else if (a === 'mute') { toggleMute(); sfx('click'); render(); }
  else if (a === 'new' && online) { toast('Para otra partida online crea o únete a una sala nueva'); openOnlineMenu(menuApi()); }
  else if (a === 'online') { sfx('click'); openOnlineMenu(menuApi()); }
  else if (a === 'new') { sfx('click'); gameId++; busy = false; pend = null; selAtk = null; tgt = null; s = newS(); sel.clear(); mulSel.clear(); prev = [20, 20]; seen.clear(); prevPlayed = [0, 0]; lastRound = 0; prevHp.clear(); lastBoard = [[], []]; ended = false; prevS = s; render(); }
  else if (a === 'mul') { sfx('select'); mulSel.has(i) ? mulSel.delete(i) : mulSel.add(i); render(); }
  else if (a === 'mulgo') { sfx('click'); const idx = [...mulSel]; mulSel.clear(); dispatch({ type: 'mulligan', idx }); }
  else if (!myTurn) return;
  else if (a === 'tgt') { if (tgt) { const uid = Number(t.dataset.uid), h = tgt.hand; dispatch({ type: 'play', hand: h, target: uid }); } }
  else if (a === 'hand') {
    if (!canPlay(s, 0, i)) { toast('No puedes jugar esa carta ahora'); return; }
    const k = targetKind(s.p[0].hand[i]); sfx('select');
    if (k) { tgt = { hand: i, kind: k }; render(); } else dispatch({ type: 'play', hand: i });
  }
  else if (a === 'go') go();
  else if (a === 'attack') go();
  else if (a === 'enemy-unit' && s.phase === 'block') { selAtk = i; sfx('select'); render(); }
  else if (a === 'unit' && s.phase === 'block' && s.token === 1) { if (selAtk === null) toast('Primero toca al atacante rival'); else dispatch({ type: 'block', attacker: selAtk, blocker: i }); }
  else if (a === 'unit' && s.phase === 'main' && s.tok[0] && !s.attackers.length) { sel.has(i) ? sel.delete(i) : sel.add(i); sfx('select'); render(); }
});
document.addEventListener('keydown', e => {
  if ((e.target as HTMLElement).tagName === 'INPUT') return;
  if (e.key === 'Escape' && tgt) { tgt = null; render(); }
  else if (e.key === ' ' && s.phase !== 'mulligan') { e.preventDefault(); go(); }
});
document.addEventListener('contextmenu', e => { if (tgt) { e.preventDefault(); tgt = null; render(); } });
app.addEventListener('mouseover', e => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-u],[data-a="hand"]');
  if (!el) { pv.style.display = 'none'; return; }
  if (el.dataset.u) { const [side, i] = el.dataset.u.split(':').map(Number), u = s.p[side]?.board[i]; if (u) { pv.innerHTML = card(u.card, '', '', u) + rules(u.card, u.kw); pv.style.display = 'block'; } }
  else { const i = Number(el.dataset.i), id = s.p[0].hand[i]; if (id) { pv.innerHTML = card(id) + rules(id, CARDS[id].kw, i); pv.style.display = 'block'; } }
});
app.addEventListener('mouseleave', () => { pv.style.display = 'none'; });

// ---------- Online: conexión con Firebase ----------
type Fresh = { before: State; action: Action; seat: Seat };
const queue: Fresh[] = []; let pumping = false;
function freshUi(st: State) {
  gameId++; busy = false; pend = null; selAtk = null; tgt = null; s = st; sel.clear(); mulSel.clear(); ended = st.winner !== null;
  prev = [st.p[0].nexus, st.p[1].nexus]; prevPlayed = st.p.map(p => p.played.length); lastRound = st.round; prevS = st;
  seen = new Set(st.p.flatMap(p => p.board.map(u => u.uid))); prevHp = new Map(); lastBoard = [[], []];
  st.p.forEach((p, i) => p.board.forEach(u => { prevHp.set(u.uid, [atkOf(u), curHp(u)]); lastBoard[i].push(u.uid); }));
  render();
}
function pump() {
  const m = queue.shift();
  if (!m) { pumping = false; return; }
  pumping = true;
  const after = view(applyMove(m.before, m.seat, m.action), ME);
  const apply = () => { pend = null; busy = false; s = after; sel.clear(); tgt = null; selAtk = null; render(); setTimeout(pump, 0); };
  if (m.action.type === 'attack' && queue.length === 0) {         // animar solo la jugada más reciente (al reconectar no se reproducen todas)
    const side = m.seat === ME ? 0 : 1; busy = true; pend = { side, idx: m.action.units }; sfx('attack');
    vfx('banner small', `⚔ ${side ? 'El rival ataca' : 'Atacas'} con ${m.action.units.length}`); render(); setTimeout(apply, 900);
  } else apply();
}
function menuApi() {
  return {
    inRoom: !!online,
    create: async () => {
      startOnline();
      try { const c = await online!.create(); setRoomTag(`Sala ${c} · esperando rival…`); menuStatus(`Código de sala: ${c} — pásaselo a tu rival`); }
      catch (e) { online = null; throw e; }
    },
    join: async (code: string) => { startOnline(); try { await online!.join(code); } catch (e) { online = null; throw e; } },
    leave: () => { online?.close(); online = null; ME = 0; queue.length = 0; pumping = false; setRoomTag(''); freshUi(newS()); loop(); },
  };
}
function startOnline() {
  if (online) return;
  online = new Online({
    onStatus: m => { setRoomTag(m); menuStatus(m); },
    onReady: () => { ME = online!.seat; closeMenu(); freshUi(view(online!.g, ME)); chat.sys(`Sala ${online!.code}: juegas con ${facName(0)}.`); },
    onMoves: (g, fresh, replay) => { if (replay) { queue.length = 0; freshUi(view(g, ME)); } else { queue.push(...fresh); if (!pumping) pump(); } },
    onSettled: () => { if (!pumping && !queue.length && busy) { busy = false; render(); } },
  });
}
const savedRoom = Online.savedCode();
if (savedRoom) { startOnline(); online!.resume(savedRoom).catch(() => { online = null; Online.clearSaved(); setRoomTag(''); }); }

render(); loop();
initFx();
