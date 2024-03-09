import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AplicacionesService } from 'src/app/services/aplicaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mdl-captura-apps',
  templateUrl: './mdl-captura-apps.component.html',
  styleUrls: ['./mdl-captura-apps.component.css']
})

export class MdlCapturaAppsComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCapturaApps') mdlCaptura : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';

  opcion : number = 1;
  idSistema : number = 1;
  nomenclatura : string;
  sistema : string;
  descripcion : string;
  idAplicacion : number;

  constructor(private modalService : NgbModal, private service : AplicacionesService) { }

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
    this.idSistema = null;
    this.nomenclatura = "";
    this.sistema = "";
    this.descripcion = "";
    this.idAplicacion = null;
    this.onClose.emit(true);
    this.modalRef.close();
    
  }

  async saveAplicacion(){
    if(!this.idSistema || !this.nomenclatura){
      Swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
      return;
    }
    const aplicacion = {
      idSistema : this.idSistema ? this.idSistema : 0,
      Nomenclatura : this.nomenclatura.toString(),
      Sistema : this.sistema.toString(),
      Descripcion : this.descripcion.toString(),
      idAplicacion : this.idAplicacion ? this.idAplicacion : 0,
    }
    
    try {
      let data = await this.service.controlAplicaciones(this.opcion, aplicacion);
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
