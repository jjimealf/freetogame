import { Component, OnInit } from '@angular/core';
import {  FormGroup, 
          FormControl, 
          Validators, 
          FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  restService: RestService;
  usuario: string;
  contraseña: string;
  data: any;

  constructor(private route: Router, public fb: FormBuilder, public alertControler: AlertController,restService: RestService) { 
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

    this.restService = restService;

  }

  ngOnInit() {
  
  }

  async login(){

    if(this.formularioLogin.invalid){
      const alert = await this.alertControler.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    this.restService.loginReal(this.formularioLogin.value.email, this.formularioLogin.value.password)
    .then(async data => {
      this.data = data;
      this.data = this.data.data;
      if(this.data.email_confirmed==1){
        if(this.data.actived==1){
          if(this.data.type=='a'){
            this.route.navigate(['/admin'])
          }else{
            this.route.navigate(['/user'])
          }
        }else{
            const alert2 = await this.alertControler.create({
              header: 'Usuario no activado',
              message: 'Espere a que el administrador active su cuenta',
              buttons: ['Aceptar'],
            });
            await alert2.present();
            return;
          }
        }else{
          const alert3 = await this.alertControler.create({
            header: 'Email no confirmado',
            message: 'Revise su correo para confirmar el registro',
            buttons: ['Aceptar'],
          });
          await alert3.present();
          return;
      }

    })

  }

}
