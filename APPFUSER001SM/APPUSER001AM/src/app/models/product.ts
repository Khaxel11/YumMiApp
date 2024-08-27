export class Product{
    public idProducto: number;
    public idCuenta: number;
    public idCategoria: number;
    public idTipo : number = 0;
    public idTipoAlimentacion : number = 0;
    public nombreProducto : string = "";
    public categorias : Category[] = [];
    public ingredientes : any[] = [] ;
    public foto : string = "";
    public descripcion : string = "";
    public disponibilidad : boolean = false;
    public precios : any[] = [];
    public promocion : boolean = false;
    public etiquetaEspecial : boolean = false;
    public etiqueta : string = "";
    public popularidad : number = 0;
    public preciosConfigurados: boolean;
    public nombreTipo: string;
    public tipoAlimentacion: string;
    
}
export class Producto{
    
}
export class Category{
    public idCategoria : number;
    public categoria : string;
}
export class Ingredient{
    public idIngrediente : number;
    public ingrediente : string;
}
export class Price{
    public idPrecio : number;
    public precioUnidad : number; 
    public cantidadMinima : number;
    public cantidadMaxima : number;
}