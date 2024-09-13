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
    public class OpcMenuCargoData
    {
        private const string SP_CONSULTAS_OPCMENUCARGO = "APPMENU001MWAPSC1";
        private const string SP_ACCIONES_OPCMENUCARGO = "APPMENU001MWAPSA2";


        public async Task<Result> getOpcMenuCargo(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_OPCMENUCARGO,
                        new
                        {
                            Opcion = 1,

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<OpcMenuCargoEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOpcPorCargo(TokenData DatosToken, int IdCargo)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_OPCMENUCARGO,
                        new
                        {
                            Opcion = 2,
                            IdCargo= IdCargo

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<opcionesPorCargo>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOpciones(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(
                        SP_CONSULTAS_OPCMENUCARGO,
                        new
                        {
                            Opcion = 3,
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<opcionesMenu>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> postGuardarOpciones(TokenData datosToken, int IdCargo , opcionesType[] Opciones)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(datosToken.Conexion))
                {
                    CreateDataTable Ds = new CreateDataTable();
                    var result = await conexion.QuerySingleAsync<bool>(
                       SP_ACCIONES_OPCMENUCARGO,
                        new
                        {
                            Opcion = 1,
                            IdCargo = IdCargo,
                            Opciones = Ds.CreateTable(Opciones).AsTableValuedParameter("APPMENUDAT001_TD001"),
                            Usuario = datosToken.Usuario

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
        //PROCEDIMIENTO PARA ELIMINAR TODO Y ELIMINAR POR OPCIONES
        public async Task<Result> eliminarOpciones(TokenData datosToken, int IdCargo,int IdOpcion, int Opcion)
        {
            Result objResult = new Result();
            try
            {
                using (var con = new SqlConnection(datosToken.Conexion))
                {
                    CreateDataTable Ds = new CreateDataTable();
                    await con.ExecuteAsync(
                       SP_ACCIONES_OPCMENUCARGO,
                        new
                        {
                            Opcion= Opcion,
                            IdCargo = IdCargo,
                            IdOpcion = IdOpcion,
                            Usuario = datosToken.Usuario

                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.Correcto = true;
                    return objResult;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                return objResult;
            }
        }



    }
}
