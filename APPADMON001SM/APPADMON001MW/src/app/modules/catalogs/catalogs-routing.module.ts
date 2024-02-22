import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargosComponent } from './Cargos/Pages/cargos/cargos.component'
import { IngredientsComponent } from './Ingredients/pages/ingredients/ingredients.component';
const routes: Routes = [
  { path: "cargos", component: CargosComponent },
  { path: 'ingredientes', component : IngredientsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogsRoutingModule { }
