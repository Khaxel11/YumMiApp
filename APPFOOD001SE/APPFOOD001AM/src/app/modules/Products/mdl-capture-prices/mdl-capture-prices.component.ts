import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AlertController, Gesture, ModalController } from '@ionic/angular';
import { Price } from '../../../models/product'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';import { General, MESSAGE } from 'src/app/functions/general';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-mdl-capture-prices',
  templateUrl: './mdl-capture-prices.component.html',
  styleUrls: ['./mdl-capture-prices.component.css']
})
export class MdlCapturePricesComponent implements AfterViewInit{
  @ViewChild('price-card') priceCard: ElementRef;
  idProducto : number;
  nombre : string = "";

  private pressGesture: Gesture;
  noimage:string="../../../../assets/Images/price-list.svg";
  addNewPrice : boolean = false;
  lstPrices = [];
  lstCopyOfPrices = [];
  lstPric
  general = new General();
  MESSAGES = new MESSAGE();
  already : boolean = false;
  constructor(private modalController: ModalController,
    private alert : AlertController,
    private service : ProductsService,
    private cdr: ChangeDetectorRef,){

  }

  ngAfterViewInit(): void {
    this.lstCopyOfPrices = [...this.lstPrices]
      if(this.lstPrices.length>0){
        
        this.noPrice = false;
        this.already = true;
        this.formatList();
      }
      if(this.lstPrices.length === 0){
        this.firstCapt = true;
      }
      this.cdr.detectChanges();
  }
  noPrice : boolean = true;
  firstCapt : boolean = false;
  price: number = 0;
  unitQuantity: number = 1;
  minQuantity: number = 1;
  maxQuantity: number = 1;
  priceInputs: any[] = [];

  closeModal(e? : any) {
    // var data;
    // if(e){
    //    data = true;
    // }else{
    //   data = this.lstCopyOfPrices;
    // }
    
    this.modalController.dismiss(e);
  }
  //iniciar la captura de precios
  startPrices(){
    this.noPrice = false;
  }

  async savePrices(){
    if(!this.lstPrices){
      return;
    }
    try {
      const idCuenta = localStorage.getItem('idCuenta');
      let data = await this.service.savePrecios(Number(idCuenta), this.idProducto, this.lstPrices);
      if(!data.data){
        this.general.showMessage(this.MESSAGES.ERROR, "");
        return;
      }
      console.log(data);
    } catch (error) {
      
    }
  }

  //evento cuando pierde el blur el precio
  onBlurPrice(e : any){
    if(!e.precioUnitario || e.precioUnitario === 0){
      e.errorPrice = true;
    }else{
      e.errorPrice = false;
    }
    const isNotMax = this.lstPrices.some(item => item.precioUnitario < e.precioUnitario);
    if(isNotMax){
      this.general.showMessage("El precio unitario capturado es mayor a uno ya existente", 'warning');
    } 
    
  }
  //validacion para el ultimo precio capturado y asignacion de errores y colores
  validateLastCaptured(e:any) : boolean{
    if(!e){
      return true;
    }
    if(!e.cantidadMinima || e.cantidadMinima === 0){
      e.errorMin = true;
      this.general.showMessage(this.MESSAGES.BLANK("cantidad mínima"),'warning');
      return false;
    }else{
      e.errorMin = false;
    }
    if(!e.cantidadMaxima || e.cantidadMaxima === 0){
      e.errorMax = true;
      this.general.showMessage(this.MESSAGES.BLANK("cantidad máxima"),'warning');
      return false;
    }else{
      e.errorMax = false;
    }
  
    if(e.cantidadMinima > e.cantidadMaxima){
      e.errorMax = true;
      e.errorMin = true;
      this.general.showMessage("La cantidad mínima, no debe superar la cantidad máxima",'warning');
      return false;
    }else{
      e.errorMax = false;
      e.errorMin = false;
    }
    
    
    
    return true;
  }
  //crea una nueva carta despues de pasar validación
  createNewPrice(e : any){
    if(!this.validateLastCaptured(this.getLastPrice())){
      
      return;
    };
    this.setCompletedLastPrice();
    this.addNewPrice = true;
    this.lstPrices.push({idPrecio : 0 , isCaptured : false})
    this.sortPrices();
  }
  //aplica guardado y completado al ultimo precio
  setCompletedLastPrice(){
    if (this.lstPrices.length > 0) {
      this.lstPrices[this.lstPrices.length-1].isCaptured = true;
    } else {
      return null;
    }

  }
  //obtiene el ultimo elemento de la lista de precios
  getLastPrice(): any {
    if (this.lstPrices.length > 0) {
      return this.lstPrices[this.lstPrices.length - 1];
    } else {
      return null;
    }
  }

  async sortPrices(){
    this.lstPrices.sort((a, b) => {
      // Primero, ordena por si está capturado en orden descendente
      if (b.isCaptured - a.isCaptured !== 0) {
        return b.isCaptured - a.isCaptured;
      }
  
      // Si están capturados, ordena por precio unitario en orden ascendente
      return b.precioUnitario - a.precioUnitario;
    });
  }
  //evento al generar el focus al campo precio
  onFocusPrice(e : any){
    if(!this.validateLastCaptured(e)){
      return;
    }
  }
  formatList(){
    this.lstPrices.forEach(element => {
      element.isCaptured = true;

    });
  }

  async deleteItem(e : any){
    let index = this.lstPrices.indexOf(e);
    if(!e.isCaptured){
      this.lstPrices.splice(index,1);
      this.general.showMessage('Se ha eliminado el precio', 'success');
    }else{
      
      if(await this.askToDelete()){
        this.lstPrices.splice(index,1);
      }
    }
  }
  async askToDelete() : Promise<boolean>{
    let value : boolean = false;
    const alert = await this.alert.create({
      header: '¿Eliminar?',
      message: 'Deseas eliminar el precio. Esta acción es irreversible',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          
        },
        {
          text: 'Si, eliminar',
          handler: () => {
            value = true;
          },
        },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();
      
      if (result.role === 'cancel') {
        value = false;
      } else {
        value = true;
      }
      return value;
    }
  
    

}
