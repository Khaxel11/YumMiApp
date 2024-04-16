import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryRoutingModule } from './delivery-routing.module';
import { MainDeliveryComponent } from './main-delivery/main-delivery.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MainDeliveryComponent],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
    
  ]
})
export class DeliveryModule { }
