using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class CalculoOEE
    {
        public int turno { get; set; }
        public Maquina[] maquinas { get; set; }
        public string fechaInicio { get; set; }
        public string fechaFin { get; set; }
        public string tipoMaquina { get; set; }
        public string supervisor { get; set; }
        public int tripulacion { get; set; }

    }

    public class Maquina
    {
        public string claveMaquina { get; set; }
        public string nombre { get; set; }
    }


}
