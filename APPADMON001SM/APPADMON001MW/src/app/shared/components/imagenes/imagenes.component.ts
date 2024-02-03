import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  HostListener,
  Input,
} from '@angular/core';
import { NgccsArchivosComponent } from 'ngccs-archivos';
import swal from 'sweetalert2';

interface Configuracion {
  Modulo: string;
  TipoSistema: string;
  UsuarioERP: string;
  UrlApi: string;
  Adicionales: string;
  Zona: string;
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'img-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
})
export class ImagenesComponent implements OnInit {
  @ViewChild('IdSubirArchivos', { static: true }) SubirArchivoss: any;
  @ViewChild('Archivos', { static: false }) Archivos: NgccsArchivosComponent;
  public imagePath;
  cambiaImagen = false;
  imgURL: string | ArrayBuffer;
  public message: string;
  imgName = '';
  letraStyle;
  @Output() dataChange = new EventEmitter<any>();
  Confi;
  @Input() set Configuracion(value: any) {
    this.Confi = value;
  }
  @Input() Mostrar = true;
  @HostListener('change') ChangedeImagen(eventData: Event): void {
    this.Verimagen(this.Archivos.Archivo);
    this.cambiaImagen = true;
  }
  constructor() {}

  ngOnInit(): void {}

  private Verimagen(files): void {
    this.limpiar();
    const mimeType = files.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Solo soporta archivos tipo imagen';
      return;
    }
    /*this.imgName = '   ' + files.name;
    if (this.imgName.length > 30) {
      this.letraStyle = 'tamañoLetraPequeño';
    } else {
      this.letraStyle = 'tamañoLetraNormal';
    }*/
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.dataChange.emit(files);
    };
  }
  CargarImagen(file): void {
    this.Archivos.Archivo = file;
    this.Verimagen(file);
  }
  guardar(
    onCorrect?: (res: string | any) => void,
    onError?: (rej: { message: string; error: any }) => void
  ): void {
    if (this.Archivos.Archivo) {
      this.Archivos.subirArchivo()
        .then((result) => {
          if (
            result['body'].error === undefined ||
            result['body'].error === false
          ) {
            const obj = {
              idDocumento: result['body'].id,
              nombreDocumento: this.Archivos.Archivo.name,
              tipoSistema: this.Confi.TipoSistema,
              modulo: this.Confi.Modulo,
              zona: this.Confi.Zona,
            };

            if (onCorrect) {
              onCorrect(obj);
            }
          } else {
            swal.fire(
              'Ha Ocurrio un Error',
              'Ha Ocurrio un Error al Momento de Guardar la Imagen, Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas, <strong>Código de Error: </strong>',
              'error'
            );
          }
        })
        .catch((e) => {
          console.error('Error subir archivo', e);
          onError({message: 'Error subir archivo', error : e});
        });
    }
  }
  limpiar(): void {
    this.message = '';
    this.imgURL = '';
    this.imgName = '';
  }
}
