import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const URL = environment.APPFOODAPI001 + 'Kitchen/';
import { UserData } from '../../models/user'
import { promise } from 'protractor';
@Injectable({
  providedIn: 'root'
})
export class KitchenService {
  
  constructor(public http: HttpClient) { }

  getNotification(IdCuenta : number) : Promise<any>{
    const url = URL + 'getNotification';
    const params = new HttpParams()
    .append('IdCuenta', String(IdCuenta))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }

  getSliderMenu() : Promise<any>{
    const url = URL + 'getSliderMenu';
    const params = new HttpParams()
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }


  getUserData(Opcion : number, Username : string, Password : string, IdCuenta : number) : Promise<any>{
    const url = URL + 'getUserData';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('UserName', String(Username))
    .append('Password', String(Password))
    .append('IdCuenta', String(IdCuenta))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }

  validateUsername(username : string) : Promise<any>{
    const url = URL + 'validateUsername';
    const params = new HttpParams()
    .append('UserName', username)
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  getUbication(Opcion : number, Id  : number = 0) : Promise<any>{
    Opcion = Opcion === 1 ? 6 : Opcion === 2 ? 7 : 8;
    //6 Pais 7 Estados 8 Municipios
    const url = URL + 'getUbication';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('Id', String(Id))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, {params, headers}).toPromise();
  }

  getInfo(Opcion : number, Filtro  : string = "") : Promise<any>{
    const url = URL + 'getInfo';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('Filtro', String(Filtro))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, {params, headers}).toPromise();
  }
  getCards() : Promise<any>{
    const url = URL + 'getCards';
    const params = new HttpParams()
    .append('IdCuenta', String(localStorage.getItem('idCuenta')))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, {params, headers}).toPromise();
  }
  registerNewUser(UserData : any) : Promise<any>{
    const url = URL + 'registerNewUser';
    const params = new HttpParams()
      .append('UserName', UserData.userName)
      .append('Password', UserData.password)
      .append('Email', UserData.email)
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url,true,{params, headers}).toPromise();
  }
  addNewUser(UserData : UserData) : Promise<any>{
    const url = URL + 'insertKitchenUser';
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url,UserData, { headers }).toPromise();
  }
  checkApiConnection(): Promise<any> {
    const url = URL + 'checkConnection'; 
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { headers }).toPromise();
  }
  saveCard(Opcion : number, card : any) : Promise<any>{
    const url = URL + 'saveCard';
    const params = new HttpParams()
      .append('Opcion', String(Opcion))
      .append('IdCuenta', String(localStorage.getItem('idCuenta')))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url,card, { params, headers }).toPromise();
  }
}
