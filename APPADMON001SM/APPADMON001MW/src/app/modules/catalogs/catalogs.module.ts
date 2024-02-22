import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component';
import { SharedModule } from '../../shared/shared.module'
import { FormsModule } from '@angular/forms';
import { MdlCapturaComponent } from './Cargos/Components/mdl-captura/mdl-captura.component';
import { IngredientsComponent } from './Ingredients/pages/ingredients/ingredients.component';

@NgModule({
  declarations: [CargosComponent, MdlCapturaComponent, IngredientsComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CatalogsModule { }
