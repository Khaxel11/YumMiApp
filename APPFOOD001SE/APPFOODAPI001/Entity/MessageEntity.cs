using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    //Se usa para controlar los mensajes de regreso
    public class MessageEntity
    {
        public string Tittle { get; set; }
        public string Message { get; set; }
        public bool Correct { get; set; }
        public int Icon { get; set; } //swal icon
        public Object Value { get; set; }    
    }
}
