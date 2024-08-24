using Data;
using Entity;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class CatPersonalBusiness
    {
        #region CONSULTAS
        public async Task<Result> getTpoCargo(TokenData DatosToken)
        {
            try
            {
                return await new CatPersonalData().getTpoCargo(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getTpoUsuario(TokenData DatosToken)
        {
            try
            {
                return await new CatPersonalData().getTpoUsuario(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getPaises(TokenData DatosToken)
        {
            try
            {
                return await new CatPersonalData().getPaises(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getEstados(TokenData DatosToken, int idpais)
        {
            try
            {
                return await new CatPersonalData().getEstados(DatosToken, idpais);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getMunicipios(TokenData DatosToken, int idestado)
        {
            try
            {
                return await new CatPersonalData().getMunicipios(DatosToken, idestado);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getUsuarios(TokenData DatosToken, string usuario)
        {
            try
            {
                return await new CatPersonalData().getUsuarios(DatosToken, usuario);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        #endregion

        #region ACCIONES (GUARDAR - EDITAR - ELIMINAR)
        public async Task<Result> Guardar(TokenData DatosToken, CatPersonalEntity dts)
        {
            try
            {
                return await new CatPersonalData().GuardarUsuario(DatosToken, dts);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Editar(TokenData DatosToken, CatPersonalEntity dts)
        {
            try
            {
                return await new CatPersonalData().EditarUsuario(DatosToken, dts);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> Eliminar(TokenData DatosToken, CatPersonalEntity dts)
        {
            try
            {
                return await new CatPersonalData().EliminarUsuario(DatosToken, dts);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        #endregion
    }
}
