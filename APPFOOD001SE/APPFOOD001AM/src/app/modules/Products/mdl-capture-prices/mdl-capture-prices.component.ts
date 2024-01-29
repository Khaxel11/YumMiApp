import { Component, AfterViewInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Price } from '../../../models/product'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';import { General, MESSAGE } from 'src/app/functions/general';
@Component({
  selector: 'app-mdl-capture-prices',
  templateUrl: './mdl-capture-prices.component.html',
  styleUrls: ['./mdl-capture-prices.component.css']
})
export class MdlCapturePricesComponent implements AfterViewInit{
  noimage:string="../../../../assets/Images/price-list.svg";
  addNewPrice : boolean = false;
  lstPrices = [];
  general = new General();
  MESSAGES = new MESSAGE();
  constructor(private modalController: ModalController){

  }

  ngAfterViewInit(): void {
      if(this.lstPrices.length>0){
        this.noPrice = false;
      }
      if(this.lstPrices.length === 0){
        this.firstCapt = true;
      }
  }
  noPrice : boolean = true;
  firstCapt : boolean = false;
  price: number = 0;
  unitQuantity: number = 1;
  minQuantity: number = 1;
  maxQuantity: number = 1;
  priceInputs: any[] = [];

  closeModal(e? : any) {
    this.modalController.dismiss(e);
  }
  //iniciar la captura de precios
  startPrices(){
    this.noPrice = false;
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
  //evento al generar el focus al campo precio
  onFocusPrice(e : any){
    if(!this.validateLastCaptured(e)){
      return;
    }
  }
}
