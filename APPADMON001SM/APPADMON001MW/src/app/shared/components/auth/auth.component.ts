import { Component, OnInit } from '@angular/core';
import { UserJwt } from 'src/app/models/common/userJwt';
import { AuthgenService } from 'src/app/services/authgen.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-auth',
  template: ''
})
export class AuthComponent implements OnInit {
  UserJwt: UserJwt;
  error: string;
  modulo: string;
  componente: string;

  constructor(
    private authService: AuthgenService,
    private router: Router,
    public rutaActiva: ActivatedRoute
  ) {
    this.UserJwt = new UserJwt();
    this.UserJwt.IdUsuario = this.rutaActiva.snapshot.params.user;
    this.UserJwt.Zona = this.rutaActiva.snapshot.params.zone;
    this.modulo = this.rutaActiva.snapshot.params.module;
    this.componente = this.rutaActiva.snapshot.params.component;

    if (!this.UserJwt.IdUsuario){
      this.rutaActiva.queryParams.subscribe(
        (params: {pUsuario: string, pZona: string, pDatExt: string}) => {
          this.UserJwt.IdUsuario = params.pUsuario;
          localStorage.setItem('Usuario', this.UserJwt.IdUsuario);
          localStorage.setItem('DatoExt', params.pDatExt);
          this.UserJwt.Zona = params.pZona;
        }
      );
    }
  }

  ngOnInit(): void {
    const jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('token');
    const zona = localStorage.getItem('Zona');
    const idUsuario = localStorage.getItem('IdUsuario');
    if (token === null || jwtHelper.isTokenExpired(token) || zona !== this.UserJwt.Zona || idUsuario !== this.UserJwt.IdUsuario) {
      //if(idUsuario !== null && zona !== null && idUsuario !== undefined && idUsuario !== "" zona !== undefined zona !== "")
      //swal.fire('?','No se han proporcionado parametros para generar un nuevo token','warning')
      this.genToken();
    }
    const route = this.modulo + (this.componente ? '/' + this.componente : '');
    this.router.navigate([route]);
  }

  genToken(): void {
    this.authService.genToken(this.UserJwt).subscribe((result: any) => {
      if (result.error != null) {
        this.error = result.error;
      }
      else {
        // almacenar jwt
        localStorage.setItem('token', result.token);
        localStorage.setItem('Zona', this.UserJwt.Zona);
        localStorage.setItem('Usuario', this.UserJwt.IdUsuario);
        localStorage.setItem('IdUsuario', this.UserJwt.IdUsuario);
        localStorage.setItem('Modulo', this.componente);
        // redirecciona al módulo indicado
        const route = this.modulo + (this.componente ? '/' + this.componente : '');
        this.router.navigate([route]);
      }
    }, error => {
      console.log(error);
    });
  }
}
