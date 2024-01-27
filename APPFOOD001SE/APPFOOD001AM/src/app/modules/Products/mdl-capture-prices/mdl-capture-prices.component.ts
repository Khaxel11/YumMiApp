import { Component, AfterViewInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Price } from '../../../models/product'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';@Component({
  selector: 'app-mdl-capture-prices',
  templateUrl: './mdl-capture-prices.component.html',
  styleUrls: ['./mdl-capture-prices.component.css']
})
export class MdlCapturePricesComponent implements AfterViewInit{
  noimage:string="../../../../assets/Images/price-list.svg";
  addNewPrice : boolean = false;
  lstPrices = [];

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
  startPrices(){
    this.noPrice = false;
  }
  createNewPrice(){
    this.addNewPrice = true;
    this.lstPrices.push({idPrecio : 0})
  }

}
