using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class ParamsEntity
    {

    }
    public class ParamsReport
    {
        public string ReferenciaI { get; set; }
        public string ReferenciaF { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public List<ReferenciaParam> Referencias { get; set; }
    }
    public class ReferenciaParam
    {
        public string Referencia { get; set;}
    }
}
