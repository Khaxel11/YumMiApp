import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitComponent } from './init/init.component';
import { CreateAccountComponent } from './create-account/create-account.component'
import { StartComponent } from './start/start.component';
import { RegisterComponent } from './register/register.component'
const routes: Routes = [
  {path: '', component : StartComponent, pathMatch: 'full'}
  ,{path: 'register', component : CreateAccountComponent}
  ,{path: 'login', component: InitComponent}
  ,{path: 'formregister', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
