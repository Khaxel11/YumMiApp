using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class Notifications
    {
        public int IdNotificacion { get; set; }
        public byte[] Icono { get; set; }   
        public int IdTipoNotificacion { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public bool Leida { get; set; }
        public int IdRecompensaRelacionado { get; set; }
        public string DescripcionNotificacion { get; set; }
        public int IdCatRecompensa { get; set; }
        public int IdRecompensa { get; set; }
        public string NombreRecompensa { get; set; }    
        public string DescripcionRecompensa { get; set; }
        public string Fecha { get; set; }
        public string Estado { get; set; }
    }
}
