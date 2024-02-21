import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MainComponent } from './main/pages/main/main.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class MenuModule { }
