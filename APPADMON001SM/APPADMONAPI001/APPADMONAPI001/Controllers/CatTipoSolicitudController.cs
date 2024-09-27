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

namespace FPAPRODAPI002.Controllers
{
    [Route("/[controller]")]
    [ApiController]

    public class CatTipoSolicitudController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public CatTipoSolicitudController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getTipoSolicitud")]
        public async Task<IActionResult> getTipoSolicitud(string Filtro)
        {
            try
            {
                return Ok(await new CatTipoSolicitudBusiness().getTipoSolicitud(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlTipoSolicitud")]
        public async Task<IActionResult> controlTipoSolicitud(int Opcion, CatTipoSolicitudEntity TipoSolicitud)
        {
            try
            {
                return Ok(await new CatTipoSolicitudBusiness().controlTipoSolicitud(datosToken, Opcion, TipoSolicitud));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
