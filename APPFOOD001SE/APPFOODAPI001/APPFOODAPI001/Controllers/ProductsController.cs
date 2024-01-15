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
    public class ProductsController : ControllerBase
    {
        UserJwt conection = new UserJwt();
        Connection Connection = new Connection();
        public ProductsController(IOptions<AppSettings> AppSettings, IHttpContextAccessor httpContext)
        {
            conection.Conection = Connection.conect();
        }
        [HttpGet("getTiposComida")]
        public async Task<IActionResult> getTiposComida()
        {
            try
            {
                return Ok(await new ProductsBusiness().getTiposComida(conection));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error, {ex.Message}");
            }
        }
    }
}
