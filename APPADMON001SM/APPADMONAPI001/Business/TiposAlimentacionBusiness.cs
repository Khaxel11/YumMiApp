using Data;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class TiposAlimentacionBusiness
    {
        public async Task<Result> getTiposAlimentacion(TokenData DatosToken, string Filtro, int IdTipoUsuario)
        {
            try
            {
                return await new TiposAlimentacionData().getTiposAlimentacion(DatosToken, Filtro, IdTipoUsuario);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
