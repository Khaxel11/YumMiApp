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
    public class TiposUsuariosData
    {
        private const string SP_CONSULTAS_TIPOSUSUARIOS = "APPADMONCAT010APSC1";
        private const string SP_ACCIONES_TIPOSUSUARIOS = "APPADMONCAT010APSA2";

        public async Task<Result> getTiposUsuarios(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_TIPOSUSUARIOS,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<TiposUsuariosEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> controlTiposUsuarios(TokenData DatosToken, int Opcion, TiposUsuariosEntity TiposUsuarios)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_TIPOSUSUARIOS,
                        new
                        {
                            Opcion = Opcion,
                            TipoUsuario = TiposUsuarios.TipoUsuario,
                            Descripcion = TiposUsuarios.Descripcion,
                            IdTipoUsuario = TiposUsuarios.IdTipoUsuario,
                           
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
