import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { saveAs } from 'file-saver';

const URL_ARCHIVOS = environment.URLApiArchivosLocal + '/api/Archivos/';
@Injectable({
  providedIn: 'root'
})
export class FTPServiceService {

  private ftpPath: string;
  private port : number;
  private user : string;
  private password : string;
  private server : string;
  public setConfigFTP(server : string, user : string, password : string, ftpPath : string, port : number ) { 
    this.server = server;
    this.user = user;
    this.password = password;
    this.ftpPath = ftpPath;
    this.port = port;

  }
  public urlImagen: string | SafeResourceUrl =
  'assets/img/user/user-default.png';

constructor(public http: HttpClient, private domSanitizer: DomSanitizer) {}

obtenerImagen(
  idDocumento: number,
  Configuracion: any,
  onCorrect?: (res: string | any) => void,
  onError?: (rej: { message: string; error: any }) => void
): void {
  const url = URL_ARCHIVOS + 'Descargar';
  const params = new HttpParams()
  .append('TipoSistema', Configuracion.TipoSistema)
  .append('IdDocumento', idDocumento.toString())
  .append('Modulo', Configuracion.Modulo)
  .append('Zona', Configuracion.Zona);

  this.http.get(url, { params, responseType: 'blob' }).subscribe(
    (res: Blob) => {
      this.urlImagen = this.domSanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(res)
      );
      if (onCorrect) {
        onCorrect(res);
      }
    },
    (error: any) => {
      if (onError) {
        onError({ message: 'Error obteniendo Imagen.', error });
      }
    }
  );
}

Descargar(
  idDocumento: number,
  Configuracion: any,
  NombreOriginal: string,
  onCorrect?: (res: string | SafeResourceUrl) => void,
  onError?: (rej: { message: string; error: any }) => void
): void {
  const url = URL_ARCHIVOS + 'Descargar';
  const params = new HttpParams()
    .append('TipoSistema', Configuracion.TipoSistema)
    .append('IdDocumento', idDocumento.toString())
    .append('Modulo', Configuracion.Modulo)
    .append('Zona', Configuracion.Zona);

  this.http.get(url, { params, responseType: 'blob' }).subscribe(
    (res: Blob) => {
      saveAs(res, NombreOriginal);
      if (onCorrect) {
        onCorrect('Correcto !');
      }
    },
    (error: any) => {
      if (onError) {
        onError({ message: 'Error obteniendo Imagen.', error });
      }
    }
  );
}

}
