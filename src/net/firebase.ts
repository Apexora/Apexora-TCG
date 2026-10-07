import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: pega aquí la firebaseConfig de tu proyecto (Configuración del proyecto → Tus apps → Web).
const firebaseConfig = {
  apiKey: "AIzaSyAsw466_wzsiLtbjw6FXZ1_O3HQ_AkVyU8",
  authDomain: "album-apexora.firebaseapp.com",
  projectId: "album-apexora",
  appId: "1:17231648284:web:20edb8477453f50473f1d9"
};

export const isConfigured = !Object.values(firebaseConfig).some(v => v.startsWith('PEGA'));
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/** Devuelve el usuario actual; si no hay sesión, entra como anónimo (el uid se conserva al recargar). */
export function ensureUser(): Promise<User> {
  return new Promise((resolve, reject) => {
    const off = onAuthStateChanged(auth, u => {
      off();
      if (u) resolve(u); else signInAnonymously(auth).then(c => resolve(c.user), reject);
    });
  });
}

/** Errores de Firebase en castellano claro. */
export function netErr(e: unknown): string {
  const x = e as { code?: string; message?: string }, c = String(x?.code ?? '');
  if (!isConfigured) return 'Falta pegar tu firebaseConfig en src/net/firebase.ts';
  if (c.includes('operation-not-allowed') || c.includes('admin-restricted')) return 'Activa el acceso Anónimo en Firebase → Authentication → Sign-in method.';
  if (c.includes('api-key') || c.includes('invalid-app')) return 'La firebaseConfig de src/net/firebase.ts no es válida.';
  if (c.includes('permission-denied')) return 'Firebase rechazó la operación (¿sala llena, ya empezada o reglas sin publicar?).';
  if (c.includes('unavailable') || c.includes('network')) return 'Sin conexión con Firebase.';
  return x?.message ?? 'Error de conexión';
}
