import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { General } from 'src/app/helpers/general';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { clsIngredient } from '../../models/clsIngredients'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingredientscapmdl',
  templateUrl: './ingredientscapmdl.component.html',
  styleUrls: ['./ingredientscapmdl.component.css']
})
export class IngredientscapmdlComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCaptura') public mdlCaptura : any;
  modalRef : NgbModalRef;
  modalname = 'Agregar';
  model:clsIngredient = new clsIngredient(); 

  ingrediente : string;
  descripcion : string;
  imageURL: string;
  selectedFile: File;
  general = new General();
  Opcion : number = 1;
  fileSelected;
  constructor(private modalService : NgbModal, private service : IngredientsService) {
    
   }

  ngOnInit(): void {
  }

  async controlIngredients(){
    try {
      if(this.imageURL){
        this.model.stringFoto = this.imageURL;
      }
      let data = await this.service.controlIngredients(this.Opcion, this.model);
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
    this.model = new clsIngredient();
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
