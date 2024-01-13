import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { UserData, ValidateUser, socialMedia } from 'src/app/models/user';
import { General } from 'src/app/functions/general';
import { CameraService } from '../../../services/common/camera.service'
import { LoadingController, AlertController  } from '@ionic/angular';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { jsons } from 'src/app/functions/jsons';
import { citys } from 'src/app/functions/city';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  private jsons = new jsons
  private city = new citys;
  // @ViewChild(IonModal) modal: IonModal;
  start : boolean = false;
  name: string;

  General = new General;
  actualIndex : number = 0;
  slideChangedTrigger = false;
  lstSexos = this.jsons.genders;
  lstStates = [];
  lstCitys = [];
  lstCountrys = []//this.jsons.countrys;
  lstVehicles = this.jsons.vehiclesJSON;
  capturedDataAbout : boolean;
  user = new UserData;
  balls: { color: string }[] 
  validate = new ValidateUser;
  block : boolean = true;
  socialMedia: { name: string, link: string, icon: string }[] = [];
  nameSocialMedia: string;
  linkSocialMedia: string;
  selectedSocialMedia: string;
  showSocialMedia : boolean = false; 
  editedIndex: number | null = null; 
  photo : string;
  isAlredyRegistred : boolean = false;
  constructor(
    private Camera : CameraService,
    private Load : LoadingController,
    public KitchenService : KitchenService,
    private activatedRoute: ActivatedRoute,
    private navCtrl : NavController,
    private alertController: AlertController
  ) {
    this.balls= this.jsons.balls;
    this.getStates();
   }
  
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  
  
  ngOnInit(): void {
    this.photo = '../../../../assets/Images/user-icon.svg'
    const user = this.activatedRoute.snapshot.queryParams.user;
    if(!user){
      this.General.showMessage("Ha ocurrido un problema, revise su conexión a internet e intentelo de nuevo", "danger");
      this.block = true;
      return;
    }
    this.loadCountry();
    this.getDataInfo(user);
    
  }
  async loadCountry(){
    let data = await this.KitchenService.getUbication(1);
    this.lstCountrys = data.data;
  }
  onChangeState(){
    // this.lstCitys = this.city.city[this.user.idState];
    this.getCitys();
  }
  async getDataInfo(user : string){
    try {
      let data = await this.KitchenService.getUserData(2,'','',Number(user)); 
      if(!data){
        this.General.showMessage("Revise su conexión a internet e intentelo de nuevo", "danger");
        this.block = true;
        return;
      }else{
        this.user.userName = data.data.userName;
        this.user.idCuenta = data.data.idCuenta;
        
        localStorage.setItem("idCuenta", data.data.idCuenta);
            
        this.block = false;
      }
    } catch (error) {
      this.General.showMessage("Revise su conexión a internet e intentelo de nuevo", "danger");
      this.block = true;
      return;
    }
   
    
    
  }

  async getStates(){
    let data = await this.KitchenService.getUbication(2, this.user.country === "MX"? 1 : 2); //Si se tiene un pais diferente a MX se cambiara
    this.lstStates = data.data;
  }
  
  async getCitys(){
    let data = await this.KitchenService.getUbication(3, this.user.idState);
    this.lstCitys = data.data;
  }



  slideChanged(e) {

    this.slideChangedTrigger = true;

    setTimeout(() => {
      this.slideChangedTrigger = false;
      const activeIndex = document.querySelector('ion-slides').getActiveIndex().then(index => {
        this.actualIndex = index
      })
    }, 100);
    ;
  }
  async continueBussinessData(){
    //this.capturedDataAbout = true; // ACTIVAR await this.validateUser();
    let capturedDataAbout : Boolean;
    if(this.actualIndex === 0){
      capturedDataAbout = await this.validateUser();
      if(!capturedDataAbout){
        this.General.showMessage("Debe capturar todos los datos para poder continuar", "warning", "Cerrar");
        return;
      }
    }
    if(this.actualIndex === 2){
      capturedDataAbout = await this.validateBusiness();
      if(!capturedDataAbout){
        this.General.showMessage("Debe capturar todos los datos de su establecimiento para poder continuar", "warning", "Cerrar");
        return;
      }
    }
    if(this.actualIndex === 3){
      capturedDataAbout = await this.validateVehicle();
      if(!capturedDataAbout){
        this.General.showMessage("Debe capturar todos los datos de su Vehiculo para poder continuar", "warning", "Cerrar");
        return;
      }
    }
    await this.slides.lockSwipeToNext(false).then(()=>{
      this.slides.slideNext().then(
        ()=>{
           this.slides.lockSwipeToNext(true)
        }
      );
    });
    
    
  }

  async onSlideTouchStart() {
    if(this.capturedDataAbout){
      this.slides.lockSwipeToNext(false);
      return;
    }
    if(this.actualIndex != 1){
      this.slides.lockSwipeToNext(true);
      return;
    }else{
      this.slides.lockSwipeToNext(false);
      return;
    }

  
  }

  async extraValidations() : Promise<any>{
    let ok : boolean = true;
    let year = Number(this.user.birthDate.substring(0,3));
    let actualYear = Number(this.General.setDate().substring(0,3));
    if(year < actualYear - 18 && year > 1960){
      this.General.showMessage("El rango de fecha de nacimiento no es permitido", "warning", "");
      return false;
    }
    if(this.user.cellphone){
      this.user.cellphone = String(this.user.cellphone);
    }
    if(this.user.hasVehicle){
      this.user.homeService = true; //if has vehicle has home service
    }
    if(this.socialMedia && this.socialMedia.length > 0){
      this.user.hasSocialMedia = true;
      this.user.socialMedia = await this.getSocialMedia();
    }
    if(!this.user.description){
      this.user.description = "";
    }
    
    if(this.user.hasVehicle){
      this.user.descriptionVehicle = this.lstVehicles[this.user.vehicleType+1].vehicle;
    }
    /*if(this.user.hasVehicle && (this.user.vehicleType !== 1 && this.user.vehicleType !== 2)){
      this.user.brand = "";
      this.user.model = "";
      this.user.plate = "";
      this.user.year = 0;
      this.user.color = "";
      
    }*/
  }
  async getSocialMedia() : Promise<socialMedia[]>{
    let media = new Array<socialMedia>();
    let obj;
    this.socialMedia.forEach(element => {
      obj = new socialMedia();
      obj.idSocialMedia = 0;
      obj.socialMediaName = element.icon.replace('logo-','').replace('-outline','');
      obj.socialMediaUserName = element.name;
      obj.socialMediaURL = element.link;
      media.push(obj);
    });
    return media
  }
  async registerNewUser(){
    
    await this.extraValidations();

    try {
      let data = await this.KitchenService.addNewUser(this.user)
      if(data.data[0].correct){
        this.presentAlertWithHTML(data.data[0].message);
        this.navCtrl.navigateRoot('/home');
      }else{
        this.General.showMessage(data.data[0].message ? data.data[0].message : "Ha ocurrido algun problema, revise su conexión de internet", "danger")
      }
    } catch (error) {
      this.General.showMessage("Ha ocurrido algun problema, revise su conexión de internet", "danger");
    }
    

  }


  addSocialMedia() {
    if (this.nameSocialMedia && this.selectedSocialMedia) {
      const newSocialMedia = { 
        name: this.nameSocialMedia, 
        link: this.linkSocialMedia, 
        icon: this.obtenerIcono(this.selectedSocialMedia) 
      };

      // Verificar si se está editando o agregando
      if (this.editedIndex) {
        this.socialMedia[this.editedIndex] = newSocialMedia;
        this.editedIndex = null; // Reiniciar el índice de edición
      } else {
        
        if ( !this.socialMedia.some(redSocial => redSocial.name === newSocialMedia.name)) {
          this.socialMedia.push(newSocialMedia);
        }
      }

      // Limpiar los campos después de agregar/editar
      this.nameSocialMedia = '';
      this.linkSocialMedia = '';
      this.selectedSocialMedia = '';
      this.showSocialMedia = true;
    }
  }
  editarRedSocial(index: number) {
    this.editedIndex = index;
    const redSocial = this.socialMedia[index];
    this.nameSocialMedia = redSocial.name;
    this.linkSocialMedia = redSocial.link;
    this.selectedSocialMedia =redSocial.icon.replace('logo-','').replace('-outline','');
    this.showSocialMedia = true; 
  }
  dropSocialMedia(indice: number) {
    this.socialMedia.splice(indice, 1);
  }
  obtenerRedSocialSeleccionada(icono: string): string {
    const redesSociales = Object.entries(this.obtenerIcono(''));
    const seleccionada = redesSociales.find(([_, i]) => i === icono);
    return seleccionada ? seleccionada[0] : '';
  }
  obtenerIcono(redSocial: string): string {
    const iconos = this.jsons.socialMedia;

    return iconos[redSocial] || ''; // Devuelve el ícono correspondiente o cadena vacía si no se encuentra
  }
  async onSlideTouchEnd() {
   
  }
  async validateUser() : Promise<any>{
    let isOk: boolean = true;

    if (!this.user.userName) {
      this.validate.username = true;
      isOk = false;
    } else {
      this.validate.username = false;
    }
  
    if (!this.user.name) {
      this.validate.name = true;
      isOk = false;
    } else {
      this.validate.name = false;
    }
  
    if (!this.user.lastName) {
      this.validate.lastName = true;
      isOk = false;
    } else {
      this.validate.lastName = false;
    }
  
    if (!this.user.lastNameSecondary) {
      this.validate.lastNameSecondary = true;
      isOk = false;
    } else {
      this.validate.lastNameSecondary = false;
    }
  
    if (this.user.gender === null || this.user.gender === undefined) {
      this.validate.gender = true;
      isOk = false;
    } else {
      this.validate.gender = false;
    }
    if (!this.user.birthDate) {
      this.validate.birthDate = true;
      isOk = false;
    } else {
      this.validate.birthDate = false;
    }

    return isOk;
  }
  async validateBusiness() :  Promise<any>{
    let isOk : boolean = true;
    if (!this.user.bussinessName) {
      this.validate.bussinessName = true;
      isOk = false;
    } else {
      this.validate.bussinessName = false;
    }
  
    if (this.user.bussinessType === null || this.user.bussinessType === undefined) {
      this.validate.bussinessType = true;
      isOk = false;
    } else {
      this.validate.bussinessType = false;
    }
  
    if (!this.user.street) {
      this.validate.street = true;
      isOk = false;
    } else {
      this.validate.street = false;
    }
  
    if (!this.user.neighborhood) {
      this.validate.neighborhood = true;
      isOk = false;
    } else {
      this.validate.neighborhood = false;
    }
  
    if (!this.user.city) {
      this.validate.city = true;
      isOk = false;
    } else {
      this.validate.city = false;
    }
  
    if (!this.user.idState) {
      this.validate.state = true;
      isOk = false;
    } else {
      this.validate.state = false;
    }
  
    if (!this.user.country) {
      this.validate.country = true;
      isOk = false;
    } else {
      this.validate.country = false;
    }
  
    if (!this.user.zipCode) {
      this.validate.zipCode = true;
      isOk = false;
    } else {
      this.validate.zipCode = false;
    }
  
    if (!this.user.no) {
      this.validate.no = true;
      isOk = false;
    } else {
      this.validate.no = false;
    }
    return isOk;
  }
  async validateVehicle() :  Promise<any>{
    let isOk : boolean = true;
    if (this.user.hasVehicle && (!this.user.vehicleType || this.user.vehicleType === null || this.user.vehicleType === undefined)) {
      this.validate.vehicleType = true;
      isOk = false;
    } else {
      this.validate.vehicleType = false;
    }
    /*if(this.user.vehicleType === 1 || this.user.vehicleType === 2){
      if(!this.user.brand || this.user.brand === null || this.user.brand === undefined ){
        this.General.showMessage("Capture todos los datos del vehiculo", "warning", "");
        return false;
      }
      if(!this.user.model || this.user.model === null || this.user.model === undefined ){
        this.General.showMessage("Capture todos los datos del vehiculo", "warning", "");
        return false;
      }
      if(!this.user.plate || this.user.plate === null || this.user.plate === undefined ){
        this.General.showMessage("Capture todos los datos del vehiculo", "warning", "");
        return false;
      }
      if(!this.user.color || this.user.color === null || this.user.color === undefined ){
        this.General.showMessage("Capture todos los datos del vehiculo", "warning", "");
        return false;
      }
      if(this.user.vehicleType === 1 && (!this.user.year || this.user.year === null || this.user.year === undefined) ){
        this.General.showMessage("Capture todos los datos del vehiculo", "warning", "");
        return false;
      }
      
    }*/
    return isOk;
  }
  async validateSocialMedia() : Promise<any>{
    let isOk: boolean;
    if (!this.user.cellphone) {
      this.validate.cellphone = true;
      isOk = false;
    } else {
      this.validate.cellphone = false;
    }
  
    if (!this.user.socialMedia || this.user.socialMedia.length === 0) {
      this.validate.socialMedia = true;
      isOk = false;
    } else {
      this.validate.socialMedia = false;
    }
    return isOk;
  }
  async takePicture(){
    const loading = await this.Load.create({
      message: 'Cargando...', 
    });
    
    let photo = await this.Camera.takePicture();
    await loading.present();
    this.photo = photo.uri;
    this.user.photo = photo.base64Image;
    await loading.dismiss();
  }
  async openGallery(){
    const loading = await this.Load.create({
      message: 'Cargando...', 
    });
    
    let photo = await this.Camera.openGallery();
    await loading.present();
    this.photo = photo.uri;
    this.user.photo = photo.base64Image;
    await loading.dismiss();
    
  }
  async presentAlertWithHTML(message : string) {
    const alert = await this.alertController.create({
      // header: 'Alerta con HTML',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
