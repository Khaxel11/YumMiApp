import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const URL = environment.APPFOODAPI001 + 'Products/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) { }

  getProductos(IdCuenta : string, IdTipo : number, IdTipoAlimentacion : number, IdCategoria : number) : Promise<any>{
    const url = URL + 'getProductos';
    const params = new HttpParams()
    .append('IdCuenta', String(IdCuenta))
    .append('IdTipo', String(IdTipo))
    .append('IdTipoAlimentacion', String(IdTipoAlimentacion))
    .append('IdCategoria', String(IdCategoria))
    return this.http.get(url, { params }).toPromise();
  }

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
  saveProducto(IdCuenta: number, Producto : any) : Promise<any>{
    const url = URL + 'saveProducto';
    const params = new HttpParams()
    .append('IdCuenta', String(IdCuenta))
    return this.http.post(url, Producto, { params }).toPromise();
  }
}
