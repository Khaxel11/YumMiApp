import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyCalendarComponent } from './pages/my-calendar/my-calendar.component';

const routes: Routes = [
  {path: '', component : MyCalendarComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarProgramationRoutingModule { }
