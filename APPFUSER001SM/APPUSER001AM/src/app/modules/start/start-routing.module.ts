import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', component : LoaderComponent, pathMatch : 'full'},
  {path: 'login', component : LoginComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
