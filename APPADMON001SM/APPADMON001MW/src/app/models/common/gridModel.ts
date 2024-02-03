import { RowNode } from 'ag-grid-community';

export interface GridModel {
    refreshData: (page?: number) => void;
    refreshDataKeepSelected: (page?: number) => void;
    selectAll: (value?: boolean) => void;
    getSelectedData: () => any[];
    getSelectedNodes: () => RowNode[];
    showOverlayLoading: () => void;
    showOverlayNoRows: () => void;
    hideOverlay: () => void;
    selectByNodes: (nodes: RowNode[]) => void;
    select: (params: {keys?: string[], key?: string, rows: any[]}) => void;
    toPage: (page?: number) => void;
}
