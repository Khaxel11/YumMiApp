using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class AdmonBusiness
    {
        public async Task<Result> login(TokenData DatosToken, string NombreUsuario, string Password)
        {
            try
            {
                return await new AdmonData().login(DatosToken, NombreUsuario, Password);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
