using Data;
using Entity;
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

        public async Task<Result> controlTiposProductos(TokenData DatosToken, int Opcion, TiposProductosEntity Tipos)
        {
            try
            {
                return await new TiposProductosData().controlTiposProductos(DatosToken, Opcion, Tipos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
