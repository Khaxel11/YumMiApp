import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User, Username } from 'src/app/models/user';
const URL = environment.APPUSERAPI001+'Register/';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }
  verifyCode( Code : string, Ext : string, Num : string, Correo : string, Usuario : string) : Promise<any>{
    const url = URL + 'verifyCode';
    const params = new HttpParams()
    .append('Code', String(Code))
    .append('Ext', String(Ext))
    .append('Num', String(Num))
    .append('Correo', String(Correo))
    .append('Usuario', String(Usuario))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  registerUser( user : Username) : Promise<any>{
    const url = URL + 'registerUser';
    const params = new HttpParams()
    
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url, user, { params, headers }).toPromise();
  }
}
