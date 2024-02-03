// import { Component, OnInit, ViewChild,AfterViewInit,Output, EventEmitter} from '@angular/core';
// import { ERPService } from 'src/app/services/ERP.service';
// import { UsuarioERP} from 'src/app/models/dto/UsuarioERP';


// @Component({
//   selector: 'buscar-usuario-erp',
//   templateUrl: './buscar-usuario-erp.component.html',
//   styleUrls: ['./buscar-usuario-erp.component.css']
// })
// export class BuscarUsuarioERPComponent implements OnInit {
//   @ViewChild('mldUsuario') private mdlBuscarUsuario: any;
//   @Output() ItemData = new EventEmitter<any>();
//   UsuarioERP: UsuarioERP = { Id: '',Nombre: '' , ZonaId: '',Correo: '', DepartamentoId: 0}
//   Nombre: string;
//   constructor(public BuscarUsuarioERPService: ERPService) { }

//   ngOnInit(): void {
//   }

//   OpenModalBuscaUsuario(): void {
//     this.mdlBuscarUsuario.OpenModalBuscaUsuario();
// }
// SeleccionItemData(e){
//   this.UsuarioERP = new UsuarioERP();
//   this.UsuarioERP.Id = e.id;
//   this.UsuarioERP.Nombre =e.nombre;
//   this.UsuarioERP.ZonaId = e.zonaId;
//   this.mdlBuscarUsuario.CloseModalBuscarUsuario();
//   this.ItemData.emit(this.UsuarioERP);
// }
// }
