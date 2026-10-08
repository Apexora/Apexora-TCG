# v0.3.4 — mejoras tras la prueba del tester
- HUD de fases (Robo · Invocación · Combate · Final) con aviso "TU TURNO / TURNO RIVAL" y banner al recibir la prioridad.
- Combate: el defensor se coloca justo enfrente del atacante (columna alineada); hueco "Elige defensor" si falta.
- Cartas del rival: panel lector con carta grande, descripción y reglas (se cierra al pulsar o tras unos segundos; la IA espera).
- Pila: cada hechizo muestra descripción, dueño, coste y objetivo.
- Bloqueos: si un hechizo (p. ej. Velo Etéreo) hace ilegal un bloqueo ya asignado, se anula y el defensor puede reasignar.
- Maná: "Reserva ✦" explicada (solo hechizos, se gasta primero, se llena con el maná sobrante, máx. 3); al pasar el ratón por una carta se resalta qué gemas pagarás.

# v0.3.5
- Menú principal (sustituye a "Comenzar duelo"): Jugar contra la IA / Jugar online. Botón ⌂ Menú en la partida.
- Pila: pasa el ratón por un hechizo de la pila para ver la carta completa y sus reglas.
- Chat online entre jugadores vía Firestore (subcolección tcgGames/{sala}/chat). IMPORTANTE: publica el firestore.rules actualizado.
