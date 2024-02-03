export interface ListModel {
    data: any[];
    selectId: string;
    default: any;
    required: boolean;
    filters: any;
    value: number | string | boolean;
    listar: () => void;
}
