import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON001MW + 'Aplicaciones/';

@Injectable({
  providedIn: 'root'
})
export class AplicacionesService {

  constructor(public http : HttpClient ) { }

  getAplicaciones(Filtro : string) : Promise<any>{
    const url = URL + 'getAplicaciones';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }
  controlAplicaciones(Opcion : number, Aplicaciones : any) : Promise<any>{
    const url = URL + 'controlAplicaciones';
    const params = new HttpParams()
      .append('Opcion', String(Opcion))
      .append('IdUsuario', '000100');
      return this.http.post(url , Aplicaciones, {params}).toPromise();
  }
}
