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
    public class VisualesController : ControllerBase
    {
        /*
        * Author:      Manuel de Jesus Valenzuela Gracian
        * Date:        29Ago2024
        * Descripción: Métodos catalogo de VISUALES
        */

        private readonly TokenData datosToken = new TokenData();

        public VisualesController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getAplicaciones")]
        public async Task<IActionResult> getAplicaciones(string Filtro)
        {
            try
            {
                return Ok(await new VisualesBusiness().getAplicaciones(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getCatProductos")]
        public async Task<IActionResult> getCatProductos(string Filtro)
        {
            try
            {
                return Ok(await new VisualesBusiness().getCatProductos(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getVisuales")]
        public async Task<IActionResult> getVisuales(string Filtro, int idSistema, bool programadas)
        {
            try
            {
                return Ok(await new VisualesBusiness().getVisuales(datosToken, Filtro, idSistema, programadas));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlVisuales")]
        public async Task<IActionResult> controlVisuales(int Opcion, VisualesEntity model)
        {
            try
            {
                return Ok(await new VisualesBusiness().controlVisuales(datosToken, Opcion, model));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}

