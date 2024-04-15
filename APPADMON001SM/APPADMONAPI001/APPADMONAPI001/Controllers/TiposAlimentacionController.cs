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
    public class TiposAlimentacionController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public TiposAlimentacionController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            //conection.Conection = Connection.conect();
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }
        [HttpGet("getTiposAlimentacion")]
        public async Task<IActionResult> getTiposAlimentacion(string Filtro, int IdTipoUsuario)
        {
            try
            {
                return Ok(await new TiposAlimentacionBusiness().getTiposAlimentacion(datosToken, Filtro, IdTipoUsuario));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

    }
}
