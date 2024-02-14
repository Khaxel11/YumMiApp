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
    //[Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class KitchenController : ControllerBase
    {
        UserJwt conection = new UserJwt();
        Connection Connection = new Connection();
        public KitchenController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            conection.Conection = Connection.conect();
        }

        [HttpGet("checkConnection")]
        public async Task<IActionResult> checkConnection()
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

        [HttpGet("getUbication")]
        public async Task<IActionResult> getUbication(int Opcion, int Id)
        {
            try
            {
                return Ok(await new KitchenBusiness().getUbication(conection, Opcion, Id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getInfo")]
        public async Task<IActionResult> getInfo(int Opcion, string Filtro)
        {
            try
            {
                return Ok(await new KitchenBusiness().getInfo(conection, Opcion, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("validateUsername")]
        public async Task<IActionResult> validateUsername(string Username)
        {
            try
            {
                return Ok(await new KitchenBusiness().validateUsername(conection, Username));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getUserData")]
        public async Task<IActionResult> getUserData(int Opcion, string Username, string Password, int IdCuenta)
        {
            try
            {
                return Ok(await new KitchenBusiness().getUserData(conection, Opcion, Username, Password, IdCuenta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("registerNewUser")]
        public async Task<IActionResult> registerNewUser(string UserName, string Password, string Email)
        {
            try
            {
                return Ok(await new KitchenBusiness().registerNewUser(conection, UserName, Password, Email));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("insertKitchenUser")]
        public async Task<IActionResult> insertKitchenUser(UserDataEntity UserData)
        {
            try
            {
                return Ok(await new KitchenBusiness().insertKitchenUser(conection, UserData));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getNotification")]
        public async Task<IActionResult> getNotification(int IdCuenta)
        {
            try
            {
                return Ok(await new KitchenBusiness().getNotification(conection, IdCuenta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getSliderMenu")]
        public async Task<IActionResult> getSliderMenu()
        {
            try
            {
                return Ok(await new KitchenBusiness().getSliderMenu(conection));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
