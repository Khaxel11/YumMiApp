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
    public class ProgramationController : ControllerBase
    {
        UserJwt conection = new UserJwt();
        Connection Connection = new Connection();
        public ProgramationController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            conection.Conection = Connection.conect();
        }

        [HttpPost("programProduct")]
        public async Task<IActionResult> programProduct(int Opcion, int IdCuenta, ProgramacionEntity Programacion)
        {
            try
            {
                return Ok(await new ProgramationBusiness().programProduct(conection, Opcion, IdCuenta, Programacion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getFechasProgramadas")]
        public async Task<IActionResult> getFechasProgramadas(int TipoFiltro,
            string Fecha, int idFoodHub, int idEstado, int IdCuenta, int IdProducto,
            int IdCategoria, int IdTipoAlimentacion)
        {
            try
            {
                return Ok(await new ProgramationBusiness().getFechasProgramadas(conection, TipoFiltro, Fecha, idFoodHub, idEstado,
                    IdCuenta, IdProducto, IdCategoria, IdTipoAlimentacion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
