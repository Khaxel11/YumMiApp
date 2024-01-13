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
    .append('IdEstado', String(IdEstado))
    .append('Filtro', String(Filtro))
    .append('IdCuenta', String(IdCuenta))
    return this.http.get(url, { params }).toPromise();
  }
  getCalificaciones(IdFoodHub : number) : Promise<any>{
    const url = URL + 'getCalificaciones';
    const params = new HttpParams()
    .append('IdFoodHub', String(IdFoodHub))
    
    return this.http.get(url, { params }).toPromise();
  }
  asignFoodhub(Opcion : number, IdCuenta : number, IdFoodHub : number, Predeterminado : boolean, IdAsignado : number) : Promise<any>{
    const url = URL + 'asignFoodhub';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('IdCuenta', String(IdCuenta))
    .append('IdFoodHub', String(IdFoodHub))
    .append('Predeterminado', String(Predeterminado))
    .append('IdAsignado', String(IdAsignado))
    return this.http.post(url, false, { params }).toPromise();
  }
}
