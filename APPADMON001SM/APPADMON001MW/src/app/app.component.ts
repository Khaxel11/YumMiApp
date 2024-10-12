import { Component, HostListener, Renderer2, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service'
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { clsUsuarioMenu } from './modules/login/models/clsLoginModels';
import { transform } from 'typescript';


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

  // Manuel 02Oct2024
  dataMenuUser:clsUsuarioMenu[]=[];
  menuItems:any;
  userName:any;


  @ViewChild('appcomponent') public appcomponent : any;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  ngOnInit() {;
  }

  handleLogin(event: boolean) {
    this.isLoged = event;
  }
  constructor(public authService: AuthenticationService,
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
    this.sidebarOpen = !this.sidebarOpen;clsUsuarioMenu
  }
  closeSession(){
    this.authService.logout();
    window.location.reload();
  }
  toggleSubMenu(menu : string) {
    this.subMenuOpen = !this.subMenuOpen;
    this.selectedMenu = menu;
  }

  
  // Manuel 02Oct2024
  async onLoginSuccess(obj: any) {
   
    this.userName = obj.userName;

    let data = await this.authService.getOpcionesMenu(obj.idEmpleado); // Llamar al método
    this.dataMenuUser = data.data;
    this.menuItems = this.trasnformTable(this.dataMenuUser);
    console.log(this.menuItems);
  }

  // Manuel 02Oct2024
  trasnformTable(data:any){
    
    const menuItems = data.reduce((acc, current) => {
      // Buscar si ya existe el encabezado
      const existingHeader = acc.find(item => item.tituloEncabezado === current.tituloEncabezado);
      
      // Si existe, agregar el subelemento
      if (existingHeader) {
        existingHeader.subItems.push({ tituloDetalle: current.tituloDetalle, linkDet : current.linkDet });
      } else {
        // Si no existe, crear un nuevo encabezado
        acc.push({
          tituloEncabezado: current.tituloEncabezado,
          icono: current.icono,
          subItems: [{ tituloDetalle: current.tituloDetalle, linkDet : current.linkDet }]
        });
      }
    
      return acc;
    }, []);

    return menuItems;
    
  }
}
