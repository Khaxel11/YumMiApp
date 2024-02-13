import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './Pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
  ]
})
export class LoginModule { }
