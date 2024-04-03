import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarProgramationRoutingModule } from './calendar-programation-routing.module';
import { MyCalendarComponent } from './pages/my-calendar/my-calendar.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarDetailComponent } from './components/calendar-detail/calendar-detail.component';


@NgModule({
  declarations: [MyCalendarComponent, CalendarDetailComponent],
  imports: [
    CommonModule,
    CalendarProgramationRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
  ]
})
export class CalendarProgramationModule { }
