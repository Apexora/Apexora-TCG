# Cartas Alfa — versión 2: prioridad, respuestas y combate táctico

Esta versión toma como referencia estructural el reglamento público de Legends of Runeterra aportado con el proyecto, pero conserva el universo, los marcos dorados de Luminarae, la estética rojo/negro de Umbra y el catálogo original de cartas.

## Implementado

- **Prioridad alternada:** después de jugar una unidad o pasar, la prioridad cambia de jugador. Dos pases consecutivos cierran la ventana y avanzan la ronda.
- **Pila de hechizos:** los hechizos se agregan a una pila visible. El rival puede responder con otro hechizo; al pasar ambos jugadores, la pila se resuelve en orden inverso (último en entrar, primero en resolverse).
- **Velocidad provisional:** las cartas existentes no tenían metadatos de velocidad, por lo que los hechizos actuales se consideran *Rápidos*: pueden jugarse como acción y como respuesta. Las unidades solo se juegan en la fase principal.
- **Ataque declarado y ventana de respuesta:** declarar ataque no aplica daño inmediatamente. El defensor recibe prioridad y puede responder antes de asignar bloqueadores.
- **Bloqueos manuales:** durante la fase de bloqueo, selecciona un atacante enemigo y después una unidad propia para asignarla como bloqueadora. Una unidad solo puede bloquear a un atacante y una unidad no puede bloquear dos veces.
- **Confirmación y resolución:** el defensor confirma los bloqueos; el atacante recibe una última prioridad para responder. El daño se resuelve después de que ambos pasen.
- **Conservación de cartas y reglas propias:** se mantienen los efectos automáticos de objetivo de Cartas Alfa, las palabras clave Barrera, Robo de vida, Arrollar y Letal, las cartas, las imágenes y el editor cosmético.
- **IA adaptada:** puede pasar prioridad, responder ocasionalmente con hechizos y asignar bloqueos básicos.

## Decisiones y límites conocidos

- El catálogo original no indica velocidad por hechizo. Por eso todos se tratan como Rápidos por defecto. Una siguiente iteración puede añadir `speed: 'rapido' | 'lento' | 'fugaz'` carta por carta; no se asignaron velocidades inventadas a nombres concretos.
- Los objetivos de los hechizos siguen siendo automáticos según las reglas originales de Cartas Alfa (por ejemplo, la unidad enemiga más fuerte); no se añadió selección manual de objetivos.
- No se incorporó maná de hechizo, hechizos lentos ni hechizos fugaces porque el conjunto de cartas no los define todavía.
- La IA es deliberadamente sencilla; el bloqueo manual completo está disponible para la persona que juega.
- El reglamento de referencia también contiene reglas de mulligan y otras estructuras que no se añadieron en esta iteración para limitar el cambio a prioridad, pila, respuestas y bloqueos.

## Verificación

`tsc --noEmit` pasa sin errores. La compilación final de Vite requiere instalar las dependencias del proyecto (`npm install`) antes de ejecutar `npm run build` o `npm run dev`.

## Correcciones de reglas — iteración 2.1

- **Prioridad después de la pila:** al resolver una cadena, la prioridad vuelve al oponente de quien añadió el último hechizo; ya no se fuerza una prioridad distinta en la fase de combate.
- **Combate simultáneo:** se registran los golpes de ambos lados antes de retirar unidades derrotadas, por lo que una unidad que muere durante el intercambio aún puede devolver el golpe.
- **Barrera y Arrollar:** una Barrera que absorbe el golpe impide que ese ataque de Arrollar filtre daño al Nexo.
- **Robo de vida y Drenar:** la curación por daño a unidades se calcula a partir del daño efectivo, sin curar por daño absorbido por Barrera ni por exceso sobre la vida restante.
- **Bloqueos:** un atacante solo puede tener un bloqueador asignado y cada bloqueador solo puede ocuparse de un atacante.
- **Lectura del combate:** la interfaz muestra cada atacante y su bloqueador asignado, y resalta el objetivo de bloqueo seleccionado.
- **Pruebas de reglas:** se agregó `npm test`, con comprobaciones de bloqueos duplicados, prioridad tras una cadena, golpes simultáneos, Barrera/Arrollar y Drenar.

Para ejecutar las comprobaciones: `npm install`, `npm test`, `npm run build`.
