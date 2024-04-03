import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramationRoutingModule } from './programation-routing.module';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { ConfirmedComponent } from './components/confirmed/confirmed.component';
import { MdlCompletedProgramationComponent } from './components/mdl-completed-programation/mdl-completed-programation.component';


@NgModule({
  declarations: [PagesComponent, ConfirmedComponent, MdlCompletedProgramationComponent],
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
