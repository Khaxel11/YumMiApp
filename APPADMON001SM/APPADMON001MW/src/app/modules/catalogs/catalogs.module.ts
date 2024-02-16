import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component';
import { SharedModule } from '../../shared/shared.module'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CargosComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CatalogsModule { }
