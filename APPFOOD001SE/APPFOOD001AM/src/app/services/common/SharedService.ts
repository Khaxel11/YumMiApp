// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsService } from '../products/products.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  constructor(public http: HttpClient){

  }
  private productoSource = new BehaviorSubject<any>(null);
  private service = new ProductsService(this.http);
  producto = this.productoSource.asObservable();

  setProducto(producto: any) {
    this.productoSource.next(producto);
  }
}
