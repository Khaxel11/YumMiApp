import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, createAnimation } from '@ionic/core';
import {fadeInOut } from '../../../shared/animations/fade-in-out-animations'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'loader',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
 
})
export class StartComponent implements OnInit  {
  img : string;
  idCuenta : string;
  username : string;
  constructor(private router: Router, private navCtrl : NavController) {
    if(localStorage.getItem("picture")){
      this.img = localStorage.getItem("picture");
     }
     if(localStorage.getItem("idCuenta")){
      this.idCuenta = localStorage.getItem("idCuenta");
     }
     if(localStorage.getItem("username")){
      this.username = localStorage.getItem("username");
     }
    this.redirectToOtraPagina();
  }
 ngOnInit(): void {
    
     
 }
 redirectToOtraPagina() {
  
  setTimeout(() => {
    if(this.idCuenta){
      this.navCtrl.navigateRoot('/home');
    }else{
      this.navCtrl.navigateRoot('/login');
    }
    


  }, 3000);
}
}
