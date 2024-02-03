import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-chk-cell-render',
  templateUrl: './chk-cell-render.component.html',
  styleUrls: ['./chk-cell-render.component.css']
})
export class ChkCellRenderComponent implements ICellRendererAngularComp {
  params: any;
  containerClass: string;
  class: string;
  display: any;
  data: any;

  change: (params?: any) => void;

  constructor() { }

  refresh(): boolean {
    return false;
  }

  agInit(params: any): void {
    this.params = params;
    this.class = params.class ? params.class : 'form-check-input position-static';
    this.containerClass = params.containerClass ? params.containerClass : 'form-check';
    this.data = params.data;
    this.display = params.display;
    this.change = params.change;
  }

  checkedHandler(event: any): void {
    const checked = event.target.checked;
    const colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
    if (typeof this.change === 'function') {
      const params = {
        value: checked,
        data: this.data
      };

      this.change(params);
    }
  }

  displayHandler(): boolean {
    if (typeof this.display === 'undefined') {
      return true;
    } else if (typeof this.display === 'boolean') {
      return this.display;
    } else {
      return this.display(this.data, this.params.column.colId);
    }
  }
}
