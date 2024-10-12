using Business;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System;
using Entity;

namespace APPADMONAPI001.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class CatPersonalController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();

        public CatPersonalController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        #region CONSULTAS
        [HttpGet("getTpoCargo")]
        public async Task<IActionResult> getTpoCargo()
        {
            try
            {
                return Ok(await new CatPersonalBusiness().getTpoCargo(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpGet("getTpoUsuario")]
        public async Task<IActionResult> getTpoUsuario()
        {
            try
            {
                return Ok(await new CatPersonalBusiness().getTpoUsuario(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getPaises")]
        public async Task<IActionResult> getPaises()
        {
            try
            {
                return Ok(await new CatPersonalBusiness().getPaises(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpGet("getEstados")]
        public async Task<IActionResult> getEstados(int idpais)
        {
            try
            {
                return Ok(await new CatPersonalBusiness().getEstados(datosToken, idpais));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpGet("getMunicipios")]
        public async Task<IActionResult> getMunicipios(int idestado)
        {
            try
            {
                return Ok(await new CatPersonalBusiness().getMunicipios(datosToken, idestado));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpGet("getUsuarios")]
        public async Task<IActionResult> getUsuarios(string usuario)
        {
            try
            {
                return Ok(await new CatPersonalBusiness().getUsuarios(datosToken, usuario));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        #endregion

        #region ACCIONES (GUARDAR - EDITAR - ELIMINAR)
        [HttpPost("GuardarUsuario")]
        public async Task<IActionResult> GuardarUsuario( CatPersonalEntity dts)
        {
            try
            {
                return Ok(await new CatPersonalBusiness().Guardar(datosToken, dts));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("EditarUsuario")]
        public async Task<IActionResult> EditarUsuario(CatPersonalEntity dts)
        {
            try
            {
                return Ok(await new CatPersonalBusiness().Editar(datosToken, dts));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("EliminarUsuario")]
        public async Task<IActionResult> EliminarUsuario(CatPersonalEntity dts)
        {
            try
            {
                return Ok(await new CatPersonalBusiness().Eliminar(datosToken, dts));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("changePassword")]
        public async Task<IActionResult> changePassword(CatPersonalEntity dts)
        {
            try
            {
                return Ok(await new CatPersonalBusiness().changePassword(datosToken, dts));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        #endregion
    }
}
