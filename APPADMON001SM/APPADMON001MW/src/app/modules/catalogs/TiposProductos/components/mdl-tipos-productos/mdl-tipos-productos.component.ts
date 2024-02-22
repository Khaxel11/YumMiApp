import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CargosService } from 'src/app/services/cargos.service';
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
    foto : ''
  }
  nombreTipo : string;
  descripcion : string;
  imageURL: string;
  selectedFile: File;
  constructor(private modalService : NgbModal) { }

  ngOnInit(): void {
  }
  openModal(){
    this.tipo = {
      idTipo : 0,
      nombreTipo : '',
      descripcion : '',
      foto : ''
    }
    this.selectedFile = null;
    this.imageURL = "";
    
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

  onFileSelected(event : any){
    try {
      this.selectedFile = event.target.files[0];
      this.getImageURL();

      let file: File = event.target.files[0];

      let reader = new FileReader();
      reader.onload =  (e: any) => {
        let base64String = e.target.result.split(',')[1]; 
        this.tipo.foto = base64String;
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
