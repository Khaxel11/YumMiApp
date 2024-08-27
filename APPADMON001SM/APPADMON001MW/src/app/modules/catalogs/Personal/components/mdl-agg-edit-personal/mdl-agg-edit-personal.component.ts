import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CatPersonalService } from '../../../../../services/cat-personal.service';
import Swal from 'sweetalert2';
import { DtsUsuario } from '../../../../../models/DtsUsuario';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-mdl-agg-edit-personal',
  templateUrl: './mdl-agg-edit-personal.component.html',
  styleUrls: ['./mdl-agg-edit-personal.component.css']
})
export class MdlAggEditPersonalComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlAggEdit') mdlAggEdit: any;
  modalRef: NgbModalRef;
  modalname = ' ';
  opcion: number = 1;
  passwordEnabled: boolean = false;
  passwordChecked: boolean = false;

  Pais: any[] = [];
  Estado: any[] = [];
  Municipio: any[] = [];
  TpoCargo: any[] = [];
  TpoUsuario: any[] = [];
  usu: any[] = [];

  DtsUsuario = new DtsUsuario();
  showError: boolean;
  contraseniaOculta:string = '123456'
  constructor(private modalService: NgbModal, public Servicio: CatPersonalService) { }

  ngOnInit(): void {
    this.TiposDeCargo();
    this.TiposDeUsuarios();
    this.Paises();
  }

  openModal() {
    this.modalRef = this.modalService.open(this.mdlAggEdit, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });

    this.modalRef.result.then(() => { })
  }

  closeModal() {
    this.onClose.emit(true);
    this.modalRef.close();
    this.LimpiarDts();

  }

  async TiposDeCargo(): Promise<void> {
    try {
      const datos = await this.Servicio.getTpoCargo().toPromise();
      if (datos.data.length > 0) {
        this.TpoCargo = datos.data;
      }
    } catch (error) {
      this.MsgError(error, 'Obtener los tipos de cargo')
      throw error;
    }
  }

  async TiposDeUsuarios(): Promise<void> {
    try {
      const datos = await this.Servicio.getTpoUsuario().toPromise();
      if (datos.data.length > 0) {
        this.TpoUsuario = datos.data;
      }
    } catch (error) {
      this.MsgError(error, 'Obtener los tipos de usuario')
      throw error;
    }
  }

  async Paises(): Promise<void> {
    try {
      const datos = await this.Servicio.getPaises().toPromise();
      if (datos.data.length > 0) {
        this.Pais = datos.data;
        this.Estados(this.Pais[0].idpais);
      }
    } catch (error) {
      this.MsgError(error, 'Obtener Paises')
      throw error;
    }
  }

  onEstado() {
    this.Estados(this.DtsUsuario.SelectPais);
  }

  async Estados(idpais: any): Promise<void> {
    try {
      const datos = await this.Servicio.getEstados(idpais).toPromise() as { data: any };
      if (datos.data.length > 0) {
        this.Estado = datos.data;
        this.Municipios(this.Estado[0].idestado);
      }
    } catch (error) {
      this.MsgError(error, 'Obtener Estado')
      throw error;
    }
  }

  onMunicipio() {
    this.Municipios(this.DtsUsuario.SelectEstado);
  }

  async Municipios(idestado: any): Promise<void> {
    try {
      const datos = await this.Servicio.getMunicipios(idestado).toPromise() as { data: any };
      if (datos.data.length > 0) {
        this.Municipio = datos.data;
      }
    } catch (error) {
      this.MsgError(error, 'Obtener Estado')
      throw error;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          this.DtsUsuario.imageSrc = reader.result; // Almacenar la imagen como base64
        } else {
          console.error('El resultado del lector no es una cadena.');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.DtsUsuario.imageSrc = null;
  }

  togglePasswordChange(): void {
    if (this.passwordChecked) {
      Swal.fire({
        title: '¿Seguro quieres cambiar la contraseña?',
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, cambiar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.passwordEnabled = true;
          this.DtsUsuario.password = '';
          this.contraseniaOculta = null;
        } else {
          this.passwordChecked = false;
          this.passwordEnabled = false;
        }
      });
    } else {
      this.passwordEnabled = false;
    }
  }

  updatePassword(event: any): void {
    this.DtsUsuario.password = event.target.value;
  }
  
  //SECTION - GUARDAR - EDITAR - ELIMINAR ---------------------------------------------------------------------------------------
  btnGuardar() {
    this.showError = true;
    const todosCamposLlenos = this.DtsUsuario.nombre && this.DtsUsuario.ApellPaterno &&
      this.DtsUsuario.ApellMaterno && this.DtsUsuario.FechaNac &&
      this.DtsUsuario.SelectPais && this.DtsUsuario.SelectEstado &&
      this.DtsUsuario.SelectMunicipio && this.DtsUsuario.usuario &&
      this.DtsUsuario.password && this.DtsUsuario.correo &&
      this.DtsUsuario.SelectTpoCargo && this.DtsUsuario.SelectTpoUsuario;

    const imagenValida = this.DtsUsuario.imageSrc;

    if (todosCamposLlenos && imagenValida) {
      if (this.opcion === 1) {
        this.Guardar();
      } else if (this.opcion === 2) {
        this.Editar();
      }
    } else {
      Swal.fire('Falta capturar algunos datos','','warning');
    }
  }


  async Guardar(): Promise<void> {
    const hashedPassword = sha256(this.DtsUsuario.password);
    const base64Data = this.DtsUsuario.imageSrc.split(',')[1]; // Esto elimina el encabezado y deja solo los datos base64

    const Datos = {
      usuario: this.DtsUsuario.usuario,
      nombre: this.DtsUsuario.nombre,
      apellpaterno: this.DtsUsuario.ApellPaterno,
      apellmaterno: this.DtsUsuario.ApellMaterno,
      idcargo: +this.DtsUsuario.SelectTpoCargo,
      idtipousuario: +this.DtsUsuario.SelectTpoUsuario,
      password: hashedPassword,
      correo: this.DtsUsuario.correo,
      fechanac: this.DtsUsuario.FechaNac,
      idpais: +this.DtsUsuario.SelectPais,
      idestado: +this.DtsUsuario.SelectEstado,
      idmunicipio: +this.DtsUsuario.SelectMunicipio,
      foto: base64Data,
      nomcompleto: `${this.DtsUsuario.nombre} ${this.DtsUsuario.ApellPaterno} ${this.DtsUsuario.ApellMaterno}`
    };

    try {
      const data = await this.Servicio.GuardarUsuario(Datos).toPromise();
      if (data && data.correcto) {
        await Swal.fire('Guardado', 'Se Guardo correctamente', 'success').then((result) => {
          if (result.isConfirmed) {
            this.closeModal();
          }
        });
      } else {
        this.MsgError(data ? data.mensaje : '', 'Guardar los datos');
      }
    } catch (error) {
      this.MsgError(error, 'Guardar los datos');
    }
  }

  async Editar(): Promise<void> {
    const base64Data = this.DtsUsuario.imageSrc.split(',')[1]; 
    let hashedPassword; 
    if(this.passwordEnabled){
      hashedPassword = sha256(this.DtsUsuario.password); 
    }else{
      hashedPassword = this.DtsUsuario.password;
    }

    const Datos = {
      usuario: this.DtsUsuario.usuario,
      nombre: this.DtsUsuario.nombre,
      apellpaterno: this.DtsUsuario.ApellPaterno,
      apellmaterno: this.DtsUsuario.ApellMaterno,
      idcargo: +this.DtsUsuario.SelectTpoCargo,
      idtipousuario: +this.DtsUsuario.SelectTpoUsuario,
      password: String(hashedPassword),
      correo: this.DtsUsuario.correo,
      fechanac: this.DtsUsuario.FechaNac,
      idpais: +this.DtsUsuario.SelectPais,
      idestado: +this.DtsUsuario.SelectEstado,
      idmunicipio: +this.DtsUsuario.SelectMunicipio,
      foto: base64Data,
      nomcompleto: `${this.DtsUsuario.nombre} ${this.DtsUsuario.ApellPaterno} ${this.DtsUsuario.ApellMaterno}`,
      idusuario: this.DtsUsuario.idusuario
    };

    try {
      const data = await this.Servicio.EditarUsuario(Datos).toPromise();
      if (data && data.correcto) {
        await Swal.fire('Guardado', 'Se edito correctamente', 'success').then((result) => {
          if (result.isConfirmed) {
            this.closeModal();
          }
        });
      } else {
        this.MsgError(data ? data.mensaje : '', 'Editar los datos');
      }
    } catch (error) {
      this.MsgError(error, 'Editar los datos');
    }
  }

  //!SECTION - GUARDAR - EDITAR - ELIMINAR  ---------------------------------------------------------------------------------------------------------

  LimpiarDts() {
    this.passwordEnabled = false;
    this.contraseniaOculta = 'ContraseniaOculta';
    Object.assign(this.DtsUsuario, {
      nombre: null,
      ApellMaterno: null,
      ApellPaterno: null,
      FechaNac: null,
      SelectPais: null,
      SelectEstado: null,
      SelectMunicipio: null,
      usuario: null,
      correo: null,
      SelectTpoCargo: null,
      SelectTpoUsuario: null,
      password: null,
      imageSrc: null,
      idusuario: null
    });
  }

  MsgError(error: any, mensaje: string) {
    Swal.fire('Datos', `Ha ocurrido un error (${mensaje}). Favor de comunicarse con el área de informática y generar un reporte de fallas. Código de error: ${error.error}`, 'error');
    throw error;
  }
}
