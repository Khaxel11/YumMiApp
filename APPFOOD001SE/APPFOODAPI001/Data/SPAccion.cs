using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
    public enum SPAccion
    {

        //SELECT  100-199
        ListaDefinicion = 100,
        SeleccionarModelo = 101,
        Existe = 102,
        Listar = 103,
        ListarEspecifico = 104,

        //INSERT  200-299
        Agregar = 200,

        //UPDATE  300-399
        Editar = 300,
        EditarLista = 301,
        EditarDesactivar = 301,


        //DELETE  400-499
        Eliminar = 400,
        EliminarLista = 401,

        //PROCESO 500-599
        Proceso = 500,
    }
}
