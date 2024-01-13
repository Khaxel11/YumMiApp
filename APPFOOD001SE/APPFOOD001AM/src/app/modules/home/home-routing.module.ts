import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../home/main/main.component';
import { FoodhubsComponent } from './foodhubs/foodhubs.component';

const routes: Routes = [
  {path: '', component : MainComponent, pathMatch: 'full'},
  {path: 'foodhubs', component : FoodhubsComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
