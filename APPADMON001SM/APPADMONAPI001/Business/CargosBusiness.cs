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
    public class CargosBusiness
    {
        public async Task<Result> getCargos(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new CargosData().getCargos(DatosToken, Filtro); 
            }catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> controlCargos(TokenData DatosToken, int Opcion, CargosEntity Cargos)
        {
            try
            {
                return await new CargosData().controlCargos(DatosToken, Opcion, Cargos);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
