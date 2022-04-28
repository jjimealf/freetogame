import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { juego } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  juegos: juego[] = [];

  constructor(private storage: Storage) {
    this.Init();
    this.cargarFav();
   }

  async Init(){
    const storage = await this.storage.create();
    this._storage = storage;
  }

  guardarFav(juego: juego){
    const existe = this.juegos.find(j => j.id === juego.id);
    if(!existe){
      this.juegos.unshift(juego);
      this.storage.set('favoritos', this.juegos);
    }
  }

  async cargarFav(){
    const favoritos = await this.storage.get('favoritos');
    if(favoritos){
      this.juegos = favoritos;
    }
  }

  borrarFav(juego: juego){
    this.juegos = this.juegos.filter(j => j.id !== juego.id);
    this.storage.set('favoritos', this.juegos);
  }
}
