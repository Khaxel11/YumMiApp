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

namespace APPADMONAPI001.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class TiposNotificacionesController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public TiposNotificacionesController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }
        [HttpGet("getTiposNotificaciones")]
        public async Task<IActionResult> getTiposNotificaciones(string Filtro, int IdTipoUsuario)
        {
            try
            {
                return Ok(await new TiposNotificacionesBusiness().getTiposNotificaciones(datosToken, Filtro, IdTipoUsuario));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpGet("getTiposUsuarios")]
        public async Task<IActionResult> getTiposUsuarios()
        {
            try
            {
                return Ok(await new TiposNotificacionesBusiness().getTiposUsuarios(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpPost("controlTiposNotificaciones")]
        public async Task<IActionResult> controlTiposNotificaciones(int Opcion, TiposNotificacionesEntity Tipo)
        {
            try
            {
                return Ok(await new TiposNotificacionesBusiness().controlTiposNotificaciones(datosToken, Opcion, Tipo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
