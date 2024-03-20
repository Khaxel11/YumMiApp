using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class TiposNotificacionesEntity
    {
        public int IdTipoNotificacion { get; set; }
        public string Descripcion { get; set; }
        public int IdTipoUsuario { get; set; }
        public string TipoUsuario { get; set; } 
        public byte[] Icono { get; set; }
        public string IconoString { get; set; }
    }
}
