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
  ususario: any;

  constructor(private route: Router, public fb: FormBuilder, public alertControler: AlertController,public restService: RestService) { 
    this.formularioLogin = this.fb.group({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  
  }

  async login(){

    if(this.formularioLogin.invalid){
      const alert = await this.alertControler.create({
        header: 'Fallo al iniciar sesion',
        message: 'Datos incompletos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    this.restService.login(this.formularioLogin.value.email, this.formularioLogin.value.password)
    .then(async data => {
      this.ususario = data;
      this.ususario = this.ususario.data;
      this.restService.obtenerUsuario(this.ususario.id)
      .then(async user => {
        this.ususario = user;
        this.ususario = this.ususario.data;
        if(this.ususario.email_confirmed==1){
          if(this.ususario.actived==1){
            if(this.ususario.type=='a'){
              this.route.navigate(['/admin'])
            }else{
              this.route.navigate(['/juegos'])
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

    })

  }

}
