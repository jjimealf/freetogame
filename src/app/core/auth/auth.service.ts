import { Injectable } from '@angular/core';
import {
  Auth,
  User,
  authState,
  createUserWithEmailAndPassword,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { Firestore, doc, docData, getDoc, serverTimestamp, setDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { RegisterInput, UserProfile } from '../models/user-profile.model';

export type AuthFailureCode =
  | 'invalid-credentials'
  | 'email-not-verified'
  | 'profile-missing'
  | 'inactive-account'
  | 'deleted-account'
  | 'registration-failed'
  | 'unknown';

export class AuthFailure extends Error {
  constructor(readonly code: AuthFailureCode, message: string) {
    super(message);
    this.name = 'AuthFailure';
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly currentUser$: Observable<User | null> = authState(this.auth).pipe(
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly profile$: Observable<UserProfile | null> = this.currentUser$.pipe(
    switchMap((user) => {
      if (user === null) {
        return of(null);
      }

      const profileRef = doc(this.firestore, `users/${user.uid}`);
      return docData(profileRef) as Observable<UserProfile>;
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore
  ) {}

  async signIn(email: string, password: string): Promise<void> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email.trim(), password);
      await reload(credential.user);

      if (!credential.user.emailVerified) {
        await signOut(this.auth);
        throw new AuthFailure('email-not-verified', 'Revisa tu correo para confirmar el registro.');
      }

      const profile = await this.getProfile(credential.user.uid);

      if (profile === null) {
        await signOut(this.auth);
        throw new AuthFailure('profile-missing', 'El perfil de usuario no existe.');
      }

      if (profile.deleted) {
        await signOut(this.auth);
        throw new AuthFailure('deleted-account', 'La cuenta fue eliminada.');
      }

      if (!profile.active) {
        await signOut(this.auth);
        throw new AuthFailure('inactive-account', 'Espera a que el administrador active tu cuenta.');
      }
    } catch (error) {
      if (error instanceof AuthFailure) {
        throw error;
      }

      throw this.mapFirebaseAuthError(error);
    }
  }

  async register(input: RegisterInput): Promise<void> {
    try {
      const email = input.email.trim().toLowerCase();
      const firstName = input.firstName.trim();
      const secondName = input.secondName.trim();
      const displayName = `${firstName} ${secondName}`.trim();
      const credential = await createUserWithEmailAndPassword(this.auth, email, input.password);

      await updateProfile(credential.user, { displayName });
      await setDoc(doc(this.firestore, `users/${credential.user.uid}`), {
        uid: credential.user.uid,
        email,
        firstName,
        secondName,
        displayName,
        role: 'user',
        active: false,
        deleted: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      await sendEmailVerification(credential.user);
      await signOut(this.auth);
    } catch (error) {
      await signOut(this.auth);

      if (error instanceof AuthFailure) {
        throw error;
      }

      throw new AuthFailure('registration-failed', this.getFirebaseErrorMessage(error));
    }
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  async reloadCurrentUser(): Promise<void> {
    if (this.auth.currentUser !== null) {
      await reload(this.auth.currentUser);
    }
  }

  async getCurrentProfile(): Promise<UserProfile | null> {
    const user = this.auth.currentUser;

    if (user === null) {
      return null;
    }

    return this.getProfile(user.uid);
  }

  private async getProfile(uid: string): Promise<UserProfile | null> {
    const profileSnapshot = await getDoc(doc(this.firestore, `users/${uid}`));

    if (!profileSnapshot.exists()) {
      return null;
    }

    return profileSnapshot.data() as UserProfile;
  }

  private mapFirebaseAuthError(error: unknown): AuthFailure {
    const message = this.getFirebaseErrorMessage(error);
    return new AuthFailure(message === 'Credenciales incorrectas.' ? 'invalid-credentials' : 'unknown', message);
  }

  private getFirebaseErrorMessage(error: unknown): string {
    const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : '';

    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Credenciales incorrectas.';
      case 'auth/email-already-in-use':
        return 'El correo ya esta registrado.';
      case 'auth/weak-password':
        return 'La contrasena debe tener al menos 6 caracteres.';
      case 'auth/invalid-email':
        return 'El correo no tiene un formato valido.';
      default:
        return 'No se pudo completar la operacion.';
    }
  }
}
