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
import { CategoriasComponent } from './Categorias/pages/categorias/categorias.component';
import { MdlCapturaCategoriasComponent } from './Categorias/components/mdl-captura-categorias/mdl-captura-categorias.component';
import { TiposusuariosComponent } from './TiposUsuarios/pages/tiposusuarios/tiposusuarios.component';
import { MdlTiposUsuariosComponent } from './TiposUsuarios/components/mdl-tipos-usuarios/mdl-tipos-usuarios.component';
import { PromocionesComponent } from './Promociones/pages/promociones/promociones.component';
import { MdlPromocionesComponent } from './Promociones/components/mdl-promociones/mdl-promociones.component';
import { TiposSolicitudesComponent } from './TiposSolicitudes/pages/tipos-solicitudes/tipos-solicitudes.component';
import { MdlTiposSolicitudesComponent } from './TiposSolicitudes/components/mdl-tipos-solicitudes/mdl-tipos-solicitudes.component';
import { TiposAlimentacionComponent } from './TiposAlimentacion/pages/tipos-alimentacion/tipos-alimentacion.component';
import { MdlTiposAlimentacionComponent } from './TiposAlimentacion/components/mdl-tipos-alimentacion/mdl-tipos-alimentacion.component';
import { OpcMenuCargoComponent } from './OpcMenuCargo/pages/opc-menu-cargo/opc-menu-cargo.component';
import { MdlOpcMenuCargoComponent } from './OpcMenuCargo/components/mdl-opc-menu-cargo/mdl-opc-menu-cargo.component';
import { MdlDetalleOpcMenuCargoComponent } from './OpcMenuCargo/components/mdl-detalle-opc-menu-cargo/mdl-detalle-opc-menu-cargo.component';
@NgModule({ 
  declarations: [CargosComponent, MdlCapturaComponent, IngredientsComponent, TiposProductosComponent, MdlTiposProductosComponent, AplicacionesComponent, MdlCapturaAppsComponent, TiposNotificacionesComponent, MdlCapturaTipoComponent, CategoriasComponent, MdlCapturaCategoriasComponent, TiposusuariosComponent, MdlTiposUsuariosComponent, PromocionesComponent, MdlPromocionesComponent, TiposSolicitudesComponent, MdlTiposSolicitudesComponent, TiposAlimentacionComponent, MdlTiposAlimentacionComponent, OpcMenuCargoComponent, MdlOpcMenuCargoComponent, MdlDetalleOpcMenuCargoComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CatalogsModule { }
