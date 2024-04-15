import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { General } from 'src/app/functions/general';
import { EstablishService } from 'src/app/services/App/establish.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  validatePassword : boolean = false;
  validateNewPassword : boolean = false;
  general = new General();
  
  constructor(private service : EstablishService, private navController : NavController, private alertController : AlertController) { }

  ngOnInit(): void {
  }
  async confirm(){
    if(!this.currentPassword || !this.newPassword || !this.confirmPassword){
      this.general.showMessage("Capture toda la información", 'warning');
      return;
    }
    if(this.newPassword.length < 5){
      this.general.showMessage("Contraseña demasiado corta", 'warning');
      return;
    }
    if(this.newPassword !== this.confirmPassword){
      this.general.showMessage("Contraseñas no coinciden", 'danger');
      this.validateNewPassword = true;
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
            await this.changePassword();
          }
        }
      ]
    });
    await alert.present();
   
  }
  async changePassword(){
    try {
      let data = await this.service.updatePassword(this.currentPassword, this.newPassword);
      if(!data || !data.data ){
        this.general.showMessage("Ha ocurrido un error", 'danger');
        return;
      }
      if(!data.data.correct){
        this.general.showMessage("La contraseña actual no es correcta", 'danger');
        this.validatePassword = true;
        return;
      }
      if(data.data){
        this.general.showMessage("Contraseña Actualizada Correctamente, inicie sesión nuevamente", 'success');
        this.clearDataStorage();
        this.validateNewPassword = false;
        this.validatePassword = false;
        this.navController.navigateForward("/");
      }
    } catch (error) {
      this.general.showMessage("Ha ocurrido un error", 'danger');
    }
  }

  clearDataStorage(){
    localStorage.clear();
    sessionStorage.clear();
  }
}
