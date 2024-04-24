import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cool-calendar',
  templateUrl: './cool-calendar.component.html',
  styleUrls: ['./cool-calendar.component.css']
})
export class CoolCalendarComponent implements OnInit {
  @Input() startDate: Date;

  daysOfWeek: Date[] = [];

  constructor() {}

  ngOnInit() {
    if (!(this.startDate instanceof Date)) {
      // Si no es un objeto Date, intenta convertirlo
      this.startDate = new Date(this.startDate);
    }
    
    this.generateWeek();
  }

  generateWeek() {
    this.daysOfWeek = [];
    const today = new Date(); // Obtener la fecha de hoy
    const start = new Date(this.startDate);
  
    // Asegurar que start sea un domingo
    start.setDate(start.getDate() - start.getDay());
  
    // Generar días de la semana desde el domingo anterior hasta el sábado siguiente
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(day.getDate() + i);
      this.daysOfWeek.push(day);
    }
  }
  
  obtenerDiaSemana(fecha: Date): string {
    const diasSemana = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    const indiceDia = fecha.getUTCDay();
    return diasSemana[indiceDia];
  }
  obtenerDia(fecha : Date){
    return fecha.getDate().toString().length < 2 ? "0"+fecha.getDate().toString()  : fecha.getDate().toString();
  }
}
