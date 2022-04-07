import { Component, OnInit, ViewChild } from '@angular/core';
import { juego } from '../interfaces/interface';
import { RestService } from '../service/rest.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  juegos: juego[] = [];
  isFull: boolean[] = [];

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  

  constructor(public restService: RestService) { }

  ngOnInit() {
    this.listadoJuegos()
   
  }

  listadoJuegos(){
    this.restService.listarJuegos().then( (data: juego[]) => {
      this.juegos=data;
      this.getData();
    })
  }

  loadData(event){
    setTimeout(() => {
      const nuevoJuego= Array<juego>();
      this.juegos.push(...nuevoJuego)
     
      if (this.juegos.length === 369) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
      }
    }, 1000);
  }

  getData(){
    for(let i=0; i<this.juegos.length; i++){
      this.isFull.push(false);
    }
}

toggleMore(i){
  this.isFull[i] = !this.isFull[i];
}
}
