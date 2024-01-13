import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { InitComponent } from './init/init.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { CreateAccountComponent } from './create-account/create-account.component';
import { StartComponent } from './start/start.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [InitComponent, CreateAccountComponent, StartComponent, RegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
    
  ]
})
export class LoginModule { }
