import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON01MW + 'CatPromos/';

@Injectable({
  providedIn: 'root'
})
export class PromocionesService {


  constructor(public http : HttpClient) { }

  getPromos(Filtro : string) : Promise<any>{
    const url = URL + 'getPromos';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  controlPromos(Opcion : number, Tipos : any) : Promise<any>{
    const url = URL + 'controlPromos';
    const params = new HttpParams()
      .append('Opcion', String(Opcion));
    return this.http.post(url , Tipos , {params}).toPromise();
  }

  

  
}
