import { Component, OnInit } from '@angular/core';
import { juego } from '../interfaces/interface';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  
  juegosFav: juego[] = [];
  isFull: boolean[] = [];
  isFav: boolean[] = [];
  
  constructor() { 
    this.listarFavoritos();
  }

  ngOnInit() {
  }

  listarFavoritos() {
    this.juegosFav = JSON.parse(localStorage.getItem('fav'));
    this.getData(this.juegosFav);
  }

  getData(data){
    for(let i=0; i<data.length; i++){
      this.isFull.push(false);
      this.isFav.push(true);
    }
}

  toggleMore(i){
    this.isFull[i] = !this.isFull[i];
  }

  fav(i){
    this.isFav[i] = !this.isFav[i];
    if(this.isFav[i] == false){
      this.juegosFav.splice(i, 1);
      this.isFull.splice(i, 1);
      this.isFav.splice(i, 1);
    }
    localStorage.setItem('fav', JSON.stringify(this.juegosFav));
  }
}


