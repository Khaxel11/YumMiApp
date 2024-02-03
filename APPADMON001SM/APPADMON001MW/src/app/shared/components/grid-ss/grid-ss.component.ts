import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pager } from 'src/app/models/common/pager';
import { GridOptions, PaginationChangedEvent, IGetRowsParams, GridApi, ColumnApi } from 'ag-grid-community';
import { BtnCellRenderComponent } from '../btn-cell-render/btn-cell-render.component';
import { HttpClient } from '@angular/common/http';
import { CmbEditorComponent } from '../cmb-editor/cmb-editor.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'grid-ss',
  templateUrl: './grid-ss.component.html',
  styleUrls: ['./grid-ss.component.css']
})
export class GridSsComponent implements OnInit {
  gridOptions: Partial<GridOptions>;
  private gridApi: GridApi;
  private firstLoad = true;
  gridColumnApi: ColumnApi;
  @Input() columnDefs;
  @Input() rowClassRules;
  cacheOverflowSize;
  maxConcurrentDatasourceRequests;
  infiniteInitialRowCount;
  frameworkComponents;
  totalRecords = 0;
  overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Cargando...</span>';
  @Input() rowsPerPage = 8;
  @Input() pagesInPeger = 5;
  paginador = new Pager();
  @Input() Filters: any;
  @Input() enablePagination = true;
  @Input() rowSelection: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onReady = new EventEmitter<any>();
  @Input() serviceFunction: (par: any, fil: any) => any;

  constructor(public http: HttpClient) {

    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;
    this.infiniteInitialRowCount = 2;
    this.frameworkComponents = {
      btnCellRenderer: BtnCellRenderComponent,
      cmbEditor: CmbEditorComponent
    };
    this.gridOptions = {
      headerHeight: 40,
      rowHeight: 40,
      rowModelType: 'infinite',
      cacheBlockSize: this.rowsPerPage,
      paginationPageSize: this.rowsPerPage,
      defaultColDef: {
        resizable: true
      }
    };

    this.paginador.perPage = this.rowsPerPage;
    this.paginador.pagesInPager = this.pagesInPeger;
    this.paginador.showNoRowMessage = true;
    this.paginador.pagerType = 'ss';
  }

  ngOnInit(): void {
    this.gridOptions = {
      headerHeight: 40,
      rowHeight: 40,
      rowModelType: 'infinite',
      cacheBlockSize: this.rowsPerPage,
      paginationPageSize: this.rowsPerPage,
      defaultColDef: {
        resizable: true
      }
    };

    this.paginador.perPage = this.rowsPerPage;
    this.paginador.pagesInPager = this.pagesInPeger;
    this.paginador.showLoading = true;
  }

  onGridReady(param): void {
    this.firstLoad = true;
    this.gridApi = param.api;
    this.gridColumnApi = param.gridColumnApi;
    this.onReady.emit(this);
    const dataSource = {
      getRows: (params: IGetRowsParams) => {
        this.gridApi.showLoadingOverlay();
        this.paginador.showLoading = true;
        this.serviceFunction(params, this.Filters).subscribe(res => {
          this.totalRecords = res.totalRecords;
          params.successCallback(res.data, this.totalRecords);
          this.gridApi.hideOverlay();
          if (this.firstLoad) {
            this.paginador.firstGeneration = true;
            this.paginador.Generate({ totalRecords: this.totalRecords });
            this.gridApi.paginationGoToPage(this.paginador.currentPage - 1);
            this.firstLoad = false;
            this.paginador.showLoading = false;
          }
        },
        () => {
          this.gridApi.hideOverlay();
          this.paginador.showLoading = false;
        });
      }
    };

    this.gridApi.setDatasource(dataSource);
  }

  onPageChange(pagina: number = 1): void {
    this.gridApi.paginationGoToPage(pagina - 1);
  }

  onPaginationChanged(evt: PaginationChangedEvent): void {
    if (evt.newPage) {
      this.paginador.newCurrentPage = evt.api.paginationGetCurrentPage() + 1;
      this.totalRecords = evt.api.paginationGetRowCount();
      this.paginador.Generate({ totalRecords: this.totalRecords });
    }
  }

  refreshData(page: number = 1): void {
    this.firstLoad = true;
    this.paginador.newCurrentPage = page;
    this.gridApi.purgeInfiniteCache();
  }

  selectAll(value: boolean): void {
    const rowCount = this.gridApi.getDisplayedRowCount();
    const lastGridIndex = rowCount - 1;
    const currentPage = this.gridApi.paginationGetCurrentPage();
    const pageSize = this.gridApi.paginationGetPageSize();
    const startPageIndex = currentPage * pageSize;
    let endPageIndex = (currentPage + 1) * pageSize - 1;
    if (endPageIndex > lastGridIndex) {
      endPageIndex = lastGridIndex;
    }
    for (let i = startPageIndex; i <= endPageIndex; i++) {
      const rowNode = this.gridApi.getDisplayedRowAtIndex(i);
      rowNode.setSelected(value);
    }
  }

  getSelectedData(): any[] {
    return this.gridApi.getSelectedRows();
  }
}
