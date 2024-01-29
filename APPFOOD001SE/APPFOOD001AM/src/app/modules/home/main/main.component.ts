import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LogUser } from 'src/app/models/LogUser';
import { EstablishService } from 'src/app/services/App/establish.service';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { UserJwt } from 'src/app/models/UserJwt';
import { General, MESSAGE } from 'src/app/functions/general';
import { LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { promise } from 'protractor';
import { MenuStartComponent } from 'src/app/shared/utils/menu-start/menu-start.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NotificationComponent } from '../notification/notification.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
 

  @ViewChild('menu') menu : MenuStartComponent;
  @ViewChild('highlightedButton', { read: ElementRef }) highlightedButton: ElementRef;

  MESSAGE = new MESSAGE;
  UserJwt = new UserJwt();
  General = new General();
  LogUser = new LogUser();
  loading : any;
  countNotification : number = 0;
  lstNotification = [];
  lstSlider = [];
  isHeaderHidden: boolean = false;


  constructor(
    private EstablishService : EstablishService,
    private KitchenService : KitchenService,
    private navcontrol : NavController,
    private Load : LoadingController,
    private geolocation: Geolocation,
    private modalController: ModalController
  ) { 
   

  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isHeaderHidden = (window.pageYOffset > 0);
    console.log("scrolled");
  }
  async ngOnInit(): Promise<any> {
    
    this.UserJwt.idCuenta = localStorage.getItem("idCuenta")
    if(!this.UserJwt.idCuenta){
      this.General.showMessage(this.MESSAGE.ERROR,"danger");
      return;
    }
    this.UserJwt.picture = localStorage.getItem("picture");
    this.UserJwt.username = localStorage.getItem("username");
    if(!this.UserJwt.username || !this.UserJwt.picture || this.UserJwt.idCuenta){
        if(this.log()){
          
        };
        this.obtenerUbicacion();
    }
    //this.getLogData();
  }
  
  obtenerUbicacion() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('Ubicación actual:', resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.error('Error al obtener la ubicación', error);
    });
    
  }



  async openMdlNotificacion(){
    
    const modal = await this.modalController.create({
      component: NotificationComponent,
      componentProps: {
        idCuenta : localStorage.getItem("idCuenta")
      },
    });
     modal.onWillDismiss().then( async(data)=> {
      
      
        this.countNotification = data.data;
      
    })

    await modal.present();
  }

  async log() : Promise<any>{
    return new Promise(async(resolve, reject) => { 
      try {
        await this.getLogIn()
        await this.getLogData();
        await this.getNotifications();
        resolve(true);
   
      } catch (error) {
        reject;
      }
     })
  }

  async getLogData(){
    let data = await this.EstablishService.getLogData(3, Number(this.UserJwt.idCuenta));
    console.log(data.data);
    this.LogUser = data.data;
  }
  async getNotifications(){
    //let min = Math.ceil(1);
    //let max = Math.floor(10);
    const IdCuenta : string = localStorage.getItem("idCuenta");
    let data = await this.KitchenService.getNotification(Number(IdCuenta));
    //console.log(data.data);
    this.lstNotification = data.data;
    this.countNotification =  this.lstNotification.length;
  }
  async getLogIn(){
    await this.buildMessage("Cargando...");
    await this.loading.present();
    try{
      let data = await this.KitchenService.getUserData(2,"","",Number(this.UserJwt.idCuenta));
    
      if(!data){
        this.General.showMessage("Revise su conexión a internet e intentelo de nuevo", "danger");
        return;
      }else{
        localStorage.clear();
        this.UserJwt.username = data.data.userName;
        this.UserJwt.idCuenta = data.data.idCuenta;
        this.UserJwt.picture = 'data:image/jpeg;base64,' + data.data.picture;
        localStorage.setItem("idCuenta", data.data.idCuenta);
        localStorage.setItem("picture", this.UserJwt.picture);    
        this.menu.username = this.UserJwt.username;
        await this.getSliderImages();
      }
    }catch(error){

    }
    finally{
      await this.loading.dismiss();
    }
  }

  async getSliderImages(){
    let data = await this.KitchenService.getSliderMenu();
    this.lstSlider = data.data;
    console.log(data);
  }

  goToProducts(){
    this.navcontrol.navigateForward("products/catalog");
  }
  goToProgramacion(){
    this.navcontrol.navigateForward("programation");
  }
   closeMenu() {
    // document.querySelector('ion-menu-controller').then(menuCtrl => menuCtrl.close());
  }
  async buildMessage(Message : string){
    this.loading = await this.Load.create({
      message: Message, 
    });
  }


  
}
