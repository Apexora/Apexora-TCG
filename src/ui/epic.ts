// Entrada épica de la carta insignia de cada mazo (la unidad más cara/fuerte): primer plano, luz volumétrica y fondo oscurecido.
// Solo DOM + CSS (sin canvas extra): capas de rayos, haz de luz, polvo en suspensión y la carta en 3D. Clic para saltar.
import './epic.css';
import { CARDS, DECKS } from '../data/cards';

/** Mejor unidad de cada mazo: mayor coste y, a igualdad, mayor ataque+vida. */
export const FLAGSHIPS = new Set(Object.values(DECKS).map(ids => ids.filter(i => CARDS[i].type === 'unit')
  .sort((a, b) => CARDS[b].cost - CARDS[a].cost || CARDS[b].atk + CARDS[b].hp - CARDS[a].atk - CARDS[a].hp)[0]));
export const isFlagship = (id: string) => FLAGSHIPS.has(id);

const MS = 3300;
let active: HTMLElement | null = null;

export function epicEntrance(id: string, cardHTML: string, onEnd: () => void) {
  active?.remove();
  const fac = id.slice(0, 3) === 'umb' ? 'umb' : 'lum', c = CARDS[id];
  const el = active = document.createElement('div'); el.className = `epic ${fac}`;
  const dust = Array.from({ length: 18 }, () => `<i style="--x:${(Math.random() * 100).toFixed(1)}%;--d:${(2.2 + Math.random() * 2.6).toFixed(2)}s;--t:${(Math.random() * 1.6).toFixed(2)}s;--s:${(2 + Math.random() * 4).toFixed(1)}px"></i>`).join('');
  el.innerHTML = `<div class="ep-dim"></div><div class="ep-rays"></div><div class="ep-rays r2"></div><div class="ep-beam"></div><div class="ep-halo"></div>
    <div class="ep-dust">${dust}</div><div class="ep-stage"><div class="ep-card">${cardHTML}<div class="ep-shine"></div></div>
    <div class="ep-name"><small>${fac === 'umb' ? 'EL VACÍO SE ALZA' : 'LA LUZ DESCIENDE'}</small><b>${c.name}</b></div></div>
    <div class="ep-ring"></div><div class="ep-flash"></div>`;
  document.body.append(el); document.body.classList.add('epic-on');
  const app = document.getElementById('app');
  setTimeout(() => { if (!el.isConnected) return; if (app) { app.classList.remove('shk-soft', 'shk-hard'); void app.offsetWidth; app.classList.add('shk-hard'); } }, 780);
  let done = false;
  const end = () => { if (done) return; done = true; el.classList.add('out'); setTimeout(() => { el.remove(); if (active === el) { active = null; document.body.classList.remove('epic-on'); } onEnd(); }, 520); };
  el.addEventListener('click', end); setTimeout(end, MS);
}
