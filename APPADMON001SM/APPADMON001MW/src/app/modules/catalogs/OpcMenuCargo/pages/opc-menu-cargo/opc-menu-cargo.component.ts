import { OpcMenuCargoService } from '../../../../../services/opc-menu-cargo.service'
import { SafeUrl } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MdlOpcMenuCargoComponent } from '../../components/mdl-opc-menu-cargo/mdl-opc-menu-cargo.component';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-opc-menu-cargo',
  templateUrl: './opc-menu-cargo.component.html',
  styleUrls: ['./opc-menu-cargo.component.css']
})
export class OpcMenuCargoComponent implements OnInit {

  @ViewChild('mdlCapturaOpcMenuCargo') public mdlCapturaOpcMenuCargo : MdlOpcMenuCargoComponent;

  columnsOpcMenuCargo : any;

  listaOpcMenuCargo = [];
 
  readonly moduleName = 'Catalogo de Restricciones de Opciones Menu';
  readonly version = '2024.08.26.01'

  constructor(private modalService: NgbModal, private service : OpcMenuCargoService) { }


  openModal(){
    this.mdlCapturaOpcMenuCargo.getOpcPorCargo()
    this.mdlCapturaOpcMenuCargo.opciones = 1;
    
    this.mdlCapturaOpcMenuCargo.openModal();
  }
  
  onCloseModal(e : any){
     this.getOpcMenuCargo();
     
  }

  ngOnInit(): void {
    this.loadColums();
    this.getOpcMenuCargo();

  }

  recargar(event:any){
     this.getOpcMenuCargo();
    }


    loadColums(){
      this.columnsOpcMenuCargo = [
        {
          headerName: '#',
          field: 'idCargo',
          flex: 2,
          minWidth: 20,
          headerClass: 'header-center header-grid-left',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Cargo',
          field: 'nombreCargo',
          flex: 3,
          minWidth: 30,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Opciones Disponibles',
          field: 'opcionesDisponibles',
          flex: 3,
          minWidth: 30,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Detalle',
          cellRenderer: 'btnCellRenderer',
          cellRendererParams : {
            onClick : this.selectOpcMenuCargo.bind(this),
            label: '<i class="fa fa-eye"></i>',
            class: 'btn btn-warning btn-sm'
          },
          headerClass : 'header-center header-grid-right',
          cellClass : 'grid-cell-btn-center',
          flex: 5,
          minWidth: 90,
          maxWidth: 90,
          suppressSizeToFit : true
         },
        // {
        //   headerName: 'Eliminar',
        //   cellRenderer: 'btnCellRenderer',
        //   cellRendererParams : {
        //     //onClick : this.deleteTipoAlimentacion.bind(this),
        //     label: '<i class="fa fa-times"></i>',
        //     class: 'btn btn-danger btn-sm'
        //   },
        //   headerClass : 'header-center header-grid-right',
        //   cellClass : 'grid-cell-btn-center',
        //   flex: 5,
        //   minWidth: 90,
        //   maxWidth: 90,
        //   suppressSizeToFit : true
       // }
      ]
    }
    async getOpcMenuCargo(){
    
      try {
        let data = await this.service.getOpcMenuCargo();
  
        if(!data){
          Swal.fire("Error", "MENSAJE DE ERROR", 'error');
        }
        if(data.data){
          this.listaOpcMenuCargo = data.data;
        }
      } catch (error) {
        
      }
    }

    selectOpcMenuCargo(event : any){
      this.mdlCapturaOpcMenuCargo.opciones = 2;
      this.mdlCapturaOpcMenuCargo.IdCargo = event.data.idCargo;
      this.mdlCapturaOpcMenuCargo.getOpcPorCargo()
      this.mdlCapturaOpcMenuCargo.openModal();
    }
    

    
}

