# Cartas Alfa — revisión inicial

## Cambios incluidos

1. `src/engine/engine.ts`
   - Intentar robar de un mazo vacío ahora termina la partida inmediatamente, en lugar de restar 1 al Nexo por cada robo fallido.
   - El daño de las unidades ya no se borra automáticamente al comenzar una ronda.
   - La comprobación de victoria no sobrescribe un resultado ya decidido por otra condición de final de partida.
   - El daño bloqueado por Barrera no activa la curación de Robo de vida.

2. `src/sim/run.ts`
   - Se corrigió el doble conteo de victorias en las estadísticas de simulación.

## Límites que siguen pendientes

Esta sigue siendo una versión simplificada inspirada en TCG/LoR, no una implementación completa del reglamento de Legends of Runeterra. El bloqueo se resuelve automáticamente, no hay pila de hechizos ni prioridades de respuesta, y todavía no hay maná de hechizos. Las cartas y palabras clave propias deben definirse según las reglas deseadas para este TCG.

## Cómo probar

Desde la carpeta del proyecto:

```bash
npm install
npm run dev
```

Para compilar:

```bash
npm run build
```

## v2.2 · Revisión de interfaz y experiencia de usuario

- Reorganicé la cabecera para separar marca, estado de partida y controles.
- Añadí etiquetas visibles para ronda, fase actual y ficha de ataque.
- Convertí el mensaje de turno en un panel con instrucciones contextuales y acciones claramente agrupadas.
- Desactivé el botón de declarar ataque cuando no hay unidades seleccionadas.
- Añadí el contador de mano y una guía de lectura de cartas jugables.
- El chat/registro ahora se abre y cierra desde la cabecera para no tapar el campo de batalla.
- Reorganicé editor, HUD de los Nexos, pila de hechizos y emparejamientos de bloqueos.
- Añadí estilos responsive para móvil/tablet, navegación horizontal de mano y tablero, estados de foco accesibles y respeto a `prefers-reduced-motion`.
- Se conserva el catálogo de cartas, las imágenes y los tratamientos visuales de Luminarae y Umbra.

Verificación de esta revisión: `tsc --noEmit` pasó. No se pudo ejecutar `npm test` ni la compilación Vite en este entorno porque las dependencias locales no estaban instaladas; ejecutar `npm install`, `npm test` y `npm run build` en el entorno de desarrollo.
