import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserJwt } from 'src/app/models/common/userJwt';
import { General } from 'src/app/helpers/general';
import { HttpClient, HttpParams } from '@angular/common/http';
import {clsUsuarioMenu } from '../../models/clsLoginModels'
import { AppComponent } from 'src/app/app.component'; // Manuel

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()  onLogin = new EventEmitter<any>();
  @BlockUI() blockUI: NgBlockUI;
  version = environment.VERSION;
  
  
  dataUsuarioMenu:clsUsuarioMenu[]=[];
  username : string;
  password : string;
  UserJWT = new UserJwt();
  general = new General();
  constructor(
    private route : Router, 
    private authService: AuthenticationService,
    public http : HttpClient,
    private appComponent: AppComponent /*Manuel 02Oct2024 para llamar funcion en AppComponent*/
  ) { }

  ngOnInit(): void {
    
  }
  async login(){
    this.blockUI.start('Cargando...');
    if(this.username && this.password){
      //const idEmpleado = await this.authService.login(this.username, this.password);
      //if(!log){ // Manuel Valenzuela 27Sep2024: ajusto ya que regreso el idEmpleado y debe ser > 0
      const data = await this.authService.login(this.username, this.password);
      if (data.idEmpleado == 0) {
        this.blockUI.stop();
        return;
      }
       
      // Manuel Valenzuela 27Sep2024: obtener opciones del usuario logueado usando
      // funcion que esta en AppComponent ==> onLoginSuccess, le paso el data[0] (datos de usuario)
      this.appComponent.onLoginSuccess(data[0]);

      if (this.username && this.password) {
        
        
        //await this.authService.login(this.username, this.password);
        const jwtHelper = new JwtHelperService();
        const token = localStorage.getItem('token');
        this.UserJWT.IdUsuario = this.username;
        if (token === null || jwtHelper.isTokenExpired(token)) {
          this.genToken();
        }else{
          
        }
        localStorage.setItem('IdUsuario', this.UserJWT.IdUsuario );
        this.authService.isSuccesfullyLoged();
        // this.route.navigateByUrl("/");
        // this.general.showMessage("Inicio de sesión correcto", 0);
        // window.location.reload();

      }
      
    }
    this.blockUI.stop();
  }

  
  async genToken() {
    await this.authService.genToken(this.UserJWT).subscribe((result: any) => {
      if (result.error != null) {
        console.log(result.error);
        this.route.navigate(['/login']);
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
