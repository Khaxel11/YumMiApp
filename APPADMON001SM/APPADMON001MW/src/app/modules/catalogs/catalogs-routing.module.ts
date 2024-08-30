import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component'
import { IngredientsComponent } from './Ingredients/pages/ingredients/ingredients.component';
import { TiposProductosComponent } from './TiposProductos/pages/tipos-productos/tipos-productos.component';
import { AuthGuard } from '../../../../src/app/helpers/auth.guard';
import { AplicacionesComponent } from './Aplicaciones/Pages/aplicaciones/aplicaciones.component';
import { TiposNotificacionesComponent } from './TiposNotificaciones/Pages/tipos-notificaciones/tipos-notificaciones.component';
import { AppdisponiblesComponent } from './AppsDisponibles/Pages/appdisponibles/appdisponibles.component';
import { OpcionesDisponiblesComponent } from './AppsDisponibles/components/opcionesdisponibles/opcionesdisponibles.component';

const routes: Routes = [
  { path: "cargos", component: CargosComponent },
  { path: 'ingredientes', component : IngredientsComponent },
  { path: 'tiposproductos', component : TiposProductosComponent,  canActivate: [AuthGuard]},
  { path: 'aplicaciones', component : AplicacionesComponent,  canActivate: [AuthGuard]},
  { path: 'tiposnotificaciones', component : TiposNotificacionesComponent,  canActivate: [AuthGuard]},
  { path: 'appdisponibles', component : AppdisponiblesComponent,  canActivate: [AuthGuard]},
  { path: 'opcionesdisponibles', component : OpcionesDisponiblesComponent,  canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
