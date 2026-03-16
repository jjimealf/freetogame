import { Component, OnInit } from '@angular/core';
import { RestService } from '../service/rest.service';
import { ViewChild } from '@angular/core';
import { IonList} from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.page.html',
    styleUrls: ['./admin.page.scss'],
    standalone: false
})
export class AdminPage implements OnInit {
  usuarios : any

  //Referencia 
  @ViewChild('lista',{static:true}) lista: IonList;
  
  constructor(private restService : RestService, private route: Router, private alertCtrl: AlertController) {

  }

  ngOnInit() {
    
    if(this.restService.token != undefined){

      this.restService.obtenerUsuarios()
    .then(usuario => {
      this.usuarios = usuario.data;
    });

    }
    else{
      this.route.navigate(['/login']);
    }

  }

  activar(id: number) {
    this.restService.activarUsuario(id);
    this.lista.closeSlidingItems();
    this.ngOnInit();
    this.ngOnInit();
  }

  desactivar(id: number) {
    this.restService.desactivarUsuario(id);
    this.lista.closeSlidingItems();
    this.ngOnInit();
    this.ngOnInit();
  }


  async eliminar(id: number) {
    const alert = await this.alertCtrl.create({
      message: '¿Estas seguro de eliminar al usuario?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',	
          cssClass: 'secondary',
          handler: () => {}
       },
       {
         text: 'OK',
         handler: () => {
          this.restService.eliminarUsuario(id)
          this.ngOnInit();
          this.ngOnInit();
         }
      }

      ]
    });

    await alert.present();

    this.lista.closeSlidingItems();
    
  }

}