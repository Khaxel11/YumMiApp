import { Component, OnInit, ViewChild } from '@angular/core';
import { VisualesService } from 'src/app/services/visuales.service';
import { clsVisualesAplicaionesEntity, clsVisualesEntity } from 'src/app/modules/catalogs/visuales/models/clsVisuales';
import { VisualescapmdlComponent } from '../../modals/visualescapmdl/visualescapmdl.component';
import Swal from 'sweetalert2';
import { SafeUrl } from '@angular/platform-browser';
import { ModifierFlags } from 'typescript';

@Component({
  selector: 'app-visuales',
  templateUrl: './visuales.component.html',
  styleUrls: ['./visuales.component.css']
})
export class VisualesComponent implements OnInit {

  @ViewChild('mdlCaptura') private mdlCaptura : VisualescapmdlComponent;
  readonly moduleName = 'Catalogo de Visuales';
  readonly version = '22.02.2024'
  loaded : boolean = true;
  programadas: boolean = false;
  filtro: string = "";
  obj:clsVisualesEntity = new clsVisualesEntity();
  //lstVisuales = [];
  lstVisuales = [
    {

    }
  ];

  
  lstAplicaciones:clsVisualesAplicaionesEntity[]=[];

  idSistema:number = 0;

  constructor(private service : VisualesService) { }

  ngOnInit(): void {
    this.getAplicaciones();
  }


  onCloseModal(e : any){
    this.getVisuales();
  }

  async getAplicaciones(){
    try {
      let data = await this.service.getAplicaciones(!this.filtro ? null : this.filtro);
      this.lstAplicaciones = [];
      // console.log(data);
      this.lstAplicaciones = data.data;
      
      this.loaded = false;
      
    } catch (error) {
      
    }
  }



  async getVisuales(){
    try {
      // if(this.idSistema == 0){
      //   Swal.fire('aviso!','seleccione una aplicación','info')
      //   return;
      // }
      let data = await this.service.getVisuales(!this.filtro ? null : this.filtro, this.idSistema, this.programadas);
      this.lstVisuales = [];
      this.lstVisuales = data.data;
      
      this.loaded = false;
    } catch (error) {
      
    }
  }

  async drop(e : any){
    Swal.fire({
      icon : 'question',
      title : 'Aviso',
      html: '¿Desea eliminar el Visual <strong>' + e.titulo +  '</strong>?',
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
      let data = await this.service.controlVisuales(3, e);
      if(!data.data){
        Swal.fire("Error", "Ha ocurrido un error", 'error');
        return;
      }
      Swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      this.getVisuales();
    } catch (error) {
      Swal.fire("Error", "Ha ocurrido un error", 'error');
    }
  }

  cargarCombosDelModal(){
    this.mdlCaptura.getAplicaciones();
    this.mdlCaptura.getCatProductos();
  }

  convertDateFormat(inputDate: string): string {

     // Extraer la parte de la fecha (MM/DD/YYYY) y descartar la parte de tiempo
    const datePart = inputDate.split(' ')[0]; // '08/29/2024 00:00:00'
  
    // Dividir la cadena de entrada en partes usando '/'
    const [month, day, year] = datePart.split('/');
  
    // Reordenar las partes en el formato 'YYYY-MM-DD'
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  
    return formattedDate;
  }

  edit(e){
    this.mdlCaptura.Opcion = 2;
    this.cargarCombosDelModal();
    this.mdlCaptura.model.idVisual = e.idVisual;
    this.mdlCaptura.model.titulo= e.titulo;
    this.mdlCaptura.model.subtitulo = e.subtitulo;
    this.mdlCaptura.model.idOpcionRedirecciona = e.idOpcionRedirecciona;
    this.mdlCaptura.model.idSistema = Number(this.idSistema);
    this.mdlCaptura.model.idUsoMenu = e.idUsoMenu;
    this.mdlCaptura.model.descripcionUso = e.descripcionUso;
    this.mdlCaptura.model.esProgramado = e.esProgramado;
    this.mdlCaptura.model.redirecciona = e.redirecciona;
    this.mdlCaptura.model.fechaInicioProgramado = (e.fechaInicioProgramado == null) ? null : this.convertDateFormat(e.fechaInicioProgramado);
    this.mdlCaptura.model.fechaFinalProgramado = (e.fechaFinalProgramado == null) ? null :this.convertDateFormat(e.fechaFinalProgramado);
    this.mdlCaptura.model.diasApartirProgramado = e.diasApartirProgramado;
    this.mdlCaptura.imageURL = this.convertToBase64(e.imagen).toString()
    this.mdlCaptura.openModal();
  }
  convertToBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  openModal(){
    this.mdlCaptura.Opcion = 1;    
    this.cargarCombosDelModal();
    this.mdlCaptura.openModal();
  }
}
