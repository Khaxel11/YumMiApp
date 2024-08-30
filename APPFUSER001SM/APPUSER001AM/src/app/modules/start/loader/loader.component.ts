import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { General, MESSAGE } from 'src/app/functions/general';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
 

  readonly imgloader1 = "../../../../assets/Images/ToyFace_BG_Male_2.png";
  readonly imgloader2 = "../../../../assets/Images/ToyFace_BG_Male.png";

 
  mensaje : string = "Cargando"
  listMensaje = [] = this.mensaje.split('');
  username : string;
  img : string;
  idCuenta : string;
  intervalId: any;
  general = new General();
  mensajes = new MESSAGE();

  constructor(private router: Router, private navCtrl : NavController, ) { }

 

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

    
  }

}
