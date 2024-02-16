import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { General } from 'src/app/functions/general';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cards-catalog',
  templateUrl: './cards-catalog.component.html',
  styleUrls: ['./cards-catalog.component.css']
})
export class CardsCatalogComponent implements OnInit {
  lstCards = [];
  flipped : boolean = false;
  general = new General();
  constructor(private NavCtr : NavController, private service : KitchenService, private alertController: AlertController) { }

  ngOnInit(): void {
    //this.getCards();
  }
  
  ionViewWillEnter() {
    this.getCards();
  }
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
  async dropCard(){
    const alert = await this.alertController.create({
      header: '¿Eliminar?',
      message: '¿Estas seguro de eliminar la tarjeta asociada a tu cuenta permanentemente?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Si, Confirmar',
          handler: async () => {
            await this.deleteCard(this.lstCards[0]);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteCard(e:any){
    try {
      let data = await this.service.saveCard(2,e);
      if (!data.data) {this.general.showMessage("Error, no se ha podido eliminar", 'danger'); return;};
      this.general.showMessage(
        data.data.correct ? 'Eliminado Correctamente' : data.data.message,
        data.data.correct ? 'success' : 'danger'
      );
      if(data.data.correct){
        this.lstCards = [];
      }
    } catch (error) {
      this.general.showMessage("Error, no se ha podido eliminar", 'danger');
    }
    
  }
}
