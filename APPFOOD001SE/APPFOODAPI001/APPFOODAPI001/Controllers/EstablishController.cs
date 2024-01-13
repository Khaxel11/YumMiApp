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
    public class EstablishController : ControllerBase
    {

        UserJwt conection = new UserJwt();
        Connection connection = new Connection();
        public EstablishController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            conection.Conection = connection.conect();//httpContext.HttpContext.Items["Conexion"].ToString();
        }
        [HttpGet("getLogData")]
        public async Task<IActionResult> getLogData(int Opcion, int IdCuenta)
        {
            try
            {
                return Ok(await new EstablishBusiness().getLogData(conection, Opcion, IdCuenta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
