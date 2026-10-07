// Uso: npm run sim  (o: npx tsx src/sim/run.ts 2000)
declare const process: { argv: string[] };
import { DECKS } from '../data/cards';
import { aiAction } from '../ai/ai';
import { newGame, step } from '../engine/engine';
const N = Number(process.argv[2]) || 1000, names = Object.keys(DECKS), wins: Record<string, number> = { [names[0]]: 0, [names[1]]: 0 };
let draws = 0, rounds = 0, stuck = 0;
for (let g = 0; g < N; g++) {
  const order = g % 2 ? [names[1], names[0]] : [names[0], names[1]];
  let s = newGame([DECKS[order[0]], DECKS[order[1]]], g + 1), k = 0;
  for (; s.winner === null && k < 6000; k++) s = step(s, aiAction(s));
  if (k >= 6000) stuck++;
  rounds += s.round; if (s.winner === -1 || s.winner === null) { draws++; continue; } wins[order[s.winner]]++;
}
const pct = (a: number) => ((100 * a) / N).toFixed(1) + '%';
console.log(`Partidas: ${N} | empates: ${draws} | atascadas: ${stuck} | rondas medias: ${(rounds / N).toFixed(1)}`);
names.forEach(n => console.log(`${n}: ${pct(wins[n])}`));
