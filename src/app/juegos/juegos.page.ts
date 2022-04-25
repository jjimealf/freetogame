import { Component, OnInit, ViewChild } from '@angular/core';
import { juego } from '../interfaces/interface';
import { RestService } from '../service/rest.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class UserPage implements OnInit {

  juegos: juego[] = [];
  juegosFav: juego[] = [];
  isFull: boolean[] = [];
  isFav: boolean[] = [];
  pagesI: number = 0;
  pagesF: number = 20;
  

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  

  constructor(public restService: RestService) {
     
   }

  ngOnInit() {
    
  }
  
  ionViewWillEnter(){
    this.listadoJuegos();
  }

  listadoJuegos(){
    this.restService.listarJuegos().then( (data: juego[]) => {
      for(let i = this.pagesI; i < this.pagesF; i++){
        this.juegos.push(data[i]);
      }
      this.getData(data);

      this.pagesI += 20;
      if(this.pagesF < 360){
        this.pagesF += 20;
      }else{
        this.pagesF +=9
      }
    })
    
  }

  loadData(event){
    setTimeout(() => {
      this.listadoJuegos();
      event.target.complete();
      if (this.juegos.length === 369) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  getData(data){
    this.isFav = [];
    for(let i=0; i<data.length; i++){
      this.isFull.push(false);
      this.Fav(data, i);
    }
  }

  Fav(data, i){
    const fav: juego[] = JSON.parse(localStorage.getItem('fav'));
    if(fav.findIndex(x => x.id == data[i].id) == -1){
      this.isFav.push(false);
    }else{
      this.isFav.push(true);
    }
  }

  toggleMore(i){
    this.isFull[i] = !this.isFull[i];
  }

  fav(i){
    this.isFav[i] = !this.isFav[i];
    if(this.isFav[i] == true){
     this.juegosFav.push(this.juegos[i]);
    }else{
      this.juegosFav.splice(this.juegosFav.findIndex(x => x.id == this.juegos[i].id), 1);
    }
    localStorage.setItem('fav', JSON.stringify(this.juegosFav));
  }
}
