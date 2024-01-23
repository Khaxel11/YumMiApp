using Microsoft.AspNetCore.Mvc;
using Business;
using Entity;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
using Entity.DTO;

namespace APPFOODAPI001.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        UserJwt conection = new UserJwt();
        Connection Connection = new Connection();
        public ProductsController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            conection.Conection = Connection.conect();
        }
        [HttpGet("getProductos")]
        public async Task<IActionResult> getProductos(int IdCuenta, int IdTipo, int IdTipoAlimentacion, int IdCategoria)
        {
            try
            {
                return Ok(await new ProductsBusiness().getProductos(conection, IdCuenta, IdTipo, IdTipoAlimentacion, IdCategoria));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getTiposComida")]
        public async Task<IActionResult> getTiposComida()
        {
            try
            {
                return Ok(await new ProductsBusiness().getTiposComida(conection));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getIngredientes")]
        public async Task<IActionResult> getIngredientes(int IdTipoAlimentacion)
        {
            try
            {
                return Ok(await new ProductsBusiness().getIngredientes(conection, IdTipoAlimentacion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("saveProducto")]
        public async Task<IActionResult> saveProducto(int IdCuenta, ProductEntity Producto)
        {
            try
            {
                return Ok(await new ProductsBusiness().saveProducto(conection, IdCuenta, Producto));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
