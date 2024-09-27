import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TiposAlimentacionService } from 'src/app/services/tipos-alimentacion.service';
import Swal from 'sweetalert2';;

@Component({
  selector: 'app-mdl-tipos-alimentacion',
  templateUrl: './mdl-tipos-alimentacion.component.html',
  styleUrls: ['./mdl-tipos-alimentacion.component.css']
})
export class MdlTiposAlimentacionComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();

  @ViewChild('mdlCapturaTiposAlimentacion') mdlCapturaTiposAlimentacion : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';

  opcion : number = 1;
  idTipoAlimentacion : number;
  tipoAlimentacion: string;
  descripcion:string;


  constructor(private modalService : NgbModal, private service : TiposAlimentacionService) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalRef = this.modalService.open(this.mdlCapturaTiposAlimentacion, {
      size: 'md',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModal(){

    this.idTipoAlimentacion = null;
    this.tipoAlimentacion = "";
    this.descripcion = "";
    
    this.onClose.emit(true);
    this.modalRef.close();
    
  }
  async saveTipoAlimentacion(){
    if(!this.tipoAlimentacion){
      Swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
      return;
    }
    const tipoAlimentacion = {
      idTipoAlimentacion : this.idTipoAlimentacion ? this.idTipoAlimentacion : 0,
      tipoAlimentacion : this.tipoAlimentacion,
      descripcion:this.descripcion
    }
    
   
    try {
       let data = await this.service.controlTipoAlimentacion(this.opcion, tipoAlimentacion);
      if(!data.correcto){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      Swal.fire('Promoción Guardada', 'Se ha guardado correctamente','success' )
      this.closeModal();
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error " + error.error , 'error');
        return;
    }
  }

}
