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
    public class ProgramationBusiness
    {
        public async Task<Result> programProduct(UserJwt DatosToken, int Opcion, int IdCuenta, ProgramacionEntity Programacion)
        {
            try
            {
                return await new ProgramationData().programProduct(DatosToken, Opcion, IdCuenta, Programacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getFechasProgramadas(UserJwt DatosToken, int TipoFiltro,
            string Fecha, int idFoodHub, int idEstado, int IdCuenta, int IdProducto,
            int IdCategoria, int IdTipoAlimentacion)
        {
            try
            {
                return await new ProgramationData().getFechasProgramadas(DatosToken, TipoFiltro, Fecha, idFoodHub, idEstado,
                    IdCuenta, IdProducto, IdCategoria, IdTipoAlimentacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> confirmFecha(UserJwt DatosToken, int IdFechaProgramada, int IdProgramacion)
        {
            try
            {
                return await new ProgramationData().confirmFecha(DatosToken, IdFechaProgramada, IdProgramacion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
