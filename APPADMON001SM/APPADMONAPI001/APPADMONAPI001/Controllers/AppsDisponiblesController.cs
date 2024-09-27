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

namespace APPADMONAPI001.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class AppsDisponiblesController : ControllerBase
    {
        private readonly TokenData datosToken = new TokenData();
        public AppsDisponiblesController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            //conection.Conection = Connection.conect();
            datosToken.Conexion = httpContext.HttpContext.Items["Conexion"].ToString();
            datosToken.Usuario = httpContext.HttpContext.Items["Usuario"].ToString();
        }

        #region Get Orden
        [HttpGet("getSistemas")]
        public async Task<IActionResult> getSistemas()
        {
            try
            {
                return Ok(await new AppsDisponiblesBusiness().getSistemas(datosToken));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpGet("getEncabezados")]
        public async Task<IActionResult> getEncabezados(string Filtro)
        {
            try
            {
                return Ok(await new AppsDisponiblesBusiness().getEncabezados(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        [HttpGet("getAplicaciones")]
        public async Task<IActionResult> getAplicaciones(string Filtro)
        {
            try
            {
                return Ok(await new AppsDisponiblesBusiness().getAplicaciones(datosToken, Filtro));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        #endregion

        #region Administra
        [HttpPost("postEncabezados")]
        public async Task<IActionResult> AdministraEncabezado(int Opcion, string IdUsuario, EncabezadosEntity Encabezados)
        {
            try
            {
                //conection.IdUsuario = IdUsuario;
                return Ok(await new AppsDisponiblesBusiness().AdministraEncabezado(datosToken, Opcion, Encabezados));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpPost("postAplicaciones")]
        public async Task<IActionResult> AdministraAplicaciones(int Opcion, string IdUsuario, AppsDisponiblesEntity Aplicaciones)
        {
            try
            {
                //conection.IdUsuario = IdUsuario;
                return Ok(await new AppsDisponiblesBusiness().AdministraAplicaciones(datosToken, Opcion, Aplicaciones));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        #endregion

        #region Update Orden
        [HttpPost("putEncabezados")]
        public async Task<IActionResult> UpdateOrdenEncabezados(string IdUsuario, DatosOrden Aplicaciones)
        {
            try
            {
                //conection.IdUsuario = IdUsuario;
                return Ok(await new AppsDisponiblesBusiness().UpdateOrdenEncabezados(datosToken, Aplicaciones));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }
        [HttpPost("putAplicaciones")]
        public async Task<IActionResult> UpdateOrdenAplicaciones(string IdUsuario, DatosOrden Aplicaciones)
        {
            try
            {
                //conection.IdUsuario = IdUsuario;
                return Ok(await new AppsDisponiblesBusiness().UpdateOrdenAplicaciones(datosToken, Aplicaciones));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }

        }

        #endregion

    }
}
