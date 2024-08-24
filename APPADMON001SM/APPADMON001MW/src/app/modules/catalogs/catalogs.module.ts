import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component';
import { SharedModule } from '../../shared/shared.module'
import { FormsModule } from '@angular/forms';
import { MdlCapturaComponent } from './Cargos/Components/mdl-captura/mdl-captura.component';
import { IngredientsComponent } from './Ingredients/pages/ingredients/ingredients.component';
import { TiposProductosComponent } from './TiposProductos/pages/tipos-productos/tipos-productos.component';
import { MdlTiposProductosComponent } from './TiposProductos/components/mdl-tipos-productos/mdl-tipos-productos.component';
import { AplicacionesComponent } from './Aplicaciones/Pages/aplicaciones/aplicaciones.component';
import { MdlCapturaAppsComponent } from './Aplicaciones/components/mdl-captura-apps/mdl-captura-apps.component';
import { TiposNotificacionesComponent } from './TiposNotificaciones/Pages/tipos-notificaciones/tipos-notificaciones.component';
import { MdlCapturaTipoComponent } from './TiposNotificaciones/Components/mdl-captura-tipo/mdl-captura-tipo.component';
import { PersonalComponent } from './Personal/pages/personal/personal.component';
import { MdlAggEditPersonalComponent } from './Personal/components/mdl-agg-edit-personal/mdl-agg-edit-personal.component';
@NgModule({ 
  declarations: [CargosComponent, MdlCapturaComponent, IngredientsComponent, TiposProductosComponent, MdlTiposProductosComponent, AplicacionesComponent, MdlCapturaAppsComponent, TiposNotificacionesComponent, MdlCapturaTipoComponent, PersonalComponent, MdlAggEditPersonalComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CatalogsModule { }
