import { Component, OnInit } from '@angular/core';
import { juego } from '../interfaces/interface';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  carrito: juego[] = [];
  isFull: boolean[] = [];
  isFav: boolean[] = [];
  sliderOpts = {
    allowSlidePrev: false,
    alloSlideNext: false
};

  constructor( public storageService: StorageService) { 
    this.listarFavoritos();
  }

  ngOnInit() {
  }

  listarFavoritos() {
    this.isFav = []
    this.isFull = []
    this.storageService.juegos.forEach(() => {
      this.isFull.push(false);
      this.isFav.push(true);
    });
  }


  toggleMore(i){
    this.isFull[i] = !this.isFull[i];
  }

  fav(i){
    this.isFav[i] = !this.isFav[i];
    if(this.isFav[i] == false){
      this.storageService.borrarFav(this.storageService.juegos[i]);
      this.isFull.splice(i, 1);
      this.isFav.splice(i, 1);
    }
  }

  añadir(i){ 
    this.carrito.push(this.storageService.juegos[i]);
    }
}


