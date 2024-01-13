using Dapper;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class MovimientosBancariosData
    {

        #region Consultas
        public async Task<Result> getMovimientosBancarios(TokenData DatosToken, string FechaI, string FechaF, string CveMov, string NoCta, string NoReferencia)
{
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 0,
                            FechaI = FechaI.Replace("-", ""),
                            FechaF = FechaF.Replace("-", ""),
                            CveMov = Convert.ToInt32(CveMov),
                            NoCta = NoCta == "null" || NoCta == "undefined" ? null : NoCta,
                            NoReferencia = NoReferencia == "null" || NoReferencia == "undefined" ? null : NoReferencia,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<MovimientosBancariosEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getMovimientos(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 1,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Movimientos>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTiposMovimientos(TokenData DatosToken, string Clave)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 2,
                            Clave = Clave

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Movimientos>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getFormaPago(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 3,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<PagoForma>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTiposCadena(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 4,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<PagoForma>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getCuentaOrdenante(TokenData DatosToken, string NoCta)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 5,
                            NoCta = NoCta,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<BancoOrdenante>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getDatosBanco(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 6,
                            Filtro = Filtro,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<DatosBanco>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getRubros(TokenData DatosToken, string CveRubro)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 7,
                            CveRubro = CveRubro,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Rubros>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getMonedas(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 8,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<MonedaLista>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTipoCambio(TokenData DatosToken, string FechaI, int TipoMoneda)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 9,
                            FechaI = FechaI.Replace("-", ""),
                            IdMoneda = TipoMoneda,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Cambios>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> isAplicadoCartera(TokenData DatosToken, string Folio)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 10,
                            Folio = Folio,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AplicadoCartera>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> isTransferido(TokenData DatosToken, string Folio)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 10,
                            Folio = Folio,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AplicadoCartera>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getCuenta(TokenData DatosToken, string NoCta)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 11,
                            NoCta = NoCta,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<DatosCuenta>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getRepetitivosByRubro(TokenData DatosToken, string CveRubro)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 12,
                            CveRubro = CveRubro,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<RepetitivosMovimientos>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getClientes(TokenData DatosToken, int Opcion, string FiltroCliente)
        {
            Result objResult = new Result();
            try
            {
                CreateDataTable Ds = new CreateDataTable();
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = Opcion, //13-14
                            FiltroCliente = FiltroCliente,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<DatosClientes>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getAllCuentaOrdenante(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 15,
                            Filtro = Filtro,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<BancoOrdenante>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> isDepositoCartera(TokenData DatosToken, decimal Importe, string Folio)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPC1";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = 16,
                            Importe = Importe,
                            Folio = Folio,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<MensajesMovimientos>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        #endregion

        #region Acciones
        public async Task<Result> controlMovimientos(TokenData DatosToken, int opcion, MovimientosBancariosEntity Movimiento)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPA2";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = opcion,
                            CveBanco = Movimiento.CveBanco,
                            NoCta = Movimiento.NoCta,
                            Referencia = Movimiento.Referencia,
                            idtipomovimiento = Movimiento.CveMov, //idtipomovimiento
                            Fecha = Movimiento.Fecha.Replace("-",""),
                            Importe = Movimiento.Importe,
                            TipoMov = Movimiento.TipoMovimiento,
                            Concepto = Movimiento.Concepto,
                            TipoCambio = Movimiento.TipoCambio,
                            Usuario = DatosToken.Usuario,
                            CveRubro = Movimiento.CveRubro,
                            TipoTrans = Movimiento.TipoTrans,
                            CveUsuarioIDRef = Movimiento.CveIdUsuarioIDRef,
                            Saldo = Movimiento.Importe,
                            TipoCadenaPago = Movimiento.TipoCadenaPago,
                            CadenaPago = Movimiento.CadPago,
                            CertPago = Movimiento.CertPago,
                            SelloPago = Movimiento.SelloPago,
                            BancoOrdenante = Movimiento.BancoOrdenante,
                            CuentaOrdenante = Movimiento.NoCtaOrdenante,
                            RfcOrdenante = Movimiento.RfcOrdenante,
                            Nacionalidad = Movimiento.Nacionalidad,
                            NoOperacion = Movimiento.NoOperacion,
                            EsFactoraje = Movimiento.EsFactoraje,
                            IntFactoraje = Movimiento.InteresFactoraje,
                            TipoMoneda = Movimiento.TipoMoneda , 
                            Folio = Movimiento.Folio,
                            IdBancoOrdenante = Movimiento.IdBancoOrdenante,
                            RubroMovimiento = Movimiento.RubroMovimiento,
                            Repetitivo = Movimiento.Repetitivo,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<MensajesMovimientos>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> updateSaldo(TokenData DatosToken, int opcion, decimal saldo, MovimientosBancariosEntity Movimiento)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conexion))
                {
                    string NombreSP = "ADMBANC003MWSPA2";
                    var result = await con.QueryMultipleAsync(
                        NombreSP,
                        new
                        {
                            Opcion = opcion,
                            CveBanco = Movimiento.CveBanco,
                            NoCta = Movimiento.NoCta,
                            Saldo = saldo,

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<MensajesMovimientos>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
            #endregion

        }
}
