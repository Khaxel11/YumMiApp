import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult, } from 'ion2-calendar';
import { General } from 'src/app/functions/general';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from '../calendar/calendar.component';
import { ModalPersonalizedDateSelectorComponent } from '../modal-personalized-date-selector/modal-personalized-date-selector.component';

@Component({
  selector: 'programation-products',
  templateUrl: './programation-products.component.html',
  styleUrls: ['./programation-products.component.css']
})
export class ProgramationProductsComponent implements OnInit {
  @ViewChild('calendar') calendar: CalendarComponent;
  General = new General();
  date: string;
  selectedDates: Array<any> = [];
  description : string;
  selected: boolean = false;
  month: number;
  year: number;
  constructor(private modalController: ModalController) {
    const today = new Date();
    this.selectedDates = [];
    this.month = today.getUTCMonth();
    this.year = today.getUTCFullYear();
  }

  ngOnInit(): void {

  }
  async openPersonalizedSelector() {
    const modal = await this.modalController.create(
      {
        component: ModalPersonalizedDateSelectorComponent,
        componentProps: {},

      }
    )
    modal.present();
    return modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        this.selectedDates = [];
        result.data.forEach(element => {
          element.setHours(0, 0, 0, 0);

          const objDate = {
            diaSemana: this.obtenerDiaSemana(element),
            mes: this.obtenerNombreMes(element),
            dia: element.getUTCDate(),
            dateObj: element
          }
          this.selectedDates.push(objDate);
        });
        this.selectedDates = this.sortDates(this.selectedDates);
        console.log(this.selectedDates);
        this.selected = true;
        await this.calendar.setCalendar(this.selectedDates);
      }
    });
  }

  sortDates(arreglo) : any[]{
    return arreglo.sort((a, b) => {
      const dateA = a.dateObj.getTime();
      const dateB = b.dateObj.getTime();
      return dateA - dateB;
    });
  }
  onSelectedDate(e:any){
    if(e.selected){
      // Agregamos la fecha al array de fechas seleccionadas
      this.selectedDates.push({
        diaSemana: this.obtenerDiaSemana(e.dateObj),
        mes: this.obtenerNombreMes(e.dateObj),
        dia: e.dateObj.getUTCDate(),
        dateObj: e.dateObj
      });
      this.selectedDates = this.sortDates(this.selectedDates);
    }else{
      /* Eliminamos la fecha del array de las fechas seleccionadas
       * y volvemos a renderizar el calendario para que se actualicen los cambios */
      this.selectedDates = this.selectedDates.filter((fecha)=>{
        return !(fecha.dateObj.getTime() === e.dateObj.getTime());
      })
    
    
    }
    this.calendar.setCalendar(this.selectedDates);
  }
  async openCalendar() {
    const options: CalendarModalOptions = {
      title: 'Selecciona fecha(s) a Programar',
      color: 'secondary',
      pickMode: 'multi',
      defaultDateRange: { from: new Date(), to: new Date() }, // Rango de fechas inicial
      canBackwardsSelected: false, // No permite seleccionar fechas en meses anteriores
      monthFormat: 'MMMM YYYY', // Formato del encabezado del mes
      weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      closeIcon: true,
      doneIcon: true,
      daysConfig: this.getDaysConfig(),
      cssClass: 'custom-calendar',

    };

    const myCalendar = await this.modalController.create({
      component: CalendarModal,
      componentProps: { options },
    });

    myCalendar.present();

    myCalendar.onDidDismiss().then((result: any) => {
      if (result && result.data) {
        this.selectedDates = result.data;
        this.selectedDates.forEach(element => {
          element.diaSemana = this.obtenerDiaSemana(element.dateObj);
          element.mes = this.obtenerNombreMes(element.dateObj);
          element.dia = element.dateObj.getUTCDate();
        });
        console.log(this.selectedDates);
        this.selected = true;
        this.selectedDates = this.sortDates(this.selectedDates);
        this.calendar.setCalendar(this.selectedDates);

      } else {
        this.selected = false;
      }
    });
  }
  toggleChange(e: any) {
    this.calendar.enableEditable(e.detail.checked);
  }

  getFirstDate() : string{
    let value;
    if(this.selectedDates.length>0){
      let fecha = this.selectedDates[0].dateObj;
      value = this.obtenerDiaSemana(fecha) + ' '+ fecha.getDate() + " de " + this.obtenerNombreMes(fecha);
    }
    
    return value ? value : "";
  }

  obtenerDiaSemana(fecha: Date): string {
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const indiceDia = fecha.getUTCDay();
    return diasSemana[indiceDia];
  }
  obtenerNombreMes(fecha: Date): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const indiceMes = fecha.getUTCMonth();
    return meses[indiceMes];
  }
  continue(){
    if(!this.selectedDates || this.selectedDates.length === 0){
      this.General.showMessage("No hay fechas seleccionadas", 'warning');
      return;
    }
    if(!this.description){
      this.General.showMessage("Capture una descripción", 'warning'); 
      return;
    }
  }

  private getDaysConfig(): DayConfig[] {
    return [
      {
        date: new Date(),
        subTitle: 'Hoy',
      },
    ];
  }
  

}
