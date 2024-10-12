import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { RegisterComponent } from './register/register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DataRegisterComponent } from './data-register/data-register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, DataRegisterComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
    
  ],
  providers: [
    
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class LoginModule { }
