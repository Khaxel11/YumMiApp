import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CargosService } from 'src/app/services/cargos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'mdl-captura-cargos',
  templateUrl: './mdl-captura.component.html',
  styleUrls: ['./mdl-captura.component.css']
})
export class MdlCapturaComponent implements OnInit {
  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCaptura') mdlCaptura : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';

  opcion : number = 1;
  claveCargo : string;
  nombreCargo : string;


  constructor(private modalService : NgbModal, private service : CargosService) { }

  ngOnInit(): void {
  }
  openModal(){
    this.modalRef = this.modalService.open(this.mdlCaptura, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModal(){
    this.modalRef.close();
  }

  async saveCargo(){
    if(!this.claveCargo || !this.nombreCargo){
      Swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
      return;
    }
    const cargo = {
      idCargo : 0,
      claveCargo : this.claveCargo,
      nombreCargo : this.nombreCargo
    }
    
    try {
      let data = await this.service.controlCargos(this.opcion, cargo);
      if(!data.data){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      Swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' )
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error " + error.error , 'error');
        return;
    }
  }
}
