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
  