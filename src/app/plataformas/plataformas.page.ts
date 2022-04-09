import { Component, OnInit } from '@angular/core';
import { juego } from '../interfaces/interface';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-plataformas',
  templateUrl: './plataformas.page.html',
  styleUrls: ['./plataformas.page.scss'],
})
export class PlataformasPage implements OnInit {

  juegos: juego[]= [];

  constructor(private restService: RestService) { }

  ngOnInit() {
    this.segmentChanged({detail:{value:'pc'}});
  }

  segmentChanged(ev: any) {
    this.restService.listarJuegosPorPlataforma(ev.detail.value).then((juegos: juego[]) =>{
      this.juegos = juegos;
    })
  }
}
