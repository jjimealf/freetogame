import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { juego } from '../interfaces/interface';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).addVirtualFileSystem(pdfFonts);

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.page.html',
    styleUrls: ['./carrito.page.scss'],
    standalone: false
})
export class CarritoPage implements OnInit {

  @Input() carrito: juego[];
  pdfObj: any = null;
  pdfFileUri: string | null = null;
  readonly isNativePlatform = Capacitor.isNativePlatform();

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancelar() {
    this.modalCtrl.dismiss({carrito: this.carrito});
  }

  getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
    
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
    
        const dataURL = canvas.toDataURL("image/png");
    
        resolve(dataURL);
      };
    
      img.onerror = error => {
        reject(error);
      };
    
      img.src = url;
    });
  }

  private getPdfBlob(): Promise<Blob> {
    return new Promise((resolve) => {
      this.pdfObj.getBlob((blob: Blob) => resolve(blob));
    });
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result !== 'string') {
          reject(new Error('No se pudo convertir el PDF a base64.'));
          return;
        }

        const [, base64Data = reader.result] = reader.result.split(',');
        resolve(base64Data);
      };

      reader.onerror = () => reject(reader.error ?? new Error('No se pudo leer el PDF.'));
      reader.readAsDataURL(blob);
    });
  }

  private async prepararPdfParaCompartir(): Promise<void> {
    const blob = await this.getPdfBlob();
    const data = await this.blobToBase64(blob);
    const savedFile = await Filesystem.writeFile({
      path: 'pedido.pdf',
      data,
      directory: Directory.Cache,
      recursive: true
    });

    this.pdfFileUri = savedFile.uri;
  }

  async realizarPedido() {
    const rows = [];

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
    this.pdfFileUri = null;

    if (this.isNativePlatform) {
      await this.prepararPdfParaCompartir();
    } else {
      this.pdfObj.download('pedido.pdf');
    }

    this.carrito = [];
  }

  async compartirPedido() {
    if (!this.pdfObj) {
      return;
    }

    if (!this.isNativePlatform) {
      this.pdfObj.download('pedido.pdf');
      return;
    }

    if (!this.pdfFileUri) {
      await this.prepararPdfParaCompartir();
    }

    await Share.share({
      title: 'Pedido de FreeToGame',
      text: 'Pedido generado en FreeToGame',
      url: this.pdfFileUri ?? undefined,
      dialogTitle: 'Compartir pedido'
    });
  }

}
