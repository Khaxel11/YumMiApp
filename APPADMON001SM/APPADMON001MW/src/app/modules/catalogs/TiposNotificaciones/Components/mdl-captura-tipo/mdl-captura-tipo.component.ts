import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TiposNotificacionesService } from 'src/app/services/tipos-notificaciones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mdl-captura-tipo',
  templateUrl: './mdl-captura-tipo.component.html',
  styleUrls: ['./mdl-captura-tipo.component.css']
})
export class MdlCapturaTipoComponent implements OnInit {
  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCapturaTipo') mdlCapturaTipo : any;
  modalRef : NgbModalRef;

  modalname = "Agregar"
  TipoOpcion : number = 1; // 1= Agregar | 2= Editar
  imageURL : string;
  fileSelected;
  selectedFile: File;
  lstTiposUsuarios = [];

  tipo = {
    idTipoNotificacion : 0,
    descripcion : '',
    idTipoUsuario : 0,
    icono : '',
    iconoString : ''
  }

  constructor(private modalService : NgbModal, private service : TiposNotificacionesService) { }

  ngOnInit(): void {
    this.getTiposUsuarios();
  }

  async guardar(){
    if(!this.tipo.descripcion){
      Swal.fire("Capture Descripciónn", "Campos  Vacios!", "warning");
      return;
    }
    if(this.tipo.idTipoUsuario === 0){
      Swal.fire("Capture Tipo de Usuario", "Campos  Vacios!", "warning");
      return;
    }
    if(!this.fileSelected){
      Swal.fire("Seleccione Archivo", "Campos  Vacios!", "warning");
      return;
    }

    await this.saveTipoNotificacion();
  }

  async saveTipoNotificacion(){
    if(!this.imageURL){
      Swal.fire("Seleccione Archivo", "Campos  Vacios!", "warning");
      return;
    }

    this.tipo.iconoString = this.imageURL;
    this.tipo.idTipoUsuario = Number(this.tipo.idTipoUsuario);
    try {
      let data = await this.service.controlTiposNotificaciones(this.TipoOpcion, this.tipo);
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
      
    }
    
  }

  async getTiposUsuarios(){
    let data = await this.service.getTiposUsuarios();
    if(data){
      this.lstTiposUsuarios = data.data;
    }
  }

  openModal(){
    this.modalRef = this.modalService.open(this.mdlCapturaTipo, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModal(){
    this.tipo = {
      idTipoNotificacion : 0,
      descripcion : '',
      idTipoUsuario : 0,
      icono : '',
      iconoString : ''
    }
    this.imageURL = "";
    this.selectedFile = null;
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
}
