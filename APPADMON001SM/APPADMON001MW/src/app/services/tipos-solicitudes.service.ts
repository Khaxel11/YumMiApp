import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON01MW + 'CatTipoSolicitud/';

@Injectable({
  providedIn: 'root'
})
export class TiposSolicitudesService {

  constructor(public http : HttpClient) { }
  
  getTiposSolicitudes(Filtro : string) : Promise<any>{
    const url = URL + 'getTipoSolicitud';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  controlTiposSolicitudes(Opcion : number, TiposSolicitudes : any) : Promise<any>{
    const url = URL + 'controlTipoSolicitud';
    const params = new HttpParams()
      .append('Opcion', String(Opcion));
    return this.http.post(url , TiposSolicitudes , {params}).toPromise();
  }
}
