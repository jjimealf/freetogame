import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { juego, juegos } from '../interfaces/interface';



@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  token: any;
  usuario: any;
  

  apiUrl = 'http://semillero.allsites.es/public/api';
  apiUrl2 = 'https://www.freetogame.com/api'
  
  constructor(private http: HttpClient, private alertControler: AlertController) { }


  login(myemail: string, mypassword: string){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: myemail, 
        password: mypassword})     
        .subscribe(data => {
          this.token = data.data.token;
          resolve(data);   
          console.log(data);   
        },async err=> {
            console.log(err)
            const alert = await this.alertControler.create({
              header: 'Fallo al iniciar sesion',
              message: 'Credenciales incorrectas',
              buttons: ['Aceptar'],
            });
            await alert.present();
            return;    
      });

    });
  }

  obtenerUsuarios(){
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl + '/users',{
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }})
    })
  }

  registrarUsuario(myName: string, mySecondname: string, myEmail: string, myPassword: string, myPasswordConf : string){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register', 
      {
        firstname: myName,
        secondname: mySecondname,
        email: myEmail,
        password: myPassword,
        c_password: myPasswordConf})
        .subscribe(async data => {
          console.log(data);
          resolve(data);
          const alert = await this.alertControler.create({
            header: 'Usuario registrado',
            message: 'Confirma tu correo y espera a que el administrador te active el ususario',
            buttons: ['Aceptar'],
          });
          await alert.present();
          return;    
        });
    });
  }

  activarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/activate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  desactivarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/deactivate',
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })
  }

  eliminarUsuario(id: number){

    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/user/deleted/'+id,
      {
        user_id: id
      },
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data)
        console.log(data);
      err => {
        console.log(err);
      }
      })
    })

  }

  obtenerUsuario(id: number){
    return new Promise<any>(resolve => {
      this.http.get(this.apiUrl + '/user/'+id,
      {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(data => {
        resolve(data)
        console.log(data);
      err => {
        console.log(err)
      }})
    })
  }

  listarJuegos(){
    return new Promise(resolve => {
      this.http.get<juegos>(this.apiUrl2 + '/games',
      {
        headers: new HttpHeaders().set(
           "free-to-play-games-database.p.rapidapi.com",
		        "9038f2620amsh062912a94ec6960p1b7f52jsn07e1954daa31"
        )
      })
      .subscribe(data => {
        resolve(data)
        console.log(data)
        err => {
          console.log(err)
        }
      })
    })
  }
}