import { Component, OnInit } from '@angular/core';
import { juego } from '../interfaces/interface';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  juegos: any;

  constructor(public restService: RestService) { }

  ngOnInit() {
    this.listadoJuegos()
  }

  listadoJuegos(){
    this.restService.listarJuegos().then(data => {
      this.juegos=data
    })
  }
}
