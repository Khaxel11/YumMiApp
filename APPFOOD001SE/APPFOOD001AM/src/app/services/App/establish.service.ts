import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const URL = environment.APPFOODAPI001 + 'Establish/';
import { LogUser } from '../../models/LogUser'

@Injectable({
  providedIn: 'root'
})
export class EstablishService {

  constructor(public http: HttpClient) { }

  getLogData(Opcion : number, IdCuenta : number) : Promise<any>{
    const url = URL + 'getLogData';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('IdCuenta', String(IdCuenta))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  updateUserData(IdCuenta : number, Foto : string , userdata : any) : Promise<any>{
    const url = URL + 'updateUserData';
    const params = new HttpParams()    
    .append('IdCuenta', String(IdCuenta))
    userdata.Foto = Foto;
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url, userdata ,{ params, headers }).toPromise();
  }
}
