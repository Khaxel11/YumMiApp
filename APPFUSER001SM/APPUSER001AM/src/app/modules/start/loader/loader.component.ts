import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import {  ToyFaceMale2, ToyFaceMale3} from '../../../../assets/images'
=======
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';

>>>>>>> Stashed changes
=======
import {  ToyFaceMale2, ToyFaceMale3} from '../../../../assets/images'
>>>>>>> Stashed changes
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  
  ToyFaceMale2 = ToyFaceMale2;
  ToyFaceMale3 = ToyFaceMale3;
=======
  readonly imgloader1 = "../../../../assets/Images/ToyFace_BG_Male_2.png";
  readonly imgloader2 = "../../../../assets/Images/ToyFace_BG_Male.png";
>>>>>>> Stashed changes
=======
  
  ToyFaceMale2 = ToyFaceMale2;
  ToyFaceMale3 = ToyFaceMale3;
>>>>>>> Stashed changes
  mensaje : string = "Cargando"
  listMensaje = [] = this.mensaje.split('');
  username : string;
  img : string;
  idCuenta : string;
<<<<<<< Updated upstream
  intervalId: any;
  general = new General();
  mensajes = new MESSAGE();

  constructor(private router: Router, private navCtrl : NavController, ) { }
=======

  constructor() { }
>>>>>>> Stashed changes

  ngOnInit(): void {
    if(localStorage.getItem("picture")){
      this.img = localStorage.getItem("picture");
     }
     if(localStorage.getItem("idCuenta")){
      this.idCuenta = localStorage.getItem("idCuenta");
     }
     if(localStorage.getItem("username")){
      this.username = localStorage.getItem("username");
     }
<<<<<<< Updated upstream
     this.checkConnection();

     const timeoutId = setTimeout(() => {
      this.intervalId = setInterval(() => {
        this.checkConnection();
      }, 20000);
    }, 1000);
    
    // Para cancelar el timeout antes de que se complete
    clearTimeout(timeoutId);
    ;
  }
  setMensaje(value : string){
    this.mensaje = value;
    this.listMensaje = this.mensaje.split('');
  }
  async checkConnection(){
    try {
      // let data = await this.service.checkApiConnection();
        this.fullyLoad()
    } catch (error) {
      this.setMensaje("Cargando...");
      this.general.showMessage(this.mensajes.NET_ERROR, 'danger');
      return;
    }
   }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  fullyLoad() {
  
    setTimeout(() => {
      if(this.idCuenta){
        this.navCtrl.navigateRoot('/home');
      }else{
        this.navCtrl.navigateRoot('/login');
      }
   
    }, 100); //3000
=======

    
>>>>>>> Stashed changes
  }

}
