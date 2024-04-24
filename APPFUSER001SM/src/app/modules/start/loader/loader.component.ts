import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  mensaje : string = "Cargando"
  listMensaje = [] = this.mensaje.split('');
  username : string;
  img : string;
  idCuenta : string;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("picture")){
      this.img = localStorage.getItem("picture");
     }
     if(localStorage.getItem("idCuenta")){
      this.idCuenta = localStorage.getItem("idCuenta");
     }
     if(localStorage.getItem("username")){
      this.username = localStorage.getItem("username");
     }

    
  }

}
