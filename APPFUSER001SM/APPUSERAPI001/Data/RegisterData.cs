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
    public class RegisterData
    {
        private const string SP_CONSULTAS_REGLAS_REGISTRO = "APPSEG001APSPC1";
        private const string SP_ACCIONES_REGISTRO = "APPUSER001APSPA2";
        
        public async Task<Result> verifyCode(UserJwt DatosToken, string code, string Ext, string Num, string Correo, string Usuario)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<int>(
                        SP_CONSULTAS_REGLAS_REGISTRO,
                        new
                        {   
                            Ext = Ext,
                            Num = Num,
                            Correo = Correo,
                            Usuario = Usuario,
                            Code = code,
                            ModuloInsert = "APPPUSER001AM"
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

        public async Task<Result> registerUser(UserJwt DatosToken, UserData user )
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MessageEntity>(
                        SP_ACCIONES_REGISTRO,
                        new
                        {
                            Opcion = 1,
                            Username = user.Username,
                            Correo = user.Correo,
                            Password = user.Password,
                            VerificadoMovil = user.VerificadoMovil,
                            Telefono = user.Telefono
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
