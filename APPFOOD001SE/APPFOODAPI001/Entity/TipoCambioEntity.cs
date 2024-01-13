using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class TipoCambioEntity
    {
        public string Fecha { get; set; }
        public string Fecha2 { get; set; }
        public Decimal TipoCambio { get; set; }
        public Boolean Visible { get; set; }

    }
    public class UserNotify
    {
        public int Id { get; set; }
        public string Clave { get; set; }
        public string Correo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }
    public class newUsers
    {
        public int Id { get; set; }
        public string Clave { get; set; }
        public string Nombre { get; set; }

    }
    public class listUsuariosNotify
    {
        public List<newUsers> lstUsuariosNotify { get; set; }
    }
    public class TiposMoneda
    {
        public int IdMoneda { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
    }
    public class listTipoCambio
    {
        public int IdMoneda { get; set; }
        public List<TipoCambioEntity> lstTipoCambio { get; set; }
    }
}
