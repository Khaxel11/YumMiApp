import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'active-order',
  templateUrl: './active-order.component.html',
  styleUrls: ['./active-order.component.css']
})
export class ActiveOrderComponent implements OnInit {
  platillosActivos = [
    {
      nombre: 'Pozole Vegetariano',
      descripcion: 'Pedido de Producto',
      cantidad: 50,
      imagen: 'src/assets/Images/gato.jpg',
    },
    {
      nombre: 'Agua horchata',
      descripcion: 'Descripción del platillo 2',
      cantidad: 50,
      imagen: 'URL de la imagen del platillo 2',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
