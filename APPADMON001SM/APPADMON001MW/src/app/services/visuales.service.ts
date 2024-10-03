import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.APPADMON001MW + 'Visuales/';

@Injectable({
  providedIn: 'root'
})
export class VisualesService {

  constructor(public http : HttpClient) { }
  
  getAplicaciones(Filtro : string) : Promise<any>{
    const url = URL + 'getAplicaciones';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }
  
  getCatProductos(Filtro : string) : Promise<any>{
    const url = URL + 'getCatProductos';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  getVisuales(Filtro : string, idSistema: any, programadas: any) : Promise<any>{
    const url = URL + 'getVisuales';
    const params = new HttpParams()
      .append('Filtro', Filtro)
      .append('idSistema', idSistema)
      .append('programadas', programadas);
    return this.http.get(url ,{params}).toPromise();
  }
  

  controlVisuales(Opcion : number, model : any) : Promise<any>{
    const url = URL + 'controlVisuales';
    const params = new HttpParams()
      .append('Opcion', String(Opcion));
    return this.http.post(url , model , {params}).toPromise();
  }

}
