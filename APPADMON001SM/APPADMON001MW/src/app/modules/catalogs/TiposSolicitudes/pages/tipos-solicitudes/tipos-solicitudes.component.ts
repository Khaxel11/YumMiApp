import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposSolicitudesService } from '../../../../../services/tipos-solicitudes.service'
import { SafeUrl } from '@angular/platform-browser';
import { MdlTiposSolicitudesComponent } from '../../components/mdl-tipos-solicitudes/mdl-tipos-solicitudes.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-solicitudes',
  templateUrl: './tipos-solicitudes.component.html',
  styleUrls: ['./tipos-solicitudes.component.css']
})
export class TiposSolicitudesComponent implements OnInit {

  @ViewChild('mdlCapturaTiposSolicitudes') public mdlCapturaTiposSolicitudes : MdlTiposSolicitudesComponent;

  columnsTiposSolicitudes : any;
  listaTiposSolicitudes: any[] = [];
  filtro: string = '';
  readonly moduleName = 'Catalogo de Tipos de Solicitudes';
  readonly version = '2024.08.23.01'
  
  constructor(private service : TiposSolicitudesService) { }
 
  ngOnInit(): void {
    this.loadColums();
    this.getTiposSolicitudes();
  }
  
  openModal(opcion? : boolean){
    if(opcion){
      this.mdlCapturaTiposSolicitudes.opcion = 1;
      this.mdlCapturaTiposSolicitudes.modalname="Agregar";
    }
    else{this.mdlCapturaTiposSolicitudes.modalname="Editar"}
    this.mdlCapturaTiposSolicitudes.openModal();
  }
  
  onCloseModal(e : any){
    this.getTiposSolicitudes();
  }

recargar(event:any){
  this.getTiposSolicitudes();}
  
  

  loadColums(){
    this.columnsTiposSolicitudes = [
      {
        headerName: '#',
        field: 'idTipoSolicitud',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Titulo de Solicitud',
        field: 'tituloSolicitud',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.selectTiposSolicitudes.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass : 'header-center header-grid',
        cellClass : 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit : true
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.deleteTiposSolicitudes.bind(this),
          label: '<i class="fa fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass : 'header-center header-grid-right',
        cellClass : 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit : true
      }
    ]
  }

  selectTiposSolicitudes(e : any){
    this.mdlCapturaTiposSolicitudes.opcion = 2;
    this.mdlCapturaTiposSolicitudes.idTipoSolicitud = e.data.idTipoSolicitud;
    this.mdlCapturaTiposSolicitudes.tituloSolicitud = e.data.tituloSolicitud
    this.openModal();
  }

  async getTiposSolicitudes(){
    
    try {
      let data = await this.service.getTiposSolicitudes(this.filtro);

      if(!data){
        Swal.fire("Error", "MENSAJE DE ERROR", 'error');
      }
      if(data.data){
        this.listaTiposSolicitudes = data.data;
      }
    } catch (error) {
      
    }
  }

 
  deleteTiposSolicitudes(e : any){
    Swal.fire({
      icon : 'question',
      title : 'Aviso',
      html: '¿Desea eliminar la promocion <strong>' + e.data.tituloSolicitud + '</strong>?',
      showCancelButton : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'Cancelar'
     }).then((result) =>{
       if(result.isConfirmed){
         this.dropTiposSolicitudes(e);
       }
     } );
  }

  async dropTiposSolicitudes(e : any){
    try {
      let data = await this.service.controlTiposSolicitudes(3, e.data);
      if(!data.correcto){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      Swal.fire('Promoción Eliminada', 'Se ha geliminado correctamente','success' )
      this.getTiposSolicitudes();
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error " + error.error , 'error');
        return;
      }
  }
}
