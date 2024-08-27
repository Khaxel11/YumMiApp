import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stars-cs',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input() stars : number;
  @Input() total : number;
  @Input() showStars : boolean = true;
  @Input() showTotal : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  divideStar(e : any){
    try {
      const unidades = Math.floor(this.stars); 
      const unidades05 = Math.round((this.stars - unidades) );
      const resultado = new Array(unidades).fill(1);
      resultado.push(...Array(unidades05).fill(0.5));
      if(resultado){
        const longitudActual = resultado.length;

        if (longitudActual < 5) {
          const cerosFaltantes = 5 - longitudActual;
          resultado.push(...Array(cerosFaltantes).fill(0));
        }
      }
      return resultado;
    } catch (error) {
      return 0;
    }
  }
}
