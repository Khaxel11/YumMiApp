using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class EstablishBusiness
    {
        public async Task<Result> getLogData(UserJwt DatosToken, int Opcion, int IdCuenta)
        {
            try
            {
                return await new EstablishData().getLogData(DatosToken, Opcion, IdCuenta);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
