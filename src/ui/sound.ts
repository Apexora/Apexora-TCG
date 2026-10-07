// Motor de audio v3.1: sintetizado en tiempo real, sin archivos. Cadena: EQ → compresor → master, con reverb de sala oscura (IR generada),
// eco con filtro, panorama estéreo, campanas FM, arpas, gongs, tambores, saturación, y música ambiental generativa que reacciona a la tensión.
// Para usar tus propios audios: public/sfx/<nombre>.mp3 (click hover select pass summon spell_lum spell_umb attack hurt heal death round win lose msg start)
let ctx: AudioContext, sfxBus: GainNode, musicBus: GainNode, master: GainNode, drive: WaveShaperNode, booted = false;
let muted = false, musicOn = false, tension = 0, tensionNow = 0, timer = 0, windStop: (() => void) | null = null, barIdx = 0, nextBar = 0;
try { muted = localStorage.getItem('cartas-mute') === '1'; } catch { /* sin almacenamiento */ }
export const isMuted = () => muted;
export function toggleMute(): boolean {
  muted = !muted; try { localStorage.setItem('cartas-mute', muted ? '1' : '0'); } catch { /* */ }
  if (booted) master.gain.setTargetAtTime(muted ? 0 : 0.85, ctx.currentTime, 0.06);
  return muted;
}
/** 0 = calma, 1 = combate/pila: la música añade pulso y brillo. */
export function setTension(v: number) { tension = v; }
const mf = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

