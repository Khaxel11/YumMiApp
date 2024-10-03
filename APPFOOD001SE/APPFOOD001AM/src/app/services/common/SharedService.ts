
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
  private fechasSource = new BehaviorSubject<any>(null);
  fechas = this.fechasSource.asObservable();
  private productoSource = new BehaviorSubject<any>(null);
  private service = new ProductsService(this.http);
  producto = this.productoSource.asObservable();

  setProducto(producto: any) {
    this.productoSource.next(producto);
  }
  setFechas(fechas : any){
    this.fechasSource.next(fechas);
  }
}
