import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const URL = environment.APPFOODAPI001 + 'Products/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) { }

  getTiposComida() : Promise<any>{
    const url = URL + 'getTiposComida';
    const params = new HttpParams()
    return this.http.get(url).toPromise();
  }

  getIngredientes(IdTipoAlimentacion : number) : Promise<any>{
    const url = URL + 'getIngredientes';
    const params = new HttpParams()
    .append('IdTipoAlimentacion', String(IdTipoAlimentacion))
    return this.http.get(url, { params }).toPromise();
  }
}
