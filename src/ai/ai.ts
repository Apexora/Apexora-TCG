import { CARDS } from '../data/cards';
import { atkOf, canBlock, canPlay, curHp, targetKind } from '../engine/engine';
import type { Action, State, Unit } from '../engine/types';

const dmgOf = (id: string) => CARDS[id].fx.reduce((a, e) => a + (e.t === 'dmgEnemy' || e.t === 'drain' ? e.n : 0), 0);
const rank = (u: Unit) => atkOf(u) * 10 + curHp(u);
function spellPlan(s: State, i: number): Action | null {
  const me = s.p[i], foe = s.p[1 - i]; let best: { a: Action; sc: number } | null = null;
  me.hand.forEach((id, k) => {
    const c = CARDS[id]; if (c.type !== 'spell' || !canPlay(s, i, k)) return;
    const tk = targetKind(id); let sc = 0, target: number | undefined;
    if (tk === 'enemy') {
      const list = [...foe.board].sort((a, b) => rank(b) - rank(a)), d = dmgOf(id);
      const t = list.find(u => d > 0 && curHp(u) <= d) ?? (c.fx.some(e => e.t === 'destroyEnemy' || e.t === 'frost') ? list[0] : undefined);
      if (!t || (c.fx.some(e => e.t === 'sacDmg') && me.board.length < 2)) return;
      target = t.uid; sc = rank(t) / 2 + c.cost;
    } else if (tk === 'ally') {
      const heals = c.fx.some(e => e.t === 'healUnit'), pool = heals ? me.board.filter(u => u.dmg > 0) : me.board;
      const t = [...pool].sort((a, b) => (heals ? b.dmg - a.dmg : rank(b) - rank(a)))[0]; if (!t) return; target = t.uid; sc = heals ? 2 + t.dmg : 3;
    } else {
      for (const e of c.fx) {
        if (e.t === 'healNexus' && me.nexus <= 20 - e.n) sc += 2;
        else if (e.t === 'buffAll' && me.board.length >= 2) sc += 3;
        else if ((e.t === 'debuffEnemies' || e.t === 'dmgAll') && foe.board.length >= 2) sc += 3;
        else if (e.t === 'dmgNexus') sc += foe.nexus <= e.n ? 20 : 1;
        else if (e.t === 'tempBuffAll' && me.board.length >= 2 && s.tok[i]) sc += 3;
        else if (e.t === 'draw') sc += me.hand.length < 6 ? 2 : 0;
      }
    }
    if (sc > 0 && (!best || sc > best.sc)) best = { a: { type: 'play', hand: k, target }, sc };
  });
  return best ? (best as { a: Action }).a : null;
}
/** IA: mulligan automático, juega en curva, usa hechizos con objetivo, ataca con cuidado y bloquea con criterio. */
export function aiAction(s: State): Action {
  const i = s.active, me = s.p[i], foe = s.p[1 - i];
  if (s.phase === 'mulligan') return { type: 'mulligan', idx: [] };
  if (s.phase === 'block') {
    if (i === s.token) return { type: 'pass' };
    const atk = s.attackers.map(uid => s.p[s.token].board.find(u => u.uid === uid)).filter((u): u is Unit => !!u);
    const total = atk.reduce((a, u) => a + atkOf(u), 0), used = new Set(Object.values(s.blocks));
    for (const a of atk.filter(u => s.blocks[String(u.uid)] === undefined).sort((x, y) => atkOf(y) - atkOf(x))) {
      const c = me.board.map((u, k) => ({ u, k })).filter(x => !used.has(x.u.uid) && canBlock(a, x.u));
      const pick = c.find(x => atkOf(x.u) >= curHp(a) && curHp(x.u) > atkOf(a)) ?? c.find(x => (atkOf(x.u) >= curHp(a) || x.u.kw.includes('letal')) && atkOf(a) >= 3)
        ?? (me.nexus <= total ? c.sort((x, y) => curHp(y.u) - curHp(x.u))[0] : undefined);
      if (pick) return { type: 'block', attacker: s.p[s.token].board.indexOf(a), blocker: pick.k };
    }
    return { type: 'confirmBlocks' };
  }
  if (s.phase === 'stack') { const sp = Math.random() < 0.5 ? spellPlan(s, i) : null; return sp ?? { type: 'pass' }; }
  let bu = -1;
  me.hand.forEach((id, k) => { if (CARDS[id].type === 'unit' && canPlay(s, i, k) && (bu < 0 || CARDS[id].cost > CARDS[me.hand[bu]].cost)) bu = k; });
  if (bu >= 0) return { type: 'play', hand: bu };
  const sp = spellPlan(s, i); if (sp && Math.random() < 0.7) return sp;
  if (s.tok[i] && !s.attackers.length) {
    const ready = me.board.map((u, k) => ({ u, k }));
    const lethal = ready.reduce((a, x) => a + atkOf(x.u), 0) >= foe.nexus;
    const go = ready.filter(({ u }) => lethal || !foe.board.length || u.kw.includes('barrera') || u.kw.includes('elusivo') || foe.board.every(b => atkOf(b) < curHp(u) && !b.kw.includes('letal')));
    if (go.length) return { type: 'attack', units: go.map(x => x.k) };
  }
  return { type: 'pass' };
}
