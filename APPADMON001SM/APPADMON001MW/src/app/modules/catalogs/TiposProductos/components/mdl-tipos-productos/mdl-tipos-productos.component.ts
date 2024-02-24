import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { General } from 'src/app/helpers/general';
import { CargosService } from 'src/app/services/cargos.service';
import { TiposProductosService } from 'src/app/services/tipos-productos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mdl-tipos-productos',
  templateUrl: './mdl-tipos-productos.component.html',
  styleUrls: ['./mdl-tipos-productos.component.css']
})
export class MdlTiposProductosComponent implements OnInit {
  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCaptura') mdlCaptura : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';
  tipo = {
    idTipo : 0,
    nombreTipo : '',
    descripcion : '',
    foto : '',
    stringFoto : ''
  }
  nombreTipo : string;
  descripcion : string;
  imageURL: string;
  selectedFile: File;
  general = new General();
  Opcion : number = 1;
  fileSelected;
  constructor(private modalService : NgbModal, private service : TiposProductosService) {
    
   }

  ngOnInit(): void {
  }

  async controlTiposProductos(){
    try {
      if(this.imageURL){
        this.tipo.stringFoto = this.imageURL;
      }
      let data = await this.service.controlTiposProductos(this.Opcion, this.tipo);
      if(!data.data){
        Swal.fire("Ocurrio un error", "No se ha podido recuperar la información", 'error');
        return;
      }
      Swal.fire(data.data.correcto ? "Realizado correctamente" : "Ha ocurrido algun problema",  data.data.mensaje , data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      if(data.data.correcto){
        this.onClose.emit();
        this.closeModal();
      }
    } catch (error) {
      Swal.fire("Ocurrio un error", "Ha ocurrido un error: " + error.message, 'error');
    }
  } 

 
  openModal(){
    
    this.modalRef = this.modalService.open(this.mdlCaptura, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  clean(){
    this.tipo = {
      idTipo : 0,
      nombreTipo : '',
      descripcion : '',
      foto : '',
      stringFoto : ''
    }
    this.selectedFile = null;
    this.imageURL = "";
  }

  closeModal(){
    this.clean();
    this.modalRef.close(); 
  }

  onFileSelected(event : any){
    try {
      this.selectedFile = event.target.files[0];
      this.getImageURL();

      let file: File = event.target.files[0];

      let reader = new FileReader();
      reader.onload =  (e: any) => {
        let base64String = e.target.result.split(',')[1]; 
        this.fileSelected = base64String;
      };
      //reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  }
  getImageURL() {
    try {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      
    } catch (error) {
      
    }
    
  }
  convertToBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
}
