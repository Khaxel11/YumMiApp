import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from 'src/app/models/common/pager';
import { BtnCellRenderComponent } from '../btn-cell-render/btn-cell-render.component';
import { ChkCellRenderComponent } from '../chk-cell-render/chk-cell-render.component';
import { HybridCellRenderComponent } from '../hybrid-cell-render/hybrid-cell-render.component';
import { CmbEditorComponent } from '../cmb-editor/cmb-editor.component';
import { HttpClient } from '@angular/common/http';
import { ColumnApi, GridApi, GridOptions, PaginationChangedEvent, RowNode } from 'ag-grid-community';
import { GridModel } from 'src/app/models/common/gridModel';

// tslint:disable: no-output-on-prefix
// tslint:disable: component-selector
@Component({
  selector: 'grid-cs',
  templateUrl: './grid-cs.component.html',
  styleUrls: ['./grid-cs.component.css']
})
export class GridCsComponent implements OnInit {
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
  //@Input() autoHeight: boolean = true;
  @Input() height: string = '500px';
  @Input() headerHeight: number = 40;
  @Input() rowHeight: number = 40;

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
