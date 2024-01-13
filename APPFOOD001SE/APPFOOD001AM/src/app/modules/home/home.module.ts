import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FoodhubsComponent } from './foodhubs/foodhubs.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MdlDetailFoodhubComponent } from './foodhubs/components/mdl-detail-foodhub/mdl-detail-foodhub.component';
import { NotificationComponent } from './notification/notification.component';


// import { MenuStartComponent } from '../common/menu-start/menu-start.component'
@NgModule({
  declarations: [MainComponent, FoodhubsComponent, MdlDetailFoodhubComponent, NotificationComponent, ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
