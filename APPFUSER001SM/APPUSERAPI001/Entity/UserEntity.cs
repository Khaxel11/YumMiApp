using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    internal class UserEntity
    {
    }
    public class UserData
    {
        public int IdCuenta { get; set; }   
        public string Username { get; set; }
        public string Password { get; set; }
        public string Correo { get; set; }
        public string FotoString { get; set; }
        public byte[] Foto { get; set; }    
        public bool VerificadoMovil { get; set; }   
        public string Telefono { get; set; }    

    }
}
