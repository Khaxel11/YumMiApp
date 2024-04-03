using Dapper;
using Entity;
using Entity.DTO;
using Entity.DTO.Common;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Threading.Tasks;


namespace Data
{
    public class KitchenData
    {
        private const string SP_ACCIONES_COCINERO = "APPFOOD001APSPA2";
        private const string SP_CONSULTAS_REGISTRO = "APPFOOD001APSPC3";
        private const string SP_CONSULTAS_INICIO = "APPFOOD001APSPC1";


        public async Task<Result> validateUsername(UserJwt DatosToken, string Username)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MessageEntity>(
                        SP_CONSULTAS_REGISTRO,
                        new
                        {
                            Opcion = 1,
                            NombreUsuario = Username
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                    
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> getUbication(UserJwt DatosToken, int Opcion, int Id)
        {
            Result objResult = new Result();
            try
            {
                
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_REGISTRO,
                        new
                        {
                            Opcion = Opcion,
                            Id = Id
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getMyUbication(UserJwt DatosToken, decimal Latitud, decimal Longitud)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_REGISTRO,
                        new
                        {
                            Opcion = 10,
                            Latitud = Latitud,
                            Longitud = Longitud
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        //OBTENER CUALQUIER TIPO DE DATO
        //10 = OBTENER BANCOS
        public async Task<Result> getInfo(UserJwt DatosToken, int Opcion, string Filtro)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_INICIO,
                        new
                        {
                            Opcion = Opcion,
                            Filtro = Filtro
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> getUserData(UserJwt DatosToken, int opcion, string UserName, string Password, int IdCuenta)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<UserRegister>(
                        SP_CONSULTAS_REGISTRO,
                        new
                        {
                            Opcion = opcion,
                            NombreUsuario = UserName,
                            Password = Password,
                            IdCuenta = IdCuenta
                        },
                    commandType: CommandType.StoredProcedure);

                    var resData = result;
                    if (result.Picture != null && result.Picture.Length > 0)
                    {
                        result.ProfilePic = Convert.ToBase64String(result.Picture);
                    }
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }

        public async Task<Result> registerNewUser(UserJwt DatosToken, string UserName, string Password, string Email)
        {
            Result objResult = new Result();
            try
            {
                ImageController img = new ImageController();
                CreateDataTable Ds = new CreateDataTable();
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MessageEntity>(
                        SP_ACCIONES_COCINERO,
                        new
                        {
                            Opcion = 1,
                            //Datos del Cocinero
                            NombreUsuario = UserName, 
                            Password = Password,
                            Correo = Email

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> insertKitchenUser(UserJwt DatosToken, UserDataEntity UserData)
        {
            Result objResult = new Result();
            try
            {
                ImageController img = new ImageController();
                CreateDataTable Ds = new CreateDataTable();

                byte[] byteArray = null;
                if (UserData.Photo != null)
                {
                    string suffixToFind = ";base64,";

                    int suffixIndex = UserData.Photo.LastIndexOf(suffixToFind, StringComparison.OrdinalIgnoreCase);

                    if (suffixIndex != -1)
                    {
                        UserData.Photo = UserData.Photo.Substring(suffixIndex + suffixToFind.Length);
                    }

                    byteArray = Convert.FromBase64String(UserData.Photo);
                }


                List<SocialMediaEntity> socialMedia = new List<SocialMediaEntity>();
                SocialMediaEntity social;
                if (UserData.SocialMedia != null)
                {
                    for (int i = 0; i < UserData.SocialMedia.Count; i++)
                    {
                        social = new SocialMediaEntity();
                        social.IdRedSocial = UserData.SocialMedia[i].IdSocialMedia;
                        social.NombreRedSocial = UserData.SocialMedia[i].SocialMediaName;
                        social.NombreNumeroRedSocial = UserData.SocialMedia[i].SocialMediaUserName;
                        social.URL = UserData.SocialMedia[i].SocialMediaURL;
                        social.Comentarios = "";
                        socialMedia.Add(social);
                    }
                }


                DateTime fechaHora =  DateTime.ParseExact(UserData.BirthDate, "yyyy-MM-ddTHH:mm:ss.fffzzz", System.Globalization.CultureInfo.InvariantCulture);
                UserData.BirthDate = fechaHora.ToString("yyyyMMdd");
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_ACCIONES_COCINERO,
                        new
                        {
                            Opcion = 2,
                            //Datos del Cocinero
                            IdUsuario = UserData.IdCuenta,
                            NombreCocinero = UserData.Name,
                            ApellidoPaterno = UserData.LastName,
                            ApellidoMaterno = UserData.LastNameSecondary,
                            Genero = UserData.Gender,
                            FechaNacimiento = UserData.BirthDate,
                            ConRedesSociales = UserData.HasSocialMedia,
                            ConVehiculo = UserData.HasVehicle,
                            //Datos de Redes Sociales
                            APPFOODCAT006TD001 = Ds.CreateTable(socialMedia).AsTableValuedParameter("APPFOODCAT006TD001"),
                            //Datos de sesion
                            NombreUsuario = UserData.UserName,
                            Password = UserData.Password,
                            Correo = UserData.Email,
                            Foto = byteArray,//img.getImageBytes(UserData.Photo),
                            //Datos del Establecimiento
                            NombreEstablecimiento = UserData.BussinessName,
                            TipoNegocio = UserData.BussinessType,
                            NumeroTel = UserData.Cellphone,
                            Calle = UserData.Street,
                            EntreCalles = UserData.BetweenStreets == null? "":UserData.BetweenStreets,
                            Comentarios = UserData.Description,
                            Colonia = UserData.Neighborhood,
                            Ciudad = UserData.City,
                            Municipio = UserData.Municipality == null ? "" : UserData.Municipality,
                            IdEstado = UserData.IdState,
                            Pais = UserData.Country,
                            CodigoPostal = UserData.ZipCode,
                            Numero = UserData.No,
                            ServicioDomicilio = UserData.HomeService,
                            //Datos del vehiculo
                            TipoVehiculo = UserData.VehicleType,
                            DescripcionVeh = UserData.DescriptionVehicle == null ? "" : UserData.DescriptionVehicle,
                            /*Marca = UserData.Brand,
                            Modelo = UserData.Model,
                            Placas = UserData.Plate,
                            Color = UserData.Color,
                            Anio = UserData.Year*/

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<MessageEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getNotification(UserJwt DatosToken, int IdCuenta)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_INICIO,
                        new
                        {
                            Opcion = 1,
                            IdCuenta = IdCuenta
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Notifications>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getSliderMenu(UserJwt DatosToken)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_INICIO,
                        new
                        {
                            Opcion = 2
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<Object>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }


        public async Task<Result> saveCard(UserJwt DatosToken, int Opcion, int IdCuenta, TarjetaBancariaEntity card)
        {
            Result objResult = new Result();
            try
            {
                
                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QuerySingleAsync<MessageEntity>(
                        SP_ACCIONES_COCINERO,
                        new
                        {
                            Opcion = Opcion == 1? 5 : Opcion == 2 ?  6 : Opcion,
                            IdUsuario = IdCuenta,
                            NombreTitular = card.NombreTitular,
                            NumeroCta = card.NumeroCta,
                            IdBanco = card.IdBanco,
                            ProveedorTarjeta = card.ProveedorTarjeta,
                            IdImagen = card.IdImagen,
                            CLABE = card.CLABE,
                            IdTarjeta = card.IdCuentaBancaria

                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = result;
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
        public async Task<Result> getCards(UserJwt DatosToken)
        {
            Result objResult = new Result();
            try
            {

                using (var con = new SqlConnection(DatosToken.Conection))
                {
                    var result = await con.QueryMultipleAsync(
                        SP_CONSULTAS_INICIO,
                        new
                        {
                            Opcion = 9,
                            IdCuenta = DatosToken.IdCuenta
                        },
                    commandType: CommandType.StoredProcedure);
                    objResult.data = await result.ReadAsync<TarjetaBancariaEntity>();
                }
                return objResult;
            }
            catch (Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
        }
    }
}
