using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class FechasProgramadasEntity
    {
        public int IdFechaProgramada { get; set; }
        public DateTime Fecha { get; set; }
        public int Cantidad { get; set; }
        public string Interesados { get; set; }
        public bool Confirmado { get; set; }
        public int NotificacionesEnviadas { get; set; }
        public string TipoProgramacion { get; set; }
        public bool Activo { get; set; }
        public string FechaProgramada { get; set; }
        public decimal PrecioActual { get; set; }
        public int IdProgramacion { get; set; }
        public string Descripcion { get; set; }
        public bool NotificacionesActivas { get; set; }
        public int IdProducto { get; set; }
        public string NombreProducto { get; set; }
        public byte[] FotoProducto { get; set; }
        public byte[] FotoFoodHub { get; set; }
        public string DescripcionProducto { get; set; }
        public int IdTipo { get; set; }
        public int IdTipoAlimentacion { get; set; }
        public int IdFoodHub { get; set; }
        public string ClaveFoodHub { get; set; }
        public int IdHub { get; set; }
        public int IdContacto { get; set; }
        public string NombreFoodHub { get; set; }
        public string Calle { get; set; }
        public string EntreCalles { get; set; }
        public string Colonia { get; set; }
        public string ComentariosFoodHub { get; set; }
        public string CiudadFoodHub { get; set; }
        public string Municipio { get; set; }
        public int IdEstado { get; set; }
        public string NombreEstado { get; set; }
        public string Pais { get; set; }
        public string CP { get; set; }
        public string NumeroFoodHub { get; set; }
        public decimal Calificacion { get; set; }
        public int IdCuenta { get; set; }
        public int DiasPorConfirmar { get; set; }
    }
}
