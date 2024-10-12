using Dapper;
using Data.BDAdmon;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class RestricionAlimentacionData
    {
        /*
         * Author:      Manuel de Jesus Valenzuela Gracian
         * Date:        27Ago2024
         * Descripción: Métodos para Captura de Restriccion de Ingredientes
         */
        private const string spc = "APPADMONCAT009APSPC1";
        private const string spa = "APPADMONCAT009APSPA2";

        public async Task<Result> getTiposAlimentacionCbo(TokenData DatosToken, string Filtro)
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
                            Opcion = 0,
                            Filtro = Filtro == null ? null : Filtro == "null" ? null : Filtro.Trim()
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<RestricionAlimentacion_TiposAlimentacionEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getRestriccionesConTotalIngredientes(TokenData DatosToken, string Filtro)
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
                    objResult.data = await result.ReadAsync<RestricionAlimentacion_TiposAlimentacionEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getIngredientes(TokenData DatosToken, string Filtro)
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
                    objResult.data = await result.ReadAsync<RestricionAlimentacion_IngredientesEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getRestriciones(TokenData DatosToken, int id, int opc)
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
                            Opcion = opc,
                            id = id
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<RestricionAlimentacionEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlRestriccionIngredients(TokenData DatosToken,List<RestricionAlimentacion_IngredientesEntity> lst, int opc, int id)
        {
            Result objResult = new Result();
            try
            {
                //string JsonHeader = JsonConvert.SerializeObject(lst);
                TranformTable tranformTable = new TranformTable();
                DataTable tbl = tranformTable.CreateDataTable(lst);
                
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        spa,
                        new
                        {
                            Opcion = opc,
                            IdTipoAlimentacion = id,
                            Usuario = DatosToken.Usuario,
                            Ingredientes = tbl
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

        public async Task<Result> eliminarIngrediente(TokenData DatosToken, int idTipoAlim, int idIngre, int idRestri)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        spa,
                        new
                        {
                            Opcion = 2,
                            IdTipoAlimentacion = idTipoAlim,
                            idIngrediente = idIngre,
                            IdRestriccionIngrediente = idRestri,
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

        public async Task<Result> eliminarRestriccion(TokenData DatosToken, int idTipoAlim)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QuerySingleAsync<MensajesEntity>(
                        spa,
                        new
                        {
                            Opcion = 3,
                            IdTipoAlimentacion = idTipoAlim,
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

    public class TranformTable
    {
        public DataTable CreateDataTable<T>(IEnumerable<T> list)
        {
            Type type = typeof(T);
            var properties = type.GetProperties();

            DataTable dataTable = new DataTable();
            foreach (PropertyInfo info in properties)
            {
                dataTable.Columns.Add(new DataColumn(info.Name, Nullable.GetUnderlyingType(info.PropertyType) ?? info.PropertyType));
            }

            foreach (T entity in list)
            {
                object[] values = new object[properties.Length];
                for (int i = 0; i < properties.Length; i++)
                {
                    values[i] = properties[i].GetValue(entity);
                }

                dataTable.Rows.Add(values);
            }

            return dataTable;
        }
    }
}
