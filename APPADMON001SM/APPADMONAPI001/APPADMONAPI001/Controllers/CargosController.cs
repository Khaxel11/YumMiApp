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
    public class CargosController : ControllerBase
    {
      

        UserJwt conection = new UserJwt();
        Connection Connection = new Connection();
        private readonly TokenData datosToken = new TokenData();

        public CargosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            //conection.Conection = Connection.conect();
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
        }
        //localhost:1400/Cargos/getCargos?Filtro=EHF
        //200 es correcto
        //400 incorrecto
        [HttpGet("getCargos")]
        public async Task<IActionResult> getCargos(string Filtro)
        {
            try
            {
                return Ok(await new CargosBusiness().getCargos(conection, Filtro));
            }catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
