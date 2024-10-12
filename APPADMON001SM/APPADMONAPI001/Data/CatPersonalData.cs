using Entity.DTO.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using Dapper;

namespace Data
{
    public class CatPersonalData
    {
        private const string SP_CONSULTA = "APPADMONCAT015APSC1";
        private const string SP_ACCION = "APPADMONCAT015APSA2";

        #region CONSULTAS
        public async Task<Result> getTpoCargo(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(SP_CONSULTA,
                        new
                        {
                            Opcion = 1
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<tpocargo>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTpoUsuario(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(SP_CONSULTA,
                        new
                        {
                            Opcion = 2
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<tpousuarios>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getPaises(TokenData DatosToken)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(SP_CONSULTA,
                        new
                        {
                            Opcion = 3
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<paises>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getEstados(TokenData DatosToken, int idpais)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(SP_CONSULTA,
                        new
                        {
                            Opcion = 4,
                            IdPais = idpais
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<estados>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getMunicipios(TokenData DatosToken, int idestado)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(SP_CONSULTA,
                        new
                        {
                            Opcion = 5,
                            IdEstado = idestado
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<municipios>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getUsuarios(TokenData DatosToken, string usuario)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    var result = await conexion.QueryMultipleAsync(SP_CONSULTA,
                        new
                        {
                            Opcion = 6,
                            Usuario = usuario
                        },
                        commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<usuarios>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        #endregion

        #region ACCIONES (GUARDAR- EDITAR - ELIMINAR)
        public async Task<Result> GuardarUsuario(TokenData DatosToken, CatPersonalEntity dts)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(SP_ACCION,
                        new
                        {
                            Opcion = 1,
                            Usuario = dts.usuario,
                            Nombre = dts.nombre,
                            ApellPaterno = dts.apellpaterno,
                            ApellMaterno = dts.apellmaterno,
                            IdCargo = dts.idcargo,
                            IdTipoUsuario = dts.idtipousuario,
                            Password = dts.password,
                            Correo = dts.correo,
                            FechaNac = dts.fechanac,
                            IdPais = dts.idpais,
                            IdEstado = dts.idestado,
                            IdMunicipio = dts.idmunicipio,
                            UsuarioERP = DatosToken.Usuario,
                            Foto = dts.foto,
                            NomCompleto = dts.nomcompleto
                        },
                           commandType: CommandType.StoredProcedure,
                        commandTimeout: 300);

                    objResult.Correcto = true;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                Console.WriteLine($"Error al guardar usuario: {ex.Message}");
            }
            return objResult;
        }

        public async Task<Result> EditarUsuario(TokenData DatosToken, CatPersonalEntity dts)
        {
            Result objResult = new Result();
            try
            {
                //string fotoBase64 = Convert.ToBase64String(dts.foto);

                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(SP_ACCION,
                        new
                        {
                            Opcion = 2,
                            Usuario = dts.usuario,
                            Nombre = dts.nombre,
                            ApellPaterno = dts.apellpaterno,
                            ApellMaterno = dts.apellmaterno,
                            IdCargo = dts.idcargo,
                            IdTipoUsuario = dts.idtipousuario,
                            Password = dts.password,
                            Correo = dts.correo,
                            FechaNac = dts.fechanac,
                            IdPais = dts.idpais,
                            IdEstado = dts.idestado,
                            IdMunicipio = dts.idmunicipio,
                            UsuarioERP = DatosToken.Usuario,
                            Foto = dts.foto, 
                            NomCompleto = dts.nomcompleto,
                            IdUsuario = dts.idusuario
                        },
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300);

                    objResult.Correcto = true;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                Console.WriteLine($"Error al editar usuario: {ex.Message}");
            }
            return objResult;
        }

        public async Task<Result> EliminarUsuario(TokenData DatosToken, CatPersonalEntity dts)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(SP_ACCION,
                        new
                        {
                            Opcion = 3,
                            UsuarioERP = DatosToken.Usuario,
                            IdUsuario = dts.idusuario
                        },
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300);

                    objResult.Correcto = true;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                Console.WriteLine($"Error al eliminar usuario: {ex.Message}");
            }
            return objResult;
        }
        //Axel 12/10/2021 : SE AGREGA PARA CAMBIAR CONTRASEÑA SEPARADO
        public async Task<Result> changePassword(TokenData DatosToken, CatPersonalEntity dts)
        {
            Result objResult = new Result();
            try
            {
                using (var conexion = new SqlConnection(DatosToken.Conexion))
                {
                    await conexion.ExecuteAsync(SP_ACCION,
                        new
                        {
                            Opcion = 4,
                            UsuarioERP = DatosToken.Usuario,
                            Password = dts.password
                        },
                        commandType: CommandType.StoredProcedure,
                        commandTimeout: 300);

                    objResult.Correcto = true;
                }
            }
            catch (Exception ex)
            {
                objResult.Correcto = false;
                objResult.Mensaje = ex.Message;
                Console.WriteLine($"Error al eliminar usuario: {ex.Message}");
            }
            return objResult;
        }
        #endregion
    }
}
