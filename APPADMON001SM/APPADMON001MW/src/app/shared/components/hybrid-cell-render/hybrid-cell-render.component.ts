import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-hybrid-cell-render',
  templateUrl: './hybrid-cell-render.component.html',
  styleUrls: ['./hybrid-cell-render.component.css'],
})
export class HybridCellRenderComponent implements ICellRendererAngularComp {
  params: any;
  containerClass: string;
  class: string;
  type: 'txt' | 'chk' | 'cbx' | 'num' | 'date';
  data: any;
  colId: any;
  field: string;
  valueField: string;
  textField: string;
  options: any[];
  disabled: boolean;

  change: (parms?: any) => void;

  constructor() {}

  refresh(): boolean {
    return this.type === 'txt' || this.type === 'num' || this.type === 'date';
  }

  agInit(params: ICellRendererParams | any): void {
    this.params = params;
    this.data = params.data;
    this.field = params.colDef.field;
    this.colId = params.column.colId;
    let pars: any = {};

    if (typeof params.params === 'function') {
      pars = params.params(this.data, this.field, this.colId);
      pars.valueField = pars.valueField ?? this.field;
      pars.textField = pars.textField ?? this.field;
      pars.options = pars.options ? Array.isArray(pars.options) ? pars.options : pars.options() : [];
      if (typeof pars.value !== 'undefined') {
        this.params.value = pars.value;
      }
    } else if (typeof params.params === 'object') {
      pars.type = params.params.type;
      pars.class = params.params.class;
      pars.containerClass = params.params.containerClass;
      pars.valueField = params.params.valueField ?? this.field;
      pars.textField = params.params.textField ?? this.field;
      pars.options = params.params.options
        ? Array.isArray(params.params.options)
          ? params.params.options
          : params.params.options()
        : [];
      pars.change = params.params.change;
      if (typeof params.params.value !== 'undefined') {
        this.params.value = params.params.value;
      }
    } else {
      pars.type = params.type;
      pars.class = params.class;
      pars.containerClass = params.containerClass;
      pars.valueField = params.valueField ?? this.field;
      pars.textField = params.textField ?? this.field;
      pars.options = params.options
        ? Array.isArray(params.options)
          ? params.options
          : params.options()
        : [];
      pars.change = params.change;
      if (typeof params.value !== 'undefined') {
        this.params.value = params.value;
      }
    }

    this.loadParams(pars);
  }

  loadParams(pars: any): void {
    this.type = pars.type;
    this.class = pars.class;
    this.containerClass = pars.containerClass;
    this.disabled = pars.disabled;
    this.valueField = pars.valueField;
    this.textField = pars.textField;
    this.options = pars.options;
    this.change = pars.change;

    switch (this.type) {
      case 'txt':
        this.containerClass = this.containerClass ?? '';
        this.class = this.class ?? 'form-control';
        break;
      case 'num':
        this.containerClass = this.containerClass ?? '';
        this.class = this.class ?? 'form-control';
        break;
      case 'date':
        this.containerClass = this.containerClass ?? '';
        this.class = this.class ?? 'form-control';
        break;
      case 'chk':
        this.containerClass = this.containerClass ?? 'form-check';
        this.class = this.class ?? 'form-check-input position-static';
        break;
      case 'cbx':
        this.containerClass = this.containerClass ?? '';
        this.class = this.class ?? 'form-control';
        break;
      default:
        this.containerClass = this.containerClass ?? '';
        this.class = this.class ?? '';
        break;
    }
  }

  checkedHandler(event: any): void {
    const checked = event.target.checked;
    this.params.node.setDataValue(this.colId, checked);
    if (typeof this.change === 'function') {
      this.executeChange(checked);
    }
  }

  textChangeHandler(): void {
    this.params.node.setDataValue(this.colId, this.params.value);
    if (typeof this.change === 'function') {
      this.executeChange(this.params.value);
    }
  }

  optionChangeHandler(value: any): void {
    this.params.node.setDataValue(this.colId, value);
    if (typeof this.change === 'function') {
      this.executeChange(value);
    }
  }

  executeChange(value: any): void {
    const params = {
      value,
      data: this.data,
      colId: this.colId,
      field: this.field,
      disabled: this.disabled,
      type: this.type,
    };

    this.change(params);
  }

  // paramsHandler(): void {
  //   if (this.params.params) {
  //     const pars = this.params.params(this.data, this.field, this.colId);

  //     if (this.type !== pars.type || this.disabled !== pars.disabled) {
  //       this.type = pars.type;
  //       pars.valueField = pars.valueField ?? this.field;
  //       pars.textField = pars.textField ?? this.field;
  //       pars.options = pars.options ? Array.isArray(pars.options) ? pars.options : pars.options() : [];

  //       this.loadParams(pars);
  //     }
  //   }
  // }
}
