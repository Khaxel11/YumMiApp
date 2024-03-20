import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposNotificacionesService } from '../../../../../services/tipos-notificaciones.service'
import { MdlCapturaTipoComponent } from '../../Components/mdl-captura-tipo/mdl-captura-tipo.component';
import Swal from 'sweetalert2';
import { SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-tipos-notificaciones',
  templateUrl: './tipos-notificaciones.component.html',
  styleUrls: ['./tipos-notificaciones.component.css']
})
export class TiposNotificacionesComponent implements OnInit {
  @ViewChild("mdlCapturaTipo") mdlCapturaTipo : MdlCapturaTipoComponent;
  readonly MODULO = "Catalogo de Tipos de Notificaciones"  ;
  readonly VERSION = "2024.03.20.01"

  columnsTiposNot : any;
  lstTiposNot = [];
  filtro : string = "";
  idTipoUsuario : number = 0;
  lstTiposUsuarios = [];
  loaded : boolean = true;
  constructor(private service : TiposNotificacionesService) { }

  ngOnInit(): void {
    this.loadColums();
    this.getTiposNotificaciones();
    this.getTiposUsuarios();
  }

  openMdlCaptura(){
    this.mdlCapturaTipo.TipoOpcion = 1;
    this.mdlCapturaTipo.openModal();
  }

  confirmDeleteTipoNotificacion(event : any){
    Swal.fire({
      icon : 'question',
      title : 'Aviso',
      html: '¿Desea eliminar el Tipo de Notificacion <strong>' + event.data.descripcion +  '</strong>?',
      showCancelButton : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'Cancelar'
     }).then((result) =>{
       if(result.isConfirmed){
         this.deleteTipoNotificacion(event.data);
       }
     } );
  }

  async deleteTipoNotificacion(values : any){
    try {
      let data = await this.service.controlTiposNotificaciones(3, values);
      if(!data.data){
        Swal.fire("Ocurrio un error", "No se ha podido recuperar la información", 'error');
        return;
      }
      Swal.fire(data.data.correcto ? "Realizado correctamente" : "Ha ocurrido algun problema",  data.data.mensaje , data.data.icon === 1 ? 'success' : data.data.icon === 2 ? 'error' : 'warning' );
      if(data.data.correcto){        
        this.getTiposNotificaciones();
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
  async getTiposNotificaciones(){
    try {
      let data = await this.service.getTiposNotificaciones(this.filtro, this.idTipoUsuario);

      if(!data){
        Swal.fire("Error", "MENSAJE DE ERROR", 'error');
      }
      if(data.data){
        this.lstTiposNot = data.data;
        this.loaded = false;
      }
    } catch (error) {
      
    }

  }

  onCloseModal(event : any){
    this.getTiposNotificaciones();
  }
  convertToBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }

  loadColums(){
    this.columnsTiposNot = [
        {
          headerName: '#',
          field: 'idTipoNotificacion',
          flex: 2,
          minWidth: 20,
          headerClass: 'header-center header-grid-left',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Descripcion',
          field: 'descripcion',
          flex: 3,
          minWidth: 30,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Tipo Usuario',
          field: 'tipoUsuario',
          flex: 3,
          minWidth: 30,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
        },
        {
          headerName: 'Icono',
          field: 'icono',
          flex: 3,
          minWidth: 30,
          headerClass: 'header-center header-grid',
          cellClass: 'grid-cell-center',
          cellRenderer: (params) => {
            var cellConfig : any = {
              type : 'img',
              value : this.convertToBase64(params.data.icono),
              classes : []
            }
            return this.createCell(cellConfig);
          }
        },
        {
          headerName: 'Editar',
          cellRenderer: 'btnCellRenderer',
          cellRendererParams : {
            onClick : this.onSelectTipoNotificacion.bind(this),
            label: '<i class="fa fa-edit"></i>',
            class: 'btn btn-warning btn-sm'
          },
          headerClass : 'header-center header-grid',
          cellClass : 'grid-cell-btn-center',
          flex: 5,
          minWidth: 90,
          maxWidth: 90,
          suppressSizeToFit : true
        },
        {
          headerName: 'Eliminar',
          cellRenderer: 'btnCellRenderer',
          cellRendererParams : {
            onClick : this.confirmDeleteTipoNotificacion.bind(this),
            label: '<i class="fa fa-times"></i>',
            class: 'btn btn-danger btn-sm'
          },
          headerClass : 'header-center header-grid-right',
          cellClass : 'grid-cell-btn-center',
          flex: 5,
          minWidth: 90,
          maxWidth: 90,
          suppressSizeToFit : true
        }
    ]
  }

  onSelectTipoNotificacion(event : any){
    this.mdlCapturaTipo.TipoOpcion = 2;
    this.mdlCapturaTipo.tipo = event.data;
    this.mdlCapturaTipo.imageURL = this.convertToBase64(event.data.icono).toString();
    this.mdlCapturaTipo.openModal();
  }

  createCell(config: any): any {
    const cell = document.createElement('div');
  
    switch (config.type) {
     
      case 'img':
        if(config.value !== "data:image/png;base64,null"){
          const img = document.createElement('img');
          img.src = config.value;
          img.style.width = '18px';
          img.style.height = '18px';
          cell.appendChild(img);
        }else{
          const label = document.createElement('label');
          label.textContent = "Sin Icono";
          label.classList.add(...config.classes);
          cell.appendChild(label);
        }
        break;
      
      default:
        cell.textContent = 'Invalid type';
        break;
    }
  
    if (config.cell) {
      config.cell = cell;
    }
  
    return cell;
  }
}
