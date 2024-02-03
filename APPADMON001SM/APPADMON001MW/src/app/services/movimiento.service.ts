import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
//import { environment } from 'src/environments/environment';
import { environment } from '../../../src/environments/environment.prod';
import { Observable } from 'rxjs';
const URL_USUARIOERP = environment.AMDCCOBAPI001;
@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  constructor(public http: HttpClient) { }

  listarMovimientos(par: any,fil: any): any {
    const url = URL_USUARIOERP + 'TipoMovimiento/getTipoMovimientos';
    const params = new HttpParams()
      .append('startRow', par.startRow)
      .append('endRow', par.endRow)
      .append('filtro', fil.filtro)
    return this.http.get(url, { params });
  }

  listarTipoMovimientosById(id: any): any {
    const url = URL_USUARIOERP + 'TipoMovimiento/getTipoMovimientosById';
    const params = new HttpParams()
      .append('id', id)
    return this.http.get(url, { params });
  }

  guardarTipoMovimiento(objEntity): any {
    const url = URL_USUARIOERP+ 'TipoMovimiento/GuardarTipoMovimiento';

    return this.http.post(url,objEntity);
  }

  editarTipoMovimiento(objEntity): any {
    const url = URL_USUARIOERP+ 'TipoMovimiento/EditarTipoMovimiento';

    return this.http.post(url,objEntity);
  }

  urlReporte(): Observable<Object>{
    const url = URL_USUARIOERP + 'TipoMovimiento/getURLReporte';

    return this.http.get(url);
  }

  formasPago(): Observable<Object>{
    const url = URL_USUARIOERP + 'TipoMovimiento/getFormasPago';

    return this.http.get(url);
  }
}
