namespace Entity.DTO.Common
{
    public class AppSettings
    {
        public string Conexion { get; set; }
        public string Conexion2 { get; set; }
        public string Secret { get; set; }
        public string JwtIssuer { get; set; }
        public int JwtExpireDays { get; set; }
    }
}
