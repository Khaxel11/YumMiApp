// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
// import { Observable } from 'rxjs';

// const URL_USUARIOERP = environment.ERPGRALAPI001 + 'UsuariosERP/';
// const URL_ZONA = environment.ERPGRALAPI001 + 'Zona/';

// @Injectable({
//   providedIn: 'root'
// })

// export class ERPService {

//   constructor(public http: HttpClient) { }

//   ListarUsuariosERP(par: any, fil: any): Observable<any> {
//     const url = URL_USUARIOERP + 'Listar';

//     const params = new HttpParams()
//       .append('startRow', par.startRow)
//       .append('endRow', par.endRow)
//       .append('filtro', fil);
//     return this.http.get(url, {params});
//   }

//   ListarUsuarioERP(par: any, fil: any): any {
//     const url = URL_USUARIOERP + 'ListarDatosExtras';
//     const params = new HttpParams()
//       .append('startRow', par.startRow)
//       .append('endRow', par.endRow)
//       .append('Filtro', fil.filtro)
//       .append('DepartamentoId', fil.DepartamentoId);
//     return this.http.get(url, { params });
//   }

//   ListarZona(): any {
//     const url = URL_ZONA + 'ListarZona';
//     return this.http.get(url);
//   }
// }
