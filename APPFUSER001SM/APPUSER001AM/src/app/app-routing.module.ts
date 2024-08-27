import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path : '',
    loadChildren: () => import('./modules/start/start.module').then(m => m.StartModule),
  },
  {
    path : '',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
