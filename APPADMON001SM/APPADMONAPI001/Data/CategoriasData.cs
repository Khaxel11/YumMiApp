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
    public class CategoriasData
    {
        private const string SP_CONSULTAS_CATEGORIAS = "APPADMONCAT007APSPC1";
        private const string SP_ACCIONES_CATEGORIAS = "APPADMONCAT007APSPA2";
        public async Task<Result> getCategorias(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_CATEGORIAS,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CategoriasEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlCategorias(TokenData DatosToken, int Opcion, CategoriasEntity Categorias)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_CATEGORIAS,
                        new
                        {
                            Opcion = Opcion,
                            Categoria = Categorias.Categoria,
                            Descripcion= Categorias.Descripcion,
                            IdCategoria = Categorias.IdCategoria,
                            Usuario = DatosToken.Usuario
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
