using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class CatPromosEntity
    {
        public int IdPromo { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public decimal Descuento { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public int Disponibles { get; set; }
        public bool EsProgramado { get; set; }
        public bool EsAcumulable { get; set; }
        public decimal ValorAcumulable { get; set; }
        public int CantidadAcumulable { get; set; }
    }
}



