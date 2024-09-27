import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { OpcMenuCargoService } from '../../../../../services/opc-menu-cargo.service';
import Swal from 'sweetalert2';;

@Component({
  selector: 'app-mdl-detalle-opc-menu-cargo',
  templateUrl: './mdl-detalle-opc-menu-cargo.component.html',
  styleUrls: ['./mdl-detalle-opc-menu-cargo.component.css']
})
export class MdlDetalleOpcMenuCargoComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();

  @ViewChild('mdlDetalleOpcMenuCargo') mdlDetalleOpcMenuCargo : any;

  @ViewChild('gridOpciones') public gridOpciones: any;

  readonly moduleName = "Modal Opciones Asignadas"  ;
  columnsOpciones : any;
  listaOpciones = [];
  // data: string = '';
  modalRef : NgbModalRef;

  constructor(private modalService: NgbModal, private service : OpcMenuCargoService) { }

  ngOnInit(): void {
    this.loadColums();
    
  }

  openModal(){
    this.modalRef = this.modalService.open(this.mdlDetalleOpcMenuCargo, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModal(){
  
    this.modalRef.close();
    
  }
  
  recargar(event:any){
    this.getOpciones();

   }



async postGuardarOpciones(){
  const select = this.gridOpciones.getSelectedData();
const result = await Swal.fire({
    title: 'Confirmación',
    text: `¿Estás seguro de asignarle ${select.length} opciones al cargo?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, Continuar',
    cancelButtonText: 'Cancelar'
  });

  if (result.isConfirmed) {
    this.onClose.emit(select);
    this.modalRef.close();
  }
}


  async getOpciones(){
    
    try {
      let data = await this.service.getOpciones();

      if(!data){
        Swal.fire("Error", "MENSAJE DE ERROR", 'error');
      }
      if(data.data){
        this.listaOpciones = data.data;
      }
    } catch (error) {
      
    }
  }


  loadColums(){
    this.columnsOpciones = [
      
      {
        headerName: 'Opcion',
        field: 'tituloEncabezado',
        flex: 1,
        minWidth: 30,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell',
        headerCheckboxSelection: true,
        checkboxSelection: true,
      },
      {
        headerName: 'Descripcion',
        field: 'tituloOpcion',
        flex: 2,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell',
      }
    ]
  }
}
