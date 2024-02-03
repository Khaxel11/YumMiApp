import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-btn-cell-render',
  templateUrl: './btn-cell-render.component.html'
})
export class BtnCellRenderComponent implements ICellRendererAngularComp {
  params;
  label: string;
  type: string;
  class: string;
  dato: string;

  agInit(params): void {
    this.params = params;
    this.label = null;
    this.type = 'button';
    this.class = 'OcultarBotones';
    this.dato = '';
    this.cellrenderDinamico(this.params);
  }
  refresh(params?: any): boolean {
    return true;
  }
  onClick($event: any): void {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        data: this.params.node.data,
      };
      this.params.onClick(params);
    }
  }
  cellrenderDinamico(params): void {
    let Obj;
    if (params.data !== undefined) {
      Obj = params.data;
      const key = params.colDef.field;
      if (params.colDef.cellRendererParams.type === 'btnCheck') {
        this.label = Obj[key] === true ? params.label[1] : params.label[0];
        this.type = Obj[key] === true ? params.type[1] : params.type[0];
        this.class = Obj[key] === true ? params.class[1] : params.class[0];
      } else {
        this.label = params.label || null;
        this.type = params.type || 'button';
        this.class = params.class || null;

        if (typeof params.colDef.field !== 'undefined'){
          if (params.colDef.field !== null){
            this.dato = Obj[key];
          }
        }
      }
    }
  }
}
