using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Business
{
    public class CargosBusiness
    {
        public async Task<Result> getCargos(UserJwt DatosToken, string Filtro)
        {
            try
            {
                return await new CargosData().getCargos(DatosToken, Filtro); 
            }catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
