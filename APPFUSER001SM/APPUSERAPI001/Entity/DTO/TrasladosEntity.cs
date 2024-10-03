using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class TrasladosEntity
    {
        public int IdTraslado { get; set; }
        public int IdTipoMaterial { get; set; }
        public string FolioRemisionTransferencia { get; set; }
        public string TipoTraslado { get; set; }
        public string CodAlmacen { get; set; }
        public string Almacen { get; set; }
        public string ClaveCliente { get; set; }
        public string RazonSocialCliente { get; set; }
        public string RFCCliente { get; set; }
        public string DomicilioCliente { get; set; }
        public int IdCompaniaFletera { get; set; }
        public string CompaniaFletera { get; set; }
        public string IdUnidadTransporte { get; set; }
        public string TipoTransporte { get; set; }
        public string TransporteInternacional { get; set; }
        public string Placas { get; set; }
        public string Año { get; set; }
        public string NumPermisoSCT { get; set; }
        public string TipoAutotransporte { get; set; }
        public string Aseguradora { get; set; }
        public string NumPoliza { get; set; }
        public int IdPermisoSCT { get; set; }
        public string PermisoSCT { get; set; }
        public string IdChofer { get; set; }
        public string NombreChofer { get; set; }
        public string RFCChofer { get; set; }
        public string NumLicenciaChofer { get; set; }
        public string PaisChofer { get; set; }
        public string DomicilioChofer { get; set; }
        public string IdRemitente { get; set; }
        public string NombreRemitente { get; set; }
        public string RFCRemitente { get; set; }
        public string EstacionRemitente { get; set; }
        public string DomicilioRemitente { get; set; }
        public string CalleRemitente { get; set; }
        public string CPRemitente { get; set; }
        public string EstadoRemitente { get; set; }
        public string PaisRemitente { get; set; }
        public DateTime? FechaSalida { get; set; }
        public string IdDestinatario { get; set; }
        public string NombreDestinatario { get; set; }
        public string RFCDestinatario { get; set; }
        public string EstacionDestinatario { get; set; }
        public string DomicilioDestinatario { get; set; }
        public string CalleDestinatario { get; set; }
        public string CPDestinatario { get; set; }
        public string EstadoDestinatario { get; set; }
        public string PaisDestinatario { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public string UsuarioInsert { get; set; }
        public string UsuarioUpdate { get; set; }
    }

    public class DatosArticulosTraslado : TrasladosEntity
    {
        public List<DatosArticuloTraslados> DatosArticuloTraslados { get; set; }

        DatosArticulosTraslado()
        {
            DatosArticuloTraslados = new List<DatosArticuloTraslados>();
        }
    }

    public class Traslado
    {
        public int IdTraslado { get; set; }
        public string TipoMaterial { get; set; }
        public string Cliente { get; set; }
        public string UnidadTransporte { get; set; }
        public string Chofer { get; set; }
        public string Destinatario { get; set; }
        public string Fecha { get; set; }
    }

    public class DatosArticuloTraslados
    {
        public string IdArticulo { get; set; }
        public string Descripcion { get; set; }
        public int Cantidad { get; set; }
        public string ClaveUnidad { get; set; }
        public string ClavePS { get; set; }
        public double PesoKg { get; set; }
    }

    public class ClientesTraslados
    {
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string RFC { get; set; }
        public string Direccion { get; set; }
    }

    public class CompaniaFleteraTraslados
    {
        public string IdCompaniaFletera { get; set; }
        public string CompaniaFletera { get; set; }
    }

    public class ChoferesTraslados
    {
        public string ClaveChofer { get; set; }
        public string Nombre { get; set; }
        public string RFC { get; set; }
        public string Licencia { get; set; }
        public string Pais { get; set; }
        public string Direccion { get; set; }
    }

    public class PermisosSCTTraslados
    {
        public int IdRegistro { get; set; }
        public string Concepto { get; set; }
    }

    public class UnidadTransporteTraslado
    {
        public string ClaveCamion { get; set; }
        public string Marca { get; set; }
        public string TipoTransporte { get; set; }
        public string TransporteInternacional { get; set; }
        public string Placas { get; set; }
        public string Modelo { get; set; }
        public string NoPermisoSCT { get; set; }
        public string TipoAutotransporte { get; set; }
        public string Aseguradora { get; set; }
        public string NumPoliza { get; set; }
    }

    public class RemitenteTraslados
    {
        public int ClaveRemitente { get; set; }
        public string RFC { get; set; }
        public string Nombre { get; set; }
        public string NombreUbicacion { get; set; }
        public string Estacion { get; set; }
        public string Domicilio { get; set; }
        public string Calle { get; set; }
        public string CP { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }
    }

    public class DestinatarioTraslados
    {
        public int ClaveDestinatario { get; set; }
        public string RFC { get; set; }
        public string Nombre { get; set; }
        public string Estacion { get; set; }
        public string Domicilio { get; set; }
        public string CP { get; set; }
        public string EstadoPais { get; set; }
    }

    public class AlmacenTraslados
    {
        public string Cod { get; set; }
        public string Nombre { get; set; }
    }

    public class SistemaOrigenTraslados
    {
        public string Cod { get; set; }
        public string Sistema { get; set; }
    }

    public class ArticulosTraslados
    {
        public string ClaveArticulo { get; set; }
        public string Descripcion { get; set; }
        public decimal Kgs { get; set; }
        public string Cantidad { get; set; }
        public string Unidad { get; set; }
        public string ClavePS { get; set; }
    }

    public class TipoMaterialTraslados
    {
        public string IdRegistro { get; set; }
        public string Descripcion { get; set; }
    }

    public class RemisionesTraslados
    {
        public string Tipo { get; set; }
        public string Folio { get; set; }
        public string Almacen { get; set; }
        public string FechaHora { get; set; }
        public string ClaveCliente { get; set; }
        public string NombreCliente { get; set; }
        public string Documento { get; set; }
    }

    public class RemisionTraslados
    {
        public string Folio { get; set; }
        public string TipoRemiTrans { get; set; }
        public string Almacen { get; set; }
        public string NombreAlmacen { get; set; }
        public string ClaveCliente { get; set; }
        public string NombreCliente { get; set; }
        public string RFCCliente { get; set; }
        public string DireccionCliente { get; set; }
        public string ClaveCompaniaFletera { get; set; }
        public string CompaniaFletera { get; set; }
        public string ClaveCamion { get; set; }
        public string TipoTransporteCamion { get; set; }
        public string PlacasCamion { get; set; }
        public string AnoModeloCamion { get; set; }
        public string NoPermisoSCTCamion { get; set; }
        public string TipoAutotransporteCamion { get; set; }
        public string AseguradoraCamion { get; set; }
        public string NumPolizaCamion { get; set; }
        public string ClaveChofer { get; set; }
        public string RFCChofer { get; set; }
        public string NombreChofer { get; set; }
        public string NombrePaisChofer { get; set; }
        public string LicenciaChofer { get; set; }
        public string DireccionChofer { get; set; }
        public string ClaveArticulo { get; set; }
        public string DescripcionArticulo { get; set; }
        public string CantidadArticulo { get; set; }
        public string CUnidadArticulo { get; set; }
        public string ClavePSArticulo { get; set; }
        public string KgsArticulo { get; set; }
        public string CodRemitente { get; set; }
        public string NombreRemitente { get; set; }
        public string RFCRemitente { get; set; }
        public string EstacionRemitente { get; set; }
        public string DireccionRemitente { get; set; }
        public string CalleRemitente { get; set; }
        public string CPRemitente { get; set; }
        public string EstadoRemitente { get; set; }
        public string PaisRemitente { get; set; }
        public string FechaSalida { get; set; }
        public string CodDestinatario { get; set; }
        public string NombreDestinatario { get; set; }
        public string RFCDestinatario { get; set; }
        public string EstacionDestinatario { get; set; }
        public string DireccionDestinatario { get; set; }
        public string CalleDestinatario { get; set; }
        public string CPDestinatario { get; set; }
        public string EstadoDestinatario { get; set; }
        public string PaisDestinatario { get; set; }
        public string FechaEntrega { get; set; }
    }
}
