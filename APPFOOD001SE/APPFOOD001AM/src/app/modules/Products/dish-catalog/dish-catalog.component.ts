import { Component, OnInit } from '@angular/core';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { NavController } from '@ionic/angular';
import { General } from 'src/app/functions/general';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { SafeUrl } from '@angular/platform-browser';
import { SharedDataService } from 'src/app/services/common/SharedService';

@Component({
  selector: 'app-dish-catalog',
  templateUrl: './dish-catalog.component.html',
  styleUrls: ['./dish-catalog.component.css']
})
export class DishCatalogComponent implements OnInit {
  selectedProduct: any;
  general = new General();
  lstProductos = new Array<Product>();
  modalController: any;
  idCuenta : string;
  idTipo : number = 0;
  idTipoAlimentacion : number = 0;
  idCategoria : number = 0;
  lstProductosAgrupados = [];
  



  constructor(private navCtrl: NavController, 
    public service : ProductsService,
    private sharedService : SharedDataService) { }

  ngOnInit(): void {
      this.idCuenta = localStorage.getItem('idCuenta');
      this.getProductos();
  }
  async getProductos(){
    try {
      let data = await this.service.getProductos(this.idCuenta, this.idTipoAlimentacion, this.idTipoAlimentacion, this.idCategoria);
      this.lstProductos = data.data;
      this.lstProductosAgrupados = this.agruparPorIDTipo(this.lstProductos);

    } catch (error) {
      
    }
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  async showProductDetails(product: any) {
    this.sharedService.setProducto(product)
    this.navCtrl.navigateForward('/products/catalog/detail', {
    });
  }
  async goToCapture(){
    this.navCtrl.navigateForward('/products/capture', {});
  }
  goBack(){
    this.navCtrl.back();
  }
  agruparPorIDTipo(lstProductos: any[]): any[] {
    return lstProductos.reduce((result, platillo) => {
      const grupoExistente = result.find(item => item.idTipo === platillo.idTipo);
  
      if (grupoExistente) {
        grupoExistente.platillos.push(platillo);
      } else {
        const nuevoGrupo = { idTipo: platillo.idTipo, nombreTipo : platillo.nombreTipo , platillos: [platillo] };
        result.push(nuevoGrupo);
      }
  
      return result;
    }, []);
  }
  
}
