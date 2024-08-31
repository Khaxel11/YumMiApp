using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class VisualesEntity
    {
        public bool activo { get; set; }
        public string descripcionUso { get; set; }
        public int diasApartirProgramado { get; set; }
        public bool esProgramado { get; set; }
        public string fechaInicioProgramado { get; set; }
        public string FechaFinalProgramado { get; set; }
        public int idOpcionRedirecciona { get; set; }
        public int idSistema { get; set; }
        public int idUsoMenu { get; set; }
        public int idVisual { get; set; }
        public bool redirecciona { get; set; }
        public string strImagen { get; set; }
        public string subtitulo { get; set; }
        public string titulo { get; set; }
        public byte[] imagen { get; set; }
    }

    public class VisualesAplicaionesEntity
    {
        public int IdSistema { get; set; }
        public string NomenclaturaSistema { get; set; }
        public string Sistema { get; set; }
        public string Descripcion { get; set; }
    }

    public class VisualesCatproductosEntity
    {
        public int idOpcion { get; set; }
        public int posicion { get; set; }
        public int idEncabezado { get; set; }
        public string tituloOpcion { get; set; }
        public string subRuta { get; set; }
        public bool esRutaExterna { get; set; }
    }
}
