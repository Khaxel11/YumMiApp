import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TiposUsuariosService } from 'src/app/services/tipos-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mdl-tipos-usuarios',
  templateUrl: './mdl-tipos-usuarios.component.html',
  styleUrls: ['./mdl-tipos-usuarios.component.css']
})
export class MdlTiposUsuariosComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCapturaTiposUsuarios') mdlCapturaTiposUsuarios : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';

  opcion : number = 1;
  tipoUsuario: string;
  descripcion : string;
  idTipoUsuario : number;

  constructor(private modalService : NgbModal, private service : TiposUsuariosService) { }


  ngOnInit(): void {
  }

  openModal(){
    this.modalRef = this.modalService.open(this.mdlCapturaTiposUsuarios, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModal(){
    this.tipoUsuario = "";
    this.descripcion = "";
    this.idTipoUsuario = null;
    // this.foto = "";
    this.onClose.emit(true);
    this.modalRef.close();
    
  }
  async saveTiposUsuarios(){
    if(!this.tipoUsuario || !this.descripcion ){
      Swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
      return;
    }
    const tipo = {
      idTipoUsuario : this.idTipoUsuario ? this.idTipoUsuario : 0,
      tipoUsuario : this.tipoUsuario,
      descripcion : this.descripcion.toString()
    }
    
    try {
      let data = await this.service.controlTiposUsuarios(this.opcion, tipo);
      if(!data.data){
        Swal.fire("Error", "Ocurrio un error", 'error');
        return;
      }
      Swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' )
      this.closeModal();
    } catch (error) {
      Swal.fire("Error", "Ocurrio un error " + error.error , 'error');
        return;
    }
  }

}
