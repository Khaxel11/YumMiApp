using Data;
using Entity.DTO.Common;
using Entity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class OpcMenuCargoBusiness
    {
        public async Task<Result> getOpcMenuCargo(TokenData DatosToken)
        {
            try
            {
                return await new OpcMenuCargoData().getOpcMenuCargo(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOpcPorCargo(TokenData DatosToken, int IdCargo)
        {
            try
            {
                return await new OpcMenuCargoData().getOpcPorCargo(DatosToken, IdCargo);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getOpciones(TokenData DatosToken)
        {
            try
            {
                return await new OpcMenuCargoData().getOpciones(DatosToken);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> postGuardarOpciones(TokenData DatosToken, int IdCargo, opcionesType[] Opciones)
        {
            try
            {
                return await new OpcMenuCargoData().postGuardarOpciones(DatosToken, IdCargo, Opciones);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> eliminarOpciones(TokenData DatosToken, int IdCargo, int IdOpcion, int Opcion)
        {
            try
            {
                return await new OpcMenuCargoData().eliminarOpciones(DatosToken, IdCargo, IdOpcion, Opcion);
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


    }
}
