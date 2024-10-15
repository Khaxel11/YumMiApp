import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { SharedModule } from '../../shared/shared.module';

// Cargos
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component';
import { MdlCapturaComponent } from './Cargos/Components/mdl-captura/mdl-captura.component';

// Ingredients
import { IngredientsComponent } from './Ingredients/pages/ingredients/ingredients.component';
import { IngredientscapmdlComponent } from './Ingredients/modals/ingredientscapmdl/ingredientscapmdl.component';

// Tipos de Productos
import { TiposProductosComponent } from './TiposProductos/pages/tipos-productos/tipos-productos.component';
import { MdlTiposProductosComponent } from './TiposProductos/components/mdl-tipos-productos/mdl-tipos-productos.component';

// Aplicaciones
import { AplicacionesComponent } from './Aplicaciones/Pages/aplicaciones/aplicaciones.component';
import { MdlCapturaAppsComponent } from './Aplicaciones/components/mdl-captura-apps/mdl-captura-apps.component';

// Tipos de Notificaciones
import { TiposNotificacionesComponent } from './TiposNotificaciones/Pages/tipos-notificaciones/tipos-notificaciones.component';
import { MdlCapturaTipoComponent } from './TiposNotificaciones/Components/mdl-captura-tipo/mdl-captura-tipo.component';

// Apps Disponibles
import { AppdisponiblesComponent } from './AppsDisponibles/Pages/appdisponibles/appdisponibles.component';
import { OpcionesDisponiblesComponent } from './AppsDisponibles/components/opcionesdisponibles/opcionesdisponibles.component';
import { MdlAppsAdministraComponent} from './AppsDisponibles/components/mdlappsadministra/mdlappsadministra.component';

// Categorías
import { CategoriasComponent } from './Categorias/pages/categorias/categorias.component';
import { MdlCapturaCategoriasComponent } from './Categorias/components/mdl-captura-categorias/mdl-captura-categorias.component';

// Tipos de Usuarios
import { TiposusuariosComponent } from './TiposUsuarios/pages/tiposusuarios/tiposusuarios.component';
import { MdlTiposUsuariosComponent } from './TiposUsuarios/components/mdl-tipos-usuarios/mdl-tipos-usuarios.component';

// Promociones
import { PromocionesComponent } from './Promociones/pages/promociones/promociones.component';
import { MdlPromocionesComponent } from './Promociones/components/mdl-promociones/mdl-promociones.component';

// Tipos de Solicitudes
import { TiposSolicitudesComponent } from './TiposSolicitudes/pages/tipos-solicitudes/tipos-solicitudes.component';
import { MdlTiposSolicitudesComponent } from './TiposSolicitudes/components/mdl-tipos-solicitudes/mdl-tipos-solicitudes.component';

// Tipos de Alimentación
import { TiposAlimentacionComponent } from './TiposAlimentacion/pages/tipos-alimentacion/tipos-alimentacion.component';
import { MdlTiposAlimentacionComponent } from './TiposAlimentacion/components/mdl-tipos-alimentacion/mdl-tipos-alimentacion.component';

// Menú por Cargo
import { OpcMenuCargoComponent } from './OpcMenuCargo/pages/opc-menu-cargo/opc-menu-cargo.component';
import { MdlOpcMenuCargoComponent } from './OpcMenuCargo/components/mdl-opc-menu-cargo/mdl-opc-menu-cargo.component';
import { MdlDetalleOpcMenuCargoComponent } from './OpcMenuCargo/components/mdl-detalle-opc-menu-cargo/mdl-detalle-opc-menu-cargo.component';

// Personal
import { PersonalComponent } from './Personal/pages/personal/personal.component';
import { MdlAggEditPersonalComponent } from './Personal/components/mdl-agg-edit-personal/mdl-agg-edit-personal.component';

// Visuales
import { VisualesComponent } from './visuales/pages/visuales/visuales.component';
import { VisualescapmdlComponent } from './visuales/modals/visualescapmdl/visualescapmdl.component';

// Restricciones de Ingredientes
import { RestriccionesingreComponent } from './RestriccionesIngre/pages/restriccionesingre/restriccionesingre.component';
import { RestriccionesingrecapmdlComponent } from './RestriccionesIngre/modals/restriccionesingrecapmdl/restriccionesingrecapmdl.component';
import { RestriccionesingrelstmdlComponent } from './RestriccionesIngre/modals/restriccionesingrelstmdl/restriccionesingrelstmdl.component';

@NgModule({
  declarations: [
    CargosComponent,
    MdlCapturaComponent,
    IngredientsComponent,
    IngredientscapmdlComponent,
    TiposProductosComponent,
    MdlTiposProductosComponent,
    AplicacionesComponent,
    MdlCapturaAppsComponent,
    TiposNotificacionesComponent,
    MdlCapturaTipoComponent,
    PersonalComponent,
    MdlAggEditPersonalComponent,
    VisualesComponent,
    VisualescapmdlComponent,
    CategoriasComponent,
    MdlCapturaCategoriasComponent,
    TiposusuariosComponent,
    MdlTiposUsuariosComponent,
    PromocionesComponent,
    MdlPromocionesComponent,
    TiposSolicitudesComponent,
    MdlTiposSolicitudesComponent,
    TiposAlimentacionComponent,
    MdlTiposAlimentacionComponent,
    OpcMenuCargoComponent,
    MdlOpcMenuCargoComponent,
    MdlDetalleOpcMenuCargoComponent,
    AppdisponiblesComponent,
    OpcionesDisponiblesComponent,
    MdlAppsAdministraComponent ,
    RestriccionesingreComponent,
    RestriccionesingrecapmdlComponent,
    RestriccionesingrelstmdlComponent,
  ],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    SharedModule,
    FormsModule
  ],
  providers: [DatePipe]
})
export class CatalogsModule { }
