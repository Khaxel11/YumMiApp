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
    public class CargosData
    {
        private const string SP_CONSULTAS_CARGOS = "APPADMON001APSPC1";

        public async Task<Result> getCargos(UserJwt DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conection))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_CARGOS,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CargosEntity>();  
                }
                return objResult;
            }catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        
    }
}
