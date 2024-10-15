import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppsDisponiblesService } from '../../../../../services/appsdisponibles.service';
import swal from 'sweetalert2';
import { aplicaciones } from 'src/app/models/Aplicaciones';
import { encabezados } from 'src/app/models/Encabezados';
import { MdlAppsAdministraComponent} from '../../components/mdlappsadministra/mdlappsadministra.component';
import { OpcionesDisponiblesComponent } from '../../components/opcionesdisponibles/opcionesdisponibles.component';
import { Grid } from 'ag-grid-community';

@Component({
  selector: 'app-appdisponibles',
  templateUrl: './appdisponibles.component.html',
  styleUrls: ['./appdisponibles.component.css']
})
export class AppdisponiblesComponent implements OnInit {

  @ViewChild('mdlAdministraApps') public mdlAdministra : MdlAppsAdministraComponent;
  @ViewChild('disponiblesApps') public mdlOpciones : OpcionesDisponiblesComponent;

  columnsAplicaciones: any;
  lstAplicaciones: aplicaciones[] = [];

  columnsEncabezados: any;
  lstEncabezados: encabezados[] = [];

  lstSistemas = [];
  filtroEncabezado: number = 0;

  filtro: string = null;
  filtroSistemas: number = 0;
  nombresistema: string = "";

  ordenEna = 0;
  enablePagination= true;

  constructor(private service: AppsDisponiblesService) {
    this.columnsEncabezados = [
      {
        headerName: '#',
        field: 'orden',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Encabezado',
        field: 'encabezado',
        flex: 8,
        minWidth: 80,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Ruta',
        field: 'ruta',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Icono',
        field: 'icono',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
        cellRenderer: (params: any) => {
          return `<i class="${params.value}"></i>`;
        }
      },
      {
        headerName: 'Detalle',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.detalleEncabezado.bind(this),
          label: '<i class="fa fa-book"></i>',
          class: 'btn btn-info btn-sm'
        },
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit: true
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams: {
          onClick: this.editEncabezado.bind(this),
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
        field: 'orden',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid-right',
        cellClass: 'grid-cell-center',

        rowDrag: (params: any) => {
          return this.ordenEna !== 0;  // Permitir arrastrar si nomover != 0
        },
        cellRenderer: (params: any) => {
          // Mostrar el ícono de arrastre solo si la fila es arrastrable
          return this.ordenEna !== 0 ? '<i class="fa fa"></i>' : '';
        }
      },
    ]
  }

  ngOnInit(): void {
    this.getSistemas();
    this.getEncabezados();
  }
  async getSistemas() {
    let data = await this.service.getSistemas();
    if (data) {
      this.lstSistemas = data.data;
      // console.log(this.lstEncabezados);
    }
  }
  async changeSistemas(e: any) {
    this.filtroSistemas = e;
    this.nombresistema = this.lstSistemas.find(item => item.idSistema === Number(this.filtroSistemas));
    this.getEncabezados();
    if(e === '0'){
      this.ordenEna = Number(this.filtroSistemas);
      this.enablePagination = true;
    }else{
      this.ordenEna = Number(this.filtroSistemas);
      this.enablePagination = false;
    }
    
  }
  async getEncabezados() {
    let data = await this.service.getEncabezados(this.filtroSistemas.toString());
    if (data) {
      this.lstEncabezados = data.data;
      // console.log(this.lstEncabezados);
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
  
  detalleEncabezado(e:any){
    this.mdlOpciones.filtroEncabezado =e.data.idEncabezado;
    this.mdlOpciones.nombreEncabezado =e.data.encabezado;
    this.mdlOpciones.openModalAddOpciones();
  }
  onCloseModalOpciones(e: any) {
    
    this.getEncabezados();
  }
  addEncabezado(){
    // this.mdlAdministra.opcion = 1;
    this.mdlAdministra.idSistemaMod = this.filtroSistemas;
    this.mdlAdministra.tipoCapturaNombre = 'A';
    this.openModal();
  }
  editEncabezado(e: any) {
    // this.mdlAdministra.opcion = 2;
    this.mdlAdministra.tipoCapturaNombre = 'E';
    this.mdlAdministra.idSistemaMod = e.data.idSistema;
    this.mdlAdministra.idEncabezado = e.data.idEncabezado;
    this.mdlAdministra.titulo = e.data.encabezado;
    this.mdlAdministra.ruta = e.data.ruta;
    this.mdlAdministra.icono = e.data.icono;
    this.openModal();
  }
  openModal() {
    this.mdlAdministra.tipoCaptura=true;
    this.mdlAdministra.openModalAdd();
  }
  onCloseModal(e: any) {
    this.getEncabezados();
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
        this.dropCargo(e);
      }
    });
  }

  async dropCargo(e: any) {
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
  OrderChange(newOrder: { idRegistro: number, orden: number }[]): void {
    console.log('Nuevo orden detectado:', newOrder);

  }

}
