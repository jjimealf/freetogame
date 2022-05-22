import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { juego } from '../interfaces/interface';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  @Input() carrito: juego[];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  realizarPedido() {
    
  }
}
