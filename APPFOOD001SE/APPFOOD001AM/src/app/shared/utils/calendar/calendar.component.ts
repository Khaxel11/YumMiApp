// calendar.component.ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Input() year: number;
  @Input() month: number;

  daysInMonth: number;
  daysName = [];
  today : number = 0;
  weeks: { dayOfWeek: string; number: number; notes: string; isOtherMonth: boolean }[][] = [];

  ngOnInit() {
    this.updateCalendar();
    this.getToday();
  }

  getToday(){
    const date = new Date();
    date.setDate(date.getDate());
    this.today = (Number)(date.getDate().toString());
  }

  updateCalendar() {
    this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    const days: { dayOfWeek: string; number: number; notes: string; isOtherMonth: boolean }[] = [];
    const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
  
    // Agrega días del mes anterior si es necesario
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDay = new Date(this.year, this.month, -i);
      days.push({
        dayOfWeek: this.getAbbreviatedDayOfWeek(prevMonthDay.getDay()),
        number: prevMonthDay.getDate(),
        notes: '',
        isOtherMonth: true,
      });
    }
  
    // Agrega días del mes actual
    for (let i = 1; i <= this.daysInMonth; i++) {
      const dayOfWeekIndex = new Date(this.year, this.month, i).getDay();
      days.push({
        dayOfWeek: this.getAbbreviatedDayOfWeek(dayOfWeekIndex),
        number: i,
        notes: '',
        isOtherMonth: false,
      });
    }
  
    // Agrega días del mes siguiente si es necesario
    const lastDayOfMonth = new Date(this.year, this.month + 1, 0).getDay();
    let nextMonthDay = 1;
  
    for (let i = 1; i < 7 - lastDayOfMonth && days.length < 42; i++) {
      days.push({
        dayOfWeek: this.getAbbreviatedDayOfWeek(i),
        number: nextMonthDay,
        notes: '',
        isOtherMonth: true,
      });
      nextMonthDay++;
  
      // Reinicia el número del día al llegar al último día del mes actual
      if (nextMonthDay > this.daysInMonth) {
        nextMonthDay = 1;
      }
    }
  
    // Agrega días adicionales del mes siguiente para alcanzar 42 días en total
    while (days.length < 42) {
      var last = days[days.length - 1].number;
      if(last === 31 || last === 30){
        last = 0;
      }
      days.push({
        dayOfWeek: '', // Puedes dejarlo en blanco si no necesitas el día de la semana
        number: last + 1,
        notes: '',
        isOtherMonth: true,
      });
    }
  
    // Divide los días en semanas
    this.weeks = [];
    let week = [];
  
    days.forEach((day, index) => {
      week.push(day);
  
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        this.weeks.push(week);
        week = [];
      }
    });
  }
  

  getAbbreviatedDayOfWeek(dayIndex: number): string {
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return daysOfWeek[dayIndex];
  }

  addNoteToDay(day : any) {
    if(day.isOtherMonth === false){
      const note = prompt('Enter note for day ' + day.number);
      if (note !== null) {
        day.notes = note;
      }
    }
  }

  prevMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    this.updateCalendar();
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.updateCalendar();
  }

  getMonthName(): string {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[this.month];
  }
}
