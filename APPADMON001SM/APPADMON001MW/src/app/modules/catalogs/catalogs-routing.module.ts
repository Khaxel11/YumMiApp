import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component'
import { IngredientsComponent } from './Ingredients/pages/ingredients/ingredients.component';
import { TiposProductosComponent } from './TiposProductos/pages/tipos-productos/tipos-productos.component';
import { AuthGuard } from '../../../../src/app/helpers/auth.guard';
import { AplicacionesComponent } from './Aplicaciones/Pages/aplicaciones/aplicaciones.component';
import { TiposNotificacionesComponent } from './TiposNotificaciones/Pages/tipos-notificaciones/tipos-notificaciones.component';
import { CategoriasComponent } from './Categorias/pages/categorias/categorias.component';
import { TiposusuariosComponent } from './TiposUsuarios/pages/tiposusuarios/tiposusuarios.component';
import { PromocionesComponent } from './Promociones/pages/promociones/promociones.component';
import { TiposSolicitudesComponent } from './TiposSolicitudes/pages/tipos-solicitudes/tipos-solicitudes.component';
import { TiposAlimentacionComponent } from './TiposAlimentacion/pages/tipos-alimentacion/tipos-alimentacion.component';
import { OpcMenuCargoComponent } from './OpcMenuCargo/pages/opc-menu-cargo/opc-menu-cargo.component';


const routes: Routes = [
  { path: "cargos", component: CargosComponent },
  { path: 'ingredientes', component : IngredientsComponent },
  { path: 'tiposproductos', component : TiposProductosComponent,  canActivate: [AuthGuard]},
  { path: 'aplicaciones', component : AplicacionesComponent,  canActivate: [AuthGuard]},
  { path: 'tiposnotificaciones', component : TiposNotificacionesComponent,  canActivate: [AuthGuard]},
  { path: 'categorias', component : CategoriasComponent,  canActivate: [AuthGuard]},
  { path: 'tiposusuarios', component : TiposusuariosComponent,  canActivate: [AuthGuard]},
  { path: 'promociones', component : PromocionesComponent, canActivate: [AuthGuard]},
  { path: 'tipossolicitudes', component : TiposSolicitudesComponent, canActivate: [AuthGuard]},
  { path: 'tiposalimentacion', component : TiposAlimentacionComponent, canActivate: [AuthGuard]},
  { path: 'opcmenucargo', component : OpcMenuCargoComponent, canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
