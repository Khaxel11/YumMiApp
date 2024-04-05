using Dapper;
using Entity.DTO.Common;
using Entity.DTO;
using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Data
{
    public class ProgramationData
    {
        
        private const string SP_ACCIONES_PROGRAMACION = "APPFPROG001APSPA1";
        private const string SP_CONSULTAS_PROGRAMACION = "APPFPROG001APSPC2";
        private const string SP_ACCIONES_FECHASPROG = "APPFPROG001APSPA3";
        public async Task<Result> getFechasProgramadas(UserJwt DatosToken, int TipoFiltro,
    string Fecha, int idFoodHub, int idLugar, int IdCuenta, int IdProducto,
    int IdCategoria, int IdTipoAlimentacion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    DateTimeOffset fechaOffset = DateTimeOffset.Parse(Fecha);
                    string fechaFormateada = fechaOffset.ToString("yyyyMMdd");


                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_PROGRAMACION,
                        new
                        {
                            Opcion = 1,
                            IdCuenta = IdCuenta,
                            Fecha = fechaFormateada,
                            Clasificacion = TipoFiltro == 0 ? null : TipoFiltro.ToString(),
                            IdFoodHub = idFoodHub == 0 ? null : idFoodHub.ToString(),
                            IdLugar = idLugar == 0 ? null : idLugar.ToString(),
                            IdProducto = IdProducto == 0 ? null : IdProducto.ToString(),
                            IdCategoria = IdCategoria == 0 ? null : IdCategoria.ToString(),  
                            IdTipoAlimentacion = IdTipoAlimentacion == 0 ? null : IdTipoAlimentacion.ToString(),
                        },
                        commandType: CommandType.StoredProcedure);

                    // Obtener los datos de la consulta
                    var data = await result.ReadAsync<FechasProgramadasEntity>();

                    // Agrupar los datos por fechaProgramada
                    var groupedData = data.GroupBy(item => item.FechaProgramada)
                                          .Select(group => new
                                          {
                                              fechaProgramada = group.Key,
                                              items = group.ToList(),
                                              PorConfirmar= group.Any(item => !item.Confirmado)

                                          })
                                          .ToList();

                    objResult.data = groupedData;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        //Omg estamos programando un producto a unas fechas :D
        public async Task<Result> programProduct(UserJwt DatosToken, int Opcion, int IdCuenta, ProgramacionEntity Programacion)
        {
            Result objResult = new Result();
            try
            {

                CreateDataTable Ds = new CreateDataTable();
   
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MessageEntity>(
                        SP_ACCIONES_PROGRAMACION,
                        new
                        {
                            Opcion = Opcion,
                            IdProgramacion = Programacion.IdProgramacion != 0 ? Programacion.IdProgramacion : 0,
                            IdProducto = Programacion.IdProducto,
                            IdFoodHub = Programacion.IdFoodHub,
                            Descripcion = Programacion.Descripcion,
                            NotificacionesActivadas = Programacion.NotificacionesActivas,
                            IdCuenta = IdCuenta,
                            Programacion = Ds.CreateTable(Programacion.FechasProgramadas).AsTableValuedParameter("APPFPROGDAT002TD001"),

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
        public async Task<Result> confirmFecha(UserJwt DatosToken, int IdFechaProgramada, int IdProgramacion)
        {
            Result objResult = new Result();
            try
            {

                CreateDataTable Ds = new CreateDataTable();

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MessageEntity>(
                        SP_ACCIONES_FECHASPROG,
                        new
                        {
                            Opcion = 1,
                            IdFechaProgramada = IdFechaProgramada,
                            IdProgramacion = IdProgramacion,
                            

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
