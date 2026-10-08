// Efectos de combate y hechizos: motor de partículas en canvas (aditivo) enganchado por observador al DOM.
// No toca la lógica: reacciona a .card.attacking / .dying / .hurt / .boost, .orb.hit / .heal y .vfx.cast.
type K = 'spark' | 'glow' | 'ring' | 'shard' | 'smoke' | 'rune' | 'pillar' | 'bolt' | 'slash' | 'vort';
interface P {
  k: K; x: number; y: number; vx: number; vy: number; g: number; d: number; t: number; life: number; delay: number;
  sz: number; gr: number; rot: number; vr: number; h: number; s: number; l: number; a: number; n: number; w: number; add: boolean;
  x1: number; y1: number; bulge: number; pts: number[][]; cx: number; cy: number; ang: number; rad: number; va: number; vrad: number;
}
// Paletas de la página: oro/turquesa (Luminarae), violeta/carmesí (Umbra), brasa (golpe), verde (curación)
const PAL = { lum: [45, 168], umb: [272, 350], fire: [22, 48], heal: [145, 50] } as const;
type Pal = keyof typeof PAL;
const R = Math.random, rr = (a: number, b: number) => a + R() * (b - a), ease = (u: number) => 1 - (1 - u) ** 3;

let cv: HTMLCanvasElement, ctx: CanvasRenderingContext2D, W = 0, H = 0, running = false, last = 0;
const ps: P[] = [];

function add(o: Partial<P> & { k: K }) {
  ps.push({ x: 0, y: 0, vx: 0, vy: 0, g: 0, d: 1, t: 0, life: 600, delay: 0, sz: 4, gr: 0, rot: 0, vr: 0, h: 45, s: 100, l: 70, a: 1, n: 0, w: 2, add: true,
    x1: 0, y1: 0, bulge: 0, pts: [], cx: 0, cy: 0, ang: 0, rad: 0, va: 0, vrad: 0, ...o });
  if (!running) { running = true; last = performance.now(); requestAnimationFrame(tick); }
}
const later = (ms: number, f: () => void) => setTimeout(f, ms);

function tick(now: number) {
  const dt = Math.min(40, now - last), f = dt / 16.667; last = now;
  ctx.clearRect(0, 0, W, H);
  for (let i = ps.length - 1; i >= 0; i--) {
    const p = ps[i];
    if (p.delay > 0) { p.delay -= dt; continue; }
    p.t += dt; if (p.t >= p.life) { ps.splice(i, 1); continue; }
    if (p.k === 'vort') { p.ang += p.va * dt; p.rad += p.vrad * dt; if (p.rad < 2) { ps.splice(i, 1); continue; } p.x = p.cx + Math.cos(p.ang) * p.rad; p.y = p.cy + Math.sin(p.ang) * p.rad; }
    else { p.vy += p.g * f; const dd = p.d ** f; p.vx *= dd; p.vy *= dd; p.x += p.vx * f; p.y += p.vy * f; p.rot += p.vr * f; }
    draw(p);
  }
  ctx.globalCompositeOperation = 'source-over';
  if (ps.length) requestAnimationFrame(tick); else { running = false; ctx.clearRect(0, 0, W, H); }
}

