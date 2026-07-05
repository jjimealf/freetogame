import type { FirebaseOptions } from 'firebase/app';

declare global {
  interface Window {
    __FREETOGAME_FIREBASE_CONFIG__?: Partial<FirebaseOptions>;
  }
}

const defaultFirebaseConfig: FirebaseOptions = {
  apiKey: '',
  authDomain: 'freetogame-5fde8.firebaseapp.com',
  projectId: 'freetogame-5fde8',
  storageBucket: 'freetogame-5fde8.firebasestorage.app',
  messagingSenderId: '777149555830',
  appId: '1:777149555830:web:9d6dcabc486a912bdb2b57',
  measurementId: 'G-HXX2ZHD6DM'
};

export function getFirebaseConfig(): FirebaseOptions {
  const runtimeConfig = typeof window === 'undefined'
    ? undefined
    : window.__FREETOGAME_FIREBASE_CONFIG__;

  return {
    ...defaultFirebaseConfig,
    ...runtimeConfig
  };
}

export function requireFirebaseConfig(config: FirebaseOptions): FirebaseOptions {
  const apiKey = config.apiKey?.trim();

  if (apiKey === undefined || apiKey.length === 0 || apiKey.includes('REPLACE_WITH')) {
    throw new Error(
      'Firebase API key is missing. Configure window.__FREETOGAME_FIREBASE_CONFIG__ in src/assets/env.js before starting the app.'
    );
  }

  return config;
}
