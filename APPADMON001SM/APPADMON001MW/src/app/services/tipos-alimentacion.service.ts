import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON01MW + 'TiposAlimentacion/';

@Injectable({
  providedIn: 'root'
})
export class TiposAlimentacionService {

  constructor(public http : HttpClient) { }

  getTiposAlimentacion(Filtro : string, IdTipoUsuario: number) : Promise<any>{
    const url = URL + 'getTiposAlimentacion';
    const params = new HttpParams()
      .append('Filtro', Filtro)
      .append('IdTipoUsuario', String(IdTipoUsuario));
    return this.http.get(url ,{params}).toPromise();
  }
}
