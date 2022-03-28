import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  token: any;
  usuario: any;
  
  
  apiUrl = 'http://semillero.allsites.es/public/api';
  
  constructor(private http: HttpClient) { }

  login(){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: 'raul@raul.com', 
        password: '123456'})     
        .subscribe(data => {
          this.token = data.data.token; 
          console.log(data); 
          resolve(data);
      });

    });
  }

  loginReal(myemail: string, mypassword: string){
    return new Promise(resolve => {
      this.http.post<any>(this.apiUrl + '/login', 
      {
        email: myemail, 
        password: mypassword})     
        .subscribe(data => {
          this.token = data.data.token;
         
          resolve(data);   
          console.log(data);   
          err=> {
            console.log(err)
          }      
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

  registrarUsuario(myName: string, mySecondname: string, myCompany_id : number, myEmail: string, myPassword: string, myPasswordConf : string){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/register', 
      {
        firstname: myName,
        secondname: mySecondname,
        email: myEmail,
        password: myPassword,
        c_password: myPasswordConf,
        company_id: myCompany_id})
        .subscribe(data => {
          console.log(data);
          resolve(data);
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

}