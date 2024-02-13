import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './shared/components/auth/auth.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  // {  path: 'auth/:module/:component/:user/:zone', component: AuthComponent },
  // {  path: 'auth/:module/:user/:zone', component: AuthComponent },
  {
    path: 'auth/:module/:component',
    component: AuthComponent
  },
  {
    path: 'auth/:module',
    component: AuthComponent
  },{
    path: 'login',
    loadChildren: ()=> import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    loadChildren: ()=> import('./modules/menu/menu.module').then(m => m.MenuModule),
  },
  {
    path : 'catalog',
    loadChildren: () => import('./modules/catalogs/catalogs.module').then(m => m.CatalogsModule),
  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
