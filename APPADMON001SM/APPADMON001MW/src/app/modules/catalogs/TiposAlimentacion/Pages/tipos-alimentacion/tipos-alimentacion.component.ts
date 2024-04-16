import { MdlCapturaTipoAlimentacionComponent } from './../../Components/mdl-captura-tipo/mdl-captura-tipo.component';
import Swal from 'sweetalert2';
import { TiposAlimentacionService } from './../../../../../services/tipos-alimentacion.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-tipos-alimentacion',
  templateUrl: './tipos-alimentacion.component.html',
  styleUrls: ['./tipos-alimentacion.component.css']
})
export class TiposAlimentacionComponent implements OnInit {
  @ViewChild("mdlCapturaTipo") mdlCapturaTipo : MdlCapturaTipoAlimentacionComponent;
  readonly MODULO = "Catalogo de Tipos de Alimentacion";
  readonly VERSION = "2024.03.24.01";

  columnsTiposAli: any;
  lstTiposAli = [];
  filtro: string = "";
  idTipoUsuario: number = 0;
  constructor(private service: TiposAlimentacionService) { }

  ngOnInit(): void {
    this.loadColumns();
    this.getTiposAlimentacion();
  }

  openMdlCaptura(){
    this.mdlCapturaTipo.openModal();
  }

 async getTiposAlimentacion(){
    let data = await this.service.getTiposAlimentacion(this.filtro, this.idTipoUsuario);
    try{
      if(!data){
        Swal.fire("Error", "Mensaje de Error", 'error');
      }
      if(data.data){
        this.lstTiposAli = data.data;
      }
    } catch(error){

    }
  }

  onCloseModal(event: any){

  }

  loadColumns(){
    this.columnsTiposAli = [
      
        {
          headerName: '#',
          field: 'idTipoAlimentacion',
          flex: 2,
          minWidth: 20,
          headerClass: 'header-center header-grid-left',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Tipo Alimentacion',
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
            onClick : true,
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
            onClick : true,
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

}
