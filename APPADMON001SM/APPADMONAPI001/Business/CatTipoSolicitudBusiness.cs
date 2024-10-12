using Data;
using Entity.DTO.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business                                                                                    
{
    public class CatTipoSolicitudBusiness
    {
        public async Task<Result> getTipoSolicitud(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new CatTipoSolicitudData().getTipoSolicitud(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlTipoSolicitud(TokenData DatosToken, int Opcion, CatTipoSolicitudEntity TipoSolicitud)
        {
            try
            {
                return await new CatTipoSolicitudData().controlTipoSolicitud(DatosToken, Opcion, TipoSolicitud);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
