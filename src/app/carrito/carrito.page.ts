import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { juego } from '../interfaces/interface';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  @Input() carrito: juego[];
  pdfObj = null;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalCtrl.dismiss();
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });}
    
    
  async realizarPedido() {
    var rows = [];

    for(let i=0; i<this.carrito.length; i++) {
      rows.push(['Titulo: '+this.carrito[i].title]);
      rows.push(['Descripcion: '+this.carrito[i].short_description]);
      rows.push(['Desarrollador: '+this.carrito[i].developer]);
      rows.push(['Plataformas: '+this.carrito[i].platform]);
    }
    const pdf = {
      content: [
        {
          image: await this.getBase64ImageFromURL("/assets/logo.png"),
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          table: {
            body: rows
          }
        }
      ]
    }
    this.pdfObj = pdfMake.createPdf(pdf).download('pedido.pdf');
  }
}
