import { Component, OnInit, ViewChild } from '@angular/core';
import { CargosService } from '../../../../../services/cargos.service';
import swal from 'sweetalert2';
import { MdlCapturaComponent } from '../../Components/mdl-captura/mdl-captura.component';
@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css']
})
export class CargosComponent implements OnInit {
  @ViewChild('mdlCaptura') public mdlCaptura : MdlCapturaComponent;
  columnsCargos : any;
  lstCargos : any[] = [];
  filtro : string = "";
  constructor(private service : CargosService) { }

  ngOnInit(): void {
    this.loadColums();
    this.getCargos();
  }
  async getCargos(){
    let data = await this.service.getCargos(this.filtro);
    if(!data){
      swal.fire("Error", "Ocurrio un error", 'error');
      return;
    }
    if(data.data){
      this.lstCargos = data.data;
    }
  }
  openModal(){
    this.mdlCaptura.openModal();
  }
  loadColums(){
    this.columnsCargos = [
      {
        headerName: '#',
        field: 'idCargo',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Clave',
        field: 'claveCargo',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Nombre',
        field: 'nombreCargo',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-left',
      }
    ]
  }
}
