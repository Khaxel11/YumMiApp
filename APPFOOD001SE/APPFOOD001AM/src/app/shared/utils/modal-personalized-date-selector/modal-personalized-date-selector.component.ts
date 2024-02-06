import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { General } from 'src/app/functions/general';

@Component({
  selector: 'modal-personalized-date-selector',
  templateUrl: './modal-personalized-date-selector.component.html',
  styleUrls: ['./modal-personalized-date-selector.component.css']
})
export class ModalPersonalizedDateSelectorComponent implements OnInit {
  General = new General();
  date  = new Date();
  selectedDays: string[] = [];
  daysAvailable = ['D','L','M','X','J','V','S'];
  repetFor = [{value : 0, label : ''}];
  selectedRepet : number = 1;
  totalRepetition : number = 1;
  label : string;
  checkEnd : boolean = false;
  dateEnd : any;
  neverChecked: boolean = false;
  fechaHora: string | null = null;
  selectedOption: number = 1; 
  constructor(private modalController : ModalController) {
    this.repetFor = [
      {
        value : 1,
        label : this.obtenerDiaSemana(this.date),
      },
      {
        value : 2,
        label : 'Lunes a viernes'
      },
      {
        value : 3,
        label : 'Día(s)'
      },
      {
        value : 4,
        label : 'Semana(s)'
      },
      {
        value : 5,
        label : 'Mes(es)'
      },
      {
        value : 6,
        label: 'Año(s)'
      }
    ]
    this.dateEnd = this.General.setDate();
   }

