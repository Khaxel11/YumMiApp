using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class UserDataEntity
    {
        // User business
        public int IdCuenta { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string LastNameSecondary { get; set; }
        public string Gender { get; set; }
        public string BirthDate { get; set; }
        public bool HasSocialMedia { get; set; }
        public bool HasVehicle { get; set; }

        //SOCIAL MEDIA
        public List<SocialMedia> SocialMedia { get; set; }

        //SESSION DATA
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public byte[] Picture { get; set; }

        // Data business
        public string BussinessName { get; set; }
        public string BussinessType { get; set; }
        public string Cellphone { get; set; }
        public string Street { get; set; }
        public string BetweenStreets { get; set; }
        public string Description { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string Municipality { get; set; }
        public int IdState { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string No { get; set; }
        public bool HomeService { get; set; }
        // Data vehicle
        public int VehicleType { get; set; }
        public string DescriptionVehicle { get; set; }  
        /*public string Brand { get; set; }
        public string Model { get; set; }
        public string Plate { get; set; }
        public string Color { get; set; }
        public int Year { get; set; }*/
        
    }
    public class SocialMedia
    {
        public int IdUserSocialMedia { get; set; }
        public int IdSocialMedia { get; set; }
        public string SocialMediaUserName { get; set; }
        public string SocialMediaName { get; set; }
        public bool IsActive { get; set; }
        public string SocialMediaURL { get; set; }
    }
    
    public class UserRegister
    {
        public bool IsLoged { get; set; }
        public int IdCuenta { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public byte[] Picture { get; set; }
        public string ProfilePic { get; set; }
        public object Value {  get; set; }
    }
    public class KitchenInfo
    {
        public int IdCocinero { get; set; }
        public string NombreCocinero { get; set; }
        public string ApellidoPaterno { get; set; }
        public string ApellidoMaterno { get; set; }
        public string NombreCompleto { get; set; }
        public string Genero { get; set; }
        public bool RedesSocialesConfig { get; set; }
        public bool HubConfigurado { get; set; }
        public bool BancoConfig { get; set; }
        public int IdEstablecimiento { get; set; }
        public string CveEstablecimiento { get; set; }
        public string NombreEstablecimiento { get; set; }
        public string TipoNegocio { get; set; }
        public string NumTelefono { get; set; }
        public string Calle { get; set; }
        public string EntreCalles { get; set; }
        public string Comentarios { get; set; }
        public string Colonia { get; set; }
        public string Ciudad { get; set; }
        public int IdEstado { get; set; }
        public string Pais { get; set; }
        public string CP { get; set; }
        public string Numero { get; set; }
        public string TipoVehiculo { get; set; }
        public string Calificacion { get; set; }
        public string Correo { get; set; }
        public string NombrePais { get; set; }
        public string NombreEstado { get; set; }
        public string NombreMunicipio { get; set; }
        public string UbicacionCompleta { get; set; }
    }
}
