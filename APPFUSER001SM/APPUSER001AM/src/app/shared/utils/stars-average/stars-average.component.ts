import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stars-average',
  templateUrl: './stars-average.component.html',
  styleUrls: ['./stars-average.component.css']
})
export class StarsAverageComponent implements OnInit {
  @Input() calificaciones: number[] = [0];
  constructor() { }

  ngOnInit(): void {
    // while (this.calificaciones.length < 5) {
    //   this.calificaciones.push(0);
    // }
  }
  prom(): string {
    var sum : number = 0;
    if(this.calificaciones.length>0){
       sum = this.calificaciones.reduce((acc, curr) => acc + curr, 0);
    }

    return sum !== 0 ? (sum / this.calificaciones.length).toFixed(2) : 'NA';
  }
  countCalificacionesByCategory(category: number): number {
    return this.calificaciones.length > 0 ? this.calificaciones.filter(calificacion => calificacion === category).length || 0 : 0
  }
}
