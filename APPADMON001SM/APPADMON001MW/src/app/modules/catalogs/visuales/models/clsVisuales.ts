
export class clsVisualesAplicaionesEntity{
    idSistema:number = 0;
    nomenclaturaSistema:string = '';
    sistema:string = '';
    descripcion:string = '';
}

export class clsVisualesEntity{
    idVisual:number = 0;
    titulo:string = '';
    subtitulo:string = '';
    strImagen:string = '';
    idSistema:number = 0;
    idUsoMenu:number = 0;
    idOpcionRedirecciona:number = 0;
    descripcionUso:string = '';
    esProgramado:boolean = false;
    fechaInicioProgramado:string = '';
    fechaFinalProgramado:string = ''
    diasApartirProgramado:number = 0;
    activo:boolean = true;
    redirecciona:boolean = false;
}

export class clsVisualesCatproductosEntity{
    idOpcion:number = 0;
    posicion:number = 0;
    idEncabezado:number = 0;
    tituloOpcion:string = '';
    subRuta:string = '';
    esRutaExterna:boolean = true;
}