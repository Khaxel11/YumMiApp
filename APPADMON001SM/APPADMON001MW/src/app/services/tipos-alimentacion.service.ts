import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON001MW + 'CatTipoAlimentacion/';

@Injectable({
  providedIn: 'root'
})
export class TiposAlimentacionService {

  constructor(public http : HttpClient) { }
  
  getTipoAlimentacion(Filtro : string) : Promise<any>{
    const url = URL + 'getTipoAlimentacion';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  controlTipoAlimentacion(Opcion : number, TipoAlimentacion : any) : Promise<any>{
    const url = URL + 'controlTipoAlimentacion';
    const params = new HttpParams()
      .append('Opcion', String(Opcion));
    return this.http.post(url , TipoAlimentacion , {params}).toPromise();
  }
}
