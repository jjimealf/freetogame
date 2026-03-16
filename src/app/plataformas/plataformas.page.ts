import { Component, OnInit } from '@angular/core';
import { juego } from '../interfaces/interface';
import { RestService } from '../service/rest.service';

@Component({
    selector: 'app-plataformas',
    templateUrl: './plataformas.page.html',
    styleUrls: ['./plataformas.page.scss'],
    standalone: false
})
export class PlataformasPage implements OnInit {

  juegos: juego[]= [];
  isFull: boolean[] = [];

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.segmentChanged({detail:{value:'pc'}});
  }

  segmentChanged(ev: any) {
    this.restService.listarJuegosPorPlataforma(ev.detail.value).then((juegos: juego[]) =>{
      this.juegos = juegos;
      this.getData(juegos);
    })
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
