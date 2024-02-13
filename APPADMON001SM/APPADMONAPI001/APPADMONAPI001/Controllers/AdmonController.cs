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
    //[Authorize]
    [Route("/[controller]")]
    [ApiController] 
    public class AdmonController : ControllerBase
    {
        UserJwt conection = new UserJwt();
        Connection Connection = new Connection();
        private readonly TokenData datosToken = new TokenData();

        public AdmonController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            conection.Conection = Connection.conect();
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
        }
        [HttpGet("login")]
        public async Task<IActionResult> login(string NombreUsuario, string Password)
        {
            try
            {   
                return Ok(await new AdmonBusiness().login(datosToken, NombreUsuario, Password));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
