import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipos-alimentacion',
  templateUrl: './tipos-alimentacion.component.html',
  styleUrls: ['./tipos-alimentacion.component.css']
})
export class TiposAlimentacionComponent implements OnInit {

  readonly MODULO = "Catalogo de Tipos de Alimentacion";
  readonly VERSION = "2024.03.24.01";

  columnsTiposAli: any;
  lstTiposAli: [];
  constructor() { }

  ngOnInit(): void {
    this.loadColumns();
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
