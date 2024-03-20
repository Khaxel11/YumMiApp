import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON01MW + 'TiposNotificaciones/';
@Injectable({
  providedIn: 'root'
})
export class TiposNotificacionesService {

  constructor(public http : HttpClient) { }

  getTiposNotificaciones(Filtro : string, IdTipoUsuario : number) : Promise<any>{
    const url = URL + 'getTiposNotificaciones';
    const params = new HttpParams()
      .append('Filtro', Filtro)
      .append('IdTipoUsuario', String(IdTipoUsuario));
    return this.http.get(url ,{params}).toPromise();
  }

  getTiposUsuarios() : Promise<any>{
    const url = URL + 'getTiposUsuarios';
    
    return this.http.get(url).toPromise();
  }
  controlTiposNotificaciones(Opcion : number, Tipo : any) : Promise<any>{
    const url = URL + 'controlTiposNotificaciones';
    const params = new HttpParams()
      .append('Opcion', String(Opcion));
    return this.http.post(url, Tipo , {params}).toPromise();
  }
  
}
