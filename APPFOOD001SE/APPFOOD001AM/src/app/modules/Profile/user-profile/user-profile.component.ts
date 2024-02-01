import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LogUser } from 'src/app/models/LogUser';
import { UserJwt } from 'src/app/models/UserJwt';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  //@ViewChild('backgroundImage', { read: ElementRef }) backgroundImage: ElementRef;
  @ViewChild('icon', { read: ElementRef }) icon: ElementRef;
  @ViewChild('image', { read: ElementRef }) image: ElementRef;
  //@ViewChild('tittle', { read: ElementRef }) tittle: ElementRef;
  user = new LogUser();
  startTop: number;
  startHeight: number;
  //startImageSize: number;
  borderRadiusSet = false; // Variable para rastrear si ya se ha establecido el radio de borde
  allowScroll = false; // Variable para controlar si el desplazamiento está permitido
  username : string = "";
  userJwt = new UserJwt();
  themeToggle = false;


  constructor(private cdr: ChangeDetectorRef,) { 
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
//#endregion

    //#region EVENTOS DE DESPLAZAMIENTO Y GESTOS
    onTouchStart(event: TouchEvent) {
      this.startTop = this.container.nativeElement.offsetTop;
      this.startHeight = this.container.nativeElement.offsetHeight;
      //this.startImageSize = this.backgroundImage.nativeElement.offsetHeight;
    }
    reachedTop = false;
    onTouchMove(event: TouchEvent) {
      if (this.startTop !== undefined && this.startHeight !== undefined /*&& this.startImageSize !== undefined*/) {
        const deltaY = event.touches[0].clientY - this.startTop;
        const newTop = this.startTop + deltaY;
  
        const upperLimit = 65;
        const lowerLimit = window.innerHeight / 4;
        const maxOpacity = 0.8;
        const opacity = maxOpacity - (lowerLimit - Math.abs(newTop)) / lowerLimit;
  
        const maxFont = 25;
  
        const gradientOpacity = 1 - Math.abs(newTop) / lowerLimit;
  
        if (newTop >= upperLimit && newTop <= lowerLimit) {
          this.container.nativeElement.style.top = newTop + 'px';
          this.container.nativeElement.style.height = (this.startHeight - deltaY) + 'px';
         // this.faded.nativeElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, ${gradientOpacity}), rgba(0, 0, 0, 0))`;
  
  
        }
        this.image.nativeElement.classList.add('fadeOut');
        if (newTop >= upperLimit && newTop <= (upperLimit + 10) && !this.reachedTop) {
          this.container.nativeElement.style.borderRadius = '0 0 0 0';
           
           //this.image.nativeElement.classList.remove('image-container');
  
          this.reachedTop = true;
        } else if (newTop > (upperLimit + 10)) {
          this.reachedTop = false;
          this.container.nativeElement.style.borderRadius = '40px 40px 0 0';
          
          //this.image.nativeElement.classList.add('image-container');
  
        }
        if(newTop > lowerLimit - 10){
          this.image.nativeElement.classList.remove('fadeOut');
        }
  
        if (this.reachedTop) {
          //this.icon.nativeElement.classList.a
          this.image.nativeElement.classList.add('active');
        }
        if (!this.reachedTop) {

          this.icon.nativeElement.classList.add('active');
        }
        if (this.reachedTop) {
          this.allowScroll = true;
        } else {
          this.allowScroll = false;
        }
  
        this.startTop = newTop;
      }
    }
    onTouchEnd() {
      this.startTop = undefined;
      this.startHeight = undefined;
      //this.startImageSize = undefined;
    }
    //#endregion
}
