import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProgramacionFechas } from 'src/app/models/Programation';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {

  programacion : ProgramacionFechas = new ProgramacionFechas();
  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }
  closeModal(e? : any) {
   
    this.modalController.dismiss(e);
  }
}
