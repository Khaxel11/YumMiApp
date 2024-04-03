import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const URL = environment.APPFOODAPI001 + 'FoodHub/';
import { LogUser } from '../../models/LogUser'

@Injectable({
  providedIn: 'root'
})
export class FoodHubService {

  constructor(public http: HttpClient) { }

  getFoodHubs(IdEstado : number, Filtro : string, IdCuenta : number) : Promise<any>{
    const url = URL + 'getFoodHubs';
    const params = new HttpParams()
    .append('IdEstado', sessionStorage.getItem("IdEstado"))
    .append('Filtro', String(Filtro))
    .append('IdCuenta', String(IdCuenta))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  getMyFoodHubs() : Promise<any>{
    const url = URL + 'getFoodHubs';
    const params = new HttpParams()
    .append('IdEstado', sessionStorage.getItem("IdEstado"))//localStorage.getItem("idEstado")
    .append('IdCuenta', String(localStorage.getItem("idCuenta")))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  getCalificaciones(IdFoodHub : number) : Promise<any>{
    const url = URL + 'getCalificaciones';
    const params = new HttpParams()
    .append('IdFoodHub', String(IdFoodHub))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  asignFoodhub(Opcion : number, IdCuenta : number, IdFoodHub : number, Predeterminado : boolean, IdAsignado : number) : Promise<any>{
    const url = URL + 'asignFoodhub';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('IdCuenta', String(IdCuenta))
    .append('IdFoodHub', String(IdFoodHub))
    .append('Predeterminado', String(Predeterminado))
    .append('IdAsignado', String(IdAsignado))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url, false, { params, headers }).toPromise();
  }
}
