import { Text } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestriccionesingreService } from 'src/app/services/restriccionesingre.service';
import Swal from 'sweetalert2';
import { RestriccionesingrecapmdlComponent } from '../../modals/restriccionesingrecapmdl/restriccionesingrecapmdl.component';
import { RestriccionesingrelstmdlComponent } from '../../modals/restriccionesingrelstmdl/restriccionesingrelstmdl.component';
import { clsTiposAlimentacion, clsRestricciones } from '../../models/clsrestriccionesingre';

@Component({
  selector: 'app-restriccionesingre',
  templateUrl: './restriccionesingre.component.html',
  styleUrls: ['./restriccionesingre.component.css']
})
export class RestriccionesingreComponent implements OnInit {

  @ViewChild('mdlLst') private mdlLst : RestriccionesingrelstmdlComponent;
  @ViewChild('mdlCapt') private mdlCapt : RestriccionesingrecapmdlComponent;

  readonly moduleName = 'DETALLE';
  readonly version = '22.02.2024'
  loaded : boolean = true;
  filtro: string = "";
  lst:clsTiposAlimentacion[]=[];
  model:clsRestricciones = new clsRestricciones();
  
  constructor(private service : RestriccionesingreService) { }

  ngOnInit(): void {
    this.getRestriccionesConTotalIngredientes();
  }


  getRestricciones(){

  }
  async getRestriccionesConTotalIngredientes(){
    try {
      let data = await this.service.getRestriccionesConTotalIngredientes(!this.filtro ? null : this.filtro);
      this.lst = [];
      this.lst = data.data;
      
      this.loaded = false;
    } catch (error) {
      Swal.fire('Error',error.message,'info');
    }
  }

  Detalle(r:any){
    this.mdlLst.abc = 'E'; // si entra por aqui es editar
    this.mdlLst.tipoAlimentacion = r;
    this.mdlLst.getRestriciones(r.idTipoAlimentacion, 3); // detalle de tipo de alimentos y sus restricciones
    this.openModal();
  }

  async eliminar(r:any){

    try {

      let data = await this.service.eliminarRestriccion(r.idTipoAlimentacion);
      if(!data.data){
        Swal.fire("Ocurrio un error", "No se ha podido recuperar la información", 'error');
        return;
      }
        //Swal.fire("Aviso!", "Restricción eliminada correctamente", 'error');
        Swal.fire(data.data.correcto ? "Realizado correctamente" : "Ha ocurrido algun problema",  data.data.mensaje , data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      
      if(data.data.correcto){
        this.getRestriccionesConTotalIngredientes();
      }
    } catch (error) {
      Swal.fire("Ocurrio un error", "Ha ocurrido un error: " + error.message, 'error');
    }

    
  }

  async btnEliminar(r: any) {

    let text = `Se eliminaran todas las restriciones de ingredientes asignadas al tipo de alimentación.\n¿Desea continuar?`;
    const confirmacion = await this.showConfirmacion(text);
    if (confirmacion) {
      this.eliminar(r);
    } 

  }

  async showConfirmacion(pText: string): Promise<boolean> {
    const resultado = await Swal.fire({
      title: 'Confirmacion...', text: pText, icon: 'question',
      showCancelButton: true, confirmButtonText: 'Aceptar', cancelButtonText: 'Cancelar'
    });

    if (resultado.isConfirmed) { return true; } else { return false; }
  }

  openModal(){
    this.mdlLst.openModalLst(); // voy al modal de lista de restricciones
  }

  openModalCapt(){
    this.mdlCapt.getTiposAlimentacionCbo();
    this.mdlCapt.abc = 'A';
    this.mdlCapt.idTipoAlimValue = 1; // le paso el tipo
    this.mdlCapt.openModalCapt(); // voy al modal de captura de ingredientes a restriccion
  }
  
  closeCaptura(e:any){
   this.getRestriccionesConTotalIngredientes(); 
  }

}
