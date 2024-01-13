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
    public class FoodHubController : ControllerBase
    {
        UserJwt conection = new UserJwt();
        Connection Connection = new Connection();
        public FoodHubController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            conection.Conection = Connection.conect();
        }
        [HttpGet("getFoodHubs")]
        public async Task<IActionResult> getFoodHubs(int IdEstado, string Filtro, int IdCuenta)
        {
            try
            {
                return Ok(await new FoodHubBusiness().getFoodHubs(conection, IdEstado, Filtro, IdCuenta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getCalificaciones")]
        public async Task<IActionResult> getCalificaciones(int IdFoodHub)
        {
            try
            {
                return Ok(await new FoodHubBusiness().getCalificaciones(conection, IdFoodHub));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("asignFoodhub")]
        public async Task<IActionResult> asignFoodhub(int Opcion, int IdCuenta, int IdFoodHub, bool Predeterminado, int IdAsignado)
        {
            try
            {
                return Ok(await new FoodHubBusiness().asignFoodhub(conection, Opcion, IdCuenta, IdFoodHub, Predeterminado, IdAsignado));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
