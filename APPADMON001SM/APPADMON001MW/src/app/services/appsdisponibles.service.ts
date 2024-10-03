import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
const URL = environment.APPADMON001MW + 'AppsDisponibles/';

@Injectable({
  providedIn: 'root'
})
export class AppsDisponiblesService {

  constructor(public http : HttpClient ) { }

  getSistemas() : Promise<any>{
    const url = URL + 'getSistemas';
    const params = new HttpParams()
    return this.http.get(url ,{params}).toPromise();
  }
  getEncabezados(Filtro : string) : Promise<any>{
    const url = URL + 'getEncabezados';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }
  getAplicaciones(Filtro : string) : Promise<any>{
    const url = URL + 'getAplicaciones';
    const params = new HttpParams()
      .append('Filtro', String(Filtro));
    return this.http.get(url ,{params}).toPromise();
  }

  postEncabezado(Opcion : number, Aplicaciones : any) : Promise<any>{
    const url = URL + 'postEncabezados';
    const params = new HttpParams()
      .append('Opcion', String(Opcion))
      .append('IdUsuario', '000100');
      return this.http.post(url , Aplicaciones, {params}).toPromise();
  }
  postAplicaciones(Opcion : number, Aplicaciones : any) : Promise<any>{
    const url = URL + 'postAplicaciones';
    const params = new HttpParams()
      .append('Opcion', String(Opcion))
      .append('IdUsuario', '000100');
      return this.http.post(url , Aplicaciones, {params}).toPromise();
  }
}
