import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainDeliveryComponent } from './main-delivery/main-delivery.component';
const routes: Routes = [
  {
    path : '', component : MainDeliveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule { }
