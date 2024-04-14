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
    public class TiposAlimentacionData
    {
        private const string SP_CONSULTAS_ALIMENTACION = "APPADMONCAT006APSPA2";
        private const string SP_ACCIONES_ALIMENTACION = "APPADMONCAT001APSPA2";

        public async Task<Result> getTiposAlimentacion(TokenData DatosToken, string Filtro, int IdTipoUsuario)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_ALIMENTACION,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim(),
                            IdTipoUsuario = IdTipoUsuario == 0 ? null: IdTipoUsuario.ToString()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CargosEntity>();
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
