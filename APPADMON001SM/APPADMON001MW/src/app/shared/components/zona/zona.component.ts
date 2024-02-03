// import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
// import { ERPService } from 'src/app/services/ERP.service';
// import swal from 'sweetalert2';

// @Component({
//   selector: 'select-zona',
//   templateUrl: './zona.component.html',
//   styleUrls: ['./zona.component.css']
// })
// export class ZonaComponent implements OnInit {

//   ListaZona = [];
//   @Input() ZonaValue: string;
//   @Output() ItemData = new EventEmitter<string>();
//   constructor(private Servicios: ERPService) { }

//   ngOnInit(): void {
//     this.BuscarZona();
//   }
//   BuscarZona(){
//     this.Servicios.ListarZona().subscribe((data: any) => {
//       this.ListaZona = data.data;
//     },
//       (error) => {
//         swal.fire(
//           'Datos ',
//           'Ha Ocurrio un Error al Momento de Cargar la Informacion de Lista Zona,'
//           + ' Favor de Comunicarse con el Área de Informatica y Generar un Reporte de Fallas,'
//           + ' <strong>Código de Error: ' + error.error + '</strong>',
//           'error'
//         );
//       });
//   }

// }
