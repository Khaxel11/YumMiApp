using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class TiposUsuariosBusiness
    {
        public async Task<Result> getTiposUsuarios(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new TiposUsuariosData().getTiposUsuarios(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlTiposUsuarios(TokenData DatosToken, int Opcion, TiposUsuariosEntity tiposUsuarios)
        {
            try
            {
                return await new TiposUsuariosData().controlTiposUsuarios(DatosToken, Opcion, tiposUsuarios);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
