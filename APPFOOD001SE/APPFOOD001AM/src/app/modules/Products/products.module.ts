import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { DishCaptureComponent } from './dish-capture/dish-capture.component';
import { DishCatalogComponent } from './dish-catalog/dish-catalog.component';
import { DishDetailComponent } from './dish-detail/dish-detail.component';

import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { ChooseProductComponent } from './dish-capture/choose-product/choose-product.component';

@NgModule({
  declarations: [DishCaptureComponent, DishCatalogComponent, DishDetailComponent, ChooseProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    SharedModule,
    IonicModule,
    IonicModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductsModule { }
