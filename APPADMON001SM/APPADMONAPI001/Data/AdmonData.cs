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
using System.Security.Cryptography;

namespace Data
{
    public class AdmonData
    {
        private const string SP_CONSULTAS_ADMON = "APPADMON001APSPC1";
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in hashedBytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }
        // Manuel Valenzuela 27Sep2024: cambio para que regres el idempleado y no solo true o false
        //public async Task<Result> login(TokenData DatosToken, string NombreUsuario, string Password)
        //{
        //    Result objResult = new Result();
        //    try
        //    {
        //        using (var conexion = new SqlConnection(DatosToken.Conexion))
        //        {
        //            var result = await conexion.QuerySingleAsync<bool>(
        //                SP_CONSULTAS_ADMON,
        //                new
        //                {
        //                    Opcion = 1,
        //                    NombreUsuario = NombreUsuario,
        //                    Password = Password 

        //                },

        //                commandType: CommandType.StoredProcedure);
        //            objResult.data = result;
        //        }
        //        return objResult;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new ArgumentException(ex.Message);
        //    }
        //}

      
        public async Task<Result> login(TokenData DatosToken, string NombreUsuario, string Password)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_ADMON,
                        new
                        {
                            Opcion = 1,
                            NombreUsuario = NombreUsuario,
                            Password = Password
                        },

                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AdmonUsuarioEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOpcionesMenu(TokenData DatosToken, int idEmpleado)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_ADMON,
                        new
                        {
                            Opcion = 2,
                            idEmpleado = idEmpleado

                        },

                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<AdmonUsuarioMenuEntity>();
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
