import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { juego } from '../interfaces/interface';
import { StorageService } from '../service/storage.service';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
    selector: 'app-favoritos',
    templateUrl: './favoritos.page.html',
    styleUrls: ['./favoritos.page.scss'],
    standalone: false
})
export class FavoritosPage implements OnInit {

  carrito: juego[] = [];
  isFull: boolean[] = [];
  isFav: boolean[] = [];
  sliderOpts = {
    allowSlidePrev: false,
    alloSlideNext: false
};

  constructor(public storageService: StorageService, private modalCtrl: ModalController) { 
    
  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.listarFavoritos();
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

  add(i){ 
    var id = this.carrito.find(juego => juego.id == this.storageService.juegos[i].id)
    if(id == null){
      this.carrito.push(this.storageService.juegos[i]);  
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
    this.carrito = data.carrito;
  }
}


