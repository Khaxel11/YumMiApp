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
    public class CatTipoAlimentacionData
    {
        private const string SP_CONSULTAS_CATTIPOALIMENTACION = "APPADMONCAT006APSPC1";
        private const string SP_ACCIONES_CATTIPOALIMENTACION = "APPADMONCAT006APSPA2";


        public async Task<Result> getTipoAlimentacion(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_CATTIPOALIMENTACION,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CatTipoAlimentacionEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlTipoAlimentacion(TokenData DatosToken, int Opcion, CatTipoAlimentacionEntity TipoAlimentacion)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(
                        SP_ACCIONES_CATTIPOALIMENTACION,
                        new
                        {
                            Opcion = Opcion,
                            idTipoAlimentacion = TipoAlimentacion.idTipoAlimentacion,
                            tipoAlimentacion = TipoAlimentacion.tipoAlimentacion,
                            descripcion = TipoAlimentacion.descripcion


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
