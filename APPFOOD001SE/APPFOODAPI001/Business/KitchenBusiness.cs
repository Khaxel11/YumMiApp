using Data;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class KitchenBusiness
    {
        public async Task<Result> validateUsername(UserJwt DatosToken, string Username)
        {
            try
            {
                return await new KitchenData().validateUsername(DatosToken, Username);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getUserData(UserJwt DatosToken, int Opcion, string Username, string Password, int IdCuenta)
        {
            try
            {
                return await new KitchenData().getUserData(DatosToken, Opcion, Username, Password, IdCuenta);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getUbication(UserJwt DatosToken, int Opcion, int Id)
        {
            try
            {
                return await new KitchenData().getUbication(DatosToken, Opcion, Id);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getInfo(UserJwt DatosToken, int Opcion, string Filtro)
        {
            try
            {
                return await new KitchenData().getInfo(DatosToken, Opcion, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> insertKitchenUser(UserJwt DatosToken, UserDataEntity UserData)
        {
            try
            {
                return await new KitchenData().insertKitchenUser(DatosToken, UserData);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> registerNewUser(UserJwt DatosToken, string UserName, string Password, string Email)
        {
            try
            {
                return await new KitchenData().registerNewUser(DatosToken, UserName, Password, Email);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getNotification(UserJwt DatosToken, int IdCuenta)
        {
            try
            {
                return await new KitchenData().getNotification(DatosToken, IdCuenta);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getSliderMenu(UserJwt DatosToken)
        {
            try
            {
                return await new KitchenData().getSliderMenu(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
