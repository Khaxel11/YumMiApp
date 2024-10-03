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
    public class AppsDisponiblesData
    {
        private const string SP_CONSULTAS_APLICACIONES = "APPMENUCAT001APSC1";
        private const string SP_ACCIONES_APLICACIONES = "APPMENUCAT001APSA2";

        #region Get Orden
        public async Task<Result> getSistemas(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_APLICACIONES,
                        new
                        {
                            Opcion = 1
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<SistemasEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getEncabezados(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_APLICACIONES,
                        new
                        {
                            Opcion = 2,
                            Filtro = Filtro == "0" ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<EncabezadosEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getAplicaciones(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_APLICACIONES,
                        new
                        {
                            Opcion = 3,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AppsDisponiblesEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        #endregion

        #region Administra
        public async Task<Result> AdministraEncabezado(TokenData DatosToken, int Opcion, EncabezadosEntity Encabezados)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                     await conexion.ExecuteAsync(
                        SP_ACCIONES_APLICACIONES,
                        new
                        {
                            Opcion = Opcion,
                            idSistema = Encabezados.IdSistema,
                            idEncabezado = Encabezados.IdEncabezado,
                            Descripcion = Encabezados.Encabezado,
                            Ruta = Encabezados.Ruta,
                            Icono = Encabezados.Icono,
                            Usuario = DatosToken.Usuario
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = true;
                }

                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> AdministraAplicaciones(TokenData DatosToken, int Opcion, AppsDisponiblesEntity Aplicacion)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(
                        SP_ACCIONES_APLICACIONES,
                        new
                        {
                            Opcion = Opcion,
                            idEncabezado = Aplicacion.IdEncabezado,
                            idOpcion = Aplicacion.IdOpcion,
                            Descripcion = Aplicacion.TituloOpcion,
                            Ruta = Aplicacion.SubRuta,
                            Usuario = DatosToken.Usuario
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = true;
                }

                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        #endregion

        #region Update Orden
        public async Task<Result> UpdateOrdenEncabezados(TokenData DatosToken, DatosOrden Aplicacion)
        {
            TranformaDataTable Ds = new TranformaDataTable();
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_APLICACIONES,
                        new
                        {
                            Opcion = 5,
                            tblPosicion = Ds.CreateDataTable(Aplicacion.OrdenList).AsTableValuedParameter("APPMENUCAT001TD001") 
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }

                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> UpdateOrdenAplicaciones(TokenData DatosToken, DatosOrden  Aplicacion)
        {
            TranformaDataTable Ds = new TranformaDataTable();
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_APLICACIONES,
                        new
                        {
                            Opcion = 6,
                            tblPosicion = Ds.CreateDataTable(Aplicacion.OrdenList).AsTableValuedParameter("APPMENUCAT001TD001")

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = result;
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
