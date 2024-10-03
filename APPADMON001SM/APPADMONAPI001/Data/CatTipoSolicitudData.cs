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
    public class CatTipoSolicitudData
    {
        private const string SP_CONSULTAS_CATTIPOSOLICITUD = "APPSOLICAT001APSC1";
        private const string SP_ACCIONES_CATTIPOSOLICITUD = "APPSOLICAT001APSA2";

        public async Task<Result> getTipoSolicitud(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_CATTIPOSOLICITUD,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CatTipoSolicitudEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlTipoSolicitud(TokenData DatosToken, int Opcion, CatTipoSolicitudEntity TipoSolicitud)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(
                        SP_ACCIONES_CATTIPOSOLICITUD,
                        new
                        {
                            Opcion = Opcion,
                            IdTipoSolicitud = TipoSolicitud.IdTipoSolicitud,
                            TituloSolicitud = TipoSolicitud.TituloSolicitud


                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                }

                return objResult;
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                throw new ArgumentException(ex.Message);
            }

        }
    }
}
