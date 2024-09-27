using Business;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System;
using Entity;

namespace APPADMONAPI001.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class IngredientsController : ControllerBase
    {
        /*
        * Author:      Manuel de Jesus Valenzuela Gracian
        * Date:        27Ago2024
        * Descripción: Métodos para ABC de ingrendientes ("CRUD" = CREATE, READ, UPDATE AND DELETE)
        */

        private readonly TokenData datosToken = new TokenData();

        public IngredientsController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getIngredients")]
        public async Task<IActionResult> getIngredients(string Filtro)
        {
            try
            {
                return Ok(await new IngredientsBusiness().getIngredients(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlIngredients")]
        public async Task<IActionResult> controlIngredients(int Opcion, IngredientsEntity model)
        {
            try
            {
                return Ok(await new IngredientsBusiness().controlIngredients(datosToken, Opcion, model));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
