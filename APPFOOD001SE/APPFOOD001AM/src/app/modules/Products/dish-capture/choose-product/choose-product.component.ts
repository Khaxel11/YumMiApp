import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';
import { ProductsService } from 'src/app/services/products/products.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Product } from 'src/app/models/product';

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
  animatedItems: boolean[] = [];
  actualIndex : number = 0;
  general : General;
  MESSAGE : MESSAGE;
  product : Product = new Product();


  constructor(private navCtrl : NavController,
    private service : ProductsService) { }

  ngOnInit() {
    this.getTiposComida();
    
  }
  startAnimation() {
    this.lstTypeof.forEach((_, index) => {
      setTimeout(() => {
        // Agrega el elemento actual al final de la lista
        this.lstTypeof = [...this.lstTypeof, this.lstTypeof[index]];
      }, index * 100);
    });
  }
  
  async selectedOption(e : any){
    console.log(e);
    const value = e.IdTipo;
    this.product.idTipo = value;
    this.incressIndex();
  }

  incressIndex(){
    this.actualIndex += 1;
  }

  validateSelectedType(){
    return (this.product.idTipo && this.product.idTipo !== 0) ? true : false;
  }
  
  continue(){
    if(!this.validateSelectedType()){
      this.general.showMessage("Revise su conexión a internet e intentelo de nuevo. ", "danger");
      return;
    }
    this.incressIndex();
  }

  decressIndex(){
    if(this.actualIndex <= 0){
      return;  
    }
    this.actualIndex -= 1;
  }
  async getTiposComida(){
    try {
      let data = await this.service.getTiposComida();
      if(data){
       this.lstTypeof = data.data;
       

        this.lstAlimentacion = data.data2;
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
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return imageUrl;
  }
}
