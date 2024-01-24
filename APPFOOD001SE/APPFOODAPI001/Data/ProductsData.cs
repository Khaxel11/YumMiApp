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
    public class ProductsData
    {
        private const string SP_CONSULTAS_CAPTURA = "APPFPROD001APSPC1";
        private const string SP_CONSULTAS_PRODUCTOS = "APPFPROD001APSPC3";
        private const string SP_ACCIONES_CAPTURA = "APPFPROD001APSPA2";
        public async Task<Result> getProductos(UserJwt DatosToken, int IdCuenta, int IdTipo, int IdTipoAlimentacion, int IdCategoria)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_PRODUCTOS,
                        new
                        {
                            Opcion = 1,
                            IdCuenta = IdCuenta,
                            IdTipo = IdTipo,    
                            IdTipoAlimentacion = IdTipoAlimentacion,
                            IdCategoria = IdCategoria   
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Producto>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTiposComida(UserJwt DatosToken)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_CAPTURA,
                        new
                        {
                            Opcion = 1,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                    objResult.data2 = await result.ReadAsync<Object>();
                    objResult.data3 = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getIngredientes(UserJwt DatosToken, int IdTipoAlimentacion)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_CAPTURA,
                        new
                        {
                            Opcion = 2,
                            IdTipoAlimentacion = IdTipoAlimentacion
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getFiltros(UserJwt DatosToken)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_CAPTURA,
                        new
                        {
                            Opcion = 3,
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> saveProducto(UserJwt DatosToken, int IdCuenta, ProductEntity Producto)
        {
            Result objResult = new Result();
            try
            {
                ImageController img = new ImageController();
                CreateDataTable Ds = new CreateDataTable();

                //Se crea base para la foto
                byte[] byteArray = null;
                if (Producto.Foto != null)
                {
                    string suffixToFind = ";base64,";

                    int suffixIndex = Producto.Foto.LastIndexOf(suffixToFind, StringComparison.OrdinalIgnoreCase);

                    if (suffixIndex != -1)
                    {
                        Producto.Foto = Producto.Foto.Substring(suffixIndex + suffixToFind.Length);
                    }

                    Producto.Picture = Convert.FromBase64String(Producto.Foto);
                }
                //Guardamos datos del producto
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MessageEntity>(
                        SP_ACCIONES_CAPTURA,
                        new
                        {
                            Opcion = 1,
                            IdCuenta = IdCuenta,
                            Nombre = Producto.NombreProducto,
                            Foto = Producto.Picture,
                            Descripcion = Producto.Descripcion,
                            IdTipo = Producto.IdTipo,
                            IdTipoAlimentacion = Producto.IdTipoAlimentacion,
                            Usuario = "",
                            
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                    //Si el resultado es correcto
                    if (result.Correct && result.Message == "OK")
                    {   
                        //Guardamos el ID DEL PRODUCTO guardado
                        int IdProducto = (int)result.Value;

                        CreateListType tablas = new CreateListType();
                        List<TypeCategorias> Categorias = tablas.createTypeCategorias(Producto.Categorias, IdProducto);

                        //Guardamos la categorias relacionadas del producto
                        var saveCategory = await con.QuerySingleAsync<MessageEntity>(
                           SP_ACCIONES_CAPTURA,
                           new
                           {
                               Opcion = 2,
                               IdCuenta = IdCuenta,
                               IdProducto = IdProducto,
                               Categorias = Ds.CreateTable(Categorias).AsTableValuedParameter("APPFPRODCAT009TD001")

                           }, commandType: CommandType.StoredProcedure);
                        objResult.data2 = saveCategory;
                        //Si es correcto
                        if (saveCategory.Correct && saveCategory.Message == "OK")
                        {
                            List<TypeIngrediente> Ingredientes = tablas.createTypeIngredientes(Producto.Ingredientes, IdProducto);
                            //Guardamos los ingredientes relacionados al producto
                            var saveIngredients = await con.QuerySingleAsync<MessageEntity>(
                               SP_ACCIONES_CAPTURA,
                               new
                               {
                                   Opcion = 3,
                                   IdCuenta = IdCuenta,
                                   IdProducto = IdProducto,
                                   Ingredientes = Ds.CreateTable(Ingredientes).AsTableValuedParameter("APPFPRODCAT007TD001")

                               }, commandType: CommandType.StoredProcedure);
                                objResult.data3 = saveIngredients;
                        }
                    }
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
