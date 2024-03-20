using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class TiposNotificacionesBusiness
    {
        public async Task<Result> getTiposNotificaciones(TokenData DatosToken, string Filtro, int IdTipoUsuario)
        {
            try
            {
                return await new TiposNotificacionesData().getTiposNotificaciones(DatosToken, Filtro, IdTipoUsuario);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTiposUsuarios(TokenData DatosToken)
        {
            try
            {
                return await new TiposNotificacionesData().getTiposUsuarios(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlTiposNotificaciones(TokenData DatosToken, int Opcion, TiposNotificacionesEntity Tipo)
        {
            try
            {
                return await new TiposNotificacionesData().controlTiposNotificaciones(DatosToken, Opcion, Tipo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
