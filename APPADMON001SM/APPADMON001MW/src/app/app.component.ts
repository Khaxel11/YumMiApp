import { Component, HostListener, Renderer2, OnInit, ChangeDetectorRef } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  env = environment;
  @BlockUI() blockUI: NgBlockUI;
  sidebarOpen;
  menuOpen: boolean = false;
  subMenuOpen: boolean = false;
  selectedMenu : string;
  isLoged : boolean = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit() {
    
  }
  handleLogin(event: boolean) {
    this.isLoged = event;
  }
  constructor(private authService: AuthenticationService, 
    private Router : Router,
    ){
      this.blockUI.start('Cargando...');
      if(this.authService.isAuthenticated()){
        this.isLoged = true;
      }else{
        this.authService.isLoggedIn$.subscribe(isLoggedIn => {
          this.isLoged = isLoggedIn;
        });
        if(!this.isLoged){
          this.Router.navigateByUrl("/login");
        }
      }
      
      this.blockUI.stop();
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  closeSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }
  closeSession(){
    this.authService.logout();
    window.location.reload();
  }
  toggleSubMenu(menu : string) {
    this.subMenuOpen = !this.subMenuOpen;
    this.selectedMenu = menu;
  }
}
