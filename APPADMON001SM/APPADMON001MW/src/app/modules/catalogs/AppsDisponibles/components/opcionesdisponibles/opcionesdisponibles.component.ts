import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppsDisponiblesService } from '../../../../../services/appsdisponibles.service';
import swal from 'sweetalert2';
import { aplicaciones } from 'src/app/models/Aplicaciones';
import { encabezados } from 'src/app/models/Encabezados';
import { mdlAppsadministraComponent } from '../../components/mdlappsadministra/mdlappsadministra.component';

@Component({
  selector: 'opcionesdisponibles',
  templateUrl: './opcionesdisponibles.component.html',
  styleUrls: ['./opcionesdisponibles.component.css']
})
export class OpcionesDisponiblesComponent implements OnInit {
  
  @ViewChild('mdlAdministraApps') public mdlAdministra : mdlAppsadministraComponent;
  @Output() onClose = new EventEmitter<any>();

  @ViewChild('disponiblesApps') mdlOpciones: any;

  modalRef: NgbModalRef;
  modalRefDispobiles: NgbModalRef;
  modalnameOpciones = 'Agregar';
  modalname = 'Agregar';
  
  columnsAplicaciones: any;
  lstAplicaciones: aplicaciones[] = [];
  
  filtroEncabezado: number = 0;
  nombreEncabezado: string= '';

  lstSistemas = [];
  ordenEna = 0;
  filtro: string = null;
  filtroSistemas: number = 0;
  nombresistema: string = "";

  constructor(private modalService: NgbModal, private service: AppsDisponiblesService) { 
    this.columnsAplicaciones = [
      {
        headerName: '#',
        field: 'orden',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Titulo',
        field: 'tituloOpcion',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'SubRuta',
        field: 'subRuta',
        flex: 8,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.editAplicaciones.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.deleteAplicaciones.bind(this),
          label: '<i class="fa fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true
      },
      {
        headerName: 'Orden',
        field: '',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center',
        rowDrag: true,
        // cellRenderer:'<i class="fa fa"></i>' 
      },
    ]
  }

  ngOnInit(): void {
    
  }
  //Del mismo Modal
  openModalAddOpciones(){
    this.modalnameOpciones = 'Opciones disponibles para ' + this.nombreEncabezado + ' de APPADMON001MW';
    this.getAppsDisponibles();
    this.modalRefDispobiles = this.modalService.open(this.mdlOpciones, {
      size: 'xl',
      backdrop : 'static',
      keyboard : false
    });
    this.modalRefDispobiles.result.then(() =>{})
  }
  closeModalOpciones() {
    //Parametros Modal
    // this.opcion = 0;
    // this.tipoCapturaNombre = '';
    // this.tipoCaptura = true;
    // //Para Encabezado tipoCaptura = true
    // this.idSistemaMod = 0;
    // this.idEncabezado = 0;
    // this.icono = '';
    // //Para catalogo tipoCaptura = false
    // this.idCatalogo = 0;
    // //General
    // this.titulo = '';
    // this.ruta = '';
    this.lstAplicaciones = [];
    this.onClose.emit(true);
    this.modalRefDispobiles.close();

  }
  editAplicaciones(e: any) {
    // this.mdlAdministra.opcion = 2;
    this.mdlAdministra.tipoCapturaNombre = 'E';
    this.mdlAdministra.idEncabezado = e.data.idEncabezado;
    this.mdlAdministra.titulo = e.data.tituloOpcion;
    this.mdlAdministra.ruta = e.data.subRuta;
    this.mdlAdministra.idOpcion = e.data.idOpcion;
    this.openModal();
  }
  deleteAplicaciones(e: any) {
    swal.fire({
      icon: 'question',
      title: 'Aviso',
      html: '¿Desea eliminar la aplicacion <strong>' + e.data.nombreAplicaciones + '</strong>?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dropOpciones(e);
      }
    });
  }
  async dropOpciones(e: any) {
    try {
      let data = await this.service.getEncabezados('sale');
      if (!data.data) {
        swal.fire("Error", "Ha ocurrido un error", 'error');
        return;
      }
      swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning');
      this.getAppsDisponibles();
    } catch (error) {
      swal.fire("Error", "Ha ocurrido un error", 'error');
    }
  }
  async getAppsDisponibles() {

    try {
      let data = await this.service.getAplicaciones(this.filtroEncabezado.toString());
      if (!data) {
        swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      if (data.data) {
        this.lstAplicaciones = data.data;
      }
    } catch (error) {
      swal.fire("Error", "Ocurrio un error: " + error.message, 'error');
    }
  }
  onCloseModal(e: any) {
    this.getAppsDisponibles();
  }
  addOpciones(){
    // this.mdlAdministra.opcion = 1;
    this.mdlAdministra.idEncabezado = this.filtroEncabezado;
    this.mdlAdministra.nomEncabezado = this.nombreEncabezado;
    this.mdlAdministra.tipoCapturaNombre = 'A';
    this.openModal();
  }
  //Del mismo Modal
  //MODAL ADMINISTRAR
  openModal() {
    this.mdlAdministra.tipoCaptura=false;
    this.mdlAdministra.openModalAdd();
  }
  OrderChange(newOrder: { idRegistro: number, orden: number }[]): void {
    console.log('Nuevo orden detectado:', newOrder);
  }
}
