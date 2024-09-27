import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientscapmdlComponent } from '../../modals/ingredientscapmdl/ingredientscapmdl.component';
import { IngredientsService } from 'src/app/services/ingredients.service';
import Swal from 'sweetalert2';
import { SafeUrl } from '@angular/platform-browser';
import { clsIngredient } from '../../models/clsIngredients';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  @ViewChild('mdlCaptura') private mdlCaptura : IngredientscapmdlComponent;

  readonly moduleName = 'Catalogo de Ingredientes';
  readonly version = '22.02.2024'
  loaded : boolean = true;
  filtro: string = "";
  //lstIngredients:clsIngredient[] = [];
  lstIngredients = [null];

  constructor(private service : IngredientsService) { }

  ngOnInit(): void {
    this.getIngredients();
  }


  onCloseModal(e : any){
    this.getIngredients();
  }
  async getIngredients(){
    try {
      let data = await this.service.getIngredients(!this.filtro ? null : this.filtro);
      this.lstIngredients = [];
      // console.log(data);
      this.lstIngredients = data.data;
      
      this.loaded = false;
    } catch (error) {
      
    }
  }
  async dropIngredient(e : any){
    Swal.fire({
      icon : 'question',
      title : 'Aviso',
      html: '¿Desea eliminar el Ingrediente <strong>' + e.ingrediente +  '</strong>?',
      showCancelButton : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'Cancelar'
     }).then((result) =>{
       if(result.isConfirmed){
         this.deleteIngredient(e);
       }
     } );
    
  }

  async deleteIngredient(e : any){
    try {
      let data = await this.service.controlIngredients(3, e);
      if(!data.data){
        Swal.fire("Error", "Ha ocurrido un error", 'error');
        return;
      }
      Swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      this.getIngredients();
    } catch (error) {
      Swal.fire("Error", "Ha ocurrido un error", 'error');
    }
  }
  editIngredient(e : any){
    console.log(e);
    this.mdlCaptura.Opcion = 2;
    this.mdlCaptura.model.idIngrediente = e.idIngrediente;
    this.mdlCaptura.model.ingrediente = e.ingrediente;
    this.mdlCaptura.model.descripcion = e.descripcion;
    this.mdlCaptura.imageURL = this.mdlCaptura.convertToBase64(e.foto).toString();
    this.mdlCaptura.openModal();
  }
  convertToBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  openModal(){
    this.mdlCaptura.Opcion = 1;    
    this.mdlCaptura.openModal();
  }

}
