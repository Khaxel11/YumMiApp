// calendar.component.ts
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  @Input() year: number = 0;
  @Input() month: number = 0;
  @Input() Width : string = "100%";
  @Input() Height : string = "100%";
  @Input() spaceBetweeen : string = "50px";
  @Input() items = []
  @Input() allowEditSelected : boolean = false;
  @Output() onChange = new EventEmitter<any>();
  daysInMonth: number;
  daysName = [];
  today : number = 0;
  actualMonth : number;
  
  weeks: { dayOfWeek: string; number: number; notes: string; isOtherMonth: boolean }[][] = [];
  constructor(private cdr : ChangeDetectorRef){

  }
  ngOnInit() {
    this.updateCalendar();
    this.getToday();
  }
 
  private getToday(){
    const date = new Date();
    date.setDate(date.getDate());
    this.today = (Number)(date.getDate().toString());
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.actualMonth = date.getMonth();
    this.cdr.detectChanges();
  }

  async setCalendar(items : any[]){
    this.items = items;
    await this.generateCalendarDays();
  }
  enableEditable(value : boolean){
    this.allowEditSelected = value;
    if(!value){
      this.generateCalendarDays();
    }

  }

  private updateCalendar() {
    this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    this.generateCalendarDays();
  }

  private async generateCalendarDays() {
    const days: { dayOfWeek: string; number: number; notes: string; isOtherMonth: boolean; selected:boolean , dateObj : Date}[] = [];
    const firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
  
    // Agrega días del mes anterior si es necesario
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevMonthDay = new Date(this.year, this.month, -i);
      days.push({
        dayOfWeek: this.getAbbreviatedDayOfWeek(prevMonthDay.getDay()),
        number: prevMonthDay.getDate(),
        notes: '',
        isOtherMonth: true,
        selected : false,
        dateObj : prevMonthDay
      });
    }
  
    // Agrega días del mes actual
    for (let i = 1; i <= this.daysInMonth; i++) {
      var selected = false;
      const dayOfWeekIndex = new Date(this.year, this.month, i).getDay();
      //para obtener el día real
      //const day = new Date(this.year, this.month+1, i);
      

      days.push({
        dayOfWeek: this.getAbbreviatedDayOfWeek(dayOfWeekIndex),
        number: i,
        notes: '',
        isOtherMonth: false,
        selected:selected,
        dateObj : new Date(this.year, this.month, i)
      });

    }
  
    // Agrega días del mes siguiente si es necesario
    const lastMonth = new Date(this.year, this.month + 1, 0)
    const lastDayOfMonth = lastMonth.getDay();
    let nextMonthDay = 1;
  
    for (let i = 1; i < 7 - lastDayOfMonth && days.length < 42; i++) {
      days.push({
        dayOfWeek: this.getAbbreviatedDayOfWeek(i),
        number: nextMonthDay,
        notes: '',
        isOtherMonth: true,
        selected : false,
        dateObj : new Date(this.year, this.month +1 ,i)
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
        dayOfWeek: '', 
        number: last + 1,
        notes: '',
        isOtherMonth: true,
        selected : false,
        dateObj : new Date(this.year, this.month +1 , last+1)
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
    
    if(this.items){
     days.forEach((day, index) => {
      for (let i = 0; i < this.items.length; i++){
        const element = this.items[i];
        if (element.dateObj.getTime() === day.dateObj.getTime()) {
          day.selected = true;
          return;
        }
      }
     });
    }
  }
  

  private getAbbreviatedDayOfWeek(dayIndex: number): string {
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return daysOfWeek[dayIndex];
  }
  private  selectDay(e : any){
    if(this.allowEditSelected){
      e.selected = !e.selected;
      this.onChange.emit(e);
    }
  }

  // addNoteToDay(day : any) {
  //   if(day.isOtherMonth === false){
  //     const note = prompt('Enter note for day ' + day.number);
  //     if (note !== null) {
  //       day.notes = note;
  //     }
  //   }
  // }

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
