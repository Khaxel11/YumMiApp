import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output()  onLogin = new EventEmitter<any>();
  version = environment.VERSION;

  username : string;
  password : string;
  constructor(private route : Router) { }

  ngOnInit(): void {
    
  }
  login(){
    if(this.username && this.password){
      this.onLogin.emit(true);
      sessionStorage.setItem("user", JSON.stringify({"name":this.username,"pass":this.password}));
      sessionStorage.setItem("loged", 'true');
      
      window.location.reload();
      this.route.navigateByUrl("/");
    }
  }
}
