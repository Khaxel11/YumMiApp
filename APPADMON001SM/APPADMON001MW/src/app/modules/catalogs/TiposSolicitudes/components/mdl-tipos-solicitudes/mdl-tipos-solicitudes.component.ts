import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TiposSolicitudesService } from 'src/app/services/tipos-solicitudes.service';
import Swal from 'sweetalert2';;

@Component({
  selector: 'app-mdl-tipos-solicitudes',
  templateUrl: './mdl-tipos-solicitudes.component.html',
  styleUrls: ['./mdl-tipos-solicitudes.component.css']
})
export class MdlTiposSolicitudesComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();

  @ViewChild('mdlCapturaTiposSolicitudes') mdlCapturaTiposSolicitudes : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';

  opcion : number = 1;
  tituloSolicitud: string;
  idTipoSolicitud : number;

  constructor(private modalService : NgbModal, private service : TiposSolicitudesService) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalRef = this.modalService.open(this.mdlCapturaTiposSolicitudes, {
      size: 'md',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModal(){
    this.tituloSolicitud = "";
    this.idTipoSolicitud = null;
    this.onClose.emit(true);
    this.modalRef.close();
    
  }
  async saveTipoSolicitud(){
    if(!this.tituloSolicitud){
      Swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
      return;
    }
    const tipoSolicitud = {
      idTipoSolicitud : this.idTipoSolicitud ? this.idTipoSolicitud : 0,
      tituloSolicitud : this.tituloSolicitud
    }
    
   
    try {
       let data = await this.service.controlTiposSolicitudes(this.opcion, tipoSolicitud);
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
