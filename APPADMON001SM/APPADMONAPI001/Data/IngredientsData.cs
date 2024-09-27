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
    public class IngredientsData
    {
        /*
         * Author:      Manuel de Jesus Valenzuela Gracian
         * Date:        27Ago2024
         * Descripción: Métodos para ABC de ingrendientes ("CRUD" = CREATE, READ, UPDATE AND DELETE)
         */
        private const string spc = "APPADMONCAT008APSPC1";
        private const string spa = "APPADMONCAT008APSPA2";

        public async Task<Result> getIngredients(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        spc,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<IngredientsEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> controlIngredients(TokenData DatosToken, int Opcion, IngredientsEntity model)
        {
            Result objResult = new Result();
            try
            {
                // opciones: 1 Inserta: 2 Actualiza: 3 Borrado Lógico

                ImageBuilder builder = new ImageBuilder();
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        spa,
                        new
                        {
                            Opcion = Opcion, 
                            idIngrediente = model.idIngrediente,
                            ingrediente = model.ingrediente,
                            descripcion = model.descripcion,
                            Foto = Opcion != 3 ? builder.buildSQLImage(model.stringFoto) : null,
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
