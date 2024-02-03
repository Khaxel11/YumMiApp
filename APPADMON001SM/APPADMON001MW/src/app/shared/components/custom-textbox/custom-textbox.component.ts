import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'custom-textbox',
  templateUrl: './custom-textbox.component.html',
  styleUrls: ['./custom-textbox.component.css']
})
export class CustomTextboxComponent implements OnInit {
  private textValue: any = '';
  @Input() textBoxId: string;
  @Input() maxlength: any = '';
  @Input() inputType: 'text' | 'number' = 'text';
  @Input() buttonId = '';
  @Input() placeholder = ' ';
  @Input() textBoxClass = '';
  @Input() buttonClass = 'btn btn-outline-secondary';
  @Input() iconClass = 'fas fa-search';
  @Input() closeClass = 'color-secondary';
  @Input() buttonType = 'button';
  @Input() autocomplete = true;
  @Input() enableSearch = false;
  @Input() focus = false;
  @Input() disabled = false;
  @Input() disabledButton = false;
  @Input() readonly = false;
  @Output() textBoxClick = new EventEmitter<any>();
  @Output() searchClick = new EventEmitter<any>();
  @Output() clearClick = new EventEmitter<any>();
  @Output() textChange = new EventEmitter<any>();
  @Input() get text(): any {
    return this.textValue;
  }
  set text(value: any) {
    this.textValue = value;
    this.textChange.emit(this.textValue);
  }

  constructor() { }

  ngOnInit(): void { }

  click(evt: any): void {
    this.textBoxClick.emit(evt);
  }

  search(evt: any): void {
    this.searchClick.emit(evt);
  }

  clear(evt: any): void {
    this.text = '';
    this.clearClick.emit(evt);
  }
}
