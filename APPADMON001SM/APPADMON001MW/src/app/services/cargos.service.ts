import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const URL = environment.APPADMON01MW + 'Cargos/';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  constructor(public http : HttpClient ) { }

  getCargos(Filtro : string) : Promise<any>{
    const url = URL + 'getCargos';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }
  controlCargos(Opcion : number, Cargos : any) : Promise<any>{
    const url = URL + 'controlCargos';
    const params = new HttpParams()
      .append('Opcion', String(Opcion))
      .append('IdUsuario', '000100');
      return this.http.post(url , Cargos, {params}).toPromise();
  }
}



