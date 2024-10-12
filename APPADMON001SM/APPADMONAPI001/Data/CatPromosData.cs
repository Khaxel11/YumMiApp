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
    public class CatPromosData
    {

        private const string SP_CONSULTAS_CATPROMOS = "APPRWARDCAT001APSC1";
        private const string SP_ACCIONES_CATPROMOS = "APPRWARDCAT001APSA2";

        public async Task<Result> getPromos(TokenData DatosToken, string Filtro)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_CATPROMOS,
                        new
                        {
                            Opcion = 1,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<CatPromosEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlPromos(TokenData DatosToken, int Opcion, CatPromosEntity Promos)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(
                        SP_ACCIONES_CATPROMOS,
                        new
                        {
                            Opcion = Opcion,
                            IdPromo = Promos.IdPromo,
                            Codigo = Promos.Codigo,
                            Descripcion = Promos.Descripcion,
                            Descuento = Promos.Descuento,
                            FechaInicio = Promos.FechaInicio,
                            FechaFin = Promos.FechaFin,
                            Disponibles = Promos.Disponibles,
                            EsProgramado = Promos.EsProgramado,
                            EsAcumulable = Promos.EsAcumulable,
                            ValorAcumulable = Promos.ValorAcumulable,
                            CantidadAcumulable = Promos.CantidadAcumulable,
                            Usuario = DatosToken.Usuario

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
