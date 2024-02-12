import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component';


@NgModule({
  declarations: [CargosComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule
  ]
})
export class CatalogsModule { }
