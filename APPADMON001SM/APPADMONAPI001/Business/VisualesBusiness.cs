using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class VisualesBusiness
    {
        /*
        * Author:      Manuel de Jesus Valenzuela Gracian
        * Date:        29Ago2024
        * Descripción: Métodos catalogo de VISUALES
        */

        public async Task<Result> getAplicaciones(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new VisualesData().getAplicaciones(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getCatProductos(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new VisualesData().getCatProductos(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getVisuales(TokenData DatosToken, string Filtro, int idSistema, bool programadas)
        {
            try
            {
                return await new VisualesData().getVisuales(DatosToken, Filtro, idSistema, programadas);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> controlVisuales(TokenData DatosToken, int Opcion, VisualesEntity model)
        {
            try
            {
                return await new VisualesData().controlVisuales(DatosToken, Opcion, model);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
