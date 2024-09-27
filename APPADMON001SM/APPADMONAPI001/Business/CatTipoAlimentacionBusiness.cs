using Data;
using Entity.DTO.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class CatTipoAlimentacionBusiness
    {
        public async Task<Result> getTipoAlimentacion(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new CatTipoAlimentacionData().getTipoAlimentacion(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlTipoAlimentacion(TokenData DatosToken, int Opcion, CatTipoAlimentacionEntity TipoAlimentacion)
        {
            try
            {
                return await new CatTipoAlimentacionData().controlTipoAlimentacion(DatosToken, Opcion, TipoAlimentacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
