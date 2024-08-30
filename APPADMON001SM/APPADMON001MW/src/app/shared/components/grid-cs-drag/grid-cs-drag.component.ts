import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from 'src/app/models/common/pager';
import { BtnCellRenderComponent } from '../btn-cell-render/btn-cell-render.component';
import { ChkCellRenderComponent } from '../chk-cell-render/chk-cell-render.component';
import { HybridCellRenderComponent } from '../hybrid-cell-render/hybrid-cell-render.component';
import { CmbEditorComponent } from '../cmb-editor/cmb-editor.component';
import { HttpClient } from '@angular/common/http';
import { ColumnApi, GridApi, GridOptions, PaginationChangedEvent, RowNode,RowDragEndEvent } from 'ag-grid-community';
import { GridModel } from 'src/app/models/common/gridModel';

// tslint:disable: no-output-on-prefix
// tslint:disable: component-selector
@Component({
  selector: 'grid-cs-drag',
  templateUrl: './grid-cs-drag.component.html',
  styleUrls: ['./grid-cs-drag.component.css']
})
export class GridCsDragComponent implements OnInit {
  private dataValue: any[];
  private gridApi: GridApi;
  gridOptions: Partial<GridOptions>;
  gridColumnApi: ColumnApi;
  @Input() autoHeight: boolean = true;
  @Input() columnDefs: any[];
  frameworkComponents: any;
  totalRecords = 0;
  @Input() overlayLoadingTemplate = '<span class="ag-overlay-loading-center overlay-mt">Cargando...</span>';
  @Input() overlayNoRowsTemplate = '<span>No se encontraron registros</span>';
  @Input() suppressNoRowsOverlay = false;
  @Input() rowsPerPage = 8;
  @Input() pagesInPeger = 5;
  paginador = new Pager();
  @Input() enablePagination = true;
  @Input() rowSelection: string;
  @Input() suppressRowClickSelection = false;
  @Output() dataChange = new EventEmitter<any[]>();
  @Output() onLoad = new EventEmitter<GridModel>();
  @Output() onReady = new EventEmitter<GridModel>();
  @Output() rowsChanged = new EventEmitter<void>();
  @Output() selectionChanged = new EventEmitter<any>();
  @Output() updateRowData = new EventEmitter<any[]>();

  //@Input() autoHeight: boolean = true;
  @Input() height: string = '500px';
  @Input() headerHeight: number = 40;
  @Input() rowHeight: number = 40;

  @Input() idField: string = 'idRegistro';  // Campo configurable para el ID
  @Input() orderField: string = 'orden';      // Campo configurable para el orden
  @Output() orderChanged = new EventEmitter<any[]>();

  @Input() get data(): any[] {
    return this.dataValue;
  }
  set data(value: any[]) {
    this.dataValue = value;
    this.totalRecords = this.dataValue.length;
    this.refreshData();
    this.dataChange.emit(this.dataValue);
  }

  constructor(public http: HttpClient) {
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderComponent,
      chkCellRenderer: ChkCellRenderComponent,
      hybCellRenderer: HybridCellRenderComponent,
      cmbEditor: CmbEditorComponent
    };

    this.gridOptions = {
      headerHeight: this.headerHeight,
      rowHeight: this.rowHeight,
      rowDragManaged: true, // Habilita el manejo de arrastre de filas
      animateRows: true,
      pagination: this.enablePagination,
      onRowDragEnd: this.onRowDragEnd.bind(this),
      // headerHeight: 40,
      // rowHeight: 40,
      paginationPageSize: this.rowsPerPage,
      defaultColDef: {
        resizable: true
      },
      suppressNoRowsOverlay: this.suppressNoRowsOverlay
    };

    this.paginador.perPage = this.rowsPerPage;
    this.paginador.pagesInPager = this.pagesInPeger;
  }

  ngOnInit(): void {
    this.gridOptions = {
      headerHeight: this.headerHeight,
      rowHeight: this.rowHeight,
      // headerHeight: 40,
      // rowHeight: 40,
      paginationPageSize: this.rowsPerPage,
      defaultColDef: {
        resizable: true
      },
      suppressNoRowsOverlay: this.suppressNoRowsOverlay
    };

    this.paginador.perPage = this.rowsPerPage;
    this.paginador.pagesInPager = this.pagesInPeger;

    this.onLoad.emit(this);
  }
  // onRowDragEnd(event: RowDragEndEvent): void {
  //   const movingNode = event.node;
  //   const overIndex = event.overIndex;
    

  //   if (overIndex !== undefined && movingNode !== undefined) {
  //     // Remover la fila del índice original
  //     this.dataValue.splice(movingNode.rowIndex, 1);
  //     // Insertar la fila en la nueva posición
  //     this.dataValue.splice(overIndex, 0, movingNode.data);

  //     // Actualizar el grid
  //     this.refreshData();

  //     // Generar el array con el nuevo orden, usando los campos configurables
  //     const newOrderArray = this.dataValue.map((row, index) => ({
  //       [this.idField]: row[this.idField], // Campo ID configurable
  //       [this.orderField]: index + 1       // Campo de orden configurable
  //     }));

  //     // Emitir el nuevo array con el ID y el nuevo orden
  //     this.orderChanged.emit(newOrderArray);
  //   }
  // }
  onRowDragEnd(event: any) {
    const movedRow = event.node.data; // La fila que se movió
    const newIndex = event.overIndex; // La nueva posición en la que se suelta
    const oldIndex = this.dataValue.indexOf(movedRow); // La posición original de la fila
    this.moveRowInList(oldIndex, newIndex);
  }
  moveRowInList(oldIndex: number, newIndex: number): void {
    if (oldIndex !== newIndex) {
      const movedItem = this.dataValue.splice(oldIndex, 1)[0]; // Extraer el elemento movido
      this.dataValue.splice(newIndex, 0, movedItem); // Insertar en la nueva posición
  
      // Recalcular los valores de orden para todas las filas afectadas
      this.updateOrderInList();
      this.orderChanged.emit(this.dataValue);
    }
  }
