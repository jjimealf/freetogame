import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RestService } from '../service/rest.service';
import {  UntypedFormGroup, 
          UntypedFormControl, 
          Validators, 
          UntypedFormBuilder } from '@angular/forms';
          import { Router } from '@angular/router';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
    standalone: false
})
export class RegistroPage implements OnInit {

  formularioRegistro: UntypedFormGroup;

  constructor(private route: Router, public fb: UntypedFormBuilder, public alertControler: AlertController, public restService : RestService) {

    this.formularioRegistro = this.fb.group({
      'nombre': new UntypedFormControl("", Validators.required),
      'apellidos': new UntypedFormControl("", Validators.required),
      'email': new UntypedFormControl("", Validators.required),
      'password': new UntypedFormControl("", Validators.required),
      'confirmpassword': new UntypedFormControl("", Validators.required)
    })

  }

  ngOnInit() {
  }

  async register(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertControler.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    var usuario = {
      nombre: f.nombre,
      apellidos: f.apellidos,
      email: f.email,
      password: f.password,
      confirmpassword: f.confirmpassword
    }

    localStorage.setItem('usuario', JSON.stringify(usuario));

    console.log(usuario);
    this.restService.registrarUsuario
    (usuario.nombre, usuario.apellidos, usuario.email, usuario.password, usuario.confirmpassword);
    this.route.navigate(['/home'])
}}
