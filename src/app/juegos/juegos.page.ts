import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../core/favorites/favorites.service';
import { GamesService } from '../core/games/games.service';
import { Game } from '../core/models/game.model';

@Component({
    selector: 'app-juegos',
    templateUrl: './juegos.page.html',
    styleUrls: ['./juegos.page.scss'],
    standalone: false
})
export class UserPage implements OnInit, OnDestroy {
  juegos: Game[] = [];
  loading = false;
  errorMessage = '';

  private readonly pageSize = 20;
  private allGames: Game[] = [];
  private nextIndex = 0;
  private expandedIds = new Set<number>();
  private favoriteIds = new Set<number>();
  private favoritesSubscription?: Subscription;

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;

  constructor(
    private readonly gamesService: GamesService,
    private readonly favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.favoritesSubscription = this.favoritesService.favorites$().subscribe((favorites) => {
      this.favoriteIds = new Set(favorites.map((favorite) => favorite.id));
    });
  }

  ngOnDestroy() {
    this.favoritesSubscription?.unsubscribe();
  }

  ionViewWillEnter(){
    if (this.allGames.length === 0 && !this.loading) {
      void this.listadoJuegos();
    }
  }

  async listadoJuegos(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      this.allGames = await this.gamesService.listGames();
      this.juegos = [];
      this.nextIndex = 0;
      this.expandedIds.clear();
      this.appendNextPage();
    } catch (error) {
      this.errorMessage = 'No se pudo cargar el catalogo de juegos.';
    } finally {
      this.loading = false;
    }
  }

  loadData(event){
    setTimeout(() => {
      this.appendNextPage();
      event.target.complete();
      event.target.disabled = !this.hasMoreGames();
    }, 250);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  isExpanded(gameId: number): boolean {
    return this.expandedIds.has(gameId);
  }

  toggleMore(gameId: number): void {
    if (this.expandedIds.has(gameId)) {
      this.expandedIds.delete(gameId);
    } else {
      this.expandedIds.add(gameId);
    }
  }

  isFavorite(gameId: number): boolean {
    return this.favoriteIds.has(gameId);
  }

  async fav(game: Game): Promise<void> {
    if (this.favoriteIds.has(game.id)) {
      this.favoriteIds.delete(game.id);
      await this.favoritesService.remove(game.id);
      return;
    }

    this.favoriteIds.add(game.id);
    await this.favoritesService.add(game);
  }

  private appendNextPage(): void {
    const nextGames = this.allGames.slice(this.nextIndex, this.nextIndex + this.pageSize);
    this.juegos.push(...nextGames);
    this.nextIndex += nextGames.length;
  }

  private hasMoreGames(): boolean {
    return this.nextIndex < this.allGames.length;
  }
}
