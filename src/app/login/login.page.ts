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
    .then(data => {
      this.data = data;
      this.data = this.data.data;
      //this.restService.obtenerUsuario(this.data.id);
      if(this.data.type=='a'){
        this.route.navigate(['/administration'])
      }else{
        this.route.navigate(['/user'])
      }

    })

  }

}
