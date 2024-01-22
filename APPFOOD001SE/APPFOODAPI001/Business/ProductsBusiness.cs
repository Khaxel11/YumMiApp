using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class ProductsBusiness
    {
        public async Task<Result> getTiposComida(UserJwt DatosToken)
        {
            try
            {
                return await new ProductsData().getTiposComida(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getIngredientes(UserJwt DatosToken, int IdTipoAlimentacion)
        {
            try
            {
                return await new ProductsData().getIngredientes(DatosToken, IdTipoAlimentacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
