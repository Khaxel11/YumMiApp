
import { TiposAlimentacionService } from '../../../../../services/tipos-alimentacion.service'
import { SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdlTiposAlimentacionComponent } from '../../components/mdl-tipos-alimentacion/mdl-tipos-alimentacion.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-alimentacion',
  templateUrl: './tipos-alimentacion.component.html',
  styleUrls: ['./tipos-alimentacion.component.css']
})
export class TiposAlimentacionComponent implements OnInit {

  @ViewChild('mdlCapturaTiposAlimentacion') public mdlCapturaTiposAlimentacion : MdlTiposAlimentacionComponent;

  columnsTiposAlimentacion : any;
  listaTiposAlimentacion: any[] = [];
  filtro: string = '';
  readonly moduleName = 'Catalogo Tipos de Alimentacion';
  readonly version = '2024.08.26.01'


  constructor(private service : TiposAlimentacionService) { }

  ngOnInit(): void {
    this.loadColums();
    this.getTipoAlimentacion();
  }
  
  openModal(opcion? : boolean){
    if(opcion){
      this.mdlCapturaTiposAlimentacion.opcion = 1;
      this.mdlCapturaTiposAlimentacion.modalname="Agregar";
    }
    else{this.mdlCapturaTiposAlimentacion.modalname="Editar"}
    this.mdlCapturaTiposAlimentacion.openModal();
  }
  
  onCloseModal(e : any){
    this.getTipoAlimentacion();
  }

recargar(event:any){
  this.getTipoAlimentacion();}




  loadColums(){
    this.columnsTiposAlimentacion = [
      {
        headerName: '#',
        field: 'idTipoAlimentacion',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tipo de Alimentacion',
        field: 'tipoAlimentacion',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion',
        field: 'descripcion',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.selectTipoAlimentacion.bind(this),
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
          onClick : this.deleteTipoAlimentacion.bind(this),
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

  selectTipoAlimentacion(e : any){
    this.mdlCapturaTiposAlimentacion.opcion = 2;
    this.mdlCapturaTiposAlimentacion.idTipoAlimentacion = e.data.idTipoAlimentacion;
    this.mdlCapturaTiposAlimentacion.tipoAlimentacion = e.data.tipoAlimentacion;
    this.mdlCapturaTiposAlimentacion.descripcion = e.data.descripcion
    this.openModal();
  }

  async getTipoAlimentacion(){
    
    try {
      let data = await this.service.getTipoAlimentacion(this.filtro);

      if(!data){
        Swal.fire("Error", "MENSAJE DE ERROR", 'error');
      }
      if(data.data){
        this.listaTiposAlimentacion = data.data;
      }
    } catch (error) {
      
    }
  }

 
  deleteTipoAlimentacion(e : any){
    Swal.fire({
      icon : 'question',
      title : 'Aviso',
      html: '¿Desea eliminar la promocion <strong>' + e.data.tipoAlimentacion + '</strong>?',
      showCancelButton : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'Cancelar'
     }).then((result) =>{
       if(result.isConfirmed){
         this.dropTipoAlimentacion(e);
       }
     } );
  }

  async dropTipoAlimentacion(e : any){
    try {
      let data = await this.service.controlTipoAlimentacion(3, e.data);
      if(!data.correcto){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      Swal.fire('Promoción Eliminada', 'Se ha geliminado correctamente','success' )
      this.getTipoAlimentacion();
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error " + error.error , 'error');
        return;
      }
  }
}
