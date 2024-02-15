using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class TarjetaBancariaEntity
    {
        public int IdCuentaBancaria { get; set; }
        public string NombreTitular { get; set; }
        public string NumeroCta { get; set; }
        public int IdBanco { get; set; }
        public string ProveedorTarjeta { get; set; }
        public int IdImagen { get; set; }
        public string CLABE { get; set; }
        public int IdMoneda { get; set; }
    }
}
