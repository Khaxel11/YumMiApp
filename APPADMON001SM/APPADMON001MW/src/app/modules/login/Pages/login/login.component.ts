import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserJwt } from 'src/app/models/common/userJwt';
import { General } from 'src/app/helpers/general';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()  onLogin = new EventEmitter<any>();
  @BlockUI() blockUI: NgBlockUI;
  version = environment.VERSION;

  username : string;
  password : string;
  UserJWT = new UserJwt();
  general = new General();
  constructor(private route : Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    
  }
  async login(){
    this.blockUI.start('Cargando...');
    if(this.username && this.password){
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
        this.authService.login();
        // this.route.navigateByUrl("/");
        // this.general.showMessage("Inicio de sesión correcto", 0);
        // window.location.reload();
      }
      //
      
      
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
