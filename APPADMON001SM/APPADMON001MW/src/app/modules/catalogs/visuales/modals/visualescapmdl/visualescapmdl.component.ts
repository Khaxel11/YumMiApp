import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { General } from 'src/app/helpers/general';
import { VisualesService } from 'src/app/services/visuales.service';
import { clsVisualesAplicaionesEntity, clsVisualesCatproductosEntity, clsVisualesEntity } from '../../models/clsVisuales'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visualescapmdl',
  templateUrl: './visualescapmdl.component.html',
  styleUrls: ['./visualescapmdl.component.css']
})
export class VisualescapmdlComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCaptura') public mdlCaptura : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';
  model:clsVisualesEntity = new clsVisualesEntity(); 

  imageURL: string;
  selectedFile: File;
  general = new General();
  Opcion : number = 1;
  fileSelected;

  lstAplicaciones:clsVisualesAplicaionesEntity[] = [];
  lstProductos:clsVisualesCatproductosEntity[] = [];
  filtro: any;

  today:Date = new Date;
  fecha:string | null = this.today.toISOString().substring(0,10);

  constructor(private modalService : NgbModal, private service : VisualesService) {
    // this.model.fechaInicioProgramado = this.today.toISOString().substring(0,10);
    // this.model.fechaFinalProgramado = this.today.toISOString().substring(0,10);
    this.model.fechaInicioProgramado = null;
    this.model.fechaFinalProgramado = null;
   }

  ngOnInit(): void {
  }

  async getAplicaciones(){
    try {
      let data = await this.service.getAplicaciones(!this.filtro ? null : this.filtro);
      this.lstAplicaciones = [];
      this.lstAplicaciones = data.data;
    } catch (error) {
      
    }
  }
  
  async getCatProductos(){
    try {
      let data = await this.service.getCatProductos(!this.filtro ? null : this.filtro);
      this.lstProductos = [];
      this.lstProductos = data.data;
    } catch (error) {
      
    }
  }

  async controlVisuales(){

    if(this.model.diasApartirProgramado < 0){
      Swal.fire('aviso','la diferencia de fechas es negativa, corrija las fechas inicial y final','info');
      return;
    }

    try {
      if(this.imageURL){
        this.model.strImagen = this.imageURL;
      }
      this.model.idOpcionRedirecciona = Number(this.model.idOpcionRedirecciona);
      this.model.idSistema = Number(this.model.idSistema);
      let data = await this.service.controlVisuales(this.Opcion, this.model);
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
      size: 'xl',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  clean(){
    this.model = new clsVisualesEntity();
    this.selectedFile = null;
    this.imageURL = "";
  }

  closeModal(){
    this.clean();
    this.modalRef.close(); 
  }

  diasDiferencia(){

    if (this.model.fechaInicioProgramado && this.model.fechaFinalProgramado) {
      const date1 = new Date(this.model.fechaInicioProgramado);
      const date2 = new Date(this.model.fechaFinalProgramado);

      // Calcular la diferencia en milisegundos
      const differenceInMillis = date2.getTime() - date1.getTime();

      // Convertir la diferencia a días
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      this.model.diasApartirProgramado = Math.floor(differenceInMillis / millisecondsPerDay);

    }
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