function makeIR(sec: number): AudioBuffer {
  const sr = ctx.sampleRate, n = Math.floor(sr * sec), ir = ctx.createBuffer(2, n, sr);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c); let lp = 0;
    for (let i = 0; i < n; i++) {
      const t = i / n, coef = 0.9 - 0.78 * t;                                  // la cola se va oscureciendo
      lp += ((Math.random() * 2 - 1) - lp) * coef;
      d[i] = i < sr * 0.018 ? 0 : lp * Math.pow(1 - t, 2.8) * (i < sr * 0.02 ? 0.2 : 1);
    }
    for (const [ms, g] of [[23, .5], [37, .35], [53, .3], [71, .22]] as const) d[Math.floor(sr * (ms + c * 5) / 1000)] += g * (c ? -1 : 1); // primeras reflexiones
  }
  return ir;
}
function boot() {
  if (booted) { if (ctx.state === 'suspended') void ctx.resume(); return; }
  ctx = new AudioContext(); booted = true;
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -20; comp.knee.value = 18; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.22;
  const lo = ctx.createBiquadFilter(); lo.type = 'lowshelf'; lo.frequency.value = 140; lo.gain.value = 2.5;
  const hi = ctx.createBiquadFilter(); hi.type = 'highshelf'; hi.frequency.value = 6500; hi.gain.value = 1.5;
  master = ctx.createGain(); master.gain.value = muted ? 0 : 0.85;
  const dry = ctx.createGain(); dry.connect(lo).connect(hi).connect(comp).connect(master).connect(ctx.destination);
  const conv = ctx.createConvolver(); conv.buffer = makeIR(3.2); const rv = ctx.createGain(); rv.gain.value = 0.9; conv.connect(rv).connect(dry);
  const dl = ctx.createDelay(1); dl.delayTime.value = 0.375; const fb = ctx.createGain(); fb.gain.value = 0.4;
  const fl = ctx.createBiquadFilter(); fl.type = 'lowpass'; fl.frequency.value = 2200; dl.connect(fl).connect(fb).connect(dl); fl.connect(dry); fl.connect(conv);
  sfxBus = ctx.createGain(); musicBus = ctx.createGain(); musicBus.gain.value = 0.55;
  const send = (src: AudioNode, rev: number, del: number) => { src.connect(dry); const r = ctx.createGain(); r.gain.value = rev; src.connect(r).connect(conv); if (del) { const d = ctx.createGain(); d.gain.value = del; src.connect(d).connect(dl); } };
  send(sfxBus, 0.32, 0.06); send(musicBus, 0.6, 0.22);
  drive = ctx.createWaveShaper(); const k = new Float32Array(1024); for (let i = 0; i < 1024; i++) { const x = i / 512 - 1; k[i] = Math.tanh(x * 4) * 0.8; } drive.curve = k; drive.oversample = '2x'; drive.connect(sfxBus);
}
interface V { type?: OscillatorType; vol?: number; att?: number; rel?: number; lp?: number; lpEnd?: number; q?: number; det?: number; pan?: number; bus?: AudioNode; slide?: number; pad?: boolean; vib?: number }
function voice(f: number, t: number, dur: number, o: V = {}) {
  const g = ctx.createGain(), fl = ctx.createBiquadFilter(), pn = ctx.createStereoPanner(), v = (o.vol ?? 0.1) * (o.det ? 0.6 : 1), att = o.att ?? 0.004;
  fl.type = 'lowpass'; fl.Q.value = o.q ?? 0.7; fl.frequency.setValueAtTime(o.lp ?? 9000, t); if (o.lpEnd) fl.frequency.exponentialRampToValueAtTime(Math.max(40, o.lpEnd), t + dur);
  pn.pan.value = o.pan ?? 0; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + att);
  if (o.pad) { const rel = o.rel ?? dur * 0.4; g.gain.setValueAtTime(v, t + Math.max(att, dur - rel)); g.gain.linearRampToValueAtTime(0.0001, t + dur); } else g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  fl.connect(g).connect(pn).connect(o.bus ?? sfxBus);
  for (const d of o.det ? [-o.det, o.det] : [0]) {
    const osc = ctx.createOscillator(); osc.type = o.type ?? 'sine'; osc.frequency.setValueAtTime(f, t); osc.detune.value = d;
    if (o.slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, f * Math.pow(2, o.slide / 12)), t + dur);
    if (o.vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5; lg.gain.value = o.vib; l.connect(lg).connect(osc.detune); l.start(t); l.stop(t + dur + 0.1); }
    osc.connect(fl); osc.start(t); osc.stop(t + dur + 0.1);
  }
}
function fm(f: number, t: number, dur: number, o: { ratio?: number; idx?: number; vol?: number; pan?: number; bus?: AudioNode; att?: number } = {}) {
  const car = ctx.createOscillator(), mod = ctx.createOscillator(), mg = ctx.createGain(), g = ctx.createGain(), pn = ctx.createStereoPanner(), idx = (o.idx ?? 2) * f;
  car.frequency.value = f; mod.frequency.value = f * (o.ratio ?? 2.01); mg.gain.setValueAtTime(idx, t); mg.gain.exponentialRampToValueAtTime(Math.max(1, idx * 0.02), t + dur);
  mod.connect(mg).connect(car.frequency); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(o.vol ?? 0.1, t + (o.att ?? 0.003)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  pn.pan.value = o.pan ?? 0; car.connect(g).connect(pn).connect(o.bus ?? sfxBus); car.start(t); mod.start(t); car.stop(t + dur + 0.1); mod.stop(t + dur + 0.1);
}
let nbuf: AudioBuffer;
function noiseBuf() {
  if (nbuf) return nbuf; nbuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = nbuf.getChannelData(0); let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < d.length; i++) { const w = Math.random() * 2 - 1; b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0527; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.2; }
  return nbuf;
}
function noise(t: number, dur: number, o: { vol?: number; type?: BiquadFilterType; f0?: number; f1?: number; q?: number; pan?: number; bus?: AudioNode; att?: number } = {}) {
  const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain(), pn = ctx.createStereoPanner(), att = o.att ?? 0.004;
  s.buffer = noiseBuf(); fl.type = o.type ?? 'bandpass'; fl.Q.value = o.q ?? 1; fl.frequency.setValueAtTime(o.f0 ?? 1000, t); fl.frequency.exponentialRampToValueAtTime(Math.max(30, o.f1 ?? o.f0 ?? 1000), t + dur);
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(o.vol ?? 0.1, t + att); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); pn.pan.value = o.pan ?? 0;
  s.connect(fl).connect(g).connect(pn).connect(o.bus ?? sfxBus); s.start(t, Math.random() * 1.4); s.stop(t + dur + 0.05);
}
function tom(t: number, f: number, vol: number, bus?: AudioNode) {
  const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.setValueAtTime(f * 2.2, t); o.frequency.exponentialRampToValueAtTime(f, t + 0.09);
  g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7); o.connect(g).connect(bus ?? sfxBus); o.start(t); o.stop(t + 0.75);
  noise(t, 0.06, { type: 'lowpass', f0: 1200, f1: 300, vol: vol * 0.5, bus });
}
const T0 = () => ctx.currentTime + 0.01;
const R: Record<string, () => void> = {
  hover: () => fm(mf(96), T0(), 0.09, { vol: 0.02, ratio: 3.5, idx: 0.8, pan: rnd(-0.3, 0.3) }),
  click: () => { const t = T0(); noise(t, 0.06, { f0: 2200, f1: 900, q: 2, vol: 0.12 }); voice(220, t, 0.1, { vol: 0.14, slide: -7 }); },
  select: () => { const t = T0(); fm(mf(84), t, 0.5, { vol: 0.07, ratio: 2, idx: 1.2, pan: -0.15 }); fm(mf(91), t + 0.06, 0.6, { vol: 0.05, ratio: 2, idx: 1, pan: 0.15 }); },
  start: () => { const t = T0();
    [38, 45, 50, 57, 62, 65].forEach((n, k) => voice(mf(n), t, 2.4, { type: 'sawtooth', vol: 0.035, att: 1, pad: true, rel: 1.2, lp: 300, lpEnd: 3200, det: 9, pan: (k - 2.5) * 0.15 }));
    noise(t, 1.3, { f0: 300, f1: 7000, q: 0.8, vol: 0.13, att: 1.15 }); tom(t, 40, 0.5);
    const h = t + 1.25; tom(h, 48, 1); [62, 65, 69, 74, 81].forEach((n, k) => voice(mf(n), h, 2.6, { type: 'triangle', vol: 0.06, lp: 4000, pan: (k - 2) * 0.25 })); fm(mf(86), h, 3, { vol: 0.09, ratio: 1.5, idx: 2 }); },
  pass: () => { const t = T0(); noise(t, 0.35, { f0: 600, f1: 200, q: 1.2, vol: 0.09, att: 0.08 }); voice(mf(50), t, 0.3, { vol: 0.08, slide: -5 }); },
  summon: () => { const t = T0(); tom(t, 48, 0.9); noise(t, 0.5, { type: 'lowpass', f0: 3000, f1: 150, q: 0.7, vol: 0.25 });
    [81, 86, 90, 93].forEach((n, k) => fm(mf(n), t + 0.05 + k * 0.05, 1.2, { vol: 0.05, ratio: 3, idx: 1.5, pan: (k - 1.5) * 0.3 })); voice(mf(38), t, 0.9, { type: 'sawtooth', vol: 0.08, lp: 1500, lpEnd: 150, det: 12, att: 0.02 }); },
  spell_lum: () => { const t = T0();
    [74, 76, 78, 81, 83, 86, 90].forEach((n, k) => voice(mf(n), t + k * 0.055, 1.3, { type: 'triangle', vol: 0.07, pan: -0.5 + k * 0.16 }));
    fm(mf(93), t + 0.4, 2.2, { vol: 0.06, ratio: 2.76, idx: 1 }); noise(t, 1.2, { type: 'highpass', f0: 5000, f1: 9000, vol: 0.05, att: 0.5 }); },
  spell_umb: () => { const t = T0();
    voice(mf(50), t, 1.4, { type: 'sawtooth', vol: 0.12, slide: -12, lp: 2400, lpEnd: 100, det: 15 }); voice(mf(25), t, 1.6, { vol: 0.35, att: 0.05 });
    noise(t, 1.2, { type: 'lowpass', f0: 200, f1: 2600, vol: 0.18, att: 0.9 }); fm(mf(63), t + 0.2, 2, { ratio: 1.414, idx: 3, vol: 0.06, pan: -0.3 }); fm(mf(57), t + 0.2, 2, { ratio: 1.414, idx: 3, vol: 0.05, pan: 0.3 }); },
  attack: () => { const t = T0(), h = t + 0.2;
    noise(t, 0.22, { f0: 800, f1: 7000, q: 1.5, vol: 0.18, att: 0.12 }); fm(mf(88), h, 0.7, { ratio: 3.1, idx: 3, vol: 0.09 }); fm(mf(95), h, 0.5, { ratio: 4.7, idx: 2, vol: 0.05 }); tom(h, 70, 0.5); noise(h, 0.12, { type: 'highpass', f0: 3000, f1: 1500, vol: 0.15 }); },
  hurt: () => { const t = T0(); tom(t, 45, 1); voice(mf(40), t, 0.5, { type: 'sawtooth', vol: 0.18, lp: 1200, lpEnd: 120, bus: drive }); noise(t, 0.35, { type: 'lowpass', f0: 2500, f1: 100, vol: 0.3 }); fm(mf(79), t + 0.02, 1.2, { ratio: 1.41, idx: 2, vol: 0.04 }); },
  heal: () => { const t = T0(); [74, 78, 81, 86].forEach((n, k) => fm(mf(n), t + k * 0.08, 1.4, { vol: 0.06, ratio: 2, idx: 0.8, pan: -0.3 + k * 0.2 })); [62, 69].forEach(n => voice(mf(n), t, 1.6, { vol: 0.08, att: 0.3, pad: true })); },
  death: () => { const t = T0(); voice(mf(55), t, 1, { type: 'sawtooth', vol: 0.14, slide: -14, lp: 2500, lpEnd: 100, det: 14 }); noise(t, 0.9, { f0: 3000, f1: 150, q: 0.6, vol: 0.16 }); tom(t + 0.05, 42, 0.7); },
  round: () => { const t = T0(); [1, 2.32, 3.17, 4.1, 5.4].forEach((r, k) => voice(mf(43) * r, t, 3.6 - k * 0.4, { vol: 0.09 / (k + 1), pan: (k % 2 ? 1 : -1) * 0.2 })); tom(t, 52, 0.8); noise(t, 0.5, { f0: 500, f1: 3000, vol: 0.06, att: 0.4 }); },
  win: () => { const t = T0(); ([[62, 66, 69, 74], [67, 71, 74, 79], [69, 73, 76, 81, 86]] as number[][]).forEach((ch, i) => { ch.forEach((n, k) => { voice(mf(n), t + i * 0.45, 1.9, { type: 'triangle', vol: 0.055, lp: 5000, pan: (k - 2) * 0.2 }); fm(mf(n + 12), t + i * 0.45 + 0.02 * k, 1.8, { vol: 0.03, ratio: 2, idx: 0.7 }); }); }); tom(t + 0.9, 50, 0.8); },
  lose: () => { const t = T0(); [62, 60, 57, 55, 50].forEach((n, k) => voice(mf(n), t + k * 0.5, 2, { type: 'sawtooth', vol: 0.07, lp: 900, lpEnd: 150, det: 10, att: 0.1 })); voice(mf(26), t, 3, { vol: 0.2, att: 0.4, pad: true }); },
  msg: () => { const t = T0(); fm(mf(93), t, 0.5, { vol: 0.05, ratio: 2, idx: 0.6 }); fm(mf(98), t + 0.08, 0.6, { vol: 0.04, ratio: 2, idx: 0.6 }); },
};
const files = new Map<string, string | null>();
function probe(name: string) {
  if (files.has(name)) return; files.set(name, null);
  fetch(`/sfx/${name}.mp3`).then(r => { if (r.ok && (r.headers.get('content-type') || '').startsWith('audio')) files.set(name, r.url); }).catch(() => { /* */ });
}
export function sfx(name: string) {
  if (muted) return;
  probe(name); const url = files.get(name);
  if (url) { const a = new Audio(url); a.volume = 0.7; void a.play().catch(() => { /* */ }); return; }
  try { boot(); R[name]?.(); } catch { /* sin audio */ }
}

