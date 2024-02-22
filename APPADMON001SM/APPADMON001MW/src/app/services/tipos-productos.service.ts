import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON01MW + 'TiposProductos/';

@Injectable({
  providedIn: 'root'
})
export class TiposProductosService {

  constructor(public http : HttpClient) { }
  getTiposProductos(Filtro : string) : Promise<any>{
    const url = URL + 'getTiposProductos';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }
}
