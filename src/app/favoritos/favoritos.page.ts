import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../core/favorites/favorites.service';
import { FavoriteGame } from '../core/models/favorite-game.model';
import { Game } from '../core/models/game.model';
import { juego } from '../interfaces/interface';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
    selector: 'app-favoritos',
    templateUrl: './favoritos.page.html',
    styleUrls: ['./favoritos.page.scss'],
    standalone: false
})
export class FavoritosPage implements OnInit, OnDestroy {
  favoritos: FavoriteGame[] = [];
  carrito: juego[] = [];

  private favoritesSubscription?: Subscription;
  private expandedIds = new Set<number>();

  constructor(
    private readonly favoritesService: FavoritesService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.favoritesSubscription = this.favoritesService.favorites$().subscribe((favorites) => {
      this.favoritos = favorites;
      this.carrito = this.carrito.filter((cartItem) => favorites.some((favorite) => favorite.id === cartItem.id));
    });
  }

  ngOnDestroy() {
    this.favoritesSubscription?.unsubscribe();
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

  async fav(game: Game): Promise<void> {
    await this.favoritesService.remove(game.id);
    this.carrito = this.carrito.filter((item) => item.id !== game.id);
  }

  add(game: Game): void {
    const exists = this.carrito.find(item => item.id === game.id)
    if(exists == null){
      this.carrito.push(game);
    }
  }

  async pedido(){
    const modal = await this.modalCtrl.create({
      component: CarritoPage,
      componentProps: {
        carrito: this.carrito
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.carrito = data?.carrito ?? this.carrito;
  }
}
