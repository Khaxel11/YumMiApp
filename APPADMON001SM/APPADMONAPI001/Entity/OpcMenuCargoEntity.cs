using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class OpcMenuCargoEntity
    {
        public int IdCargo { get; set; }
        public string NombreCargo { get; set; }
        public int OpcionesDisponibles { get; set; }

    }

    public class opcionesPorCargo
    {
        public int IdOpcion { get; set; }
        public string TituloEncabezado { get; set; }
        public string TituloOpcion { get; set; }
    }

    public class opcionesMenu
    {
        public int IdEncabezado { get; set; }
        public int IdOpcion { get; set; }
        public string TituloEncabezado { get; set; }
        public string TituloOpcion { get; set; }
    }
    public class opcionesType
    {
        public int IdOpcion { get; set; }
        public int IdCargo { get; set; }
        public int IdEncabezado { get; set; }
        public int IdOpcionDetalle { get; set; }
    }

   

}
