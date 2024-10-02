using Business;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System;
using Entity;
using System.Collections.Generic;

namespace APPADMONAPI001.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class RestricionAlimentacionController : ControllerBase
    {
      /*
      * Author:      Manuel de Jesus Valenzuela Gracian
      * Date:        03Sep2024
      * Descripción: Métodos para Captura de Restriccion de Ingredientes
      */

        private readonly TokenData datosToken = new TokenData();

        public RestricionAlimentacionController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getTiposAlimentacionCbo")]
        public async Task<IActionResult> getTiposAlimentacionCbo(string Filtro)
        {
            try
            {
                return Ok(await new RestricionAlimentacionBusiness().getTiposAlimentacionCbo(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getRestriccionesConTotalIngredientes")]
        public async Task<IActionResult> getRestriccionesConTotalIngredientes(string Filtro)
        {
            try
            {
                return Ok(await new RestricionAlimentacionBusiness().getRestriccionesConTotalIngredientes(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }


        [HttpGet("getIngredientes")]
        public async Task<IActionResult> getIngredientes(string Filtro)
        {
            try
            {
                return Ok(await new RestricionAlimentacionBusiness().getIngredientes(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }


        [HttpGet("getRestriciones")]
        public async Task<IActionResult> getRestriciones(int id, int opc)
        {
            try
            {
                return Ok(await new RestricionAlimentacionBusiness().getRestriciones(datosToken, id, opc));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }


        [HttpPost]
        [Route("controlRestriccionIngredients/{opc}/{id}")]
        public async Task<ActionResult> Guardar([FromBody] RestricionAlimentacion_Listas data, int opc, int id)
        {
            try
            {
                return Ok(await new RestricionAlimentacionBusiness().controlRestriccionIngredients(datosToken, data.lstIngredients, opc, id));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error,{ex.Message}");

            }
        }

        
        [HttpGet("eliminarIngrediente")]
        public async Task<IActionResult> eliminarIngrediente(int idTipoAlim, int idIngre, int idRestri)
        {
            try
            {
                return Ok(await new RestricionAlimentacionBusiness().eliminarIngrediente(datosToken, idTipoAlim, idIngre, idRestri));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("eliminarRestriccion")]
        public async Task<IActionResult> eliminarRestriccion(int idTipoAlim)
        {
            try
            {
                return Ok(await new RestricionAlimentacionBusiness().eliminarRestriccion(datosToken, idTipoAlim));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
