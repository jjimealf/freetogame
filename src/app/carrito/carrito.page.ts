import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { juego } from '../interfaces/interface';
import { File } from '@awesome-cordova-plugins/file/ngx' 
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { RestService } from '../service/rest.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.page.html',
    styleUrls: ['./carrito.page.scss'],
    standalone: false
})
export class CarritoPage implements OnInit {

  @Input() carrito: juego[];
  pdfObj = null;

  constructor(private modalCtrl: ModalController, private file: File, private fileOpener: FileOpener, private plt: Platform, private restService: RestService, private emailComposer: EmailComposer) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalCtrl.dismiss({carrito: this.carrito});
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
    this.pdfObj = pdfMake.createPdf(pdf);

    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'pedido.pdf', blob, { replace: true })
        .then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'pedido.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download('pedido.pdf');
      
    }
    this.carrito = [];
  }

  enviarPedido() {
    let email = {
      to: this.restService.email,
      attachments: [
        this.file.dataDirectory + 'pedido.pdf'
      ],
      subject: 'Pedido de FreeToGame',
      body: 'Adjuntamos el PDF con el pedido de nuestra app',
      isHtml: true
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);
  }

}
