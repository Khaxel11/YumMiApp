import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'events-visualization',
  templateUrl: './events-visualization.component.html',
  styleUrls: ['./events-visualization.component.css']
})
export class EventsVisualizationComponent implements OnInit {
  @Input() events: any[] = [
    {
      fecha: new Date(),
      titulo: 'Evento 1',
      descripcion: 'Descripción del Evento 1',
    },
    {
      fecha: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      titulo: 'Evento 2',
      descripcion: 'Descripción del Evento 2',
    },
    {
      fecha: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
      titulo: 'Evento 3',
      descripcion: 'Descripción del Evento 3',
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
