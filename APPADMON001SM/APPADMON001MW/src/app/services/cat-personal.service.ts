import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.APPADMON01MW + 'CatPersonal/';
@Injectable({
  providedIn: 'root'
})
export class CatPersonalService {

  constructor(public http : HttpClient ) { }

  getTpoCargo(): any {
    const url = URL + 'getTpoCargo';
    return this.http.get(url);
  }

  getTpoUsuario(): any {
    const url = URL + 'getTpoUsuario';
    return this.http.get(url);
  }

  getPaises(): any {
    const url = URL + 'getPaises';
    return this.http.get(url);
  }

  getEstados(idpais:any){
    const url = URL + 'getEstados';
    const params = new HttpParams()
      .append('idpais', idpais)
    return this.http.get(url, { params });
  }

  getMunicipios(idestado:any){
    const url = URL + 'getMunicipios';
    const params = new HttpParams()
      .append('idestado', idestado)
    return this.http.get(url, { params });
  }

  getUsuarios(usuario:any){
    const url = URL + 'getUsuarios';
    const params = new HttpParams()
      .append('usuario', usuario)
    return this.http.get(url, { params });
  }

  GuardarUsuario(Datos: any): any {
    const url = URL + "GuardarUsuario";
    return this.http.post(url, Datos);
  }

  EditarUsuario(Datos: any): any {
    const url = URL + "EditarUsuario";
    return this.http.post(url, Datos);
  }

  
  EliminarUsuario(Datos: any): any {
    const url = URL + "EliminarUsuario";
    return this.http.post(url, Datos);
  }
}
