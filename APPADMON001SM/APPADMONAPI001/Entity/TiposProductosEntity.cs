using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class TiposProductosEntity
    {
        public int IdTipo { get; set; }
        public string NombreTipo {  get; set; } 
        public string Descripcion { get; set; }
        public byte[] Foto { get; set; }    
        public string stringFoto { get; set; }
    }
}
