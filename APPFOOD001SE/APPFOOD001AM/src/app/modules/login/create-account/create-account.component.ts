import { Component, OnInit } from '@angular/core';
import {fadeInOut } from '../../../shared/animations/fade-in-out-animations'
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { LoadingController } from '@ionic/angular';
import { UserData, ValidateUser } from 'src/app/models/user';
import { General } from 'src/app/functions/general';
import { Router } from '@angular/router';
//import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
  animations: [fadeInOut]
})
export class CreateAccountComponent implements OnInit {
  general = new General();
  mensaje : string;
  pwMessage : string;
  validUsername : boolean = true;
  validate = new ValidateUser;
  user = new UserData;
  confirmPassword : string;
  validPassword : boolean;
  uppActivaded : boolean;
  constructor(
    private KitchenService : KitchenService
    ,private Load : LoadingController
    ,private Router : Router
    ) { 
      // this.user.password = "";
    }

  ngOnInit(): void {
  }
  onInput(event: any) {
    this.user.userName = this.user.userName.replace(/\s/g, '');
  }
  async validateUsername(){
    if(this.user.userName.length > 0 && this.user.userName){
      let data = await this.KitchenService.validateUsername(this.user.userName);
      this.mensaje = data.data.menssage;
      this.validUsername = data.data.correct
  
      if(this.validUsername){
        this.mensaje = 'Nombre de usuario disponible'
        this.validate.username = true;
      }else{
        this.mensaje = data.data.message
        this.validate.username = true;
      }
    }

  }

  onInputChange(event: any) {
    const inputText = event.data;
    if(!inputText){
      return;
    }
    if(Number(inputText.charAt(0))){
      return;
    }
    else if((inputText.charCodeAt(0) >= 65 && inputText.charCodeAt(0) <= 90))
    {
      this.uppActivaded = true;
    }
    else if((inputText.charCodeAt(0) >= 97 && inputText.charCodeAt(0) <= 122)){
      this.uppActivaded = false;
    }
    else{
      return;
    }
    // if (inputText.charAt(0) === inputText.charAt(0).toUpperCase()) {
     
    // } else {
    //   this.uppActivaded = false;
    // }
  }
  validMail(correo: string): boolean {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    return regexCorreo.test(correo);
  }
  async register(){
    
    if(!this.user.userName || this.user.userName === undefined || this.user.userName === null){
      this.general.showMessage('Capture todos los datos', 'warning','');
      this.validate.username = true;
      return;
    }
    if(!this.user.password || !this.confirmPassword){
      this.general.showMessage('Capture todos los datos', 'warning','');
      this.validPassword = true;
      this.validate.password = true;
      return;
    }
    if(this.user.password === undefined || this.user.password.length<5){
      this.pwMessage = 'Contraseña demasiado corta';
      this.validate.password = true;
      return;
    }
    if(this.pwMessage.length > 0){
      !this.general.showMessage('La contraseña no es valida', 'warning','')
      this.validate.password = true;
      this.validate.password = true;
      return;
    }
    
    if(!(this.user.password === this.confirmPassword )){
     this.general.showMessage('La contraseña no es valida', 'warning','')
     this.validate.password = true;
     this.validate.password = true;
      return;
    }
    if(!this.user.email){
      this.general.showMessage('Capture todos los datos', 'warning','')
      this.validate.email = true;
      return;
    }
    if(!this.validMail(this.user.email)){
      this.general.showMessage('Correo no valido', 'warning','')
      this.validate.email = true;
      return;
    }
    const loading = await this.Load.create({
      message: 'Registrando...', 
    });
    await loading.present();
    try {
      this.user.userName.trim();
      let data = await this.KitchenService.registerNewUser(this.user);
      console.log(data);
      if(!data){
        this.general.showMessage('Error, intentelo de nuevo o revise su conexión a internet, si el problema persiste comuniquese con el equipo de soporte', 'error','');
        return;
      }
      if(data.data.correct){
        this.general.showMessage(data.data.message, 'success','')
        this.Router.navigateByUrl('/formregister?user=' + data.data.value);

        //this.Router.navigate(['/formregister']);
      }else{
        this.general.showMessage(data.data.message, 'warning','')
      }
    } catch (error) {
      this.general.showMessage(error, 'warning', '')
    }
    finally{
      await loading.dismiss();
    }
  }
  validatePassword(): boolean {
    if(!(this.user.password === this.confirmPassword) && this.confirmPassword){
      this.pwMessage = 'Las contraseñas no coinciden'
    }else{
      if(this.pwMessage!=="Contraseña demasiado corta"){this.pwMessage = ''}
    }
    return this.user.password === this.confirmPassword 
  } 
  blurPassword(){
    if(this.user.password !== undefined && this.user.password.length<5){
      this.pwMessage = 'Contraseña demasiado corta';
      this.validate.password = true;
      return false;
    }
    return true;

  }

}
