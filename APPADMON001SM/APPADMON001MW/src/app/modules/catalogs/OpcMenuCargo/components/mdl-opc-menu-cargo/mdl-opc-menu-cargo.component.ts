import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OpcMenuCargoService } from '../../../../../services/opc-menu-cargo.service';
import { MdlDetalleOpcMenuCargoComponent } from "../mdl-detalle-opc-menu-cargo/mdl-detalle-opc-menu-cargo.component";
import Swal from 'sweetalert2';;

@Component({
  selector: 'app-mdl-opc-menu-cargo',
  templateUrl: './mdl-opc-menu-cargo.component.html',
  styleUrls: ['./mdl-opc-menu-cargo.component.css']
})
export class MdlOpcMenuCargoComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();

  @ViewChild('mdlCapturaOpcMenuCargo') mdlCapturaOpcMenuCargo: any;
  @ViewChild('mdlDetalleOpcMenuCargo') mdlDetalleOpcMenuCargo: any;

  readonly moduleName = "Modal Captura";


  modalRef: NgbModalRef;
  // modalname = 'Agregar';

  opciones: number = 1;

  columnsOpcPorCargo: any;
  listaOpcPorCargo = [];

  idOpcion: number;
  descripcion: string;
  IdCargo: number;


  constructor(private modalService: NgbModal, private service: OpcMenuCargoService) { }

  ngOnInit(): void {
    this.loadColums();

  }

  recargar(event: any) {
    this.getOpcPorCargo();

  }

  openModal() {
    this.modalRef = this.modalService.open(this.mdlCapturaOpcMenuCargo, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });

    this.modalRef.result.then(() => { })
  }
  closeModal() {

    this.onClose.emit(true);
    this.modalRef.close();

  }




  loadColums() {
    this.columnsOpcPorCargo = [
      {
        headerName: '#',
        field: 'idOpcion',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',

      },
      {
        headerName: 'Opcion',
        field: 'tituloEncabezado',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion',
        field: 'tituloOpcion',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick : this.eliminarOpcionesIdOpcion.bind(this),
          label: '<i class="fa fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true
      }
    ]
  }
  async guardar(e: any) {

    try {

      let opcionesType = [];
        e.forEach(element => {
          const opcion = {
            idOpcion: 0,
            idCargo: this.IdCargo,
            idEncabezado: element.idEncabezado,
            idOpcionDetalle: element.idOpcion
          }
          opcionesType.push(opcion)
      });

      opcionesType
      const data = await this.service.postGuardarOpciones(this.IdCargo, opcionesType);
      if(!data){
        Swal.fire('Error', 'Ha ocurrido algun problema','error');
        return;
      }
      if(data.data){
        Swal.fire('Correcto', 'Se han asignado correcamnte','success');
      }
      else {
        Swal.fire('Correcto', 'Pero ya existian otros previamente','success');
      }
    this.getOpcPorCargo();
    } catch (error) {
      Swal.fire('Error', error.data,'error');
    }
  }
  

  async getOpcPorCargo() {

    try {
      let data = await this.service.getOpcPorCargo(this.IdCargo);

      if (!data) {
        Swal.fire("Error", "MENSAJE DE ERROR", 'error');
      }
      if (data.data) {
        this.listaOpcPorCargo = data.data;
      }
    } catch (error) {

    }
  }

  selectOpciones() {
    this.mdlDetalleOpcMenuCargo.opciones = 3;
    this.mdlDetalleOpcMenuCargo.getOpciones()
    this.mdlDetalleOpcMenuCargo.openModal();

}

eliminarOpcionesIdOpcion(e : any){
  Swal.fire({
    icon : 'question',
    title : 'Aviso',
    html: '¿Se van a eliminar <strong>' +  e.data.tituloOpcion + '</strong>?',
    showCancelButton : true,
    confirmButtonText : 'Si, eliminar',
    cancelButtonText : 'Cancelar'
   })
   .then((result) =>{
     if(result.isConfirmed){
       this.dropOpcionesIdOpcion(e);
     }
   } );
}

async dropOpcionesIdOpcion(e : any){
  try {
    let data = await this.service.eliminarOpciones(3, this.IdCargo, e.data.idOpcion);
    if(!data.correcto){
      Swal.fire("Error", "Ocurrio un error", 'error');
      return;
    }
    Swal.fire('Opcion Eliminada', 'Se ha eliminado correctamente','success' )
    this.getOpcPorCargo();
  } catch (error) {
    Swal.fire("Error", "Ocurrio un error " + error.message , 'error');
      return;
    }
  }

async eliminarOpcionesIdCargo(){
  Swal.fire({
    icon : 'question',
    title : 'Aviso',
    html: '¿Esta seguro de eliminar las opciones del cargo ?',
    showCancelButton : true,
    confirmButtonText : 'Si, eliminar',
    cancelButtonText : 'Cancelar'
   }).then((result) =>{
     if(result.isConfirmed){
       this.dropOpcionesIdCargo();
     }
   } );
}

async dropOpcionesIdCargo(){
  try {
    let data = await this.service.eliminarOpciones(2, this.IdCargo, 0);
    if(!data.correcto){
      Swal.fire("Error", "Ocurrio un error", 'error');
      return;
    }
    Swal.fire('Opciones Eliminadas', 'Se ha eliminado correctamente','success' )
    this.getOpcPorCargo();
  } catch (error) {
    Swal.fire("Error", "Ocurrio un error " + error.message , 'error');
      return;
    }
}
}