function draw(p: P) {
  const u = p.t / p.life, fd = 1 - u, c = (a: number) => `hsla(${p.h},${p.s}%,${p.l}%,${Math.max(0, a)})`;
  ctx.globalCompositeOperation = p.add ? 'lighter' : 'source-over';
  switch (p.k) {
    case 'spark':
      ctx.lineCap = 'round'; ctx.strokeStyle = c(fd * .45); ctx.lineWidth = p.sz * 2.6 * fd + 1;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 2.6, p.y - p.vy * 2.6); ctx.stroke();
      ctx.strokeStyle = `hsla(${p.h},60%,92%,${fd})`; ctx.lineWidth = p.sz * fd + .4; ctx.stroke(); break;
    case 'glow': case 'smoke': case 'vort': {
      const r = Math.max(1, p.sz * (1 + p.gr * (p.k === 'vort' ? 0 : u))), a = p.a * (p.k === 'smoke' ? Math.min(1, u * 6) * fd : fd);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, c(a)); g.addColorStop(.4, c(a * .45)); g.addColorStop(1, c(0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.3); ctx.fill(); break;
    }
    case 'ring':
      ctx.strokeStyle = c(p.a * fd); ctx.lineWidth = p.w * fd + .6; ctx.beginPath(); ctx.arc(p.x, p.y, p.sz + p.gr * ease(u), 0, 6.3); ctx.stroke(); break;
    case 'shard':
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = c(fd * .95);
      ctx.beginPath(); ctx.moveTo(0, -p.sz); ctx.lineTo(p.sz * .45, p.sz * .6); ctx.lineTo(-p.sz * .4, p.sz * .5); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = `hsla(${p.h},40%,95%,${fd})`; ctx.lineWidth = 1; ctx.stroke(); ctx.restore(); break;
    case 'rune': {
      const r = p.sz * ease(Math.min(1, u * 2.6)), a = p.a * (u < .12 ? u / .12 : u > .6 ? (1 - u) / .4 : 1), ro = p.rot + p.vr * p.t;
      ctx.strokeStyle = c(a); ctx.lineWidth = 2.2; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.3); ctx.stroke();
      ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(p.x, p.y, r * .84, 0, 6.3); ctx.stroke();
      ctx.lineWidth = 1.6; ctx.beginPath();
      for (let i = 0; i < p.n; i++) { const an = ro + i / p.n * 6.283, l = i % 2 ? .93 : .88; ctx.moveTo(p.x + Math.cos(an) * r * .84, p.y + Math.sin(an) * r * .84); ctx.lineTo(p.x + Math.cos(an) * r * (l + .07), p.y + Math.sin(an) * r * (l + .07)); }
      ctx.stroke();
      if (p.w > 2) { const m = p.w, st = m % 2 ? (m - 1) / 2 : m / 2 - 1 || 1; ctx.lineWidth = 1.8; ctx.beginPath();
        for (let i = 0; i <= m; i++) { const an = -ro * .7 - 1.5708 + (i * st % m) / m * 6.283; const x = p.x + Math.cos(an) * r * .8, y = p.y + Math.sin(an) * r * .8; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
      break;
    }
    case 'pillar': {
      const w = p.sz * (.35 + .65 * Math.sin(Math.min(1, u * 1.4) * 1.57)) * (u > .6 ? (1 - u) / .4 : 1), a = p.a * (u < .1 ? u / .1 : u > .55 ? (1 - u) / .45 : 1);
      const g = ctx.createLinearGradient(p.x - w, 0, p.x + w, 0); g.addColorStop(0, c(0)); g.addColorStop(.5, c(a)); g.addColorStop(1, c(0));
      const v = ctx.createLinearGradient(0, p.y - p.gr, 0, p.y); v.addColorStop(0, 'rgba(255,255,255,0)'); v.addColorStop(.4, 'rgba(255,255,255,1)'); v.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(p.x - w, p.y - p.gr, w * 2, p.gr); break;
    }
    case 'bolt':
      if (R() < .25) break;
      ctx.lineJoin = 'round'; ctx.strokeStyle = c(fd * .7); ctx.lineWidth = p.sz * 3; ctx.beginPath(); p.pts.forEach((q, i) => i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])); ctx.stroke();
      ctx.strokeStyle = `hsla(${p.h},50%,96%,${fd})`; ctx.lineWidth = p.sz * .8; ctx.stroke(); break;
    case 'slash': {
      const e = ease(Math.min(1, u * 4)), ex = p.x + (p.x1 - p.x) * e, ey = p.y + (p.y1 - p.y) * e, mx = (p.x + ex) / 2, my = (p.y + ey) / 2;
      const nx = -(ey - p.y), ny = ex - p.x, nl = Math.hypot(nx, ny) || 1, b = p.bulge * e, ux = nx / nl * b, uy = ny / nl * b;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.quadraticCurveTo(mx + ux, my + uy, ex, ey); ctx.quadraticCurveTo(mx + ux * .3, my + uy * .3, p.x, p.y);
      ctx.fillStyle = `hsla(${p.h},60%,96%,${fd})`; ctx.shadowColor = `hsl(${p.h},100%,60%)`; ctx.shadowBlur = 24; ctx.fill(); ctx.shadowBlur = 0;
      ctx.strokeStyle = c(fd * .7); ctx.lineWidth = 3; ctx.stroke(); break;
    }
  }
}

