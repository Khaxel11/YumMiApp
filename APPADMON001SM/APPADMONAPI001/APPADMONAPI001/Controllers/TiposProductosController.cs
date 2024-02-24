using Business;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System;
using Entity;

namespace APPADMONAPI001.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class TiposProductosController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();

        public TiposProductosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }
        [HttpGet("getTiposProductos")]
        public async Task<IActionResult> getTiposProductos(string Filtro)
        {
            try
            {
                return Ok(await new TiposProductosBusiness().getTiposProductos(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlTiposProductos")]
        public async Task<IActionResult> controlTiposProductos(int Opcion, TiposProductosEntity Tipos)
        {
            try
            {
                return Ok(await new TiposProductosBusiness().controlTiposProductos(datosToken, Opcion , Tipos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
