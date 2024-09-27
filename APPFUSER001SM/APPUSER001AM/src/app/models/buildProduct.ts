import { Product, Ingredient, Category, Price } from "./product";

export class ProductBuilder {
    private product: Product;

    constructor() {
        this.product = new Product();
    }

    withIdTipo(idTipo: number): ProductBuilder {
        this.product.idTipo = idTipo;
        return this;
    }

    withIdTipoAlimentacion(idTipoAlimentacion: number): ProductBuilder {
        this.product.idTipoAlimentacion = idTipoAlimentacion;
        return this;
    }

    withNombreProducto(nombreProducto: string): ProductBuilder {
        this.product.nombreProducto = nombreProducto;
        return this;
    }

    withCategoria(categoria: Category): ProductBuilder {
        this.product.categorias.push(categoria);
        return this;
    }

    withIngredient(ingrediente: Ingredient): ProductBuilder {
        this.product.ingredientes.push(ingrediente);
        return this;
    }

    withFoto(foto: string): ProductBuilder {
        this.product.foto = foto;
        return this;
    }

    withDescripcion(descripcion: string): ProductBuilder {
        this.product.descripcion = descripcion;
        return this;
    }

    withDisponibilidad(disponibilidad: boolean): ProductBuilder {
        this.product.disponibilidad = disponibilidad;
        return this;
    }

    withPrecio(precio: Price): ProductBuilder {
        this.product.precios.push(precio);
        return this;
    }

    withPromocion(promocion: boolean): ProductBuilder {
        this.product.promocion = promocion;
        return this;
    }

    withEtiquetaEspecial(etiquetaEspecial: boolean): ProductBuilder {
        this.product.etiquetaEspecial = etiquetaEspecial;
        return this;
    }

    withEtiqueta(etiqueta: string): ProductBuilder {
        this.product.etiqueta = etiqueta;
        return this;
    }

    withPopularidad(popularidad: number): ProductBuilder {
        this.product.popularidad = popularidad;
        return this;
    }

    build(): Product {
        return this.product;
    }
}