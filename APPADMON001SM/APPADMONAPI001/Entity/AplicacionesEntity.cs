using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class AplicacionesEntity
    {
        public int IdSistema { get; set; }
        public string Nomenclatura { get; set; }
        public string Sistema { get; set; }
        public string Descripcion { get; set; }

    }
    public class lstOrden
    {
        public int orden { get; set; }
        public int idRegistro { get; set; }
    }
    public class DatosOrden : lstOrden 
    {
        public List<lstOrden> OrdenList { get; set; }
        DatosOrden() 
        {
            OrdenList = new List<lstOrden>();
        }
    }
}
