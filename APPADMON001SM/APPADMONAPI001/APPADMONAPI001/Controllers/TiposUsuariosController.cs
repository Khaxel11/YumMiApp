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
    public class TiposUsuariosController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public TiposUsuariosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getTiposUsuarios")]
        public async Task<IActionResult> getTiposUsuarios(string Filtro)
        {
            try
            {
                return Ok(await new TiposUsuariosBusiness().getTiposUsuarios(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlTiposUsuarios")]
        public async Task<IActionResult> controlTiposUsuarios(int Opcion, string IdUsuario, TiposUsuariosEntity tiposUsuarios)
        {
            try
            {
                //conection.IdUsuario = IdUsuario;
                return Ok(await new TiposUsuariosBusiness().controlTiposUsuarios(datosToken, Opcion, tiposUsuarios));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}

