import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppsDisponiblesService } from '../../../../../services/appsdisponibles.service';
import swal from 'sweetalert2';
import { aplicaciones } from 'src/app/models/Aplicaciones';
import { encabezados } from 'src/app/models/Encabezados';
import Swal from 'sweetalert2';

@Component({
  selector: 'mdlappsadministra',
  templateUrl: './mdlappsadministra.component.html',
  styleUrls: ['./mdlappsadministra.component.css']
})
export class mdlAppsadministraComponent implements OnInit {

  lstSistemas = [];
  filtroSistemas: number = 0;

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlAdministraApps') mdlAdministra: any;
  modalRef: NgbModalRef;
  modalname = 'Agregar';

  //Parametros Modal
  nomEncabezado = '';
  tipoCapturaNombre = '';
  tipoCaptura = true;
  opcion = 0;
  //Para Encabezado tipoCaptura = true
  idSistemaMod = 0;
  idEncabezado
  icono = '';
  //Para catalogo tipoCaptura = false
  idOpcion = 0;
  //General
  titulo = '';
  ruta = '';

  constructor(private modalService: NgbModal, private service: AppsDisponiblesService) { }

  ngOnInit(): void {
    this.getSistemas();
  }
  async getSistemas() {
    let data = await this.service.getSistemas();
    if (data) {
      this.lstSistemas = data.data;
      // console.log(this.lstEncabezados);
    }
  }
  openModalAdd(){
    if (this.tipoCaptura === true){
      this.modalRef = this.modalService.open(this.mdlAdministra, {
        size: 'md',
        backdrop : 'static',
        keyboard : false
      });
    }else{
      this.modalRef = this.modalService.open(this.mdlAdministra, {
        size: 'md',
        backdrop : 'static',
        keyboard : false
      });
    }
   
    this.tipoModal();
    this.modalRef.result.then(() =>{})
  }
  async tipoModal() {
    if (this.tipoCaptura === true) {
      if (this.tipoCapturaNombre === 'A') {
        this.modalname = 'Agregar Encabezado';
        this.opcion = 1;
      } else if (this.tipoCapturaNombre === 'E') {
        this.modalname = 'Modificar Encabezado';
        this.opcion = 2;
      }
    } else if (this.tipoCaptura === false) {
      if (this.tipoCapturaNombre === 'A') {
        this.modalname = 'Nueva Opcion para ' + this.nomEncabezado;
        this.opcion = 5;
      } else if (this.tipoCapturaNombre === 'E') {
        this.modalname = 'Modificar ' + this.titulo;
        this.opcion = 6;
      }
    }
  }
  changeIcon(e){
    this.icono = e
  }
  closeModal() {
    //Parametros Modal
    this.opcion = 0;
    this.tipoCapturaNombre = '';
    this.tipoCaptura = true;
    //Para Encabezado tipoCaptura = true
    this.idSistemaMod = 0;
    this.idEncabezado = 0;
    this.icono = '';
    //Para catalogo tipoCaptura = false
    this.idOpcion = 0;
    //General
    this.titulo = '';
    this.ruta = '';
    this.onClose.emit(true);
    this.modalRef.close();

  }
  async saveInfo() {

    if (this.tipoCaptura === true) {
      if (this.idSistemaMod = 0) {
        swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
        return;
      }
      if (!this.icono || !this.titulo || !this.ruta) {
        swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
        return;
      }
      const encabezado = {
        idSistema: this.idSistemaMod,
        idEncabezado: this.idEncabezado,
        encabezado: this.titulo,
        ruta: this.ruta,
        icono: this.icono,
      }

      try {
        let data = await this.service.postEncabezado(this.opcion, encabezado);
        if(!data.data){
          swal.fire("Error", "Ocurrio un error", 'error');
          return;
        }
        Swal.fire('Correcto', `Se ha ${this.opcion === 5 ? 'Guardado' : 'Modificado'} el encabezado`, 'success');
        // swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' )
        this.closeModal();
      } catch (error) {
        swal.fire("Error", "Ocurrio un error " + error.error , 'error');
          return;
      }
    } 
    else if (this.tipoCaptura === false) {
      if (!this.titulo || !this.ruta) {
        swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
        return;
      }
      const aplicacion = {
        idEncabezado: this.idEncabezado,
        idOpcion: this.idOpcion,
        tituloOpcion: this.titulo,
        subRuta: this.ruta,
      }

      try {

        let data = await this.service.postAplicaciones(this.opcion, aplicacion);
        if(!data.data){
          swal.fire("Error", "Ocurrio un error", 'error');
          return;
        }
        // swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' )
        Swal.fire('Correcto', `Se ha ${this.opcion === 1 ? 'Guardado' : 'Modificado'} el encabezado`, 'success');

        this.closeModal();
      } catch (error) {
        swal.fire("Error", "Ocurrio un error " + error.error , 'error');
          return;
      }
    }
  }
}
