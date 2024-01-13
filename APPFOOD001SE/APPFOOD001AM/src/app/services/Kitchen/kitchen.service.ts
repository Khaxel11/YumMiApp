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
    return this.http.get(url, { params }).toPromise();
  }

  getUserData(Opcion : number, Username : string, Password : string, IdCuenta : number) : Promise<any>{
    const url = URL + 'getUserData';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('UserName', String(Username))
    .append('Password', String(Password))
    .append('IdCuenta', String(IdCuenta))
    return this.http.get(url, { params }).toPromise();
  }

  validateUsername(username : string) : Promise<any>{
    const url = URL + 'validateUsername';
    const params = new HttpParams()
    .append('UserName', username)

    return this.http.get(url, { params }).toPromise();
  }
  getUbication(Opcion : number, Id  : number = 0) : Promise<any>{
    Opcion = Opcion === 1 ? 6 : Opcion === 2 ? 7 : 8;
    //6 Pais 7 Estados 8 Municipios
    const url = URL + 'getUbication';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('Id', String(Id))
    return this.http.get(url, {params}).toPromise();
  }

  registerNewUser(UserData : any) : Promise<any>{
    const url = URL + 'registerNewUser';
    const params = new HttpParams()
      .append('UserName', UserData.userName)
      .append('Password', UserData.password)
      .append('Email', UserData.email)
    return this.http.post(url,true,{params}).toPromise();
  }
  addNewUser(UserData : UserData) : Promise<any>{
    const url = URL + 'insertKitchenUser';
   
    return this.http.post(url,UserData).toPromise();
  }
  
}
