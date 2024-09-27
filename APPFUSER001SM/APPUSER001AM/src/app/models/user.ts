export class validateUser{
  idCuenta :boolean = false;
  username :boolean = false;
  password :boolean = false;
  correo :boolean = false;
  foto :boolean = false;
  idCliente?:boolean = false;
  nombre:boolean = false;
  apellidoPaterno:boolean = false;
  apellidoMaterno?:boolean = false;
  genero:boolean = false;
  fechaNacimiento?:boolean = false;
  verificado?:boolean = false;
  email:boolean = false;
  telefono?:boolean = false;
  recibeNotificaciones:boolean = false;
  direccionConfigurada?:boolean = false;
  idDireccionPredeterminada?:boolean = false;
  metodoPagoConfigurado?:boolean = false;
  idMetodoPagoPredeterminada?:boolean = false;
  tarjetaPredeterminadaConfigurada?:boolean = false;
  idTarjetaPredeterminada?:boolean = false;
  activo:boolean = false;
  fechaInsert:boolean = false;
  fechaUpdate?:boolean = false;
  fechaDelete?:boolean = false;
}
export class Username {
  idCuenta : number ;
  username : string ;
  password : string ;
  correo : string ;
  foto : string;
}

export class User {
    idCliente?: number;
    idCuenta: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    genero: 'M' | 'F' | '';
    fechaNacimiento?: Date;
    verificado?: boolean;
    email: string;
    telefono?: string;
    recibeNotificaciones: boolean;
    direccionConfigurada?: number;
    idDireccionPredeterminada?: number;
    metodoPagoConfigurado?: boolean;
    idMetodoPagoPredeterminada?: number;
    tarjetaPredeterminadaConfigurada?: boolean;
    idTarjetaPredeterminada?: number;
    activo: boolean;
    fechaInsert: Date;
    fechaUpdate?: Date;
    fechaDelete?: Date;
  }
  
