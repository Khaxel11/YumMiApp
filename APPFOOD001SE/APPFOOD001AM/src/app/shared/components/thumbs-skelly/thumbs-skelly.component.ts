import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ProgramacionAgrupada, ProgramacionFechas } from 'src/app/models/Programation';
import { SafeUrl } from '@angular/platform-browser';
import { IonItemSliding } from '@ionic/angular';
import { General } from 'src/app/functions/general';
@Component({
  selector: 'thumbs-skelly',
  templateUrl: './thumbs-skelly.component.html',
  styleUrls: ['./thumbs-skelly.component.css'],
  animations: [
    trigger('stagger', [
      transition('* => *', [ 
        query(':enter', [
            style({ opacity: 0 }),
            stagger(1000, [animate('0.5s', style({ opacity: 1 }))])
          ], { optional: true }
        )
      ])
    ])
  ]
})
export class ThumbsSkellyComponent implements OnInit {
  @Input() data: ProgramacionAgrupada[]; // Datos para la vista final
  @Input() loaded: boolean = true; // Estado de carga
  @Input() skeletonData: any; // Datos para el esqueleto
  @Input() contentTemplate: any; // Plantilla para la vista final
  @Output() showDetails  = new EventEmitter();
  @Output() slicedStart = new EventEmitter();
  general = new General();
  lstFechas = [];
  constructor() { }

  ngOnInit(): void {
   this.lstFechas;
   
  }
  imagenBase64(base64String: string): SafeUrl {
    const imageUrl = 'data:image/jpeg;base64,' + base64String;
    return imageUrl;
  }
  showDetail(e : any){
    this.showDetails.emit(e);
  }
  async onSwipe(event: CustomEvent, item: any) {
    const slidingItem = event.target;
    const direction = event.detail.side; // 'start' para deslizar a la izquierda, 'end' para deslizar a la derecha

    if (direction === 'start') {
      await this.confirmFecha(item);
    } else if (direction === 'end') {
      // Lógica para deslizar a la derecha
      // this.confirmItem(item);
    }

    
  }
  getDay(value) : string {
    const fecha = new Date(value);
    return fecha.getDate().toString();
  }
  getMonthName(value): string {
    const fecha = new Date(value);
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return monthNames[fecha.getMonth()];
  }
  confirmFecha(value){
    
    this.slicedStart.emit(value);
  }
}
