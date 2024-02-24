using Dapper;
using Data.BDAdmon;
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
    public class TiposProductosData
    {
        private const string SP_CONSULTAS_TIPOS = "APPADMONCAT002APSPC1";
        private const string SP_ACCIONES_TIPOS = "APPADMONCAT002APSPA2";

        public async Task<Result> getTiposProductos(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_TIPOS,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<TiposProductosEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> controlTiposProductos(TokenData DatosToken, int Opcion, TiposProductosEntity Tipo)
        {
            Result objResult = new Result();
            try
            {
                ImageBuilder builder = new ImageBuilder();
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_TIPOS,
                        new
                        {
                            Opcion = Opcion,
                            IdTipo = Tipo.IdTipo,
                            NombreTipo = Tipo.NombreTipo,
                            Descripcion = Tipo.Descripcion,
                            Foto = Opcion != 3? builder.buildSQLImage(Tipo.stringFoto) : null,
                            Usuario = DatosToken.Usuario,
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
