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
        private const string SP_CONSULTAS_CARGOS = "APPADMONCAT001APSPC1";
        private const string SP_ACCIONES_CARGOS = "APPADMONCAT001APSPA2";

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
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
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

        public async Task<Result> controlCargos(UserJwt DatosToken, int Opcion, CargosEntity Cargos )
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conection))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_CARGOS,
                        new
                        {
                            Opcion = Opcion,
                            ClaveCargo = Cargos.ClaveCargo,
                            NombreCargo = Cargos.NombreCargo,
                            IdCargo = Cargos.IdCargo,
                            Usuario = DatosToken.IdUsuario
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
