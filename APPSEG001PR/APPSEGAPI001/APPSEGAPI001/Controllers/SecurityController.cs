using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System;
using Business;
using System.Threading.Tasks;
using Entity.DTO.Common;
using Entity.DTO;

namespace APPSEGAPI001.Controllers
{
    [Route("/")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly string _connectionString;

        public SecurityController(IConfiguration configuration, IHttpContextAccessor httpContext)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        [HttpGet("checkConnection")]
        public async Task<IActionResult> CheckConnection()
        {
            try
            {
                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getUniqueCode")]
        public async Task<IActionResult> getUniqueCode(string Ext, string Num, string Correo, string Usuario)
        {
            try
            {
                UserJwt token = new UserJwt();
                token.Conection = _connectionString;
                return Ok(await new SecurityBusiness().getUniqueCode(token, Ext, Num, Correo, Usuario));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
