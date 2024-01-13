import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-menu-start',
  templateUrl: './menu-start.component.html',
  styleUrls: ['./menu-start.component.css']
})
export class MenuStartComponent implements OnInit {
  @Input() user : any
  username : string;
  constructor(
    private navCtrl : NavController
  ) { 
  }

  ngOnInit(): void {
  }
  closeSession(){
    this.navCtrl.navigateRoot('/login');
  }
  goToFoodhubs(){
    this.navCtrl.navigateForward('/home/foodhubs');
  }
  goToProducts(){
    this.navCtrl.navigateForward('/products/catalog');
  }
}
