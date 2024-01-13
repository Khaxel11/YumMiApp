using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class MovimientosBancariosBusiness
    {
        public async Task<Result> getMovimientosBancarios(TokenData DatosToken, string FechaI, string FechaF, string CveMov, string NoCta , string NoReferencia)
        {
            try
            {
                return await new MovimientosBancariosData().getMovimientosBancarios(DatosToken, FechaI, FechaF, CveMov, NoCta, NoReferencia);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getMovimientos(TokenData DatosToken)
        {
            try
            {
                return await new MovimientosBancariosData().getMovimientos(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTiposMovimientos(TokenData DatosToken, string Clave)
        {
            try
            {
                return await new MovimientosBancariosData().getTiposMovimientos(DatosToken, Clave);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getFormaPago(TokenData DatosToken)
        {
            try
            {
                return await new MovimientosBancariosData().getFormaPago(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTiposCadena(TokenData DatosToken)
        {
            try
            {
                return await new MovimientosBancariosData().getTiposCadena(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getCuentaOrdenante(TokenData DatosToken, string NoCta)
        {
            try
            {
                return await new MovimientosBancariosData().getCuentaOrdenante(DatosToken, NoCta);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getDatosBanco(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new MovimientosBancariosData().getDatosBanco(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getRubros(TokenData DatosToken, string CveRubro)
        {
            try
            {
                return await new MovimientosBancariosData().getRubros(DatosToken, CveRubro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getMonedas(TokenData DatosToken)
        {
            try
            {
                return await new MovimientosBancariosData().getMonedas(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTipoCambio(TokenData DatosToken, string FechaI, int TipoMoneda)
        {
            try
            {
                return await new MovimientosBancariosData().getTipoCambio(DatosToken, FechaI, TipoMoneda);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> isAplicadoCartera(TokenData DatosToken, string Folio)
        {
            try
            {
                return await new MovimientosBancariosData().isAplicadoCartera(DatosToken, Folio);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getCuenta(TokenData DatosToken, string NoCta)
        {
            try
            {
                return await new MovimientosBancariosData().getCuenta(DatosToken, NoCta);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getRepetitivosByRubro(TokenData DatosToken, string CveRubro)
        {
            try
            {
                return await new MovimientosBancariosData().getRepetitivosByRubro(DatosToken, CveRubro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getClientes(TokenData DatosToken, int Opcion, string FiltroCliente)
        {
            try
            {
                return await new MovimientosBancariosData().getClientes(DatosToken, Opcion, FiltroCliente);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAllCuentaOrdenante(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new MovimientosBancariosData().getAllCuentaOrdenante(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> isDepositoCartera(TokenData DatosToken, decimal Importe, string Folio)
        {
            try
            {
                return await new MovimientosBancariosData().isDepositoCartera(DatosToken, Importe, Folio);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlMovimientos(TokenData DatosToken, int opcion, MovimientosBancariosEntity Movimiento)
        {
            try
            {
                return await new MovimientosBancariosData().controlMovimientos(DatosToken, opcion, Movimiento);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> updateSaldo(TokenData DatosToken, int opcion , decimal saldo, MovimientosBancariosEntity Movimiento)
        {
            try
            {
                return await new MovimientosBancariosData().updateSaldo(DatosToken, opcion, saldo, Movimiento);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
