export class Programation{
	idProgramacion : number;
	idProducto : number;
	idFoodHub : number;
	descripcion : string;
	notificacionesActivadas	 : boolean;
	fechasProgramadas = new Array<FechasProgramadas>();
}
export class FechasProgramadas{
	idFechaProgramada :  number;
	idProgramacion : number;
	fecha : string;
	cantidad : number;
	interesados : number;
	confirmado : boolean;
	//notificacionesEnviadas : boolean;
	tipoProgramacion : string;
}
export class ProgramacionAgrupada{
	fechaProgramada : string;
    porConfirmar : boolean;
	items : Array<ProgramacionFechas>;
}

export class ProgramacionFechas{
	idFechaProgramada: number;
    fecha: Date;
    cantidad: number;
    interesados: string;
    confirmado: boolean;
    notificacionesEnviadas: number;
    tipoProgramacion: string;
    activo: boolean;
    fechaProgramada: string;
    precioActual: number;
    idProgramacion: number;
    descripcion: string;
    notificacionesActivas: boolean;
    idProducto: number;
    nombreProducto: string;
    fotoProducto: string;
    fotoFoodHub: string;
    descripcionProducto: string;
    idTipo: number;
    idTipoAlimentacion: number;
    idFoodHub: number;
    claveFoodHub: string;
    idHub: number;
    idContacto: number;
    nombreFoodHub: string;
    calle: string;
    entreCalles: string;
    colonia: string;
    comentariosFoodHub: string;
    ciudadFoodHub: string;
    municipio: string;
    idEstado: number;
    nombreEstado: string;
    pais: string;
    cp: string;
    numeroFoodHub: string;
    calificacion: number;
    idCuenta: number;
    diasPorConfirmar : number;
}
	