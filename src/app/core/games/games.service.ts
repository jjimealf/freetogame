import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Game, GamePlatformFilter, GamesQuery } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly apiUrl = 'https://www.freetogame.com/api/games';

  constructor(private readonly http: HttpClient) {}

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
    let params = new HttpParams();

    if (query.platform !== undefined && query.platform !== 'all') {
      params = params.set('platform', query.platform);
    }

    if (query.category !== undefined) {
      params = params.set('category', query.category.trim().toLowerCase());
    }

    return firstValueFrom(this.http.get<Game[]>(this.apiUrl, { params }));
  }
}
