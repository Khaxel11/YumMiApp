import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';
import { ModalController, NavController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { SafeUrl } from '@angular/platform-browser';
import { SharedDataService } from 'src/app/services/common/SharedService';
import { DishCaptureComponent } from '../dish-capture/dish-capture.component';
import { ChooseProductComponent } from '../dish-capture/choose-product/choose-product.component';
@Component({
  selector: 'app-dish-catalog',
  templateUrl: './dish-catalog.component.html',
  styleUrls: ['./dish-catalog.component.css']
})
export class DishCatalogComponent implements AfterContentInit {
  selectedProduct: any;
  general = new General();
  MESSAGE = new MESSAGE();
  lstProductos = new Array<Product>();
  idCuenta : string;
  idTipo : number = 0;
  idTipoAlimentacion : number = 0;
  idCategoria : number = 0;
  lstProductosAgrupados = [];
  



  constructor(private navCtrl: NavController, 
    public service : ProductsService,
    private sharedService : SharedDataService,
    private modalController : ModalController) { }

  ngAfterContentInit(): void {
      this.idCuenta = localStorage.getItem('idCuenta');
      this.getProductos();
  }

  async getProductos(){
    try {
      let data = await this.service.getProductos(this.idCuenta, this.idTipoAlimentacion, this.idTipoAlimentacion, this.idCategoria);
      this.lstProductos = data.data;
      this.lstProductosAgrupados = this.agruparPorIDTipo(this.lstProductos);

    } catch (error) {
      this.general.showMessage(this.MESSAGE.NET_ERROR + " " + error.error, 'error' ) 
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
    const modal = await this.modalController.create({
      component: ChooseProductComponent,
      componentProps: {
        //foodHub : e
      },
    });
     modal.onWillDismiss().then( async(data)=> {
      
      if(data.data){
        this.getProductos();
      }
    })
    //this.navCtrl.navigateForward('/products/capture', {});
    await modal.present();
  }
  goBack(){

    this.navCtrl.navigateBack('/home');
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
