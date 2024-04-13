import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FechasProgramadas, ProgramacionFechas } from 'src/app/models/Programation';

@Component({
  selector: 'events-visualization',
  templateUrl: './events-visualization.component.html',
  styleUrls: ['./events-visualization.component.css']
})
export class EventsVisualizationComponent implements AfterViewInit {
  @Input() lstFechasProgramadas = new Array<ProgramacionFechas>();
  @Output() onShowDetails = new EventEmitter();
  activedOrders = new Array<ProgramacionFechas>();


  proximoEvento= new ProgramacionFechas();
  constructor(private cd: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    if(this.lstFechasProgramadas.length > 0){
      this.proximoEvento = this.lstFechasProgramadas[0];
      this.lstFechasProgramadas.shift()
      this.activedOrders = this.lstFechasProgramadas;
      console.log(this.lstFechasProgramadas);
      this.cd.detectChanges();
    }
  }
  showDetails(e : any){
    this.onShowDetails.emit(e);
  }
}
