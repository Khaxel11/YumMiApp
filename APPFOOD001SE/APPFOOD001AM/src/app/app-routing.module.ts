import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path : '',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  // {
  //   path : 'commons',
  //   loadChildren: () => import('./modules/common/commons.module').then(m => m.CommonsModule),
  // },
  {
    path : 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path : 'products',
    loadChildren: () => import('./modules/Products/products.module').then(m => m.ProductsModule),
  },
  {
    path : 'programation',
    loadChildren: () => import('./modules/Programation/programation.module').then(m => m.ProgramationModule),
  },
  {
    path : 'profile',
    loadChildren: () => import('./modules/Profile/profile.module').then(m => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