// ---------- bloques reutilizables ----------
const hue = (pal: Pal, i = 0) => PAL[pal][i];
function sparks(x: number, y: number, n: number, pal: Pal, v: number, o: Partial<P> = {}) {
  for (let i = 0; i < n; i++) { const a = o.rot ?? R() * 6.283, sp = rr(.35, 1) * v, spread = o.rot !== undefined ? rr(-.5, .5) : 0;
    add({ k: 'spark', x, y, vx: Math.cos(a + spread) * sp, vy: Math.sin(a + spread) * sp, g: .16, d: .93, life: rr(420, 820), sz: rr(1.6, 3), h: hue(pal, R() < .35 ? 1 : 0), l: 66, ...o, rot: 0 }); }
}
function slash(x: number, y: number, size: number, pal: Pal, ang = rr(-.9, -.5)) {
  const dx = Math.cos(ang) * size, dy = Math.sin(ang) * size;
  add({ k: 'slash', x: x - dx, y: y - dy, x1: x + dx, y1: y + dy, bulge: size * .28, life: 420, h: hue(pal), s: 100, l: 66, add: true });
  add({ k: 'slash', x: x - dx * .8, y: y - dy * .8 + size * .12, x1: x + dx * .9, y1: y + dy * .9 + size * .12, bulge: size * .2, life: 360, delay: 60, h: hue(pal, 1), s: 100, l: 70, add: true });
}
function impact(x: number, y: number, size: number, pal: Pal, power = 1) {
  add({ k: 'glow', x, y, sz: size * .95, gr: 1.1, life: 420, h: hue(pal), l: 78, a: .95 });
  add({ k: 'glow', x, y, sz: size * .38, gr: .3, life: 180, h: 50, s: 40, l: 96, a: 1 });
  add({ k: 'ring', x, y, sz: size * .12, gr: size * 1.05, w: 7, life: 520, h: hue(pal), l: 72 });
  add({ k: 'ring', x, y, sz: size * .1, gr: size * .75, w: 3, life: 480, delay: 90, h: hue(pal, 1), l: 74 });
  slash(x, y, size * .8, pal);
  sparks(x, y, Math.round(26 * power), pal, size * .1);
  for (let i = 0; i < 7 * power; i++) { const a = R() * 6.283, sp = rr(2, 6) * size / 110;
    add({ k: 'shard', x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.5, g: .2, d: .97, rot: R() * 6, vr: rr(-.25, .25), sz: size * rr(.05, .1), life: rr(520, 860), h: hue(pal, i % 2), l: 62 }); }
  for (let i = 0; i < 3; i++) add({ k: 'smoke', x: x + rr(-8, 8), y, vx: rr(-.5, .5), vy: rr(-.7, -.1), d: .98, sz: size * rr(.3, .5), gr: 1, life: rr(700, 1000), a: .3, h: pal === 'umb' ? 272 : 30, s: 40, l: pal === 'umb' ? 30 : 60 });
}
const rect = (e: Element) => e.getBoundingClientRect();

