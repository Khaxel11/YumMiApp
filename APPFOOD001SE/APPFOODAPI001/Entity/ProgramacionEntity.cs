using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class ProgramacionEntity
    {
        public int IdProgramacion { get; set; }
        public int IdProducto { get; set; }
        public int IdFoodHub { get; set; }
        public string Descripcion { get; set; }
        public bool NotificacionesActivas { get; set; }
        public bool Reportado { get; set; }
        public string MotivoEliminado { get; set; }
        public FechasProgramadas[] FechasProgramadas { get; set; }
    }
    public class FechasProgramadas
    {
        public int IdFechaProgramada { get; set; }
        public int IdProgramacion { get; set; }
        public string Fecha { get; set; }
        public int Cantidad { get; set; }
        public int Interesados { get; set; }
        public bool Confirmado { get; set; }
        public string TipoProgramacion { get; set; }

    }
    
}
