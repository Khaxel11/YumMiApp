import { Component, OnInit, ViewChild } from '@angular/core';
import { TiposProductosService } from '../../../../../services/tipos-productos.service'
import { SafeUrl } from '@angular/platform-browser';
import { MdlTiposProductosComponent } from '../../components/mdl-tipos-productos/mdl-tipos-productos.component';

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
  constructor(private service : TiposProductosService) { }
  lstTiposProductos = [null];
  
  async ngOnInit(): Promise<any> {
    await this.getTiposProductos();
  }

  async getTiposProductos(){
    try {
      let data = await this.service.getTiposProductos("");
      this.lstTiposProductos = [];
      console.log(data);
      this.lstTiposProductos = data.data;
      
      this.loaded = false;
    } catch (error) {
      
    }
  }
  convertToBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  openMdlTiposProductos(){
    this.mdlCaptura.openModal();
  }
}
