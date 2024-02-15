import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { General } from 'src/app/functions/general';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';

@Component({
  selector: 'app-cards-catalog',
  templateUrl: './cards-catalog.component.html',
  styleUrls: ['./cards-catalog.component.css']
})
export class CardsCatalogComponent implements OnInit {
  lstCards = [];
  flipped : boolean = false;
  general = new General();
  constructor(private NavCtr : NavController, private service : KitchenService) { }

  ngOnInit(): void {
    this.getCards();
  }
  cards = [
    { number: '1234 5678 9101 1121', holder: 'John Doe', expiry: '12/24' },
    { number: '5432 1098 7654 3210', holder: 'Jane Doe', expiry: '06/23' }
  ];

  addNewCard() {
    if(this.lstCards.length>0){
      this.general.showMessage("Solo puedes tener una tarjeta. Elimina la actual para agregar otra", "warning");
      return;
    }
    this.NavCtr.navigateForward("/profile/cards/capture");
  }
  async getCards(){
    let data = await this.service.getCards();
    if(!data.data){
      return;
    }
    if(data.data.length>0){
      this.lstCards=data.data;
    }
  }
  toggleChange(e : any){
    this.flipped = e.detail.checked;
  }
  formatCreditNumber(){
    
  }

}
