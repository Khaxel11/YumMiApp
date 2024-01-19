import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Animation, createAnimation } from '@ionic/core';
import {fadeInOut } from '../../../shared/animations/fade-in-out-animations'
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { General, MESSAGE } from 'src/app/functions/general';
@Component({
  selector: 'loader',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
 
})
export class StartComponent implements OnInit  {
  img : string;
  idCuenta : string;
  username : string;
  general = new General();
  mensajes = new MESSAGE();
  
  mensaje : string = "Cargando"
  listMensaje = [] = this.mensaje.split('');

  intervalId: any;

  constructor(private router: Router, private navCtrl : NavController, private service : KitchenService) {
    if(localStorage.getItem("picture")){
      this.img = localStorage.getItem("picture");
     }
     if(localStorage.getItem("idCuenta")){
      this.idCuenta = localStorage.getItem("idCuenta");
     }
     if(localStorage.getItem("username")){
      this.username = localStorage.getItem("username");
     }
     this.checkConnection();

     setTimeout(() => {
      this.intervalId = setInterval(() => {
        this.checkConnection();
      }, 20000);
    }, 1000); 
    ;
  }
 ngOnInit(): void {
    
     
 }
 ngOnDestroy(): void {
  clearInterval(this.intervalId);
}

 async checkConnection(){
  try {
    let data = await this.service.checkApiConnection();
      this.redirectToOtraPagina()
  } catch (error) {
    this.setMensaje("Cargando...");
    this.general.showMessage(this.mensajes.NET_ERROR, 'danger');
    return;
  }
 }
setMensaje(value : string){
  this.mensaje = value;
  this.listMensaje = this.mensaje.split('');
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
