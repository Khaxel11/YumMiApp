import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishCaptureComponent } from './dish-capture/dish-capture.component';
import { DishCatalogComponent } from './dish-catalog/dish-catalog.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
const routes: Routes = [
  {path: 'capture', component : DishCaptureComponent, pathMatch: 'full'}
  ,{path: 'catalog', component : DishCatalogComponent}
  ,{path: 'catalog/detail', component : DishDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
