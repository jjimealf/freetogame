import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { Game, GamePlatformFilter, GamesQuery } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private readonly functions: Functions) {}

  listGames(): Promise<Game[]> {
    return this.callGetGames({});
  }

  listGamesByPlatform(platform: GamePlatformFilter): Promise<Game[]> {
    return this.callGetGames({ platform });
  }

  listGamesByCategory(category: string): Promise<Game[]> {
    return this.callGetGames({ category });
  }

  private async callGetGames(query: GamesQuery): Promise<Game[]> {
    const callable = httpsCallable<GamesQuery, Game[]>(this.functions, 'getGames');
    const result = await callable(query);

    return result.data;
  }
}
