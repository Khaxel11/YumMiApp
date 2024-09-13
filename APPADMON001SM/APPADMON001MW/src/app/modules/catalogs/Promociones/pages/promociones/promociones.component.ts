import { Component, OnInit, ViewChild } from '@angular/core';
import { PromocionesService } from '../../../../../services/promociones.service'
import { SafeUrl } from '@angular/platform-browser';
import { MdlPromocionesComponent } from '../../components/mdl-promociones/mdl-promociones.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.component.html',
  styleUrls: ['./promociones.component.css']
})
export class PromocionesComponent implements OnInit {
@ViewChild('mdlCapturaPromociones') public mdlCapturaPromociones : MdlPromocionesComponent

  listaPromociones: any[] = [];
  columnsPromociones : any;
  filtro: string = null;
  readonly moduleName = 'Catalogo de Promociones';
  readonly version = '2024.08.16.01'

  constructor(private service : PromocionesService) { }

  ngOnInit(): void {
    this.loadColums();
    this.getPromos();

  }
  openModal(opcion? : boolean){
    
    if(opcion){
      this.mdlCapturaPromociones.opcion = 1;
      this.mdlCapturaPromociones.modalname="Agregar";
    }
    else{this.mdlCapturaPromociones.modalname="Editar";}
    this.mdlCapturaPromociones.openModal();
  }

  onCloseModal(e : any){
    this.getPromos();
  }


  recargar(event:any){
    this.getPromos();}

  loadColums(){
    this.columnsPromociones = [
      {
        headerName: '#',
        field: 'idPromo',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Codigo',
        field: 'codigo',
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
        headerName: 'Descuento',
        field: 'descuento',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      // {
      //   headerName: 'Detalle',
      //   cellRenderer: 'btnCellRenderer',
      //   cellRendererParams : {
      //     onClick : this.selectPromos.bind(this),
      //     label: '<i class="fa fa-eye"></i>',
      //     class: 'btn btn-success btn-sm'
      //   },
      //   headerClass : 'header-center header-grid',
      //   cellClass : 'grid-cell-btn-center',
      //   flex: 5,
      //   minWidth: 90,
      //   maxWidth: 90,
      //   suppressSizeToFit : true
      // },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.selectPromos.bind(this),
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
          onClick : this.deletePromos.bind(this),
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
  selectPromos(e : any){
    
    this.mdlCapturaPromociones.opcion = 2;
    this.mdlCapturaPromociones.idPromo = e.data.idPromo;
    this.mdlCapturaPromociones.codigo = e.data.codigo;
    this.mdlCapturaPromociones.descripcion= e.data.descripcion;
    this.mdlCapturaPromociones.descuento= e.data.descuento;
    this.mdlCapturaPromociones.fechaInicio= !e.data.fechaInicio ? '' : e.data.fechaInicio ;
    this.mdlCapturaPromociones.fechaFin= !e.data.fechaFin ? '' : e.data.fechaFin;
    this.mdlCapturaPromociones.disponibles= e.data.disponibles === 0 ? '' : e.data.disponibles;
    this.mdlCapturaPromociones.programado= e.data.esProgramado;
    this.mdlCapturaPromociones.acumulado= e.data.esAcumulable;
    this.mdlCapturaPromociones.valorAcumulable= e.data.valorAcumulable === 0 ? '' : e.data.valorAcumulable;
    this.mdlCapturaPromociones.cantidadAcumulable= e.data.cantidadAcumulable === 0 ? '' : e.data.cantidadAcumulable;
    this.openModal();
  }
  async getPromos(){

    try {
      let data = await this.service.getPromos(this.filtro);

      if(!data){
        Swal.fire("Error", "MENSAJE DE ERROR", 'error');
      }
      if(data.data){
        this.listaPromociones = data.data;
      }
    } catch (error) {
      
    }
  }

  deletePromos(e : any){
    Swal.fire({
     icon : 'question',
     title : 'Aviso',
     html: '¿Desea eliminar la promocion <strong>' + e.data.codigo+' - '+e.data.descripcion + '</strong>?',
     showCancelButton : true,
     confirmButtonText : 'Si, eliminar',
     cancelButtonText : 'Cancelar'
    }).then((result) =>{
      if(result.isConfirmed){
        this.dropPromos(e);
      }
    } );
  }
  async dropPromos(e : any){
    try {
      let data = await this.service.controlPromos(3, e.data);
      if(!data.correcto){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      Swal.fire('Promoción Eliminada', 'Se ha geliminado correctamente','success' )
      this.getPromos();
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error " + error.error , 'error');
        return;
      }
  }
  

}
