import { FechasProgramadas, Programation } from "./Programation";

export class ProgramationBuilder {
    private programation: Programation;
  
    constructor() {
      this.programation = new Programation();
    }
  
    withIdProgramacion(id: number): ProgramationBuilder {
      this.programation.idProgramacion = id;
      return this;
    }
  
    withIdProducto(id: number): ProgramationBuilder {
      this.programation.idProducto = id;
      return this;
    }
  
    withIdFoodHub(id: number): ProgramationBuilder {
      this.programation.idFoodHub = id;
      return this;
    }
  
    withDescripcion(descripcion: string): ProgramationBuilder {
      this.programation.descripcion = descripcion;
      return this;
    }
  
    withNotificacionesActivadas(activadas: boolean): ProgramationBuilder {
      this.programation.notificacionesActivadas = activadas;
      return this;
    }
  
    withFechasProgramadas(fechas: FechasProgramadas[]): ProgramationBuilder {
      this.programation.fechasProgramadas = fechas;
      return this;
    }
  
    build(): Programation {
      return this.programation;
    }
  }
  
  export class FechasProgramadasBuilder {
    private fechasProgramadas: FechasProgramadas;
  
    constructor() {
      this.fechasProgramadas = new FechasProgramadas();
    }
  
    withIdFechaProgramada(id: number): FechasProgramadasBuilder {
      this.fechasProgramadas.idFechaProgramada = id;
      return this;
    }
  
    withIdProgramacion(id: number): FechasProgramadasBuilder {
      this.fechasProgramadas.idProgramacion = id;
      return this;
    }
  
    withFecha(fecha: string): FechasProgramadasBuilder {
      this.fechasProgramadas.fecha = fecha;
      return this;
    }
  
    withCantidad(cantidad: number): FechasProgramadasBuilder {
      this.fechasProgramadas.cantidad = cantidad;
      return this;
    }
    
    withTipoProgramacion(tipoProgramacion: string): FechasProgramadasBuilder {
      this.fechasProgramadas.tipoProgramacion = tipoProgramacion;
      return this;
    }
    reset() {
        const builder = new FechasProgramadasBuilder;
    }
    
    build(): FechasProgramadas {
      return this.fechasProgramadas;
    }
  }
  