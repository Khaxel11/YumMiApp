using Entity.DTO;
using Entity.DTO.Common;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ADMBANCAPI002.Services
{
    public class JwtService
    {
        public static UserJwt auth(AppSettings appsettings, UserJwt objUserJwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appsettings.Secret);

            ClaimsIdentity claims = new ClaimsIdentity(new Claim[]
            {
                new Claim("IdUsuario",objUserJwt.IdUsuario.ToString()),
                new Claim("Zona", objUserJwt.Zona),
            });
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddDays(1), //DateTime.UtcNow.AddDays(appsettings.JwtExpireDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            objUserJwt.Token = tokenHandler.WriteToken(token);

            return objUserJwt;

        }
    }
}
