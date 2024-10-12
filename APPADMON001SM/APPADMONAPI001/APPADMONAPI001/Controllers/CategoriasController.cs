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
    public class CategoriasController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public CategoriasController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        [HttpGet("getCategorias")]
        public async Task<IActionResult> getCategorias(string Filtro)
        {
            try
            {
                return Ok(await new CategoriasBusiness().getCategorias(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpPost("controlCategorias")]
        public async Task<IActionResult> controlCategorias(int Opcion, string IdUsuario, CategoriasEntity Categorias)
        {
            try
            {
                //conection.IdUsuario = IdUsuario;
                return Ok(await new CategoriasBusiness().controlCategorias(datosToken, Opcion, Categorias));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
    }
}
