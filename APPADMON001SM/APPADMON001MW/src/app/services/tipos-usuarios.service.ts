
import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.APPADMON001MW + 'TiposUsuarios/';

@Injectable({
  providedIn: 'root'
})
export class TiposUsuariosService {

  constructor(public http : HttpClient) { }
  
  getTiposUsuarios(Filtro : string) : Promise<any>{
    const url = URL + 'getTiposUsuarios';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  controlTiposUsuarios(Opcion : number, Tipos : any) : Promise<any>{
    const url = URL + 'controlTiposUsuarios';
    const params = new HttpParams()
      .append('Opcion', String(Opcion));
    return this.http.post(url , Tipos , {params}).toPromise();
  }
}
