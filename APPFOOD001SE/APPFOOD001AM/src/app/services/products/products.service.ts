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
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }

  getTiposComida() : Promise<any>{
    const url = URL + 'getTiposComida';
    const params = new HttpParams()
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { headers }).toPromise();
  }
  getFiltros() : Promise<any>{
    const url = URL + 'getFiltros';
    const params = new HttpParams()
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { headers }).toPromise();
  }

  getInfoProduct(IdProducto : number ) : Promise<any>{
    const url = URL + 'getInfoProduct';
    const params = new HttpParams()
    .append('IdProducto', String(IdProducto))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }

  getIngredientes(IdTipoAlimentacion : number) : Promise<any>{
    const url = URL + 'getIngredientes';
    const params = new HttpParams()
    .append('IdTipoAlimentacion', String(IdTipoAlimentacion))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  saveProducto(IdCuenta: number, Producto : any) : Promise<any>{
    const url = URL + 'saveProducto';
    const params = new HttpParams()
    .append('IdCuenta', String(IdCuenta))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url, Producto, { params, headers }).toPromise();
  }
  savePrecios(IdCuenta: number, IdProducto : number, Precios : any) : Promise<any>{
    const url = URL + 'savePrecios';
    const params = new HttpParams()
    .append('IdCuenta', String(IdCuenta))
    .append('IdProducto', String(IdProducto))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url, Precios, { params, headers }).toPromise();
  }
}
