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
  isFull: boolean[] = [];
  pagesI: number = 0;
  pagesF: number = 20;

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  

  constructor(public restService: RestService) {
    this.listadoJuegos()
   }

  ngOnInit() {
    
  }

  listadoJuegos(){
    this.restService.listarJuegos().then( (data: juego[]) => {
      for(let i = this.pagesI; i < this.pagesF; i++){
        this.juegos.push(data[i]);
      }

      this.pagesI += 20;
      if(this.pagesF < 360){
        this.pagesF += 20;
      }else{
        this.pagesF +=9
      }
      this.getData(data);
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
    for(let i=0; i<data.length; i++){
      this.isFull.push(false);
    }
}

  toggleMore(i){
    this.isFull[i] = !this.isFull[i];
  }
}
