import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ProgramacionFechas } from 'src/app/models/Programation';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {

  programacion : ProgramacionFechas = new ProgramacionFechas();
  selectedSegment : number = 1;
  selectedAltSegment : number;
  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }
  segmentChanged(event) {
    this.selectedAltSegment = this.selectedSegment;
    this.selectedSegment = Number(event.detail.value);
    // console.log('Segment changed', );
    // Aquí puedes realizar acciones adicionales si lo necesitas
  }
  closeModal(e? : any) {
   
    this.modalController.dismiss(e);
  }
  
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 1000);
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return  base64String ? imageUrl : '../../../../../assets/Images/no-image-svgrepo-com.svg';
  }
  getDay(value) : string {
    const fecha = new Date(value);
    return fecha.getDate().toString();
  }
  getMonthName(value): string {
    const fecha = new Date(value);
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[fecha.getMonth()];
  }
}
