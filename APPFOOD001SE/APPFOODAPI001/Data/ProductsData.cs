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
    public class ProductsData
    {
        private const string SP_CONSULTAS_CAPTURA = "APPFPROD001APSPC1";

        public async Task<Result> getTiposComida(UserJwt DatosToken)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_CAPTURA,
                        new
                        {
                            Opcion = 1,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                    objResult.data2 = await result.ReadAsync<Object>();
                    objResult.data3 = await result.ReadAsync<Object>();
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
