using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class RestricionAlimentacionBusiness
    {

        /*
       * Author:      Manuel de Jesus Valenzuela Gracian
       * Date:        03Sep2024
       * Descripción: Métodos para ABC de ingrendientes ("CRUD" = CREATE, READ, UPDATE AND DELETE)S
       */

        public async Task<Result> getTiposAlimentacionCbo(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new RestricionAlimentacionData().getTiposAlimentacionCbo(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getRestriccionesConTotalIngredientes(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new RestricionAlimentacionData().getRestriccionesConTotalIngredientes(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getIngredientes(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new RestricionAlimentacionData().getIngredientes(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getRestriciones(TokenData DatosToken, int id, int opc)
        {
            try
            {
                return await new RestricionAlimentacionData().getRestriciones(DatosToken, id, opc);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlRestriccionIngredients(TokenData DatosToken, List<RestricionAlimentacion_IngredientesEntity> lst, int opc, int id)
        {
            try
            {
                return await new RestricionAlimentacionData().controlRestriccionIngredients(DatosToken, lst, opc, id);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> eliminarIngrediente(TokenData DatosToken, int idTipoAlim, int idIngre, int idRestri)
        {
            try
            {
                return await new RestricionAlimentacionData().eliminarIngrediente(DatosToken, idTipoAlim, idIngre, idRestri);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> eliminarRestriccion(TokenData DatosToken, int idTipoAlim)
        {
            try
            {
                return await new RestricionAlimentacionData().eliminarRestriccion(DatosToken, idTipoAlim);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
