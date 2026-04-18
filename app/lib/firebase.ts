import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuración obtenida de las variables de entorno para mayor seguridad
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Inicializar Firebase evitando duplicados durante el Hot Reload de Next.js
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Exportar los servicios que usaremos en DONNI
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Opcional: Configurar para que siempre pida seleccionar cuenta de Google
googleProvider.setCustomParameters({ prompt: 'select_account' });