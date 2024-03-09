using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Entity;

namespace Business
{
    public class AplicacionesBusiness
    {
        public async Task<Result> getAplicaciones(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new AplicacionesData().getAplicaciones(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlAplicaciones(TokenData DatosToken, int Opcion, AplicacionesEntity Aplicaciones)
        {
            try
            {
                return await new AplicacionesData().controlAplicaciones(DatosToken, Opcion, Aplicaciones);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
