using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{

    /*
    * Author:      Manuel de Jesus Valenzuela Gracian
    * Date:        27Ago2024
    * Descripción: Entidad(s) o Modelo(s) para catalogo Ingrendients
    */

    public class IngredientsEntity
    {

        public int idIngrediente { get; set; }
        public string ingrediente { get; set; }
        public string descripcion { get; set; }
        public byte[] foto { get; set; }
        public string stringFoto { get; set; }
        public bool activo { get; set; }
        //public DateTime fechaInsert { get; set; }
        //public DateTime fechaUpdate { get; set; }
        //public DateTime fechaDelete { get; set; }
        //public string usuarioInsert { get; set; }
        //public string usuarioUpdate { get; set; }
        //public string usuarioDelete { get; set; }
    }
}
