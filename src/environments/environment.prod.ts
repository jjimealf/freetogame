import { getFirebaseConfig } from './firebase-config';

export const environment = {
  production: true,
  firebase: getFirebaseConfig()
};
