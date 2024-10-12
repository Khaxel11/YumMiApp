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
    public class RegisterBusiness
    {
        public async Task<Result> verifyCode(UserJwt DatosToken, string code, string Ext, string Num, string Correo, string Usuario)
        {
            try
            {
                return await new RegisterData().verifyCode(DatosToken, code ,Ext, Num, Correo, Usuario);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> registerUser(UserJwt DatosToken, UserData user)
        {
            try
            {
                return await new RegisterData().registerUser(DatosToken, user);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
