using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Data;

namespace Business
{
    public class SecurityBusiness
    {
        public async Task<Result> getUniqueCode(UserJwt DatosToken, string Ext, string Num, string Correo, string Usuario)
        {
            try
            {
                return await new SecurityData().getUniqueCode(DatosToken, Ext, Num, Correo, Usuario);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
