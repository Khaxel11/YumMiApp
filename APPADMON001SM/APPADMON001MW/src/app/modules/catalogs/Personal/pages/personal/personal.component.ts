import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CatPersonalService } from 'src/app/services/cat-personal.service';
import { MdlAggEditPersonalComponent } from '../../components/mdl-agg-edit-personal/mdl-agg-edit-personal.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {
  @ViewChild('mdlAggEdit') public mdlAggEdit : MdlAggEditPersonalComponent;
  columnsPersonal : any;
  DtsPersonal : any[] = [];

  usuario:string = null;
  constructor(public Servicio:CatPersonalService) {
    this.columnsPersonal = [
      {
        headerName: '#',
        field: 'idempleado',
        flex: 2,
        minWidth: 20,
        headerClass: 'header-center header-grid-left',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Usuario',
        field: 'usuario',
        flex: 3,
        minWidth: 30,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-center',
      },
      {
        headerName: 'Nombre Usuario',
        field: 'nomcompleto',
        flex: 10,
        minWidth: 100,
        headerClass: 'header-center header-grid',
        cellClass: 'grid-cell-left',
      },
      {
        headerName: 'Editar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.Editar.bind(this),
          label: '<i class="fa fa-edit"></i>',
          class: 'btn btn-warning btn-sm'
        },
        headerClass : 'header-center header-grid',
        cellClass : 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit : true
      },
      {
        headerName: 'Eliminar',
        cellRenderer: 'btnCellRenderer',
        cellRendererParams : {
          onClick : this.Eliminar.bind(this),
          label: '<i class="fa fa-times"></i>',
          class: 'btn btn-danger btn-sm'
        },
        headerClass : 'header-center header-grid-right',
        cellClass : 'grid-cell-btn-center',
        flex: 5,
        minWidth: 90,
        maxWidth: 90,
        suppressSizeToFit : true
      }
    ]
   }

  ngOnInit(): void {
    this.ObtenerUsuarios('');
  }

  Editar(event:any){
    const { data: dts } = event;
    const fecha = dts.fechanac.split(' ')[0];
    const dia = fecha.split('/')[1];
    const mes = fecha.split('/')[0];
    const anio = fecha.split('/')[2];
    const fechanac = `${anio}-${mes}-${dia}`

    Object.assign(this.mdlAggEdit.DtsUsuario, {
      nombre: dts.nombreusuario,
      ApellMaterno: dts.apellmaterno,
      ApellPaterno: dts.apellpaterno,
      FechaNac: fechanac,
      SelectPais: dts.idpais,
      SelectEstado: dts.idestado,
      SelectMunicipio: dts.idmunicipio,
      usuario: dts.usuario,
      correo: dts.correo,
      SelectTpoCargo: dts.idcargo,
      SelectTpoUsuario: dts.idtpousuario,
      password: dts.contrasenia ,
      imageSrc: dts.foto !== null ?`data:image/jpeg;base64,${dts.foto}` : null,
      idusuario: dts.idempleado
  });

  this.mdlAggEdit.opcion = 2;
  this.openModal();
  }

  Eliminar(event:any){
    Swal.fire({
      title: '¿Deseas Eliminar?',
      text: "¿Estas seguro de que deseas eliminar el usuario: "+ event.data.usuario +"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.EliminarUsuario(event.data.idempleado);
      }
    }) 
  }

  btnAgregar(){
    this.openModal(true);
  }

  openModal(opcion? : boolean){
    if(opcion){
      this.mdlAggEdit.opcion = 1;
      this.mdlAggEdit.modalname = 'Agregar Personal'
    }
    this.mdlAggEdit.openModal();
  }

  onCloseModal(e : any){
    this.ObtenerUsuarios('');
  }

  btnBuscar(){
    this.ObtenerUsuarios(this.usuario);
  }

  async ObtenerUsuarios(usuario:any): Promise<void> {
    try {
      const datos = await this.Servicio.getUsuarios(usuario).toPromise() as {data:any};
      if (datos.data.length > 0) {
       this.DtsPersonal = datos.data;
      }
    } catch (error) {
      this.MsgError(error, 'Obtener usuarios')
      throw error;
    }
  }

    
  async EliminarUsuario(idusuario:any): Promise<void> {
    const Datos = { idusuario: idusuario};
    try {
      const data = await this.Servicio.EliminarUsuario(Datos).toPromise();
      if (data && data.correcto) {
        await Swal.fire('Guardado', 'Se Elimino correctamente', 'success').then((result) => {
          if (result.isConfirmed) {
            this.ObtenerUsuarios('');
          }
        });
      } else {
        this.MsgError(data ? data.mensaje : '', 'Eliminar los datos');
      }
    } catch (error) {
      this.MsgError(error, 'Eliminar los datos');
    }
  }

  MsgError(error: any, mensaje: string) {
    Swal.fire('Datos', `Ha ocurrido un error (${mensaje}). Favor de comunicarse con el área de informática y generar un reporte de fallas. Código de error: ${error.error}`, 'error');
    throw error;
  }
}
