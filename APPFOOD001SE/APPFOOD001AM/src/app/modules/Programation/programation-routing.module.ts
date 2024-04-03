import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
const routes: Routes = [
  {path: '', component : PagesComponent, pathMatch: 'full'},
  {path: 'confirmed', component : ConfirmedComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramationRoutingModule { }
