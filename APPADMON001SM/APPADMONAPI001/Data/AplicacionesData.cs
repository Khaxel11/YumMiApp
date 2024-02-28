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
    public class AplicacionesData
    {
        private const string SP_CONSULTAS_APLICACIONES = "APPADMONCAT001APSPC1";
        private const string SP_ACCIONES_APLICACIONES = "APPADMON001APSPA2";

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
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AplicacionesEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlAplicaciones(TokenData DatosToken, int Opcion, AplicacionesEntity Aplicacion)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_APLICACIONES,
                        new
                        {
                            Opcion = Opcion,
                            IdSistema = Aplicacion.IdSistema,
                            NomenclaturaSistema = Aplicacion.NomenclaturaSistema,
                            Sistema = Aplicacion.Sistema,
                            Usuario = DatosToken.Usuario
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

    }
}
