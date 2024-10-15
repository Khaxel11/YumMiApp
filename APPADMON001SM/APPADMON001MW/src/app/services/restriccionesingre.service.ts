import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { clsIngredient } from '../modules/catalogs/Ingredients/models/clsIngredients';

const URL = environment.APPADMON001MW + 'RestricionAlimentacion/';

@Injectable({
  providedIn: 'root'
})
export class RestriccionesingreService {

  constructor(public http : HttpClient) { }
  
  getTiposAlimentacionCbo(Filtro : string) : Promise<any>{
    const url = URL + 'getTiposAlimentacionCbo';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }
  getRestriccionesConTotalIngredientes(Filtro : string) : Promise<any>{
    const url = URL + 'getRestriccionesConTotalIngredientes';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  getIngredientes(Filtro : string) : Promise<any>{
    const url = URL + 'getIngredientes';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  getRestriciones(id : any, opc:any) : Promise<any>{
    const url = URL + 'getRestriciones';
    const params = new HttpParams()
      .append('id', id)
      .append('opc', opc);
    return this.http.get(url ,{params}).toPromise();
  }



  controlRestriccionIngredients(lst: any[], opc: any, id:any): Promise<any> {
    const url = URL + `controlRestriccionIngredients/${opc}/${id}`; 
  
    // Construir el objeto que se enviará en el cuerpo de la solicitud
    const data = {
      lstIngredients: lst,
    };
  
    return this.http.post(url, data).toPromise(); // Enviar el objeto en el cuerpo de la solicitud
  }

  eliminarIngrediente(idTipoAlim:any,idIngre:any,idRestri:any) : Promise<any>{
    const url = URL + 'eliminarIngrediente';
    const params = new HttpParams()
      .append('idTipoAlim', idTipoAlim)
      .append('idIngre', idIngre)
      .append('idRestri', idRestri);
    return this.http.get(url, {params}).toPromise();
  }

  eliminarRestriccion(idTipoAlim:any): Promise<any>{
    const url = URL + 'eliminarRestriccion';
    const params = new HttpParams()
      .append('idTipoAlim', idTipoAlim);
    return this.http.get(url, {params}).toPromise();
  }



  


}