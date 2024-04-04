using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Business
{
    public class ProductsBusiness
    {
        public async Task<Result> getProductos(UserJwt DatosToken, int IdCuenta, int IdTipo, int IdTipoAlimentacion, int IdCategoria)
        {
            try
            {
                return await new ProductsData().getProductos(DatosToken, IdCuenta, IdTipo, IdTipoAlimentacion, IdCategoria);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getTiposComida(UserJwt DatosToken)
        {
            try
            {
                return await new ProductsData().getTiposComida(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
     
        public async Task<Result> getIngredientes(UserJwt DatosToken, int IdTipoAlimentacion)
        {
            try
            {
                return await new ProductsData().getIngredientes(DatosToken, IdTipoAlimentacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getFiltros(UserJwt DatosToken)
        {
            try
            {
                return await new ProductsData().getFiltros(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getInfoProduct(UserJwt DatosToken, int IdProducto)
        {
            try
            {
                return await new ProductsData().getInfoProduct(DatosToken, IdProducto);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> saveProducto(UserJwt DatosToken, int IdCuenta, ProductEntity Producto)
        {
            try
            {
                return await new ProductsData().saveProducto(DatosToken, IdCuenta, Producto);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> savePrecios(UserJwt DatosToken, int IdCuenta, int IdProducto, List<PrecioEntity> Precios)
        {
            try
            {
                return await new ProductsData().savePrecios(DatosToken, IdCuenta, IdProducto, Precios);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getProducts(UserJwt DatosToken, int IdCuenta)
        {
            try
            {
                return await new ProductsData().getProducts(DatosToken, IdCuenta);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
