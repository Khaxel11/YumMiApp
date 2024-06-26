import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const URL = environment.APPFOODAPI001 + 'Programation/';
import { LogUser } from '../../models/LogUser'
import { Programation } from 'src/app/models/Programation';

@Injectable({
  providedIn: 'root'
})
export class ProgramationService {

  constructor(public http: HttpClient) { }

  programProduct(Opcion : number, programation : Programation) : Promise<any>{
    const url = URL + 'programProduct';
    const params = new HttpParams()
    .append('Opcion', String(Opcion))
    .append('IdCuenta', localStorage.getItem("idCuenta"))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url, programation ,{ params, headers }).toPromise();
  }

  getFechasProgramadas(fecha : string, filtros : any) : Promise<any>{
    const url = URL + 'getFechasProgramadas';
    const params = new HttpParams()
    .append('Fecha',fecha)
    .append('TipoFiltro', String(filtros.valueClasificacion))
    .append('idFoodHub', String(filtros.valueFoodHub))
    .append('idLugar', String(filtros.itemEstado))
    .append('IdCuenta', localStorage.getItem("idCuenta"))
    .append('IdProducto', String(filtros.valueProducto))
    .append('IdCategoria', String(filtros.valueCategoria))
    .append('IdTipoAlimentacion',String(filtros.valueTipoAlimentacion))
   
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.get(url, { params, headers }).toPromise();
  }
  confirmFecha(IdFechaProgramada : number, IdProgramacion : number) : Promise<any>{
    const url = URL + 'confirmFecha';
    const params = new HttpParams()
    .append('IdFechaProgramada', String(IdFechaProgramada))
    .append('IdProgramacion', String(IdProgramacion))
    const headers = new HttpHeaders().set('ngrok-skip-browser-warning', '51197');
    return this.http.post(url, "" ,{ params, headers }).toPromise();
  }
}