  ngOnInit(): void {
    this.handleChange({detail:{value: 1}})
  }
  async generateDates(): Promise<Date[]> {
    const generatedDates: Date[] = [];
    const limit = new Date(this.dateEnd);
    switch (this.selectedRepet) {
      case 1:
        // Repetir cada día al día de hoy
        const currentDate4 = new Date();
        const selectedDayOfWeek = currentDate4.getDay(); // Obtener el día de la semana actual (0: Domingo, 1: Lunes, ..., 6: Sábado)
        if(this.selectedOption === 2){
          const currentDate4 = new Date();
          const selectedDayOfWeek = currentDate4.getDay();
          let i = 0;
          
          while (true) {
            const nextDate = new Date(currentDate4);
            let daysToAdd = selectedDayOfWeek - nextDate.getDay() + 7 * i;
            nextDate.setDate(nextDate.getDate() + daysToAdd);
          
            // Verificar si la fecha generada está dentro del rango permitido
            generatedDates.push(nextDate);
            if (nextDate >= limit) {
              break;
            }
          
            
            i++;
          }
        }else{
          for (let i = 0; i < this.totalRepetition; i++) {
            const nextDate = new Date(currentDate4);
  
            // Calcular la diferencia de días para llegar al próximo día de la semana seleccionado
            let daysToAdd = selectedDayOfWeek - nextDate.getDay() + 7 * i;
            nextDate.setDate(nextDate.getDate() + daysToAdd);
  
            generatedDates.push(nextDate);
          }
        }
        
        break;
      case 2:
        // Lunes a viernes
        const daysOfWeek = ['L', 'M', 'X', 'J', 'V'];
        if(this.selectedOption === 2){
          
          let j = 0;
          var flag : boolean = true;
          while (flag) {
            for (const day of daysOfWeek) {
              const nextDate = this.calculateNextDate(day, j);
              generatedDates.push(nextDate);
              // Verificar si la fecha generada está dentro del rango permitido
              if (nextDate >= limit) {
                flag = false;
                break;
              }
        
              
            }
        
            j++;
          }
        }else{
          for (let i = 0; i < this.totalRepetition; i++) {
            for (const day of daysOfWeek) {
              const nextDate = this.calculateNextDate(day, i);
              generatedDates.push(nextDate);
            }
          }
        }
        
        break;
      case 3:
        // Repetición por día(s)
       if(this.selectedOption === 2){
        let k = 0;
          var flagDay : boolean = true;
          while (flagDay) {
              const nextDate = new Date();
              nextDate.setDate(nextDate.getDate() + k);
              generatedDates.push(nextDate);
              // Verificar si la fecha generada está dentro del rango permitido
              if (nextDate >= limit) {
                flagDay = false;
                break;
              }
        
              
                    
            k++;
          }
       }else{
        for (let i = 0; i < this.totalRepetition; i++) {
          const nextDate = new Date();
          nextDate.setDate(nextDate.getDate() + i);
          generatedDates.push(nextDate);
        }        
       }
        break;
       case 4:
      // Repetición por semana(s)
      let currentDate = new Date();
        let actualLength = 0;
        let nextLength = 0;
        if(this.selectedOption === 2){
          let l = 0;
          var flagWeek : boolean = true;
          while (flagWeek) {
            const weekDates = this.calculateWeekDates(currentDate, limit);
              actualLength = generatedDates.length;
              // Verificar si la fecha generada está dentro del rango permitido
              generatedDates.push(...weekDates);
              // Avanza a la siguiente semana
              currentDate.setDate(currentDate.getDate() + 7);
              nextLength = generatedDates.length;
              //Ya no genero más fechas, termina
              if(actualLength === nextLength){
                flagWeek = false;
                break;
              }
              l++;
          }
        }else{
          for (let i = 0; i < this.totalRepetition; i++) {
            const weekDates = this.calculateWeekDates(currentDate);
            generatedDates.push(...weekDates);
    
            // Avanza a la siguiente semana
            currentDate.setDate(currentDate.getDate() + 7);
          }
           
        }
        
      break;

    
    case 5:
      // Repetición por mes(es)
      let currentDate2 = new Date();
      
      if(this.selectedOption === 2){
        let flagMonth = true;
        while (flagMonth) {
          const startDay = currentDate2.getDate();
          const lastDayOfMonth = new Date(currentDate2.getFullYear(), currentDate2.getMonth() + 1, 0).getDate();
        
          for (let day = startDay; day <= lastDayOfMonth + startDay; day++) {
            const nextDate = new Date(currentDate2.getFullYear(), currentDate2.getMonth(), day);
        
            // Verificar si la fecha generada es mayor a la fecha límite
            if (nextDate > limit) {
              flagMonth = false;
              break;
            }
        
            generatedDates.push(nextDate);
          }
        
          currentDate2.setMonth(currentDate2.getMonth() + 1);
        }
      }else{
        for (let i = 0; i < this.totalRepetition; i++) {
          const startDay = currentDate2.getDate();
          const lastDayOfMonth = new Date(currentDate2.getFullYear(), currentDate2.getMonth() + 1, 0).getDate();
            for (let day = startDay; day <= lastDayOfMonth+startDay; day++) {
              const nextDate = new Date(currentDate2.getFullYear(), currentDate2.getMonth(), day);
              generatedDates.push(nextDate);
            }
            currentDate2.setMonth(currentDate2.getMonth() + 1);
        }
      }
     
      // Avanza al siguiente mes
      
      break;
      case 6:
  // Repetición por año(s)
      const currentDate3 = new Date();
      const startDay = currentDate3.getDate();

      const totalDaysInYear = 365; 
      const totalDays = totalDaysInYear * this.totalRepetition;

      for (let i = 0; i < totalDays+ startDay; i++) {
        const nextDate = new Date(currentDate3.getFullYear(), currentDate3.getMonth(), currentDate3.getDate() + i);
        generatedDates.push(nextDate);
      }
      break;
    }
  
    return generatedDates;
  }
  calculateNextWeekDate(currentDate: Date): Date {
    let currentDay = currentDate.getDay();
    let daysToAdd = 0;
  
    while (daysToAdd <= 7) {
      const nextDay = this.daysAvailable.find(day => this.selectedDays.includes(day) && this.daysAvailable.indexOf(day) >= currentDay);
  
      if (nextDay !== undefined) {
        daysToAdd += this.daysAvailable.indexOf(nextDay) - currentDay + (this.daysAvailable.indexOf(nextDay) < currentDay ? 7 : 0);
        break;
      }
  
      daysToAdd += 1;
      currentDay = (currentDay + 1) % 7; // Avanza al siguiente día
    }
  
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysToAdd);
    return nextDate;
  }
  calculateWeekDates(currentDate: Date, dateEnd?: Date): Date[] {
    const weekDates: Date[] = [];
  
    if (this.selectedDays.length === 0) {
      // Si no hay días seleccionados, genera todas las fechas de la semana
      for (let i = 0; i <= 7; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
  
        // Verificar si la fecha generada es mayor a la fecha actual
        if (nextDate > dateEnd && dateEnd) {
          return weekDates;
        }
  
        weekDates.push(nextDate);
      }
    } else {
      // Si hay días seleccionados, genera solo las fechas correspondientes
      const selectedDaysIndices = this.selectedDays.map(day => this.daysAvailable.indexOf(day));
      let index = 0;
      for (let i = 0; i <= 7; i++) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + i);
  
        // Verifica si el día actual está seleccionado
        if (selectedDaysIndices.includes(nextDate.getDay())) {
  
          // Verificar si la fecha generada es mayor a la fecha actual
          if (nextDate > dateEnd && dateEnd) {
            return weekDates;
          }
  
          weekDates.push(nextDate);
        }
        index++;
      }
    }
  
    return weekDates;
  }
  
  calculateNextDate(dayOfWeek: string, repetitionIndex: number): Date {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const targetDay = this.daysAvailable.indexOf(dayOfWeek);
    let daysToAdd = 0;
  
    if (currentDay <= targetDay) {
      daysToAdd = targetDay - currentDay + 7 * repetitionIndex;
    } else {
      daysToAdd = 7 - (currentDay - targetDay) + 7 * repetitionIndex;
    }
  
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysToAdd);
    return nextDate;
  }
 
  

  async accept() {
    // Lógica para aceptar y generar fechas
    const generatedDates = await this.generateDates();
    //console.log('Fechas generadas:', generatedDates);
    this.closeModal(generatedDates);
    // Puedes hacer lo que necesites con las fechas generadas
  }
  handleChange(e) {
    this.label = this.repetFor.filter(element  => element.value == e.detail.value)[0].label;
    this.selectedRepet = e.detail.value;
    if(e.detail.value === 6 && this.selectedOption === 2){
      this.selectedOption = 1;
    }
  }

  closeModal(e? : any) {
    this.modalController.dismiss(e);
  }
  obtenerDiaSemana(fecha: Date): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const indiceDia = fecha.getUTCDay();
    return diasSemana[indiceDia];
  }
  toggleSelection(day: string): void {
    const index = this.selectedDays.indexOf(day);
  
    if (index !== -1) {
      this.selectedDays.splice(index, 1);
    } else {
      this.selectedDays.push(day);
    }
  }
}
