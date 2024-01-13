using Entity.DTO;
using Entity.DTO.Common;
using SERTRAFAPI001.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace SERTRAFAPI001.Controllers
{

    [Route("/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IHttpContextAccessor _httpContext;
        public AuthController(IOptions<AppSettings> appSettings, IHttpContextAccessor httpContext)
        {
            _appSettings = appSettings.Value;
            this._httpContext = httpContext;
        }

        [AllowAnonymous]
        [HttpPost("Token")]
        public IActionResult Token(UserJwt user)
        {
            JwtService.auth(_appSettings, user);
            return Ok(user);
        }
    }
}
