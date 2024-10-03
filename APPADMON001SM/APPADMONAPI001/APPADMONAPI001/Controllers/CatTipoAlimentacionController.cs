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

namespace FPAPRODAPI002
{


    [Route("/[controller]")]
    [ApiController]

    public class CatTipoAlimentacionController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public CatTipoAlimentacionController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getTipoAlimentacion")]
        public async Task<IActionResult> getTipoAlimentacion(string Filtro)
        {
            try
            {
                return Ok(await new CatTipoAlimentacionBusiness().getTipoAlimentacion(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlTipoAlimentacion")]
        public async Task<IActionResult> controlTipoSolicitud(int Opcion, CatTipoAlimentacionEntity TipoAlimentacion)
        {
            try
            {
                return Ok(await new CatTipoAlimentacionBusiness().controlTipoAlimentacion(datosToken, Opcion, TipoAlimentacion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }



    }
}
