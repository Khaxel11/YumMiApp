using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class CatPersonalEntity
    {
        public string usuario { get; set; }
        public string nombre { get; set; }
        public string apellpaterno { get; set; }
        public string apellmaterno { get; set; }
        public int idcargo { get; set; }
        public int idtipousuario { get; set; }
        public string password { get; set; }
        public string correo { get; set; }
        public string fechanac { get; set; }
        public int idpais { get; set; }
        public int idestado { get; set; }
        public int idmunicipio { get; set; }
        public byte[] foto { get; set; }
        public string nomcompleto { get; set; }
        public int idusuario { get; set; }
    }

    public class tpocargo
    {
        public int idcargo { get; set; }
        public string cvecargo { get; set; }
        public string nomcargo { get; set; }
    }

    public class tpousuarios
    {
        public int idtpousuario { get; set; }
        public string tpousuario { get; set; }
    }

    public class paises
    {
        public int idpais { get; set; }
        public string abrev { get; set; }
        public string pais { get; set; }
    }

    public class estados
    {
        public int idestado { get; set;}
        public string cveestado { get; set; }
        public string abrev { get; set; }
        public string nomestado { get; set; }
    }

    public class municipios
    {
        public int idmunicipio { get; set; }
        public string cvelocalidad { get; set; }
        public string nommunicipio { get; set; }
    }

    public class usuarios
    {
        public int idempleado { get; set; }
        public string usuario { get; set; }
        public byte[] contrasenia { get; set; }
        public string nombreusuario { get; set; }
        public string apellpaterno { get; set; }
        public string apellmaterno { get; set; }
        public string nomcompleto { get; set; }
        public string correo { get; set; }
        public int idcargo { get; set; }
        public int idtpousuario { get; set; }
        public string fechanac { get; set; }
        public int idpais { get; set; }
        public int idestado { get; set; }
        public int idmunicipio { get; set; }
        public byte[] foto { get; set; }
        public string titulo { get; set; }
        public string descripcionuso { get; set; }
    }

}
