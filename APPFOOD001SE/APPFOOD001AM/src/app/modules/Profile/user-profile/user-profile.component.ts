import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LogUser } from 'src/app/models/LogUser';
import { UserJwt } from 'src/app/models/UserJwt';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { SheetModalComponent } from 'src/app/shared/components/sheet-modal/sheet-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  
  //@ViewChild('tittle', { read: ElementRef }) tittle: ElementRef;
  user = new LogUser();
  
  userJwt = new UserJwt();
  themeToggle = false;


  constructor(private cdr: ChangeDetectorRef,
    private modalController: ModalController
  ) { 
    this.userJwt.idCuenta = localStorage.getItem("idCuenta");
    this.userJwt.picture = localStorage.getItem("picture");
    this.userJwt.username = localStorage.getItem("username");
    this.user = {
      apellidoMaterno:'Alonso',
      apellidoPaterno:'Aguilar',
      bancoConfig:false,
      calificacion:null,
      calle:'Centro',
      ciudad:'003',
      colonia:'Col. Miguel',
      comentarios:'Casa de color verde',
      cp:'12345',
      cveEstablecimiento:'000003',
      entreCalles:'Plaza y catedral',
      genero:'H',
      hubConfigurado:true,
      idCocinero:1,
      idEstablecimiento:4,
      idEstado:26,
      nombreCocinero:'Axel',
      nombreCompleto:'Axel Aguilar Alonso',
      nombreEstablecimiento:'Comida Rapida El Vaso',
      numero:'1    ',
      numTelefono:'6421000000',
      pais:'MX',
      redesSocialesConfig:true,
      tipoNegocio:'E',
      tipoVehiculo:'1',
        correo : 'usuario@gmail.com',
        nombrePais : 'México',
        nombreEstado : 'Sonora',
        nombreMunicipio : 'Alamos',
        ubicacionCompleta : 'Centro Entre Plaza y catedral #1, Col. Miguel C.P.12345. Alamos, Sonora. México'
    }
    
  }

  ngOnInit(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    // this.initializeDarkTheme(prefersDark.matches);
    // prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkTheme(mediaQuery.matches));
  }
  
  
    //#region CAMBIAR TEMA DE LA APP
  initializeDarkTheme(isDark) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  toggleChange(ev) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: light)');
    this.initializeDarkTheme(prefersDark.matches);
    this.toggleDarkTheme(ev.detail.checked);
  }

  toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
    this.cdr.detectChanges(); // Para forzar la detección de cambios en Angular
  }

  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return imageUrl;
  }

}
