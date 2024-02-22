using Data;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class TiposProductosBusiness
    {
        public async Task<Result> getTiposProductos(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new TiposProductosData().getTiposProductos(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
