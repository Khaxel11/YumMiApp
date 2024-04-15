import { Component, OnInit, ViewChild } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { General } from 'src/app/functions/general';
import { LogUser } from 'src/app/models/LogUser';
import { EstablishService } from 'src/app/services/App/establish.service';
import { CameraService } from 'src/app/services/common/camera.service';
import { SheetModalComponent } from 'src/app/shared/components/sheet-modal/sheet-modal.component';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild("templateSelector") templateSelector : any
  LogUser = new LogUser();
  ReadLogUser = new LogUser();
  ReadFoto = "";
  Foto = "";
  FotoUri : any;
  hasBeenChanged : boolean = false;
  fotoChanged : boolean = false;
  countChanges : number = 0;
  general = new General();
  constructor(private EstablishService : EstablishService,
    private modalController: ModalController,
    private Camera : CameraService,
    private Load : LoadingController,
    private alertController : AlertController
  ) { 
    this.Foto = localStorage.getItem("picture");
    this.ReadFoto = localStorage.getItem("picture");
  }

  ngOnInit(): void {
    this.getLogData();
  }
  async getLogData(){
    let data = await this.EstablishService.getLogData(3, Number(localStorage.getItem("idCuenta")));
    console.log(data.data);
    this.LogUser = data.data;
    let data2 = await this.EstablishService.getLogData(3, Number(localStorage.getItem("idCuenta")));
    this.ReadLogUser = data2.data;

  }

  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/png;base64,' + base64String;
    return imageUrl;
  }
  async openMdlSelector() {
    const modal = await this.modalController.create({
      component: SheetModalComponent,
      cssClass: 'adaptable-modal bottom-drawer-15',
      swipeToClose: true,
      backdropDismiss: false,
      mode: 'ios',
      componentProps: {
        itemTemplate: this.templateSelector
      }
    });
    modal.onWillDismiss().then(async (data) => {

      if (data.data) {
      }else{
        
      }
    })
    await modal.present();
  }
  formatEmailMask(email: string): string {
    if(!email){
      return "";
    }
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
      return email;
    }
  
    const username = email.substring(0, atIndex);
    const domain = email.substring(atIndex);
  
    const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 2);
  
    return maskedUsername + domain;
  }
  
  async onTakePicture(){
    const loading = await this.Load.create({
      message: 'Cargando...', 
    });
    this.closeModal();
    let photo = await this.Camera.takePicture();
    await loading.present();
    this.FotoUri = photo.uri;
    this.Foto = photo.base64Image;
    this.fotoChanged = true;
    await loading.dismiss();
  }
  async onSelectPicture(){
    const loading = await this.Load.create({
      message: 'Cargando...', 
    });
    this.closeModal();
    let photo = await this.Camera.openGallery();
    await loading.present();
    this.FotoUri = photo.uri;
    this.Foto = photo.base64Image;
    this.fotoChanged = true;
    await loading.dismiss();
  }
  closeModal(){
    this.modalController.dismiss();
  }

  onChangeDataValue(prop : string, value? : string){
   this.hasBeenChanged = this.hasChangeValue(value);
  }
  validateProp(prop : string) : boolean{
    return this.LogUser[prop] ? true : false;
  }

  hasChangeValue(value? : string) : boolean{
    
    for (const key in this.LogUser) {
      if (this.LogUser.hasOwnProperty(key)) {
        if(value ){
          this.LogUser['correo'] = value;
          if(this.ReadLogUser['correo'] !== this.LogUser['correo']){
            return true;
          }
          
        }
        if (this.ReadLogUser.hasOwnProperty(key) && this.ReadLogUser[key] !== this.LogUser[key]) {
          return true;
        }
      }
    }
    return false;
  }

  validateKeys(): string | boolean {
    for (const key in this.LogUser) {
      if (this.LogUser.hasOwnProperty(key) && key !== "calificacion" && key !== "bancoConfig" && key !== "foto") {
        if (!this.LogUser[key]) {
          this.validateProp(key)
          return key;
        }
      }
    }
    return true;
  }
  
  

  async confirmChanges(){
    const confirm = this.validateKeys();
    if(typeof confirm != "boolean"){
      this.general.showMessage("Hay campos que no son correctos, favor de revisar", 'danger' );
      return;
    }
    const alert = await this.alertController.create({
      header: '¿Cambiar los datos de usuario?',
      message: "Se cambiaran tus datos personales",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Continuar',
          handler: async () => {
            await this.updateUserData();
          }
        }
      ]
    });
    await alert.present();
  }

  async updateUserData(){
    try {
      const idCuenta = localStorage.getItem("idCuenta");
      let data = await this.EstablishService.updateUserData(Number(idCuenta), this.Foto, this.LogUser);
      if(this.fotoChanged){
        this.Foto;
      }
      if(!data || !data.data){
        this.general.showMessage("Ha ocurrido algun error al momento de actualizar", 'danger');
        return;
      }
      if(data.data){
        this.general.showMessage("Datos actualizados correctamente", 'success');
        if(this.fotoChanged){
          localStorage.setItem("picture", this.Foto);
        }
        this.getLogData();
      }
    } catch (error) {
      
    }
  }
}
