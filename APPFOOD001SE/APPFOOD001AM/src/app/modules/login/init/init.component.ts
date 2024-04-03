import { Component, OnInit } from '@angular/core';
import { KitchenService } from 'src/app/services/Kitchen/kitchen.service';
import { General } from 'src/app/functions/general';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserJwt } from 'src/app/models/UserJwt';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {
  img_User : string = '../../../../assets/Images/user-icon.svg';
  userName : string; 
  password : string;
  General = new General();
  uppActivaded : boolean;
  UserJwt = new UserJwt
  stayConected : boolean;
  constructor(
    private KitchenService : KitchenService
    ,private Load : LoadingController
    ,private Router : Router
    ,private AuthenticationService  : AuthenticationService
    ) { 

      
    }
  
  ngOnInit(): void {

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
  }
  async clickToLogin(){
  
    if(!this.userName || !this.password){
      this.General.showMessage('Usuario o contraseña no capturados', 'warning');
      return;
    }
  const loading = await this.Load.create({
    message: 'Cargando...', 
  });
  
  await loading.present();
    try {
      
      let data = await this.KitchenService.getUserData(0,this.userName, this.password, 0);
      this.img_User = 'data:image/jpeg;base64,' + data.data.picture;
      if(data.data.isLoged){
        const jwtHelper = new JwtHelperService();
          const token = localStorage.getItem('token');
          if(token === null || jwtHelper.isTokenExpired(token)){
            await this.genToken(data.data.idCuenta, data.data.userName).then(()=>{
              if(!localStorage.getItem('token')){
                this.General.showMessage('Unvalid Accesible Token', 'danger');
                return;
              }
            });
          }
        if(data.data.value >= 1){
          if(this.stayConected){
            
            localStorage.setItem("username", data.data.userName);
            localStorage.setItem("idCuenta", data.data.idCuenta);
            localStorage.setItem("picture", this.img_User);
            
          }else{
            localStorage.clear();
            localStorage.setItem("idCuenta", data.data.idCuenta);
            
          }
          
          this.Router.navigateByUrl('/home');
          
        }else{
          this.Router.navigateByUrl('/formregister?user=' + data.data.idCuenta);  
        }
        this.General.showMessage("Se ha iniciado sesión correctamente","success");
        
      }else{
        this.General.showMessage("Usuario o contraseña incorrectos","warning");
      }
    } catch (error) {
      this.General.showMessage("Revise su conexión a internet e intentelo de nuevo","danger");
    }
    finally{
      await loading.dismiss();
    }
    
  }

  async genToken(IdUsuario : string,  user : string){
    this.UserJwt.IdUsuario = IdUsuario.toString();
    this.UserJwt.Zona = '53';
    await this.AuthenticationService.genToken(this.UserJwt).subscribe((result: any) => {
      if (result.error != null) {
        console.log(result.error);
      }
      else {
        // almacenar jwt
        localStorage.setItem('token', result.token);
        
      }
    }, error => {
      //this.router.navigate(['/error-page']);
    });
  }
}
