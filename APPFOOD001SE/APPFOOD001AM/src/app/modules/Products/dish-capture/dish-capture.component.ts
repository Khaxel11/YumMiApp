import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-dish-capture',
  templateUrl: './dish-capture.component.html',
  styleUrls: ['./dish-capture.component.css']
})
export class DishCaptureComponent implements OnInit {

  constructor(private navCtrl : NavController) { }

  ngOnInit(): void {
  }
  goBack() {
    this.navCtrl.back();
  }
}
