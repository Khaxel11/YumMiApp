import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-choose-product',
  templateUrl: './choose-product.component.html',
  styleUrls: ['./choose-product.component.css']
})
export class ChooseProductComponent implements OnInit {
  lstTypeof = [];
  lstAlimentacion = [];
  constructor(private navCtrl : NavController) { }

  ngOnInit() {
  }
 
  goBack() {
    this.navCtrl.back();
  }
}
