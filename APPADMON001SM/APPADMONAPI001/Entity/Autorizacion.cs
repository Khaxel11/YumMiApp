using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class Autorizacion
    {
        public string Clave { get; set; }
        public string Nombre { get; set; }
        public string Departamento { get; set; }
        public bool TipoAutorizacion { get; set; }
        public string ChequeraE { get; set; }
        public int IdChequera { get; set; }
        public string NumeroCuenta { get; set; }
        public string Banco { get; set; }
        public int IdBanco { get; set; }
        public bool Checado { get; set; }
        public bool Checado2 { get; set; }
        public bool Activo { get; set; }
        public string Usuario { get; set; }
        public string Zona { get; set; }    
        public int FolioInicial { get; set; }
        public int FolioFinal { get; set; }
        public string Folios { get; set; }

        public class Usuarios
        {
            public string UsuarioErp { get; set; }
            public string Nombre { get; set; }
            public string Area { get; set; }
        }
        public class Chequera
        {
           public bool Checado { get; set; }
            public bool Checado2 { get; set; }
           public int IdChequera { get; set; }
           public string  Usuario { get; set; }
           public bool Activo { get; set; }
        }
    }
}
