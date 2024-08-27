using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class IngredientsBusiness
    {
        /*
        * Author:      Manuel de Jesus Valenzuela Gracian
        * Date:        27Ago2024
        * Descripción: Métodos para ABC de ingrendientes ("CRUD" = CREATE, READ, UPDATE AND DELETE)S
        */

        public async Task<Result> getIngredients(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new IngredientsData().getIngredients(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlIngredients(TokenData DatosToken, int Opcion, IngredientsEntity model)
        {
            try
            {
                return await new IngredientsData().controlIngredients(DatosToken, Opcion, model);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

    }
}
