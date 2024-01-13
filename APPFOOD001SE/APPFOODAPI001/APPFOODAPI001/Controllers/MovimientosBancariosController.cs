using Microsoft.AspNetCore.Mvc;
using Business;
using Entity;
using Entity.DTO.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Threading.Tasks;
namespace APPFOODAPI001.Controllers
{
    [Authorize]
    [Route("/[controller]")]
    [ApiController]
    public class MovimientosBancariosController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public MovimientosBancariosController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["UsuarioERP"].ToString();
            datosToken.Zona = httpContext.HttpContext.Items["Zona"].ToString();

        }
        [HttpGet("getMovimientosBancarios")]
        public async Task<IActionResult> getMovimientosBancarios(string FechaI, string FechaF, string CveMov, string NoCta, string NoReferencia)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getMovimientosBancarios(datosToken, FechaI, FechaF, CveMov, NoCta, NoReferencia));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getMovimientos")]
        public async Task<IActionResult> getMovimientos()
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getMovimientos(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getTiposMovimientos")]
        public async Task<IActionResult> getTiposMovimientos(string Clave)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getTiposMovimientos(datosToken, Clave));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getFormaPago")]
        public async Task<IActionResult> getFormaPago()
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getFormaPago(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getTiposCadena")]
        public async Task<IActionResult> getTiposCadena()
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getTiposCadena(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getCuentaOrdenante")]
        public async Task<IActionResult> getCuentaOrdenante(string NoCta)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getCuentaOrdenante(datosToken, NoCta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getDatosBanco")]
        public async Task<IActionResult> getDatosBancov(string Filtro)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getDatosBanco(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getRubros")]
        public async Task<IActionResult> getRubros(string CveRubro)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getRubros(datosToken, CveRubro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getMonedas")]
        public async Task<IActionResult> getMonedas()
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getMonedas(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getTipoCambio")]
        public async Task<IActionResult> getTipoCambio(string FechaI, int TipoMoneda)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getTipoCambio(datosToken, FechaI, TipoMoneda));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("isAplicadoCartera")]
        public async Task<IActionResult> isAplicadoCartera(string Folio)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().isAplicadoCartera(datosToken, Folio));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getCuenta")]
        public async Task<IActionResult> getCuenta(string NoCta)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getCuenta(datosToken, NoCta));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getRepetitivosByRubro")]
        public async Task<IActionResult> getRepetitivosByRubro(string CveRubro)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getRepetitivosByRubro(datosToken, CveRubro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("getClientes")]
        public async Task<IActionResult> getClientes(int Opcion, string FiltroCliente)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getClientes(datosToken, Opcion, FiltroCliente));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpGet("getAllCuentaOrdenante")]
        public async Task<IActionResult> getAllCuentaOrdenante(string Filtro)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().getAllCuentaOrdenante(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpGet("isDepositoCartera")]
        public async Task<IActionResult> isDepositoCartera(decimal Importe, string Folio)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().isDepositoCartera(datosToken, Importe, Folio));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
        [HttpPost("controlMovimientos")]
        public async Task<IActionResult> controlMovimientos(int opcion, MovimientosBancariosEntity Movimiento)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().controlMovimientos(datosToken, opcion, Movimiento));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }

        [HttpPost("updateSaldo")]
        public async Task<IActionResult> updateSaldo(int opcion, decimal saldo, MovimientosBancariosEntity Movimiento)
        {
            try
            {
                return Ok(await new MovimientosBancariosBusiness().updateSaldo(datosToken, opcion, saldo, Movimiento));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
