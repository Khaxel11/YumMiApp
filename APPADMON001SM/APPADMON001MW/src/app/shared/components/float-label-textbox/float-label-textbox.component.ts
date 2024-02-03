import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'float-label-textbox',
  templateUrl: './float-label-textbox.component.html',
  styleUrls: ['./float-label-textbox.component.css']
})
export class FloatLabelTextboxComponent implements OnInit {
  private textValue = '';
  @Input() textBoxId: string;
  @Input() buttonId = '';
  @Input() labelText: string;
  @Input() labelClass = 'color-float-label';
  @Input() placeholder = '';
  @Input() textBoxClass = '';
  @Input() buttonClass = 'btn btn-outline-secondary';
  @Input() iconClass = 'fas fa-search';
  @Input() closeClass = 'color-secondary';
  @Input() buttonType = 'button';
  @Input() autocomplete = true;
  @Input() enableSearch = false;
  @Input() focus = false;
  @Output() searchClick = new EventEmitter<any>();
  @Output() clearClick = new EventEmitter<any>();
  @Output() textChange = new EventEmitter<string>();
  @Input() get text(): string {
    return this.textValue;
  }
  set text(value: string) {
    this.textValue = value;
    this.textChange.emit(this.textValue);
  }

  constructor() { }

  ngOnInit(): void { }

  search(evt: any): void {
    this.searchClick.emit(evt);
  }

  clear(evt: any): void {
    this.text = '';
    this.clearClick.emit(evt);
  }
}
