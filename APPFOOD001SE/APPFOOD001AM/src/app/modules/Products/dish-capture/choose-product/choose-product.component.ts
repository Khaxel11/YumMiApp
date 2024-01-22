import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
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
  lstIngredientes = [];
  animatedItems: boolean[] = [];
  actualIndex : number = 0;
  General = new General();
  MESSAGE = new MESSAGE();
  product : Product = new Product();
  selectedIndexForType : number;
  selectedIndexForGroup : number;
  minIndex : number = 0;
  maxIndex : number = 4;

  photo : string;
  constructor(private navCtrl : NavController,
    private service : ProductsService,
    private cdr: ChangeDetectorRef,
    private Camera : CameraService,
    private Load : LoadingController,
    private alert : AlertController) { }

  ngOnInit() {
    this.getTiposComida();
    this.photo = '../../../../assets/Images/fodicon.svg'
  }
  async slider(e : any){
   
    if(e <= -50){
      console.log(e, "incrementa");
      await this.continue();

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
    if(this.product.idTipoAlimentacion){
      await this.getIngredientes();

     }
  }
              
              async incressIndex(){
                if(this.maxIndex > this.actualIndex){
                  this.actualIndex += 1;
                  this.cdr.detectChanges();
                }
                

              }
              async decreaseIndex(){
                if(this.actualIndex <= 0){
                  return;  
                }
                this.actualIndex -= 1;
                this.cdr.detectChanges();

              }


    
  cancelGroup(){
    this.product.idTipoAlimentacion = 0;
  }
  cancelType(){
    this.product.idTipo = 0;
  }
  cancelCategory(e : any){
    this.lstSelectedCategory = this.lstSelectedCategory.filter(item => item.IdCategoria !== e.IdCategoria);
    this.lstCategory.push(e);
    this.cdr.detectChanges();
  }

  
  async continue(){
    if(this.actualIndex === 0){
      if(!this.validateSelectedType()){
        await this.General.showMessage(this.MESSAGE.BLANK("Tipo de Captura"), "warning");
        return;
      }
      if(!this.validateSelectedAlimentacion()){
        await this.General.showMessage(this.MESSAGE.BLANK("Categoria de Alimentación"), "warning");
        return;
      }
    }
    if(this.actualIndex === 1){
      if(!this.validateSelectedCategory()){
        await this.General.showMessage(this.MESSAGE.AT_LEAST("una Categoría"), "warning");
        return;
      }
    }
    if(this.actualIndex === 2){
      if(!this.validateSelectedName()){
        await this.General.showMessage(this.MESSAGE.BLANK("Nombre del platillo"), "warning");
        return;
      }
    }
    if(this.actualIndex === 3){
      if(this.validateSelectedIngredients().length === 0){
        await this.General.showMessage(this.MESSAGE.AT_LEAST("un ingrediente"), "warning");
        return;
      }
    }

    // if(!this.validateSelectedPicture()){
    //   return;
    // }
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
      this.General.showMessage(this.MESSAGE.NET_ERROR, 'danger');
    }
    
  }
  async getIngredientes(){
    try {
      let data = await this.service.getIngredientes(this.product.idTipoAlimentacion);
      if(data){
        this.lstIngredientes = data.data;
        this.cdr.detectChanges();
      }
    } catch (error) {
      this.General.showMessage(this.MESSAGE.NET_ERROR, 'danger');
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
 
  validateSelectedType() : boolean {   
    return (this.product.idTipo && this.product.idTipo !== 0)
  }
  validateSelectedAlimentacion() : boolean {
    return (this.product.idTipoAlimentacion && this.product.idTipoAlimentacion !== 0)
  }
  validateSelectedCategory() : boolean {
    return (this.lstSelectedCategory.length > 0)
  }
  async validateSelectedPicture(){
    //return (this.photo !== '../../../../assets/Images/fodicon.svg')
    const alert = await this.alert.create({
      header: '¿Continuar sin Foto?',
      message: 'Sin foto tu producto no tendra tanta visualización, ¿Deseas continuar sin foto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return false;
          },
        },
        {
          text: 'Si, Continuar',
          handler: () => {
            return true;
          },
        },
      ],
    });

    await alert.present();
  }
  validateSelectedName(){
    return (this.product.nombreProducto && this.product.nombreProducto !== "")
  }
  validateSelectedDescription(){

  }
  validateSelectedIngredients() : any[]{
    return this.lstIngredientes.filter(ingrediente => ingrediente.selected);
  }
}
