import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { clsRestricciones, clsTiposAlimentacion, clsIngredient } from '../../models/clsrestriccionesingre';
import { RestriccionesingreService } from 'src/app/services/restriccionesingre.service';
import { RestriccionesingrecapmdlComponent } from '../restriccionesingrecapmdl/restriccionesingrecapmdl.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restriccionesingrelstmdl',
  templateUrl: './restriccionesingrelstmdl.component.html',
  styleUrls: ['./restriccionesingrelstmdl.component.css']
})
export class RestriccionesingrelstmdlComponent implements OnInit {

  @Output() onClose = new EventEmitter<any>();
  @ViewChild('mdlLst') public mdlLst : any;
  @ViewChild('mdlCapt') private mdlCapt : RestriccionesingrecapmdlComponent;
  modalRef : NgbModalRef;
  modalname = 'Ingredientes Restringidos para:';
  model:clsRestricciones = new clsRestricciones(); 
  

  Opcion : number = 1;
  idTipoAlim : number = 1;
  abc:string = 'A';
  tipoAlimentacion:clsTiposAlimentacion = new clsTiposAlimentacion();
  lstIngredientes:clsIngredient[]=[];
  lstIngredientesTmp:clsIngredient[]=[];
  lstRestricciones:clsRestricciones[]=[];
  
  constructor(private modalService : NgbModal, private service : RestriccionesingreService) { }

  ngOnInit(): void {
  }


  async getRestriciones(id:any, opc:any){
    try {
      let data = await this.service.getRestriciones(id, opc);
      this.lstRestricciones = [];
      this.lstRestricciones = data.data;
      
      //this.loaded = false;
    } catch (error) {
      Swal.fire('Error',error.message,'info');
    }
  }

  async showConfirmacion(pText: string): Promise<boolean> {
    const resultado = await Swal.fire({
      title: 'Confirmacion...', 
      html: pText, 
      icon: 'question',
      showCancelButton: true, confirmButtonText: 'Aceptar', cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) { return true; } else { return false; }
  }


  async btnEliminar(r:any){
    let text = `Se eliminara el ingrediente: <strong>${r.ingrediente}</strong>.<br>¿Desea continuar?`
    const confirmacion = await this.showConfirmacion(text);
    if (confirmacion) {
      this.eliminarIngrediente(r);
    } 
  }

  async eliminarIngrediente(r:any){

    try {

      let data = await this.service.eliminarIngrediente(this.idTipoAlim, r.idIngrediente, r.idRestriccionIngrediente);
      if(!data.data){
        Swal.fire("Ocurrio un error", "No se ha podido recuperar la información", 'error');
        return;
      }
      
      if(data.data.correcto){

      }
    } catch (error) {
      Swal.fire("Ocurrio un error", "Ha ocurrido un error: " + error.message, 'error');
    }

    this.getRestriciones(this.idTipoAlim, 3); // detalle de tipo de alimentos y sus restricciones
  }


  async setIngredintesSeleccionados(){
    this.lstIngredientesTmp = this.lstRestricciones.map(restriccion => ({
      idIngrediente: restriccion.idIngrediente,
      ingrediente: restriccion.ingrediente,
      descripcion: restriccion.descripcion,
    }));
  }
  async openModalCapt(){
    
    await this.setIngredintesSeleccionados();

    this.mdlCapt.getTiposAlimentacionCbo();
    this.mdlCapt.getIngredientes();
    this.mdlCapt.abc = this.abc; // le paso el tipo de accion a realizar (A=Agregar, E=Editar)
    this.mdlCapt.idTipoAlimValue = this.tipoAlimentacion.idTipoAlimentacion; // le paso el tipo

    

    
 

    this.mdlCapt.lstIngreTmp = this.lstIngredientesTmp; // le paso la lista de restricciones
    this.mdlCapt.openModalCapt(); // voy al modal de captura de ingredientes a restriccion
  }

  closeCaptura(e:any){
    this.idTipoAlim = e;
    this.getRestriciones(e, 3) // detalle de tipo de alimentos y sus restricciones
  }


  controlIngredients(){
    
  }
  clean(){
    this.model = new clsRestricciones();
  }
  
  openModalLst(){
    
    this.modalRef = this.modalService.open(this.mdlLst, {
      size: 'lg',
      backdrop : 'static',
      keyboard : false
    });

    this.modalRef.result.then(() =>{})
  }
  closeModalLst(){
    this.clean();
    this.modalRef.close(); 
  }
}
