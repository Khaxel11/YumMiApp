export class Product{
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
    public precioUnidad : number; 
    public cantidadMinima : number;
    public cantidadMaxima : number;
}