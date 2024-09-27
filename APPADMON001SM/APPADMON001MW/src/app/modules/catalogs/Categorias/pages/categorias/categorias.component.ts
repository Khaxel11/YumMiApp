import { Component, OnInit, ViewChild } from '@angular/core';
import { CatcategoriasService } from '../../../../../services/catcategorias.service';
import swal from 'sweetalert2';
import { MdlCapturaCategoriasComponent } from '../../components/mdl-captura-categorias/mdl-captura-categorias.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  @ViewChild('mdlCapturaCategorias') public mdlCapturaCategorias : MdlCapturaCategoriasComponent;
  columnsCategorias : any;
  lstaCategorias : any[] = [];
  filtro : string = null;
  readonly NOMBRE = "Catalogo de Categorias";
  readonly VERSION = "2024.08.09.01";

  constructor(private service : CatcategoriasService) { }

  ngOnInit(): void {
    this.loadColums();
    this.getCategorias();
  }

  openModal(opcion? : boolean){
    if(opcion){
      this.mdlCapturaCategorias.opcion = 1;
      this.mdlCapturaCategorias.modalname="Agregar";
    }
    else{this.mdlCapturaCategorias.modalname="Editar"}
    this.mdlCapturaCategorias.openModal();
  }
  onCloseModal(e : any){
    this.getCategorias();
  }
recargar(event:any){
  this.getCategorias();
}
  loadColums(){
    this.columnsCategorias = [
      {
        headerName: '#',
        field: 'idCategoria',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Categoria',
        field: 'categoria',
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
        cellClass: 'grid-cell-left',
      },

      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.selectCategoria.bind(this),
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
          onClick : this.deleteCategoria.bind(this),
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


  async getCategorias(){
    
    try {
      let data = await this.service.getCategorias(this.filtro);
      if(!data){
        swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      if(data.data){
        this.lstaCategorias = data.data;
      }
    } catch (error) {
      swal.fire("Error", "Ocurrio un error: " + error.message , 'error');
    }
  }

  selectCategoria(e : any){
    this.mdlCapturaCategorias.modalname="Editar"
    this.mdlCapturaCategorias.opcion = 2;
    this.mdlCapturaCategorias.idCategoria = e.data.idCategoria;
    this.mdlCapturaCategorias.categoria = e.data.categoria;
    this.mdlCapturaCategorias.descripcion= e.data.descripcion;
    this.openModal();
  }
  deleteCategoria(e : any){
    swal.fire({
     icon : 'question',
     title : 'Aviso',
     html: '¿Desea eliminar la categoria <strong>' + e.data.categoria +  '</strong>?',
     showCancelButton : true,
     confirmButtonText : 'Si, eliminar',
     cancelButtonText : 'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        this.dropCategoria(e);
      }
    } );
  }

  async dropCategoria(e : any){
    try {
      let data = await this.service.controlCategorias(3, e.data);
      if(!data.data){
        swal.fire("Error", "Ha ocurrido un error", 'error');
        return;
      }
      swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      this.getCategorias();
    } catch (error) {
      swal.fire("Error", "Ha ocurrido un error", 'error');
    }
  }

}
