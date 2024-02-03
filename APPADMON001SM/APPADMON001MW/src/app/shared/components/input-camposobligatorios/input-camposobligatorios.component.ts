import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'input-camposobligatorios',
  templateUrl: './input-camposobligatorios.component.html',
  styleUrls: ['./input-camposobligatorios.component.css']
})
export class InputCamposobligatoriosComponent implements OnInit {
  @Input() Titulo = '';
  @Input() required = false;
  @Input() mayus = false;
  data: any;
  @Input() type = '';
  @Input() maxlength = '';
  @Input() event: any = {};
  @Input() Disabled = false;
  @Input() mosLabel = true;
  @Output() TextChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() DataChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() get Data(): any {
    return this.data;
  }
  set Data(value: any) {
    this.data = value;
    this.DataChange.emit(this.data);
  }
  @Output() requiredChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  blur(e): void {
    if (e.target.value.length > 0) {
      this.requiredChange.emit(false);
    }
  }
  Event(e): any {
    let result: any;
    for (const iterator of Object.keys(this.event)) {
      if (iterator === e.type){
        result = this.event[e.type](e);
      }
    }
    return result;
  }
}
