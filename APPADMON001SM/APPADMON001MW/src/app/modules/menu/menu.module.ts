import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MainComponent } from './main/pages/main/main.component';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
