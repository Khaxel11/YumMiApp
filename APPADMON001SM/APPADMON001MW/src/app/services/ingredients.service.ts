import { Injectable } from '@angular/core';
import  { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const URL = environment.APPADMON001MW + 'Ingredients/';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(public http : HttpClient) { }
  getIngredients(Filtro : string) : Promise<any>{
    const url = URL + 'getIngredients';
    const params = new HttpParams()
      .append('Filtro', Filtro);
    return this.http.get(url ,{params}).toPromise();
  }

  controlIngredients(Opcion : number, model : any) : Promise<any>{
    const url = URL + 'controlIngredients';
    const params = new HttpParams()
      .append('Opcion', String(Opcion));
    return this.http.post(url , model , {params}).toPromise();
  }


}
