import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ChooseProductComponent } from './choose-product/choose-product.component';

@Component({
  selector: 'app-dish-capture',
  templateUrl: './dish-capture.component.html',
  styleUrls: ['./dish-capture.component.css']
})
export class DishCaptureComponent implements OnInit {
  @ViewChild(ChooseProductComponent) product : ChooseProductComponent;
  constructor(private navCtrl : NavController,
    private alert : AlertController) { }

  ngOnInit(): void {
  }
  async goBack() {
    if(this.product.actualIndex === 0){
      this.navCtrl.back();
      return
    }
   await this.leave();
    
  }
  async leave() {
    const alert = await this.alert.create({
      header: '¿Salir?',
      message: 'Tienes datos que aun no haz guardado.<br>¿De verdad deseas salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Si, salir',
          handler: () => {
            this.navCtrl.back();
          },
        },
      ],
    });

    await alert.present();
  }
}
