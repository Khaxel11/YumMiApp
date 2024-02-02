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
  handleChange(e) {
    this.label = this.repetFor.filter(element  => element.value == e.detail.value)[0].label;
    this.selectedRepet = e.detail.value;
  }

  closeModal(e? : any) {
    //console.log(this.foodHub);
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
