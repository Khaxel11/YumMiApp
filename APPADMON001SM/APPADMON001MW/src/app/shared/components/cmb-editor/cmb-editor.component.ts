import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { CmbOption } from 'src/app/models/common/cmbEditorModel';

@Component({
  selector: 'app-cmb-editor',
  templateUrl: './cmb-editor.component.html',
  styleUrls: ['./cmb-editor.component.css']
})
export class CmbEditorComponent implements ICellEditorAngularComp {
  @ViewChild('select', { read: ViewContainerRef })
  public select: ViewContainerRef;

  class = '';
  options: CmbOption[] = [];
  value = null;
  params: any;
  valueField = 'value';
  textField = 'text';
  data: any;
  colId: string;

  optionChange: (rowData?: any, option?: {value?: any, text?: string}) => void = () => {};

  constructor() { }

  getValue(): any {
    return this.value;
  }

  isPopup?(): boolean {
    return true;
  }

  isCancelAfterEnd?(): boolean {
    return this.colId !== this.valueField;
  }

  focusIn?(): void {
    // this.select.element.nativeElement.size = this.options.length;
    setTimeout(() => this.select.element.nativeElement.focus());
  }

  agInit(params: any): void {
    this.params = params;
    this.optionChange = params.optionChange || this.optionChange;
    this.colId = params.column.colId;
    this.valueField = params.valueField || params.column.colId;
    this.textField = params.textField || params.column.colId;
    this.data = params.data;
    this.value = this.data[this.valueField];
    this.options = params.options ? Array.isArray(params.options) ? params.options : params.options() : [];
    this.class = params.class || this.class;
  }

  afterGuiAttached?(params?: any): void {
    this.focusIn();
  }

  valueChange(text: string): void {
    if (this.textField !== this.valueField) {
      this.data[this.textField] = text;
      this.data[this.valueField] = this.value;
    } else {
      this.data[this.valueField] = this.value;
    }

    const shownValue = this.colId === this.valueField ? this.value : this.data[this.textField];

    if (this.optionChange) {
      this.optionChange(this.data, {value: this.value, text: shownValue});
    }

    this.params.api.stopEditing();
  }
}
