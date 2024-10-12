import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { clsIngredient, clsRestricciones, clsTiposAlimentacion } from '../../models/clsrestriccionesingre';
import { RestriccionesingreService } from 'src/app/services/restriccionesingre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restriccionesingrecapmdl',
  templateUrl: './restriccionesingrecapmdl.component.html',
  styleUrls: ['./restriccionesingrecapmdl.component.css']
})
export class RestriccionesingrecapmdlComponent implements OnInit {


  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlCapt') public mdlCapt : any;
  
  modalRef : NgbModalRef;
  modalname = 'Selección de Ingredientes';
  model:clsRestricciones = new clsRestricciones(); 

  Opcion : number = 1;
  loaded : boolean = true;
  filtro: string = "";
  abc: string = "A";
  idTipoAlimValue:number = 0;
  idTipoAlim:number = 0;
  isChecked: boolean = false;
  lst:clsTiposAlimentacion[]=[];
  lstIngredientes:clsIngredient[]=[];
  lstIngreSelec: clsIngredient[] = []; // Array para almacenar los elementos seleccionados
  lstIngreTmp: clsIngredient[] = [];

  
  
  constructor(private modalService : NgbModal, private service : RestriccionesingreService) { }

  ngOnInit(): void {
  }


  async getTiposAlimentacionCbo(){
    try {
      let data = await this.service.getTiposAlimentacionCbo(!this.filtro ? null : this.filtro);
      this.lst = [];
      this.lst = data.data;
      this.idTipoAlim = this.idTipoAlimValue;
      
      this.loaded = false;
    } catch (error) {
      Swal.fire('Error',error.message,'info');
    }
  }

  async getIngredientes(){
    try {
      let data = await this.service.getIngredientes(!this.filtro ? null : this.filtro);
      this.lstIngredientes = [];
      this.lstIngredientes = data.data;

      // si abc = 'E' marco los ingredientes restringidos
      this.lstIngreSelec = [];
      if (this.abc == 'E'){
        this.lstIngreSelec = this.lstIngreTmp;
      }
      
      this.loaded = false;
    } catch (error) {
      Swal.fire('Error',error.message,'info');
    }
  }

  async controlRestriccionIngredients(){
    
    try {

      let data = await this.service.controlRestriccionIngredients(this.lstIngreSelec, this.Opcion, this.idTipoAlim);
      if(!data.data){
        Swal.fire("Ocurrio un error", "No se ha podido recuperar la información", 'error');
        return;
      }
      Swal.fire(data.data.correcto ? "Realizado correctamente" : "Ha ocurrido algun problema",  data.data.mensaje , data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      if(data.data.correcto){
        this.onClose.emit(this.idTipoAlim);
        this.clean();
        this.closeModalCapt();
      }
    } catch (error) {
      Swal.fire("Ocurrio un error", "Ha ocurrido un error: " + error.message, 'error');
    }

  }
  openModalCapt(){
    
    this.modalRef = this.modalService.open(this.mdlCapt, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  clean(){
    this.model = new clsRestricciones();
  }

  closeModalCapt(){
    this.clean();
    this.modalRef.close(); 
  }

   // Verifica si un ingrediente está seleccionado
   isSelected(ingrediente: clsIngredient): boolean {
    return this.lstIngreSelec.some(ing => ing.idIngrediente === ingrediente.idIngrediente);
  }
  toggleSeleccion(ingrediente: clsIngredient) {
    const index = this.lstIngreSelec.findIndex(item => item.idIngrediente === ingrediente.idIngrediente);

    if (index > -1) {
      // Si el ingrediente ya está en la lista, se elimina
      this.lstIngreSelec.splice(index, 1);
    } else {
      // Si el ingrediente no está en la lista, se agrega
      this.lstIngreSelec.push(ingrediente);
    }

    // if (this.lstIngreSelec.includes(ingrediente)) {
    //   this.lstIngreSelec = this.lstIngreSelec.filter(el => el.idIngrediente !== ingrediente.idIngrediente);
    // } else {
    //   this.lstIngreSelec.push(ingrediente);
    // }

    console.log(this.lstIngreSelec);
  }
 

}
