import { getFirebaseErrorMessage } from './auth.service';

describe('getFirebaseErrorMessage', () => {
  it('explains when Firebase Authentication is not configured', () => {
    const message = getFirebaseErrorMessage({ code: 'auth/configuration-not-found' });

    expect(message).toContain('Firebase Authentication no esta configurado');
  });

  it('explains when email and password sign-in is disabled', () => {
    const message = getFirebaseErrorMessage({ code: 'auth/operation-not-allowed' });

    expect(message).toContain('Email/Password');
  });
});
