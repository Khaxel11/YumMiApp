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
using System.Reflection.Emit;

namespace FPAPRODAPI002.Controllers
{

    [Route("/[controller]")]
    [ApiController]

    public class OpcMenuCargoController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public OpcMenuCargoController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();


        }

        [HttpGet("getOpcMenuCargo")]
        public async Task<IActionResult> getOpcMenuCargo()
        {
            try
            {
                return Ok(await new OpcMenuCargoBusiness().getOpcMenuCargo(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getOpcPorCargo")]
        public async Task<IActionResult> getOpcPorCargo(int IdCargo )
        {
            try
            {
                return Ok(await new OpcMenuCargoBusiness().getOpcPorCargo(datosToken, IdCargo));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getOpciones")]
        public async Task<IActionResult> getOpciones()
        {
            try
            {
                return Ok(await new OpcMenuCargoBusiness().getOpciones(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("postGuardarOpciones")]
        public async Task<IActionResult>postGuardarOpciones(int IdCargo, opcionesType[] Opciones)
        {
            try
            {
                return Ok(await new OpcMenuCargoBusiness().postGuardarOpciones(datosToken, IdCargo, Opciones));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("eliminarOpciones")]
        public async Task<IActionResult> eliminarOpciones(int IdCargo, int IdOpcion, int Opcion)
        {
            try
            {
                return Ok(await new OpcMenuCargoBusiness().eliminarOpciones(datosToken, IdCargo, IdOpcion, Opcion));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }


    }
}
