import { Component, OnInit, ViewChild } from '@angular/core';
import { AplicacionesService } from '../../../../../services/aplicaciones.service';
import swal from 'sweetalert2';
import { MdlCapturaAppsComponent } from '../../components/mdl-captura-apps/mdl-captura-apps.component';
@Component({
  selector: 'app-aplicaciones',
  templateUrl: './aplicaciones.component.html',
  styleUrls: ['./aplicaciones.component.css']
})
export class AplicacionesComponent implements OnInit {
  @ViewChild('mdlCapturaApps') public mdlCaptura : MdlCapturaAppsComponent;
  columnsAplicaciones : any;
  lstAplicaciones : any[] = [];
  filtro : string = null;
  constructor(private service : AplicacionesService) { }

  ngOnInit(): void {
    this.loadColums();
    this.getAplicaciones();
  }
  async getAplicaciones(){
    
    try {
      let data = await this.service.getAplicaciones(this.filtro);
      if(!data){
        swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      if(data.data){
        this.lstAplicaciones = data.data;
      }
    } catch (error) {
      swal.fire("Error", "Ocurrio un error: " + error.message , 'error');
    }
  }
  openModal(opcion? : boolean){
    if(opcion){
      this.mdlCaptura.opcion = 1;
      
    }
    this.mdlCaptura.openModal();
  }
  onCloseModal(e : any){
    this.getAplicaciones();
  }
  loadColums(){
    this.columnsAplicaciones = [
      {
        headerName: '#',
        field: 'idSistema',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Nomenclatura',
        field: 'nomenclatura',
        flex: 8,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Sistema',
        field: 'sistema',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-left',
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
          onClick : this.selectCargo.bind(this),
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
          onClick : this.deleteAplicaciones.bind(this),
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

  selectCargo(e : any){
    this.mdlCaptura.opcion = 2;
    this.mdlCaptura.idSistema = e.data.idSistema;
    this.mdlCaptura.nomenclatura = e.data.nomenclatura;
    this.mdlCaptura.sistema = e.data.sistema;
    this.mdlCaptura.descripcion = e.data.descripcion;
    this.openModal();
  }
  deleteAplicaciones(e : any){
    swal.fire({
     icon : 'question',
     title : 'Aviso',
     html: '¿Desea eliminar la aplicacion <strong>' + e.data.nombreAplicaciones +  '</strong>?',
     showCancelButton : true,
     confirmButtonText : 'Si, eliminar',
     cancelButtonText : 'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        this.dropCargo(e);
      }
    } );
  }

  async dropCargo(e : any){
    try {
      let data = await this.service.controlAplicaciones(3, e.data);
      if(!data.data){
        swal.fire("Error", "Ha ocurrido un error", 'error');
        return;
      }
      swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      this.getAplicaciones();
    } catch (error) {
      swal.fire("Error", "Ha ocurrido un error", 'error');
    }
  }

}
