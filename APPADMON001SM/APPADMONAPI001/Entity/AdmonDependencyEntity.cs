using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class AdmonDependencyEntity
    {
            
    }
    public class AdmonUsuarioEntity
    {
        public string isLogged { get; set; }
        public string idEmpleado { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public string picture { get; set; }

    }

    public class AdmonUsuarioMenuEntity
    {
        public int idEmpleado { get; set; }
        public string usuario { get; set; }
        public int idCargo { get; set; }
        public int idTipoUsuario { get; set; }
        public int idEncabezado { get; set; }
        public int idOpcionEnc { get; set; }
        public int posEnc { get; set; }
        public string tituloEncabezado { get; set; }
        public string rutaEncabezado { get; set; }
        public string icono { get; set; }
        public int idOpcionDet { get; set; }
        public int posDet { get; set; }
        public string TituloDetalle { get; set; }
        public string SubRuta { get; set; }
        public string linkDet { get; set; }
    }
}
