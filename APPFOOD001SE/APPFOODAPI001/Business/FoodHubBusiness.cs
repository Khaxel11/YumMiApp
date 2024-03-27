using Data;
using Entity.DTO.Common;
using Entity.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Business
{
    public class FoodHubBusiness
    {
        public async Task<Result> getFoodHubs(UserJwt DatosToken, int IdEstado, string Filtro, int IdCuenta)
        {
            try
            {
                return await new FoodHubData().getFoodHubs(DatosToken, IdEstado, Filtro, IdCuenta);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getCalificaciones(UserJwt DatosToken, int IdFoodHub)
        {
            try
            {
                return await new FoodHubData().getCalificaciones(DatosToken, IdFoodHub);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> asignFoodhub(UserJwt DatosToken, int Opcion, int IdCuenta, int IdFoodHub, bool Predeterminado, int IdAsignado)
        {
            try
            {
                return await new FoodHubData().asignFoodhub(DatosToken, Opcion, IdCuenta, IdFoodHub, Predeterminado, IdAsignado);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getMyFoodHubs(UserJwt DatosToken, int IdEstado, int IdCuenta)
        {
            try
            {
                return await new FoodHubData().getMyFoodHubs(DatosToken, IdEstado, IdCuenta );
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
