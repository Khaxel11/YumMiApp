export class FoodHub {
    idHubCuenta: number;
    idFoodHub: number = 0;
    claveFoodHub: string = "";
    foto: string; // asumiendo que la foto se almacena como una cadena codificada en base64
    nombreHub: string = "";
    calle: string = "";
    entreCalles: string = "";
    colonia: string = "";
    comentarios: string = "";
    ciudad: string = "";
    municipio: string = " ";
    idEstado: number;
    nombreEstado: string = "";
    pais: string = "";
    codigoPostal: string = "";
    numero: string = "";
    calificacion: number = 0;
    tieneServicioDomicilio: boolean;
    horarioConfigurado: boolean;
    servicioDomicilioConfigurado: boolean;
    abierto: boolean;
    coordenadas: string;
    latitud : number;
    longitud : number;
    claveContacto: string;
    contacto: string;
    telefonoContacto: string = "";
    picture: string;
    asignado: boolean;
    idAsignado : number;
    horaApertura : string;
    horaCierre : string;
    esHorarioEspecial : boolean;
    comentariosHorario : string
    estadoHorario : string;
    calificacionesTotales: number;
  }
  