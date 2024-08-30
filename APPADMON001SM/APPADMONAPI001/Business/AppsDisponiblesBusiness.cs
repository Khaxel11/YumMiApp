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
    public class AppsDisponiblesBusiness
    {
        #region Get Orden
        public async Task<Result> getSistemas(TokenData DatosToken)
        {
            try
            {
                return await new AppsDisponiblesData().getSistemas(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getEncabezados(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new AppsDisponiblesData().getEncabezados(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getAplicaciones(TokenData DatosToken, string Filtro)
        {
            try
            {
                return await new AppsDisponiblesData().getAplicaciones(DatosToken, Filtro);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        #endregion

        #region Administra
        public async Task<Result> AdministraEncabezado(TokenData DatosToken, int Opcion, EncabezadosEntity Encabezados)
        {
            try
            {
                return await new AppsDisponiblesData().AdministraEncabezado(DatosToken, Opcion, Encabezados);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> AdministraAplicaciones(TokenData DatosToken, int Opcion, AppsDisponiblesEntity Aplicaciones)
        {
            try
            {
                return await new AppsDisponiblesData().AdministraAplicaciones(DatosToken, Opcion, Aplicaciones);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        #endregion

        #region Update Orden
        public async Task<Result> UpdateOrdenEncabezados(TokenData DatosToken, DatosOrden Aplicaciones)
        {
            try
            {
                return await new AppsDisponiblesData().UpdateOrdenEncabezados(DatosToken, Aplicaciones);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> UpdateOrdenAplicaciones(TokenData DatosToken, DatosOrden Aplicaciones)
        {
            try
            {
                return await new AppsDisponiblesData().UpdateOrdenAplicaciones(DatosToken, Aplicaciones);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        #endregion


    }
}
