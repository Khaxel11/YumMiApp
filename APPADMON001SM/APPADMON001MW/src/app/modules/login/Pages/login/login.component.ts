import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
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
  constructor(private route : Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    
  }
  async login(){
    this.blockUI.start('Cargando...');
    if(this.username && this.password){
      if (this.username && this.password) {
        // Llamar al método login del servicio de autenticación
        await this.authService.login(this.username, this.password);
      }
      //
      
      
    }
    this.blockUI.stop();
  }
}
