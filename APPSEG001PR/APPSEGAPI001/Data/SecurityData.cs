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
    public class SecurityData
    {
        private const string SP_CONSULTAS_REGLAS_SEGURIDAD = "APPSEG001PRSPC1";
        public async Task<Result> getUniqueCode(UserJwt DatosToken, string Ext, string Num, string Correo, string Usuario)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<int>(
                        SP_CONSULTAS_REGLAS_SEGURIDAD,
                        new
                        {
                            Ext = Ext,
                            Num = Num,
                            Correo = Correo,    
                            Usuario = Usuario

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
