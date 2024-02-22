import { Component, OnInit, ViewChild } from '@angular/core';
import { CargosService } from '../../../../../services/cargos.service';
import swal from 'sweetalert2';
import { MdlCapturaComponent } from '../../Components/mdl-captura/mdl-captura.component';
@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  @ViewChild('mdlCaptura') public mdlCaptura : MdlCapturaComponent;
  columnsCargos : any;
  lstCargos : any[] = [];
  filtro : string = null;
  constructor(private service : CargosService) { }

  ngOnInit(): void {
    this.loadColums();
    this.getCargos();
  }
  async getCargos(){
    let data = await this.service.getCargos(this.filtro);
    if(!data){
      swal.fire("Error", "Ocurrio un error", 'error');
      return;
    }
    if(data.data){
      this.lstCargos = data.data;
    }
  }
  openModal(opcion? : boolean){
    if(opcion){
      this.mdlCaptura.opcion = 1;
      
    }
    this.mdlCaptura.openModal();
  }
  onCloseModal(e : any){
    this.getCargos();
  }
  loadColums(){
    this.columnsCargos = [
      {
        headerName: '#',
        field: 'idCargo',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Clave',
        field: 'claveCargo',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Nombre',
        field: 'nombreCargo',
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
          onClick : this.deleteCargo.bind(this),
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
    this.mdlCaptura.idCargo = e.data.idCargo;
    this.mdlCaptura.claveCargo = e.data.claveCargo;
    this.mdlCaptura.nombreCargo = e.data.nombreCargo;
    this.openModal();
  }
  deleteCargo(e : any){
    swal.fire({
     icon : 'question',
     title : 'Aviso',
     html: '¿Desea eliminar el cargo <strong>' + e.data.nombreCargo +  '</strong>?',
     showCancelButton : true,
     confirmButtonText : 'Si, eliminar',
     cancelButtonText : 'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed){

      }
    } );
  }
}
