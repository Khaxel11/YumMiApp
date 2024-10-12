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
    public class VisualesData
    {
        /*
        * Author:      Manuel de Jesus Valenzuela Gracian
        * Date:        29Ago2024
        * Descripción: Métodos catalogo de VISUALES
        */
        private const string spc = "APPADMONCAT005APSPC1";
        private const string spa = "APPADMONCAT005APSPA2";

        public async Task<Result> getAplicaciones(TokenData DatosToken, string Filtro)
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
                    objResult.data = await result.ReadAsync<VisualesAplicaionesEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> getCatProductos(TokenData DatosToken, string Filtro)
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
                            Opcion = 2,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<VisualesCatproductosEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> getVisuales(TokenData DatosToken, string Filtro, int idSistema, bool programadas)
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
                            Opcion = 3,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim(),
                            idSistema = idSistema,
                            programadas = programadas,
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<VisualesEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

       


        public async Task<Result> controlVisuales(TokenData DatosToken, int Opcion, VisualesEntity model)
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
                            idVisual = model.idVisual,
                            titulo = model.titulo,
                            subtitulo = model.subtitulo,
                            idSistema = model.idSistema,
                            idUsoMenu = model.idUsoMenu,
                            descripcionUso = model.descripcionUso,
                            esProgramado = model.esProgramado,
                            redirecciona = model.redirecciona,
                            idOpcionRedirecciona = model.idOpcionRedirecciona,
                            fechaInicioProgramado = model.fechaInicioProgramado,
                            fechaFinalProgramado = model.FechaFinalProgramado,
                            diasApartirProgramado = model.diasApartirProgramado,
                            activo = model.activo,
                            imagen = Opcion != 3 ? builder.buildSQLImage(model.strImagen) : null,
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

