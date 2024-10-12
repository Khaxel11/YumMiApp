import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const URL = environment.APPADMON001MW + 'OpcMenuCargo/';


@Injectable({
  providedIn: 'root'
})
export class OpcMenuCargoService {

  constructor(public http : HttpClient) { }

  getOpcMenuCargo() : Promise<any>{
    const url = URL + 'getOpcMenuCargo';
    return this.http.get(url).toPromise();
  }

  getOpcPorCargo(IdCargo : number) : Promise<any>{
    const url = URL + 'getOpcPorCargo';
    const params = new HttpParams()
      .append('IdCargo', String(IdCargo));
    return this.http.get(url ,{params}).toPromise();
  }

  getOpciones() : Promise<any>{
    const url = URL + 'getOpciones';
    return this.http.get(url).toPromise();
  }

  postGuardarOpciones(IdCargo: number, Datos: any ): Promise<any> {
    const url = URL + "postGuardarOpciones";
    const params = new HttpParams().append('IdCargo', String(IdCargo));
    return this.http.post(url, Datos, { params }).toPromise();
  }

  eliminarOpciones(Opcion: number,  IdCargo: number, idOpcion: number): Promise <any> {
    const url = URL + 'eliminarOpciones'; 
    const params = new HttpParams()
      .append('Opcion', String(Opcion))
      .append('IdCargo', String(IdCargo))
      .append('idOpcion', String(idOpcion))
    return this.http.post(url, "", { params }).toPromise();;
  }
  
  // eliminarOpciones(Opcion : number, IdCargo : number, idOpcion:number) : Promise<any>{
  //   const url = URL + 'detetePorIdCargo';
  //   const params = new HttpParams()
  //     .append('Opcion', String(Opcion));
  //   return this.http.post(url , "" , {params}).toPromise(); IdCargo: number,
  // }


}
