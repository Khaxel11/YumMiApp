import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposProductosService } from '../../../../../services/tipos-productos.service'
import { SafeUrl } from '@angular/platform-browser';
import { MdlTiposProductosComponent } from '../../components/mdl-tipos-productos/mdl-tipos-productos.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipos-productos',
  templateUrl: './tipos-productos.component.html',
  styleUrls: ['./tipos-productos.component.css']
})
export class TiposProductosComponent implements OnInit {
  @ViewChild('mdlCaptura') public mdlCaptura : MdlTiposProductosComponent;

  readonly moduleName = 'Catalogo de Tipos de Productos';
  readonly version = '22.02.2024'
  loaded : boolean = true;
  filtro: string = "";
  constructor(private service : TiposProductosService) { }
  lstTiposProductos = [null];
  
  async ngOnInit(): Promise<any> {
    await this.getTiposProductos();
  }
  onCloseModal(e : any){
    this.getTiposProductos();
  }
  async getTiposProductos(){
    try {
      let data = await this.service.getTiposProductos(!this.filtro ? null : this.filtro);
      this.lstTiposProductos = [];
      // console.log(data);
      this.lstTiposProductos = data.data;
      
      this.loaded = false;
    } catch (error) {
      
    }
  }
  async dropType(e : any){
    Swal.fire({
      icon : 'question',
      title : 'Aviso',
      html: '¿Desea eliminar el Tipo de producto <strong>' + e.nombreTipo +  '</strong>?',
      showCancelButton : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'Cancelar'
     }).then((result) =>{
       if(result.isConfirmed){
         this.deleteType(e);
       }
     } );
    
  }

  async deleteType(e : any){
    try {
      let data = await this.service.controlTiposProductos(3, e);
      if(!data.data){
        Swal.fire("Error", "Ha ocurrido un error", 'error');
        return;
      }
      Swal.fire(data.data.mensaje, "", data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      this.getTiposProductos();
    } catch (error) {
      Swal.fire("Error", "Ha ocurrido un error", 'error');
    }
  }
  editType(e : any){
    console.log(e);
    this.mdlCaptura.Opcion = 2;
    this.mdlCaptura.tipo.descripcion = e.descripcion;
    this.mdlCaptura.tipo.idTipo = e.idTipo;
    this.mdlCaptura.tipo.nombreTipo = e.nombreTipo;
    this.mdlCaptura.imageURL = this.mdlCaptura.convertToBase64(e.foto).toString();
    this.mdlCaptura.openModal();
  }
  convertToBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  openMdlTiposProductos(){
    this.mdlCaptura.Opcion = 1;    
    this.mdlCaptura.openModal();
  }
}
