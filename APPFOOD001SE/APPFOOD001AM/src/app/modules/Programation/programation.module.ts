import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramationRoutingModule } from './programation-routing.module';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    ProgramationRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProgramationModule { }
