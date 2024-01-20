import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { LoadingController, NavController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';
import { ProductsService } from 'src/app/services/products/products.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Product } from 'src/app/models/product';
import { ProductBuilder } from 'src/app/models/buildProduct';
import { CameraService } from 'src/app/services/common/camera.service';
@Component({
  selector: 'app-choose-product',
  templateUrl: './choose-product.component.html',
  styleUrls: ['./choose-product.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})

//Agregar campos Ingredientes
// TieneRestriccionAlimentaria bit
// RestriccionesRelacionadas y/o unica  INT

//Agregar campos PRECIOS
// PrecioEspecial    int
// EsPrecioEspecial  bit 
// FechaProgramadaFecha smalldatetime
export class ChooseProductComponent implements OnInit {
  lstTypeof = [];
  lstAlimentacion = [];
  lstCategory = [];
  lstSelectedCategory = [];
  animatedItems: boolean[] = [];
  actualIndex : number = 0;
  general : General;
  MESSAGE : MESSAGE;
  product : Product = new Product();
  selectedIndexForType : number;
  selectedIndexForGroup : number;

  photo : string;
  constructor(private navCtrl : NavController,
    private service : ProductsService,
    private cdr: ChangeDetectorRef,
    private Camera : CameraService,
    private Load : LoadingController,) { }

  ngOnInit() {
    this.getTiposComida();
    this.photo = '../../../../assets/Images/fodicon.svg'
  }
  async slider(e : any){
    
    if(e <= -50){
      console.log(e, "incrementa");
      await this.incressIndex();
      this.actualIndex;
      return;
    }
    if(e >= 50){
      console.log(e, "decrementa");
      this.decreaseIndex();
      await this.actualIndex;
      return;
    }
  }
  startAnimation() {
    this.lstTypeof.forEach((_, index) => {
      setTimeout(() => {
        this.lstTypeof = [...this.lstTypeof, this.lstTypeof[index]];
      }, index * 100);
    });
  }
  
  async selectedOption(e : any, index : number){
    console.log(e);
    const value = e.IdTipo;
    this.product.idTipo = value;
    this.selectedIndexForType = index;
    this.cdr.detectChanges();
  }
  async selecterGroup(e : any, index : number){
    this.product.idTipoAlimentacion = e.IdTipoAlimentacion
    this.selectedIndexForGroup = index;
  }
              
              async incressIndex(){
                this.actualIndex += 1;
                this.cdr.detectChanges();

              }
              async decreaseIndex(){
                if(this.actualIndex <= 0){
                  return;  
                }
                this.actualIndex -= 1;
                this.cdr.detectChanges();

              }


    validateSelectedType(){
    return (this.product.idTipo && this.product.idTipo !== 0) ? true : false;
  }
  cancelGroup(){
    this.product.idTipoAlimentacion = 0;
  }
  cancelType(){
    this.product.idTipo = 0;
  }


  
  continue(){
    /*if(!this.validateSelectedType()){
      this.general.showMessage("Revise su conexión a internet e intentelo de nuevo. ", "danger");
      return;
    }*/
    this.incressIndex();
  }

  selectedCategory(e : any){
    this.lstSelectedCategory.push(e);
    this.lstCategory = this.lstCategory.filter(item => item.IdCategoria !== e.IdCategoria);
    this.cdr.detectChanges();
  }
  async getTiposComida(){
    try {
      let data = await this.service.getTiposComida();
      if(data){
       this.lstTypeof = data.data;
       

        this.lstAlimentacion = data.data2;

        this.lstCategory = data.data3;
        console.log(data);
      }
    } catch (error) {
      this.general.showMessage(this.MESSAGE.NET_ERROR, 'danger');
    }
    
  }
  goBack() {
    this.navCtrl.back();
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }


  async takePicture(){
    const loading = await this.Load.create({
      message: 'Cargando...', 
    });
    
    let photo = await this.Camera.takePicture();
    await loading.present();
    this.photo = photo.uri;
    this.product.foto = photo.base64Image;
    await loading.dismiss();
  }
  async openGallery(){
    const loading = await this.Load.create({
      message: 'Cargando...', 
    });
    
    let photo = await this.Camera.openGallery();
    await loading.present();
    this.photo = photo.uri;
    this.product.foto = photo.base64Image;
    await loading.dismiss();
    
  }
}
