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
namespace FPAPRODAPI002.Controllers
{

    [Route("/[controller]")]
    [ApiController]
    public class CatPromosController : ControllerBase
    {

        private readonly TokenData datosToken = new TokenData();
        public CatPromosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getPromos")]
        public async Task<IActionResult> getPromos(string Filtro)
        {
            try
            {
                return Ok(await new CatPromosBusiness().getPromos(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlPromos")]
        public async Task<IActionResult> controlPromos(int Opcion, string IdUsuario, CatPromosEntity Promos)
        {
            try
            {
                return Ok(await new CatPromosBusiness().controlPromos(datosToken, Opcion, Promos));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
