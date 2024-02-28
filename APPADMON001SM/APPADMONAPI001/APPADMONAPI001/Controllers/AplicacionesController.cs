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
    public class AplicacionesController : ControllerBase
    {

        //UserJwt conection = new UserJwt();
        //Connection Connection = new Connection();
        private readonly TokenData datosToken = new TokenData();

        public AplicacionesController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            //conection.Conection = Connection.conect();
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }
        //localhost:1400/Cargos/getCargos?Filtro=EHF
        //200 es correcto
        //400 incorrecto
        [HttpGet("getAplicaciones")]
        public async Task<IActionResult> getAplicaciones(string Filtro)
        {
            try
            {
                return Ok(await new AplicacionesBusiness().getAplicaciones(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlAplicaciones")]
        public async Task<IActionResult> controlAplicaciones(int Opcion, string IdUsuario, AplicacionesEntity Aplicaciones)
        {
            try
            {
                //conection.IdUsuario = IdUsuario;
                return Ok(await new AplicacionesBusiness().controlAplicaciones(datosToken, Opcion, Aplicaciones));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
