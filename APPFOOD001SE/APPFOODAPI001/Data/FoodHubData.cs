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
    public class FoodHubData
    {
        private const string SP_CONSULTAS_FOODHUB = "APPFHUB001APSPC1";
        private const string SP_ACCIONES_FOODHUB = "APPFHUB001APSPA2";
        public async Task<Result> getFoodHubs(UserJwt DatosToken, int IdEstado, string Filtro, int IdCuenta)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_FOODHUB,
                        new
                        {
                            Opcion = 1,
                            IdEstado = IdEstado,
                            Filtro = Filtro,
                            IdCuenta = IdCuenta
                        },
                    commandType: CommandType.StoredProcedure);
                    var resData = result;
                    //objResult.data 
                    var lista = (List<FoodHubEntity>) await result.ReadAsync<FoodHubEntity>();

                    for (int i = 0; i < lista.Count; i++)
                    {
                        if (lista[i].Foto != null && lista[i].Foto.Length > 0)
                        {
                            lista[i].Picture = Convert.ToBase64String(lista[i].Foto);
                        }
                    }

                    objResult.data = lista;
                }

                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getCalificaciones(UserJwt DatosToken, int IdFoodHub)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_FOODHUB,
                        new
                        {
                            Opcion = 2,
                            IdFoodHub = IdFoodHub
                            
                        },
                    commandType: CommandType.StoredProcedure);
                  // objResult.data = await result.ReadAsync<CalificacionesFoodHub>();
                    var resData = result;
                    //objResult.data 
                    var lista = (List<CalificacionesFoodHub>)await result.ReadAsync<CalificacionesFoodHub>();

                    for (int i = 0; i < lista.Count; i++)
                    {
                        if (lista[i].Foto != null && lista[i].Foto.Length > 0)
                        {
                            lista[i].FotoBase = Convert.ToBase64String(lista[i].Foto);
                        }
                    }

                    objResult.data = lista;
                }

                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> asignFoodhub(UserJwt DatosToken, int Opcion, int IdCuenta, int IdFoodHub, bool Predeterminado, int IdAsignado)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MensajesEntity>(
                        SP_ACCIONES_FOODHUB,
                        new
                        {
                            Opcion = Opcion,
                            IdCuenta = IdCuenta,
                            IdFoodHub = IdFoodHub,
                            Predeterminado = Predeterminado,
                            IdAsignado = IdAsignado 
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
        public async Task<Result> getMyFoodHubs(UserJwt DatosToken, int IdEstado, int IdCuenta)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_FOODHUB,
                        new
                        {
                            Opcion = 3,
                            IdEstado = IdEstado,
                            IdCuenta = IdCuenta
                        },
                    commandType: CommandType.StoredProcedure);
                    var resData = result;
                    //objResult.data 
                    var lista = (List<FoodHubEntity>)await result.ReadAsync<FoodHubEntity>();

                    for (int i = 0; i < lista.Count; i++)
                    {
                        if (lista[i].Foto != null && lista[i].Foto.Length > 0)
                        {
                            lista[i].Picture = Convert.ToBase64String(lista[i].Foto);
                        }
                    }

                    objResult.data = lista;
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
