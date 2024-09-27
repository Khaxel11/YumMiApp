using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class CategoriasEntity
    {
        public int IdCategoria { get; set; }
        public string Categoria {  get; set; } 
        public string Descripcion { get; set; }
        public byte[] Foto { get; set; }    
        public string stringFoto { get; set; }
    }
}