// ---------- hechizos ----------
function castLum(cx: number, cy: number, Rd: number) {
  add({ k: 'glow', x: cx, y: cy, sz: Rd * .9, gr: .6, life: 1100, h: 46, l: 82, a: .55 });
  add({ k: 'pillar', x: cx, y: H, sz: Rd * .55, gr: H * 1.1, life: 1250, h: 48, l: 76, a: .7 });
  add({ k: 'rune', x: cx, y: cy, sz: Rd, n: 28, w: 8, life: 1500, rot: 0, vr: .0007, h: 46, l: 72, a: .95 });
  add({ k: 'rune', x: cx, y: cy, sz: Rd * .62, n: 18, w: 6, life: 1400, delay: 80, rot: 1, vr: -.0011, h: 168, l: 70, a: .85 });
  for (let i = 0; i < 46; i++) { const a = R() * 6.283, r = rr(.2, 1) * Rd;
    add({ k: 'glow', x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * .55 + Rd * .3, vx: rr(-.3, .3), vy: -rr(.8, 3.2), g: -.01, d: .995, sz: rr(3, 8), life: rr(800, 1500), delay: R() * 600, h: R() < .3 ? 168 : 48, l: 82, a: .9 }); }
  later(460, () => {
    add({ k: 'ring', x: cx, y: cy, sz: Rd * .2, gr: Rd * 2.1, w: 10, life: 800, h: 48, l: 80 });
    add({ k: 'ring', x: cx, y: cy, sz: Rd * .1, gr: Rd * 1.5, w: 4, life: 700, h: 168, l: 80 });
    add({ k: 'glow', x: cx, y: cy, sz: Rd * 1.3, gr: .5, life: 500, h: 50, s: 40, l: 96, a: .8 });
    sparks(cx, cy, 44, 'lum', Rd * .085);
  });
}
function castUmb(cx: number, cy: number, Rd: number) {
  add({ k: 'smoke', x: cx, y: cy, sz: Rd * 1.2, gr: .8, life: 1500, h: 270, s: 60, l: 14, a: .55, add: false });
  add({ k: 'rune', x: cx, y: cy, sz: Rd, n: 20, w: 5, life: 1500, rot: 0, vr: -.0009, h: 350, l: 62, a: .95 });
  add({ k: 'rune', x: cx, y: cy, sz: Rd * .66, n: 12, w: 0, life: 1400, delay: 70, rot: 2, vr: .0012, h: 272, l: 68, a: .85 });
  for (let i = 0; i < 80; i++) add({ k: 'vort', cx, cy, ang: R() * 6.283, rad: rr(.55, 1.5) * Rd, va: rr(.0035, .006), vrad: -rr(.0006, .0011) * Rd, sz: rr(3, 7), life: 1200, delay: R() * 350, h: R() < .5 ? 272 : 350, l: 68, a: .9 });
  later(720, () => {
    add({ k: 'glow', x: cx, y: cy, sz: Rd * 1.1, gr: .8, life: 520, h: 300, s: 90, l: 70, a: .85 });
    add({ k: 'ring', x: cx, y: cy, sz: Rd * .15, gr: Rd * 2.2, w: 11, life: 800, h: 350, l: 62 });
    add({ k: 'ring', x: cx, y: cy, sz: Rd * .1, gr: Rd * 1.6, w: 4, life: 740, delay: 80, h: 272, l: 72 });
    sparks(cx, cy, 52, 'umb', Rd * .09);
    for (let i = 0; i < 7; i++) { const a = R() * 6.283, pts: number[][] = [[cx, cy]]; let x = cx, y = cy, an = a;
      for (let k = 0; k < 9; k++) { an += rr(-.55, .55); x += Math.cos(an) * Rd * .17; y += Math.sin(an) * Rd * .17; pts.push([x, y]); }
      add({ k: 'bolt', pts, sz: 2.4, life: 520, h: i % 2 ? 350 : 280, l: 66 }); }
    for (let i = 0; i < 8; i++) { const a = R() * 6.283, sp = rr(3, 8);
      add({ k: 'shard', x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, d: .965, rot: R() * 6, vr: rr(-.3, .3), sz: rr(8, 16), life: 800, h: i % 2 ? 350 : 272, l: 58 }); }
    for (let i = 0; i < 6; i++) add({ k: 'smoke', x: cx + rr(-30, 30), y: cy + rr(-20, 20), vx: rr(-1, 1), vy: rr(-1, .2), d: .985, sz: Rd * rr(.3, .55), gr: 1.1, life: 1300, h: 275, s: 55, l: 16, a: .5, add: false });
  });
}

// ---------- observador del DOM ----------
const seen = new Map<string, number>();
const fresh = (key: string, ms: number) => { const n = performance.now(); if (n - (seen.get(key) ?? -1e9) < ms) return false; seen.set(key, n); if (seen.size > 80) seen.clear(); return true; };
const facOf = (e: Element): Pal => e.classList.contains('umb') ? 'umb' : 'lum';

