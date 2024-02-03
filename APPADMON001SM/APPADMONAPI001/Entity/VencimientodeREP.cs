using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
  
    public class Proveedores
    {
        public int clave { get; set; }
        public string nombre { get; set; }
        public int idproveedor { get; set; }
        public int aplicaMensual { get; set; }
        public int omitirConfiguracion { get; set;}
        public string usuarioERP { get; set; }
        public string usuariomodifica { get; set; }
        public DateTime fechaUpdate { get; set;}
        public int estatus { get; set; }
        public int idConfiProveedor { get; set; }
    }
   

    public class REP
    {
        public string idConfiguracionREP { get; set; }
        public int mensual { get; set;}
        public int individual { get; set; }
        public int activo { get; set; }
        public string usuariomodifica { get; set; }
        public string usuarioERP { get; set; }
        public DateTime fechaInsert { get; set;}
        public DateTime fechaUpdate { get; set; }
    }

    public class ConfiguracionRep
    {
        public int idConfiguracionREP { get; set; }
        public int mensual { get; set; }
        public int individual { get; set; }
        public DateTime fechaUpdate { get; set; }
        public string usuarioERP { get; set; }
        public string usuariomodifica { get; set; }
    }



}
