
import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.APPADMON01MW + 'Categorias/';

@Injectable({
  providedIn: 'root'
})
export class CatcategoriasService {

  constructor(public http : HttpClient ) { }

  getCategorias(Filtro : string) : Promise<any>{
    const url = URL + 'getCategorias';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  controlCategorias(Opcion : number, Categorias : any) : Promise<any>{
    const url = URL + 'controlCategorias';
    const params = new HttpParams()
      .append('Opcion', String(Opcion))
      .append('IdUsuario', '000100');
      return this.http.post(url , Categorias, {params}).toPromise();
  }

}

