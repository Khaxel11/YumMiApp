using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class Producto
    {
        public int IdProducto { get; set; }
        public int IdCuenta { get; set; }
        public string NombreProducto { get; set; }
        public byte[] Foto { get; set; }
        public string Descripcion { get; set; }
        public int IdTipo { get; set; }
        public string NombreTipo { get; set; }
        public int IdTipoAlimentacion { get; set; }
        public string TipoAlimentacion { get; set; }
        public bool Disponibilidad { get; set; }
        public bool PreciosConfigurados { get; set; }
        public bool Promocion { get; set; }
        public string EtiquetaEspecial { get; set; }
        public string Etiqueta { get; set; }
        public int Popularidad { get; set; }
        public int IdCategoria { get; set; }
    }
    public class ProductEntity
    {
        public int IdProducto { get; set; }
        public int IdTipo { get; set; }
        public int IdTipoAlimentacion { get; set; }
        public string NombreProducto { get; set; }
        public string Descripcion { get; set; }
        public List<CategoryEntity> Categorias { get; set; }
        public List<IngredientEntity> Ingredientes { get; set; }
        public string Foto { get; set; }
        public byte[] Picture { get; set; }
        public bool Disponibilidad { get; set; }
        public bool Promocio { get; set; }  
        public bool EtiquetaEspecial { get; set; }
        public string Etiqueta { get; set; }
        public int Popularidad { get; set; }
        public PricesEntity[] Precios { get; set; }
        public string Usuario { get; set; }

    }
    public class CategoryEntity
    {
        public int IdCategoria {  get; set; }
        public string Categoria { get; set; }
    }
    public class IngredientEntity
    {
        public int IdIngrediente { get; set; }
        public string Ingrediente { get; set; }
    }
    public class PricesEntity
    {
        public int IdPrecio { get; set; }
        public decimal PrecioUnidad { get; set; }
        public int CantidadMinima { get; set; }
        public int CantidadMaxima { get; set; }
    }
    public class TypeIngrediente
    {
        public int IdIngredienteComida { get; set; }
        public int IdIngrediente { get; set; }
        public int IdProducto { get; set; } 

    }
    public class TypeCategorias
    {
        public int IdCategoriaProducto { get; set; }
        public int IdProducto { get; set; }
        public int IdCategoria { get; set; }

    }

    public class ComboEntity
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Foto { get; set; }
    }

 

    public class PrecioEntity
    {
        public int IdPrecios { get; set; }
        public int IdProducto { get; set; }
        public decimal PrecioUnidad { get; set; }
        public int CantidadMinima { get; set; }
        public int CantidadMaxima { get; set; }
    }



    public class CreateListType
    {
        public List<TypeIngrediente> createTypeIngredientes(List<IngredientEntity> Ingredientes, int IdProducto)
        {
            TypeIngrediente Ingrediente;
            List<TypeIngrediente> lstIngredientes = new List<TypeIngrediente>();
            for (int i = 0; i < Ingredientes.Count; i++)
            {
                Ingrediente = new TypeIngrediente();
                Ingrediente.IdIngredienteComida = 0;
                Ingrediente.IdProducto = IdProducto;
                Ingrediente.IdIngrediente = Ingredientes[i].IdIngrediente;
                lstIngredientes.Add(Ingrediente);
            }
            return lstIngredientes;
        }
        public List<TypeCategorias> createTypeCategorias(List<CategoryEntity> Categorias, int IdProducto)
        {
            TypeCategorias categoria;
            List<TypeCategorias> lstCategorias = new List<TypeCategorias>();
            for (int i = 0; i < Categorias.Count; i++)
            {
                categoria= new TypeCategorias();
                categoria.IdCategoriaProducto = 0;
                categoria.IdCategoria = Categorias[i].IdCategoria;
                categoria.IdProducto = IdProducto;
                lstCategorias.Add(categoria);
            }
            return lstCategorias;
        }
    }
}
