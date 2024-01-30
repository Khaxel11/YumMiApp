import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'events-visualization',
  templateUrl: './events-visualization.component.html',
  styleUrls: ['./events-visualization.component.css']
})
export class EventsVisualizationComponent implements OnInit {
  activedOrders = [
    {
      nombre: 'Pozole Vegetariano',
      descripcion: 'Pedido de Producto',
      cantidad: 50,
      fecha: new Date(),
    },
    {
      nombre: 'Agua horchata',
      descripcion: 'Descripción del platillo 2',
      cantidad: 50,
      imagen: new Date(),
    },
  ];


  proximoEvento={
    titulo: 'Entrega',
    fecha: new Date(),
    platilloProgramado: 'Tacos de Carne Asada',
    descripcion: 'Descripción del Evento 1',
    cantidad : 10,
    foodHub : 'Mirador Alamos'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
