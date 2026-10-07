# Cartas Alfa

## Multijugador online (Firebase)
1. Firebase Console → Authentication → Sign-in method → activa **Anónimo**.
2. Firestore → Reglas: publica las de `firestore.rules` (junto a tus reglas de `players` y `config`).
3. Pega tu `firebaseConfig` en `src/net/firebase.ts`.
4. `npm run dev`; 🌐 Online → Crear sala → pasa el código de 4 letras al rival (otro navegador/dispositivo).

Comandos: `npm run dev`, `npm run build`, `npm test`, `npm run test:net`, `npm run sim`.
