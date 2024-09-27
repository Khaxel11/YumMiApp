import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User, Username, validateUser } from '../../../models/user';
import { General } from 'src/app/functions/general';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  general = new General();
  // user = new User();
  userData : Username = new Username();
  mensaje : string;
  pwMessage : string;
  validUsername : boolean = true;
  validate = new validateUser();
  //#region VARIABLES PARA CONTROLAR MOVIMIENTO
  @ViewChild('slidesContainer', { static: false }) slidesContainer: ElementRef;
  currentSlideIndex: number = 0;
  startX: number = 0;
  currentX: number = 0;
  isDragging: boolean = false;
  currentSlide: string = 'slide2'; 
  animationClass: string = ''; 
  flag  = [
    {flag:'mx', code : '+52', name:'México'}
  ]
  flagSelected : any =   {flag:'mx', code : '+52', name:'México'};
  //#endregion
  uppActivaded : boolean;
  confirmPassword : string;
  validPassword : boolean;
  termsCondition : boolean = false;
  constructor(
    private Load : LoadingController
    ,private Router : Router
  ) { }

  ngOnInit(): void {
  }
  onInput(event: any) {
    this.userData.username = !this.userData.username ? this.userData.username : this.userData.username.replace(/\s/g, '');
  }
  async validateUsername(){
    if(this.userData.username.length > 0 && this.userData.username){
      // let data = await this.KitchenService.validateUsername(this.user.username);
      // this.mensaje = data.data.menssage;
      // this.validUsername = data.data.correct
  
      // if(this.validUsername){
      //   this.mensaje = 'Nombre de usuario disponible'
      //   this.validate.username = true;
      // }else{
      //   this.mensaje = data.data.message
      //   this.validate.username = true;
      // }
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
    
    // if(!this.userData.username || this.userData.username === undefined || this.userData.username === null){
    //   this.general.showMessage('Capture un nombre de usuario', 'warning','');
    //   this.validate.username = true;
    //   return;
    // }
    // if(!this.userData.password || !this.confirmPassword){
    //   this.general.showMessage('Capture una contraseña', 'warning','');
    //   this.validPassword = true;
    //   this.validate.password = true;
    //   return;
    // }
    // if(this.userData.password === undefined || this.userData.password.length<5){
    //   this.pwMessage = 'Contraseña demasiado corta';
    //   this.validate.password = true;
    //   return;
    // }
    // if(this.pwMessage.length > 0){
    //   !this.general.showMessage('La contraseña no es valida', 'warning','')
    //   this.validate.password = true;
    //   this.validate.password = true;
    //   return;
    // }
    
    // if(!(this.userData.password === this.confirmPassword )){
    //  this.general.showMessage('La contraseña no es valida', 'warning','')
    //  this.validate.password = true;
    //  this.validate.password = true;
    //   return;
    // }
    // if(!this.userData.correo){
    //   this.general.showMessage('Capture todos los datos', 'warning','')
    //   this.validate.email = true;
    //   return;
    // }
    // if(!this.validMail(this.userData.correo)){
    //   this.general.showMessage('Correo no valido', 'warning','')
    //   this.validate.email = true;
    //   return;
    // }
    // if(!this.termsCondition){
    //   this.general.showMessage('Debe aceptar Terminos y Condiciones', 'warning','')
    //   return;
    // }
    const loading = await this.Load.create({
      message: 'Registrando...', 
    });
    await loading.present();
    try {
      
      this.navigateToNextSlide();

      // let data = await this.KitchenService.registerNewUser(this.user);
      // console.log(data);
      // if(!data){
      //   this.general.showMessage('Error, intentelo de nuevo o revise su conexión a internet, si el problema persiste comuniquese con el equipo de soporte', 'error','');
      //   return;
      // }
      // if(data.data.correct){
      //   this.general.showMessage(data.data.message, 'success','')
      //   this.Router.navigateByUrl('/formregister?user=' + data.data.value);

      //   //this.Router.navigate(['/formregister']);
      // }else{
      //   this.general.showMessage(data.data.message, 'warning','')
      // }
    } catch (error) {
      this.general.showMessage(error, 'warning', '')
    }
    finally{
      await loading.dismiss();
    }
  }
  validatePassword(): boolean {
    if(!(this.userData.password === this.confirmPassword) && this.confirmPassword){
      this.pwMessage = 'Las contraseñas no coinciden'
    }else{
      if(this.pwMessage!=="Contraseña demasiado corta"){this.pwMessage = ''}
    }
    return this.userData.password === this.confirmPassword 
  } 
  blurPassword(){
    if(this.userData.password !== undefined && this.userData.password.length<5){
      this.pwMessage = 'Contraseña demasiado corta';
      this.validate.password = true;
      return false;
    }
    return true;

  }



  

//#region METODOS DE MOVIMIENTO DEL SLIDER


onTouchStart(event: TouchEvent) {
  this.startX = event.touches[0].clientX;
  this.isDragging = true;
  this.slidesContainer.nativeElement.style.transition = 'none'; 
}


onTouchMove(event: TouchEvent) {
  if (!this.isDragging) return;
  this.currentX = event.touches[0].clientX;
  const deltaX = this.currentX - this.startX;
  const offset = -this.currentSlideIndex * window.innerWidth + deltaX;
}


onTouchEnd(event: TouchEvent) {
  if (!this.isDragging) return;
  this.isDragging = false;

  const deltaX = this.currentX - this.startX; 
  const threshold = window.innerWidth / 4; 

  if (deltaX < -threshold) {
    this.navigateToNextSlide();
  } else if (deltaX > threshold) {
    this.navigateToPreviousSlide();
  }
}

navigateToNextSlide() {
  if (this.currentSlideIndex < 2) { 
    this.animationClass = 'animated-left'; 
    this.currentSlideIndex++;
    this.currentSlide = `slide${this.currentSlideIndex + 1}`;

    setTimeout(() => {
      this.animationClass = ''; 
    }, 500); 
  }
}

navigateToPreviousSlide() {
  if (this.currentSlideIndex > 0) { 
    this.animationClass = 'animated-right'; 
    this.currentSlideIndex--;
    this.currentSlide = `slide${this.currentSlideIndex + 1}`;

    setTimeout(() => {
      this.animationClass = ''; 
    }, 500); 
  }
}

navigateToSlide(slideId: string) {
  if (this.isValidSlide(slideId)) {
    this.currentSlide = slideId;
    this.currentSlideIndex = parseInt(slideId.replace('slide', ''), 10) - 1;
  }
}

isValidSlide(slideId: string): boolean {
  const validSlides = ['slide1', 'slide2', 'slide3'];
  return validSlides.includes(slideId);
}
//#endregion
}
