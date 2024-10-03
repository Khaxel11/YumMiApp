import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CatcategoriasService } from 'src/app/services/catcategorias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mdl-captura-categorias',
  templateUrl: './mdl-captura-categorias.component.html',
  styleUrls: ['./mdl-captura-categorias.component.css']
})
export class MdlCapturaCategoriasComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCapturaCategorias') mdlCapturaCategorias : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';

  opcion : number = 1;
  categoria: string;
  descripcion : string;
  idCategoria : number;

  constructor(private modalService : NgbModal, private service : CatcategoriasService) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalRef = this.modalService.open(this.mdlCapturaCategorias, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
    closeModal(){
      this.categoria = "";
      this.descripcion = "";
      this.idCategoria = null;
      // this.foto = "";
      this.onClose.emit(true);
      this.modalRef.close();
      
    }
  
    async saveCategoria(){
      if(!this.categoria || !this.descripcion ){
        Swal.fire("Campos incompletos", "Los campos deben de estar completos", 'warning');
        return;
      }
      const categorias = {
        idCategoria : this.idCategoria ? this.idCategoria : 0,
        categoria : this.categoria,
        descripcion : this.descripcion.toString()
      }
      
      try {
        let data = await this.service.controlCategorias(this.opcion, categorias);
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
