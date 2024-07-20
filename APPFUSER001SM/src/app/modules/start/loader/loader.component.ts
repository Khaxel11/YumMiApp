import { Component, OnInit } from '@angular/core';
import {  ToyFaceMale2, ToyFaceMale3} from '../../../../assets/images'
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  
  ToyFaceMale2 = ToyFaceMale2;
  ToyFaceMale3 = ToyFaceMale3;
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
