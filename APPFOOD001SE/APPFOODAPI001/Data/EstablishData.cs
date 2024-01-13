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
    public class EstablishData
    {
        //private const string SP_ACCIONES_COCINERO = "APPFOOD001APSPA2";
        private const string SP_CONSULTAS_REGISTRO = "APPFOOD001APSPC3";
        public async Task<Result> getLogData(UserJwt DatosToken, int Opcion, int IdCuenta)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<KitchenInfo>(
                        SP_CONSULTAS_REGISTRO,
                        new
                        {
                            Opcion = Opcion == 1 ? 3 : Opcion,
                            IdCuenta = IdCuenta
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
