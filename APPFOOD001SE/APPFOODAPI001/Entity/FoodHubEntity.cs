using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class FoodHubEntity
    {
        public int IdHubCuenta { get; set; }
        public int IdFoodHub { get; set; }
        public string ClaveFoodHub { get; set; }
        public byte[] Foto { get; set; }
        public string NombreHub { get; set; }
        public string Calle { get; set; }
        public string EntreCalles { get; set; }
        public string Colonia { get; set; }
        public string Comentarios { get; set; }
        public string Ciudad { get; set; }
        public string Municipio { get; set; }
        public int IdEstado { get; set; }
        public string NombreEstado { get; set; }
        public string Pais { get; set; }
        public string CodigoPostal { get; set; }
        public string Numero { get; set; }
        public decimal Calificacion { get; set; }
        public bool TieneServicioDomicilio { get; set; }
        public bool HorarioConfigurado { get; set; }
        public bool ServicioDomicilioConfigurado { get; set; }
        public bool Abierto { get; set; }
        public string Coordenadas { get; set; }
        public decimal Latitud { get; set; }
        public decimal Longitud { get; set; }
        public string ClaveContacto { get; set; }
        public string Contacto { get; set; }
        public string TelefonoContacto { get; set; }
        public string Picture { get; set; }
        public bool Asignado { get; set; }
        public int IdAsignado { get; set; } 
        public string HoraApertura { get; set; }
        public string HoraCierre { get; set; }
        public bool EsHorarioEspecial { get; set; }
        public string ComentariosHorario { get; set; }
        public string EstadoHorario { get; set; }
        public int CalificacionesTotales { get; set; }
    }
    public class CalificacionesFoodHub
    {
        public int IdCalificacion { get; set; }
        public int IdCuenta { get; set; }
        public byte[] Foto { get; set; }
        public string NombreUsuario { get; set; }
        public int Calificacion { get; set; }
        public string Comentarios { get; set; }
        public int Votos { get; set; }
        public string FechaCalificacion { get; set; }
        public string NombreHub { get; set; }
        public int IdFoodHub { get; set; }
        public string FotoBase { get; set; }
    }
}
