import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FavoriteGame } from '../models/favorite-game.model';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore
  ) {}

  favorites$(): Observable<FavoriteGame[]> {
    return authState(this.auth).pipe(
      switchMap((user) => {
        if (user === null) {
          return of([]);
        }

        const favoritesRef = collection(this.firestore, `users/${user.uid}/favorites`);
        const favoritesQuery = query(favoritesRef, orderBy('addedAt', 'desc'));
        return collectionData(favoritesQuery) as Observable<FavoriteGame[]>;
      })
    );
  }

  async add(game: Game): Promise<void> {
    const uid = this.requireUid();
    await setDoc(doc(this.firestore, `users/${uid}/favorites/${game.id}`), {
      id: game.id,
      title: game.title,
      thumbnail: game.thumbnail,
      short_description: game.short_description,
      game_url: game.game_url,
      genre: game.genre,
      platform: game.platform,
      publisher: game.publisher,
      developer: game.developer,
      release_date: game.release_date,
      freetogame_profile_url: game.freetogame_profile_url,
      addedAt: serverTimestamp()
    });
  }

  remove(gameId: number): Promise<void> {
    const uid = this.requireUid();
    return deleteDoc(doc(this.firestore, `users/${uid}/favorites/${gameId}`));
  }

  private requireUid(): string {
    const uid = this.auth.currentUser?.uid;

    if (uid === undefined) {
      throw new Error('Debes iniciar sesion para modificar favoritos.');
    }

    return uid;
  }
}
