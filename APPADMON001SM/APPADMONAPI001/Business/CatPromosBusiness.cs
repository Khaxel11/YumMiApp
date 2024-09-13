using Data;
using Entity.DTO.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class CatPromosBusiness
    {
        public async Task<Result> getPromos(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new CatPromosData().getPromos(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlPromos(TokenData DatosToken, int Opcion, CatPromosEntity Promos)
        {
            try
            {
                return await new CatPromosData().controlPromos(DatosToken, Opcion, Promos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
