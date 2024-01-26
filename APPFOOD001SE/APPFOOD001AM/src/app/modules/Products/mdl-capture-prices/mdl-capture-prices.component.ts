import { Component, AfterViewInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';@Component({
  selector: 'app-mdl-capture-prices',
  templateUrl: './mdl-capture-prices.component.html',
  styleUrls: ['./mdl-capture-prices.component.css']
})
export class MdlCapturePricesComponent implements AfterViewInit{
  constructor(private modalController: ModalController){

  }
  ngAfterViewInit(): void {
      if(this.priceInputs.length>0){
        this.noPrice = false;
      }
  }
  noPrice : boolean = true;
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

}