// ---------- Música ambiental generativa (re menor, 72 bpm) ----------
const BEAT = 60 / 72, BAR = BEAT * 4;
const ROOTS = [38, 34, 41, 36], CHORDS = [[62, 65, 69, 74], [58, 62, 65, 70], [57, 60, 65, 69], [55, 60, 64, 67]], PENT = [62, 65, 67, 69, 72, 74, 77];
function bar(t: number, i: number) {
  if (muted || document.hidden) return;
  tensionNow += (tension - tensionNow) * 0.5;
  const c = i % 4, ch = CHORDS[c], tn = tensionNow, mb = musicBus;
  ch.forEach((n, k) => voice(mf(n), t, BAR * 1.08, { type: 'sawtooth', vol: 0.02, att: 1.2, pad: true, rel: 1.3, lp: 650 + tn * 900, det: 8 + k * 2, pan: (k - 1.5) * 0.35, bus: mb }));
  voice(mf(ROOTS[c]), t, BAR * 1.02, { vol: 0.15, att: 0.25, pad: true, rel: 1, bus: mb });
  const pat = [0, 2, 1, 3, 2, 1, 3, 2];
  pat.forEach((p, k) => { if (Math.random() < (tn ? 0.9 : 0.7)) { const n = ch[p] + (k % 4 === 3 && Math.random() < 0.4 ? 12 : 0) + 12;
    voice(mf(n), t + k * BEAT / 2, 1.1, { type: 'triangle', vol: 0.035 + tn * 0.01, pan: Math.sin(k) * 0.5, bus: mb }); } });
  if (i % 2 === 0 && Math.random() < 0.7) fm(mf(PENT[Math.floor(Math.random() * PENT.length)] + 12), t + BEAT * (Math.random() < 0.5 ? 0 : 2), 3, { vol: 0.045, ratio: 2, idx: 0.7, pan: rnd(-0.5, 0.5), bus: mb });
  if (c === 0) tom(t, 44, 0.35, mb);
  if (tn > 0.5) for (let b = 0; b < 4; b++) tom(t + b * BEAT, b % 2 ? 80 : 58, b === 2 ? 0.28 : 0.18, mb);
  for (let k = 0; k < 4; k++) if (Math.random() < 0.6) noise(t + rnd(0, BAR), 0.03, { type: 'highpass', f0: 4000, f1: 3000, vol: rnd(0.008, 0.02), pan: rnd(-0.8, 0.8), bus: mb });
}
function wind() {
  const s = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain(), l = ctx.createOscillator(), lg = ctx.createGain();
  s.buffer = noiseBuf(); s.loop = true; fl.type = 'bandpass'; fl.frequency.value = 420; fl.Q.value = 0.9; g.gain.value = 0.045;
  l.frequency.value = 0.07; lg.gain.value = 0.03; l.connect(lg).connect(g.gain); const l2 = ctx.createOscillator(), l2g = ctx.createGain(); l2.frequency.value = 0.05; l2g.gain.value = 250; l2.connect(l2g).connect(fl.frequency);
  s.connect(fl).connect(g).connect(musicBus); s.start(); l.start(); l2.start();
  return () => { g.gain.setTargetAtTime(0, ctx.currentTime, 0.4); setTimeout(() => { s.stop(); l.stop(); l2.stop(); }, 2000); };
}
export function startMusic() {
  if (musicOn) return; boot(); musicOn = true; barIdx = 0; nextBar = ctx.currentTime + 0.15; windStop = wind();
  timer = window.setInterval(() => { while (nextBar < ctx.currentTime + 1.3) { bar(nextBar, barIdx++); nextBar += BAR; } }, 400);
}
export function stopMusic() { musicOn = false; clearInterval(timer); windStop?.(); windStop = null; }
