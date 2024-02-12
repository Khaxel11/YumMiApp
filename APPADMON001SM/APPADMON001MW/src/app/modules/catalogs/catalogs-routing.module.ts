import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component'
const routes: Routes = [
  { path: "cargos", component: CargosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
