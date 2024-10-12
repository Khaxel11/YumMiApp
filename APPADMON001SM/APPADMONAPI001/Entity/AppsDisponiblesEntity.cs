using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class SistemasEntity
    {
        public int IdSistema { get; set; }
        public int IdRegistro { get; set; }
        public string NomenclaturaSistema { get; set; }
        public string Sistema { get; set; }
        public string Descripcion { get; set; }
    }
    public class AppsDisponiblesEntity
    {
        public int IdOpcion { get; set; }
        public int IdRegistro { get; set; }

        public int Orden { get; set; }
        public int IdEncabezado { get; set; }
        public string TituloOpcion { get; set; }
        public string SubRuta { get; set; }

    }
    public class EncabezadosEntity
    {
        public int IdEncabezado { get; set; }
        public int IdRegistro { get; set; }
        public int Orden { get; set; }
        public int IdSistema { get; set; }
        public string Encabezado { get; set; }
        public string Ruta { get; set; }
        public string Icono { get; set; }
    }
}