//   moveRowInList(fromIndex: number, toIndex: number) {
//   // Mueve el registro dentro del array
//   const itemToMove = this.dataValue.splice(fromIndex, 1)[0]; // Extrae el item a mover
//   this.dataValue.splice(toIndex, 0, itemToMove); // Inserta en la nueva posición

//   // Actualiza las posiciones en el array basado en el nuevo índice
//   this.dataValue.forEach((item, index) => {
//     item.posicion = index + 1; // Actualiza la posición (1-based index)
//   });

//   // Emite el cambio en el orden de los elementos
//   this.orderChanged.emit(this.dataValue);
// }
  updateOrderInList(): void {
    this.dataValue.forEach((item, index) => {
      item.orden = index + 1; // Asignar el nuevo valor de orden basado en la nueva posición
    });
  
    // Emitir el cambio de datos para que se refleje en el grid
    this.refreshData();
  }
  onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.gridColumnApi;
    this.onReady.emit(this);
  }

  onPageChange(pagina?: number): void {
    pagina = pagina ? pagina : this.paginador.currentPage;
    this.gridApi.paginationGoToPage(pagina - 1);
  }

  onPaginationChanged(evt: PaginationChangedEvent): void {
    if (evt.newPage || this.paginador.firstGeneration) {
      this.paginador.newCurrentPage = evt.api.paginationGetCurrentPage() + 1;
      this.paginador.Generate({totalRecords: this.totalRecords});
    }
  }

  refreshData(page?: number): void {
    if (this.gridApi) {
      this.totalRecords = this.data.length;
      this.paginador.firstGeneration = true;
      this.gridApi.setRowData(this.data);
      this.gridApi.setRowData(this.dataValue); //Cambio
      this.dataChange.emit(this.dataValue); // Emitir el cambio de datos
      this.onPageChange(page);
    }
  }

  refreshDataKeepSelected(page?: number): void {
    if (this.gridApi) {
      const selectedNodes = this.getSelectedNodes();
      this.paginador.firstGeneration = true;
      this.gridApi.setRowData(this.data);
      this.onPageChange(page);
      this.selectByNodes(selectedNodes);
    }
  }

  toPage(page: number = 1): void {
    this.onPageChange(page);
  }

  selectAll(value = true): void {
    if (value) {
      this.gridApi.selectAll();
    } else {
      this.gridApi.deselectAll();
    }
  }

  getSelectedData(): any[] {
    return this.gridApi.getSelectedRows();
  }

  getSelectedNodes(): RowNode[] {
    return this.gridApi.getSelectedNodes();
  }

  select(params: {keys?: string[], key?: string, rows: any[]}): void {
    let keys: string[] = [];
    if (params.key) {
      keys.push(params.key);
    } else {
      keys = params.keys ? params.keys : params.rows.length > 0 ?  Object.keys(params.rows[0]) : [];
    }

    this.gridApi.forEachNode((rowNode: RowNode) => {
      params.rows.forEach(row => {
        let sameData = true;

        for (const key of keys) {
          if (row[key] !== rowNode.data[key]) {
            sameData = false;
            break;
          }
        }

        if (sameData) {
          rowNode.setSelected(true);
        }
      });
    });
  }

  selectByNodes(nodes: RowNode[]): void {
    this.gridApi.forEachNode((rowNode: RowNode) => {
      nodes.forEach(node => {
        if (node.data === rowNode.data) {
          rowNode.setSelected(true);
        }
      });
    });
  }

  showOverlayLoading(): void {
    this.gridApi.showLoadingOverlay();
  }

  hideOverlay(): void {
    this.gridApi.hideOverlay();
  }

  showOverlayNoRows(): void {
    this.gridApi.showNoRowsOverlay();
  }

  _rowsChanged(): void {
    if (this.gridApi) {
      this.rowsChanged.emit();
    }
  }
}
