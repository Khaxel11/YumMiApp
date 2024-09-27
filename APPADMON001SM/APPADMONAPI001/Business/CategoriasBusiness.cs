using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class CategoriasBusiness
    {
        public async Task<Result> getCategorias(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new CategoriasData().getCategorias(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlCategorias(TokenData DatosToken, int Opcion, CategoriasEntity Categorias)
        {
            try
            {
                return await new CategoriasData().controlCategorias(DatosToken, Opcion, Categorias);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
