using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class MovimientosBancariosEntity
    {
        public string Fecha { get; set; }
        public string Referencia { get; set; }
        public decimal Importe { get; set; }
        public string ImporteFormato { get; set; }
        public string Concepto { get; set; }
        public decimal TipoCambio { get; set; }
        public bool Cancelado { get; set; }
        public string Moneda { get; set; }
        public int TipoMoneda { get; set; }
        public string Folio { get; set; }
        public bool Aplicado { get; set; }
        public string CveBanco { get; set; }
        public string NoCta { get; set; }
        public int CveMov { get; set; }
        public string CveRubro { get; set; }
        public string Movimiento { get; set; }
        public string TipoMovimiento { get; set; }
        public string TipoTrans { get; set; }
        public string NombreBanco { get; set; }
        public string NoCtaOrdenante { get; set; }
        public string BancoOrdenante { get; set; }
        public string RfcOrdenante { get; set; }
        public string TipoCadenaPago { get; set; }
        public string RFCBeneficiario { get; set; }
        public string CadPago { get; set; }
        public string CertPago { get; set; }
        public string SelloPago { get; set; }
        public int Nacionalidad { get; set; }
        public string NoOperacion { get; set; }
        public bool EsFactoraje { get; set; }
        public decimal InteresFactoraje { get; set; }
        public string CveIdUsuarioIDRef { get; set; }
        public int IdBancoOrdenante { get; set; }
        public string RubroMovimiento { get; set; }
        public int Repetitivo { get; set; }
    }
    public class Movimientos
    {
        public int IdMovimiento { get; set; }
        public string Clave { get; set; }
        public string Descripcion { get; set; }
        public string TipoMovimiento { get; set; }
        public string TipoAsiento { get; set; }
    }
    public class PagoForma
    {
        public string Id { get; set; }
        public string FormaPago { get; set; }
        public string TipoCadena { get; set; }
        public string Descripcion { get; set; }
  
    }
    public class BancoOrdenante
    {
        public string CveBanco { get; set; }
        public string Sucursal { get; set; }
        public string NombreBanco { get; set; }
        public string RFC { get; set; }
        public string CveSAT { get; set; }
        public string Descripcion { get; set; }
    }
    public class DatosBanco
    {
        public string NoCuenta { get; set; }
        public string NombreBanco { get; set; }
        public string Sucursal { get; set; }
        public string NombreMoneda { get; set; }
        public decimal TipoCambio { get; set; }
        public string ClaveBanco { get; set; }
        public int Moneda { get; set; }
        public string RFC { get; set; }
    }
    public class Rubros
    {
        public int CveRubro { get; set; }
        public string Descripcion { get; set; }
    }
    public class MonedaLista
    {
        public string IdMoneda { get; set; }
        public string Moneda { get; set; }
        public string TipoMoneda { get; set; }
    }
    public class Cambios
    {
        public string Fecha { get; set; }
        public decimal TipoCambio { get; set; }
    }
    public class AplicadoCartera
    {
        public string Folio { get; set; }
        public bool Cancelado { get; set; }
    }
    public class DatosCuenta
    {
        public string CveBanco { get; set; }
        public string NombreBanco { get; set; }
        public string NoCuenta { get; set; }
        public string Sucursal { get; set; }
        public string NombreMoneda { get; set; }
        public string Ctan1 { get; set; }
        public string Ctan2 { get; set; }
        public string Ctan3 { get; set; }
        public string Ctan4 { get; set; }
        public string Ctan5 { get; set; }
        public decimal TcCompra { get; set; }
        public bool Estatus { get; set; }
        public int Moneda { get; set; }
        public string RFC { get; set; }
    }
    public class RepetitivosMovimientos
    {
        public string IdRubro { get; set; }
        public string CveRubro { get; set; }
        public string Repetitivo { get; set; }

    }
    public class DatosClientes
    {
        public int IdCliente { get; set; }
        public string Nombre { get; set; }
        public string RFC { get; set; }

    }

    public class MensajesMovimientos
    {
        public int Folio { get; set; }
        public string Mensaje { get; set; }
        public bool Correcto { get; set; }
        public string Resultado { get; set; }

    }
}
