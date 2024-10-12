using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;
using System;
using Business;
using System.Threading.Tasks;
using Entity.DTO.Common;
using Entity.DTO;
using Entity;

namespace APPUSERAPI001.Controllers
{

    [Route("/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly string _connectionString;

        public RegisterController(IConfiguration configuration, IHttpContextAccessor httpContext)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }
        [HttpGet("verifyCode")]
        public async Task<IActionResult> verifyCode(string Code, string Ext, string Num, string Correo, string Usuario)
        {
            try
            {
                UserJwt token = new UserJwt();
                token.Conection = _connectionString;
                return Ok(await new RegisterBusiness().verifyCode(token, Code, Ext, Num, Correo, Usuario));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("registerUser")]
        public async Task<IActionResult> registerUser(UserData user)
        {
            try
            {
                UserJwt token = new UserJwt();
                token.Conection = _connectionString;
                return Ok(await new RegisterBusiness().registerUser(token, user));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
