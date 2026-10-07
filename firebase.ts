import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: pega aquí la firebaseConfig de tu proyecto (Configuración del proyecto → Tus apps → Web).
const firebaseConfig = {
  apiKey: 'PEGA_AQUI',
  authDomain: 'PEGA_AQUI',
  projectId: 'PEGA_AQUI',
  appId: 'PEGA_AQUI',
};

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