function handle(e: HTMLElement) {
  const r = rect(e), x = r.left + r.width / 2, y = r.top + r.height / 2, key = e.className.split(' ')[0] + Math.round(x / 24) + ',' + Math.round(y / 24), cl = e.classList;
  if (cl.contains('cast')) {
    if (!fresh('cast', 500)) return;
    const pw = document.querySelector('.plane-wrap'), pr = pw ? rect(pw) : null, cx = pr ? pr.left + pr.width / 2 : W / 2, cy = pr ? pr.top + pr.height * .5 : H / 2, Rd = Math.min(pr ? pr.width : W, pr ? pr.height : H) * .42;
    (cl.contains('umb') ? castUmb : castLum)(cx, cy, Rd);
  } else if (cl.contains('card') && cl.contains('attacking')) {
    if (!fresh('a' + key, 800)) return;
    const f = facOf(e), dir = cl.contains('up') ? -1 : 1, w = r.width;
    add({ k: 'glow', x, y, sz: w * .95, gr: .2, life: 520, h: hue(f), l: 70, a: .6 });
    for (let i = 0; i < 18; i++) { const a = R() * 6.283, d0 = w * rr(.8, 1.5); add({ k: 'vort', cx: x, cy: y, ang: a, rad: d0, va: .004, vrad: -d0 / 360, sz: rr(2.5, 5), life: 380, delay: R() * 90, h: hue(f, i % 3 ? 0 : 1), l: 76, a: .9 }); }
    later(430, () => {
      const ix = x, iy = y + dir * (r.height * .5 + 46);
      for (let i = 0; i < 12; i++) add({ k: 'spark', x: x + rr(-w * .4, w * .4), y: y + dir * r.height * .3, vx: rr(-1.2, 1.2), vy: -dir * rr(3, 9), g: 0, d: .93, life: rr(260, 480), sz: 2, h: hue(f, i % 2), l: 72 });
      add({ k: 'ring', x: ix, y: iy, sz: w * .1, gr: w * .95, w: 6, life: 380, h: hue(f), l: 76 });
      slash(ix, iy, w * .75, f, dir < 0 ? rr(-2.5, -2.1) : rr(.55, 1.0));
    });
  } else if (cl.contains('card') && cl.contains('dying')) {
    if (!fresh('d' + key, 900)) return;
    const f = facOf(e), w = r.width;
    impact(x, y, w * 1.05, f, 1.1);
    for (let i = 0; i < 14; i++) add({ k: 'glow', x: x + rr(-w * .35, w * .35), y: y + rr(-w * .2, w * .3), vx: rr(-.3, .3), vy: -rr(.6, 2), g: -.008, sz: rr(3, 7), life: rr(900, 1500), delay: R() * 250, h: hue(f, i % 2), l: 80, a: .9 });
  } else if (cl.contains('card') && cl.contains('hurt')) {
    if (!fresh('h' + key, 500)) return;
    impact(x, y, r.width * .75, 'fire', .7);
  } else if (cl.contains('card') && cl.contains('boost')) {
    if (!fresh('b' + key, 500)) return;
    add({ k: 'ring', x, y: y + r.height * .2, sz: r.width * .2, gr: r.width * .8, w: 4, life: 600, h: 145, l: 74 });
    for (let i = 0; i < 16; i++) add({ k: 'glow', x: x + rr(-r.width * .4, r.width * .4), y: y + r.height * .35, vy: -rr(1, 3.2), g: -.02, d: .99, sz: rr(3, 6), life: rr(600, 1000), delay: R() * 250, h: R() < .5 ? 145 : 48, l: 78, a: .9 });
  } else if (cl.contains('orb') && cl.contains('hit')) {
    if (!fresh('oh' + key, 700)) return;
    const n = Math.abs(parseInt((e.querySelector('.fx')?.textContent ?? '3').replace(/[^\d-]/g, ''), 10) || 3), pw = Math.min(1.9, .8 + n * .12);
    impact(x, y, r.width * 1.7 * pw, 'fire', pw + .3); impact(x, y, r.width * 1.1, 'umb', .5);
  } else if (cl.contains('orb') && cl.contains('heal')) {
    if (!fresh('oe' + key, 700)) return;
    add({ k: 'ring', x, y, sz: r.width * .3, gr: r.width * 1.5, w: 5, life: 700, h: 145, l: 74 });
    add({ k: 'glow', x, y, sz: r.width * 1.3, gr: .5, life: 600, h: 145, l: 78, a: .7 });
    for (let i = 0; i < 22; i++) add({ k: 'glow', x: x + rr(-r.width, r.width), y: y + rr(0, r.width * .6), vy: -rr(1, 3), g: -.02, d: .99, sz: rr(3, 7), life: rr(700, 1300), delay: R() * 300, h: R() < .5 ? 145 : 48, l: 80, a: .9 });
  }
}

const SEL = '.card.attacking,.card.dying,.card.hurt,.card.boost,.orb.hit,.orb.heal,.vfx.cast';
export function initCombatFx() {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  cv = document.createElement('canvas'); cv.id = 'combatfx'; document.body.append(cv); ctx = cv.getContext('2d')!;
  const size = () => { const d = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  size(); addEventListener('resize', size);
  new MutationObserver(ms => {
    const found: HTMLElement[] = [];
    ms.forEach(m => m.addedNodes.forEach(n => { if (!(n instanceof HTMLElement)) return; if (n.matches(SEL)) found.push(n); n.querySelectorAll<HTMLElement>(SEL).forEach(x => found.push(x)); }));
    found.forEach(handle);
  }).observe(document.body, { childList: true, subtree: true });
}
