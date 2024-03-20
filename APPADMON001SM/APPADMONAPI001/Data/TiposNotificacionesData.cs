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
    public class TiposNotificacionesData
    {
        private const string SP_CONSULTAS_NOT = "APPADMONCAT003APSPC1";
        private const string SP_ACCIONES_NOT = "APPADMONCAT003APSPA2";

        public async Task<Result> getTiposNotificaciones(TokenData DatosToken, string Filtro, int IdTipoUsuario)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_NOT,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim(),
                            IdTipoUsuario = IdTipoUsuario == 0 ? null : IdTipoUsuario.ToString(),
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<TiposNotificacionesEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getTiposUsuarios(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_NOT,
                        new
                        {
                            Opcion = 2,
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlTiposNotificaciones(TokenData DatosToken, int Opcion, TiposNotificacionesEntity Tipo)
        {
            Result objResult = new Result();
            try
            {
                ImageBuilder builder = new ImageBuilder();
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_NOT,
                        new
                        {
                            Opcion = Opcion,
                            IdTipoNotificacion = Tipo.IdTipoNotificacion,
                            Descripcion = Tipo.Descripcion,
                            IdTipoUsuario = Tipo.IdTipoUsuario,
                            Icono = Opcion != 3 ? builder.buildSQLImage(Tipo.IconoString) : null,
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
