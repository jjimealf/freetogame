import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  query,
  serverTimestamp,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private readonly firestore: Firestore) {}

  listUsers(): Observable<UserProfile[]> {
    const usersRef = collection(this.firestore, 'users');
    const usersQuery = query(
      usersRef,
      where('role', '==', 'user'),
      where('deleted', '==', false)
    );

    return collectionData(usersQuery) as Observable<UserProfile[]>;
  }

  setActive(uid: string, active: boolean): Promise<void> {
    return updateDoc(doc(this.firestore, `users/${uid}`), {
      active,
      updatedAt: serverTimestamp()
    });
  }

  softDelete(uid: string): Promise<void> {
    return updateDoc(doc(this.firestore, `users/${uid}`), {
      active: false,
      deleted: true,
      updatedAt: serverTimestamp()
    });
  }
}
