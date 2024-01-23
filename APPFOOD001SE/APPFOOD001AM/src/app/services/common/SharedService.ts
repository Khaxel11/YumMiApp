// shared-data.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private productoSource = new BehaviorSubject<any>(null);
  producto = this.productoSource.asObservable();

  setProducto(producto: any) {
    this.productoSource.next(producto);
  }
}
