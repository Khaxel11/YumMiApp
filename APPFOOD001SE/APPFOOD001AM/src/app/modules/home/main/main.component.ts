import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { LogUser } from 'src/app/models/LogUser';
import { EstablishService } from 'src/app/services/App/establish.service';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { UserJwt, MyUbication } from 'src/app/models/UserJwt';
import { General, MESSAGE } from 'src/app/functions/general';
import { AlertController, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { promise } from 'protractor';
import { MenuStartComponent } from 'src/app/shared/utils/menu-start/menu-start.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NotificationComponent } from '../notification/notification.component';
import { error } from 'console';
import { SheetModalComponent } from 'src/app/shared/components/sheet-modal/sheet-modal.component';
import { ProgramacionFechas } from 'src/app/models/Programation';
import { CalendarDetailComponent } from '../../calendar-programation/components/calendar-detail/calendar-detail.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 
 
  @ViewChild('templateUbicacion') public templateUbicacion: any;
  @ViewChild('menu') menu : MenuStartComponent;
  @ViewChild('highlightedButton', { read: ElementRef }) highlightedButton: ElementRef;

  MESSAGE = new MESSAGE;
  UserJwt = new UserJwt();
  MyUbication = new MyUbication();
  General = new General();
  LogUser = new LogUser();
  loading : any;
  countNotification : number = 0;
  lstNotification = [];
  lstSlider = [];
  isHeaderHidden: boolean = false;


  lstEstados = [];
  lstMunicipio = [];
  lstPedidosProximos = new Array<ProgramacionFechas>();
  constructor(
    private EstablishService : EstablishService,
    private KitchenService : KitchenService,
    private navcontrol : NavController,
    private Load : LoadingController,
    private geolocation: Geolocation,
    private modalController: ModalController,
    private alertController: AlertController,
    private serviceKS : KitchenService,
    private cdr: ChangeDetectorRef,
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
    this.geolocation.getCurrentPosition().then(async (resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('Ubicación actual:', resp.coords.latitude, resp.coords.longitude);
      const lat = String(resp.coords.latitude ?? 0)
      const long = String(resp.coords.longitude ?? 0) 
      sessionStorage.setItem('latitude', lat);
      sessionStorage.setItem('longitude', long);
      await this.getMyUbication(lat, long);
    }).catch((error) => {
      console.error('Error al obtener la ubicación', error);
    });
    
  }
  async getMyUbication(lat, long){
    let data = await this.KitchenService.getMyUbication(lat, long);
    if(!data){
      this.General.showMessage("No se ha podido obtener la ubicación actual, asegurese de estar conectado a internet y de tener activado los servicios de geolocalización", "danger");
      
      this.navcontrol.navigateForward("/");
      this.isHeaderHidden = true;
      return;
    }
    if(data.data){
      this.isHeaderHidden = false;
      this.MyUbication = data.data[0];
      sessionStorage.setItem("IdEstado", String(this.MyUbication.IdEstado));
      sessionStorage.setItem("Ubicacion", this.MyUbication.Ubicacion);
      sessionStorage.setItem("IdMunicipio", String(this.MyUbication.IdMunicipio));
      
    }
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
    this.cdr.detectChanges();
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
        localStorage.setItem("username", this.UserJwt.username);    
        this.menu.username = this.UserJwt.username;


        this.lstPedidosProximos = data.data2;
        await this.getSliderImages();
        
      }
    }catch(error){

    }
    finally{
      await this.loading.dismiss();
    }
  }

  async getSliderImages(){
    try {
      let data = await this.KitchenService.getSliderMenu();
      this.lstSlider = data.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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

  async openChangeUbication(){
    await this.confirm("Cambiar Ubicación",
      "Parece que te encuentras en un lugar diferente a <strong>"+ this.MyUbication.Ubicacion + "</strong><br>¿Deseas cambiar de ubicación?",
       "Seleccionar Diferente", 'Cancelar'
    ).then(async(response) => {
      if(response){
        if(this.lstEstados.length === 0){
          await this.getEstados();
          await this.getMunicipios();
        }
    
        await this.openMdlUbicacion();
      }
    });
    
  }
  async confirm(header: string, Message: string, confirmButtonText: string, cancelButtonText: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        header: header,
        message: Message,
        buttons: [
          {
            text: cancelButtonText,
            role: 'cancel',
            // cssClass: 'secondary',
            handler: () => {
              resolve(false); 
            }
          }, 
          {
            text: confirmButtonText,
            handler: () => {
              resolve(true); 
            }
          }
        ]
      });
      await alert.present();
    });
  }
  
  async openMdlUbicacion() {
   
    await this.buildMessage("Cargando...");
    await this.loading.present();
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer',
      swipeToClose: true,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateUbicacion
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
      
      }else{
       
      }
    })
    await modal.present();
    await this.loading.dismiss();
  }
  async aceptarEstado(){
    const estado = this.lstEstados.find(item => item.IdEstado === this.MyUbication.IdEstado);
    const municipio = this.lstMunicipio.find(item => item.IdMunicipio === this.MyUbication.IdMunicipio);
    const ubicacion = municipio.Nombre + ', ' + String(estado.Abr);
     sessionStorage.setItem("IdEstado", String(this.MyUbication.IdEstado));
      sessionStorage.setItem("Ubicacion", ubicacion );
      sessionStorage.setItem("IdMunicipio", String(this.MyUbication.IdMunicipio));

      this.MyUbication.Ubicacion = ubicacion;
      this.closeMdlEstado();
  }
  async getEstados(){
    let data = await this.serviceKS.getUbication(2, 1);
    this.lstEstados = data.data;
    // this.selectedEstado = 
  }
  async onChangeEstado(){
    await this.getMunicipios();
  }
  async getMunicipios(){
    let data = await this.serviceKS.getUbication(3,Number(sessionStorage.getItem("IdEstado")))
    this.lstMunicipio = data.data;
  }
  closeMdlEstado(){
    this.modalController.dismiss();
  }
  async showDetails(e : any){
    const modal = await this.modalController.create({
      component: CalendarDetailComponent,
      componentProps: {
        programacion: e
      },
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data === true) {
      }
    })

    await modal.present();
  }
}
