using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    /*
    * Author:      Manuel de Jesus Valenzuela Gracian
    * Date:        03Sep2024
    * Descripción: Entidad(s) o Modelo(s) para captura de restrición de Alimentacion
    */

    public class RestricionAlimentacionEntity
    {
        public int cantidadRestriciones { get; set; }
        public int idRestriccionIngrediente { get; set; }
        public int idTipoAlimentacion { get; set; }
        public int idIngrediente { get; set; }
        public string tipoAlimentacion { get; set; }
        public string ingrediente { get; set; }
        public string descripcion { get; set; }
        

    }

    public class RestricionAlimentacion_TiposAlimentacionEntity
    {
        public int idTipoAlimentacion { get; set; }
        public string tipoAlimentacion { get; set; }
        public string descripcion { get; set; }
        public int cantidadRestriciones { get; set; }
    }

    public class RestricionAlimentacion_IngredientesEntity
    {
        public int idIngrediente { get; set; }
        public string ingrediente { get; set; }
        public string descripcion { get; set; }
    }

    // clase combinada con TiposAlimentacion e Ingredientes


    public class RestricionAlimentacion_Listas
    {
        public List<RestricionAlimentacion_IngredientesEntity> lstIngredients { get; set; }
    }
}
