import { Component, OnInit } from '@angular/core';
import { GamesService } from '../core/games/games.service';
import { Game, GamePlatformFilter } from '../core/models/game.model';

@Component({
    selector: 'app-plataformas',
    templateUrl: './plataformas.page.html',
    styleUrls: ['./plataformas.page.scss'],
    standalone: false
})
export class PlataformasPage implements OnInit {
  juegos: Game[]= [];
  loading = false;
  errorMessage = '';

  private expandedIds = new Set<number>();

  constructor(private readonly gamesService: GamesService) { }

  ngOnInit() {
    void this.loadPlatform('pc');
  }

  segmentChanged(ev: CustomEvent<{ value: GamePlatformFilter }>) {
    void this.loadPlatform(ev.detail.value);
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

  private async loadPlatform(platform: GamePlatformFilter): Promise<void> {
    this.loading = true;
    this.errorMessage = '';
    this.expandedIds.clear();

    try {
      this.juegos = await this.gamesService.listGamesByPlatform(platform);
    } catch (error) {
      this.juegos = [];
      this.errorMessage = 'No se pudieron cargar los juegos de esta plataforma.';
    } finally {
      this.loading = false;
    }
  }
}
