import { initializeApp, FirebaseApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Intenta importar Constants si es un entorno Expo
let Constants: any;
try {
  Constants = require('expo-constants').default;
} catch (e) {
  // Constants no está disponible, procederá a usar variables globales
}

// Define la variable global esperada
declare var __EXPO_PUBLIC_FIREBASE_CONFIG: string;
declare var __app_id: string;

// 🔑 LÓGICA DE CARGA DE CONFIGURACIÓN
let firebaseConfig = {};

// 1. Intentar cargar desde Expo Constants (método preferido en Expo)
if (Constants?.expoConfig?.extra?.EXPO_PUBLIC_FIREBASE_CONFIG) {
  try {
    firebaseConfig = JSON.parse(Constants.expoConfig.extra.EXPO_PUBLIC_FIREBASE_CONFIG);
  } catch (e) {
    console.error("Error parsing Firebase config from Constants:", e);
  }
} 
// 2. Intentar cargar desde la variable global (método que falló anteriormente)
else if (typeof __EXPO_PUBLIC_FIREBASE_CONFIG !== 'undefined') {
  try {
    firebaseConfig = JSON.parse(__EXPO_PUBLIC_FIREBASE_CONFIG);
  } catch (e) {
    console.error("Error parsing Firebase config from global var:", e);
  }
}

// Final Diagnostics
console.log("--- Firebase Configuration Diagnostics ---");
console.log("Config loaded via Constants or Global:", Object.keys(firebaseConfig).length > 0);
console.log("----------------------------------------");


export const appId = (typeof __app_id !== 'undefined' && __app_id) ? __app_id : 'default-app-id';

let appInstance: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

const isFirebaseConfigPresent = Object.keys(firebaseConfig).length > 0;

if (isFirebaseConfigPresent) {
  if (!getApps().length) {
    try {
      appInstance = initializeApp(firebaseConfig);
      authInstance = getAuth(appInstance);
      dbInstance = getFirestore(appInstance);
      console.log("Firebase services initialized successfully.");
    } catch (e) {
      console.error("Failed to initialize Firebase services:", e);
    }
  }
}

export const auth = authInstance;
export const db = dbInstance;
