import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposUsuariosService } from '../../../../../services/tipos-usuarios.service'
import { SafeUrl } from '@angular/platform-browser';
import { MdlTiposUsuariosComponent } from '../../components/mdl-tipos-usuarios/mdl-tipos-usuarios.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tiposusuarios',
  templateUrl: './tiposusuarios.component.html',
  styleUrls: ['./tiposusuarios.component.css']
})
export class TiposusuariosComponent implements OnInit {

@ViewChild('mdlCapturaTiposUsuarios') public mdlCapturaTiposUsuarios : MdlTiposUsuariosComponent;

  columnsTiposUsuarios : any;
  listaTiposUsuarios: any[] = [];
  filtro: string = "";
  readonly moduleName = 'Catalogo de Tipos de Usuarios';
  readonly version = '2024.08.15.01'
  
  constructor(private service : TiposUsuariosService) { }
 
  
  openModal(opcion? : boolean){
    if(opcion){
      this.mdlCapturaTiposUsuarios.opcion = 1;
      this.mdlCapturaTiposUsuarios.modalname="Agregar";
    }
    else{this.mdlCapturaTiposUsuarios.modalname="Editar"}
    this.mdlCapturaTiposUsuarios.openModal();
  }
  
  onCloseModal(e : any){
    this.getTiposUsuarios();
  }

recargar(event:any){
  this.getTiposUsuarios();}
  
  ngOnInit(): void {
    this.loadColums();
    this.getTiposUsuarios();
  }

  loadColums(){
    this.columnsTiposUsuarios = [
      {
        headerName: '#',
        field: 'idTipoUsuario',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Tipos de Usuarios',
        field: 'tipoUsuario',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Descripcion',
        field: 'descripcion',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.selectTiposUsuarios.bind(this),
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
          onClick : this.deleteTiposUsuarios.bind(this),
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

  async getTiposUsuarios(){
    
    try {
      let data = await this.service.getTiposUsuarios(this.filtro);
      if(!data){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      if(data.data){
        this.listaTiposUsuarios= data.data;
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error: " + error.message , 'error');
    }
  }

  selectTiposUsuarios(e : any){
    this.mdlCapturaTiposUsuarios.opcion = 2;
    this.mdlCapturaTiposUsuarios.idTipoUsuario = e.data.idTipoUsuario;
    this.mdlCapturaTiposUsuarios.tipoUsuario = e.data.tipoUsuario;
    this.mdlCapturaTiposUsuarios.descripcion= e.data.descripcion;
    this.openModal();
  }
  deleteTiposUsuarios(e : any){
    Swal.fire({
     icon : 'question',
     title : 'Aviso',
     html: '¿Desea eliminar el tipo de usuario <strong>' + e.data.tipoUsuario +  '</strong>?',
     showCancelButton : true,
     confirmButtonText : 'Si, eliminar',
     cancelButtonText : 'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        this.dropTiposUsuarios(e);
      }
    } );
  }

  async dropTiposUsuarios(e : any){
    try {
      let data = await this.service.controlTiposUsuarios(3, e.data);
      if(!data.data){
        Swal.fire("Error", "Ha ocurrido un error", 'error');
        return;
      }
      Swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      this.getTiposUsuarios();
    } catch (error) {
      Swal.fire("Error", "Ha ocurrido un error", 'error');
    }
  }

}
