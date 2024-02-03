namespace Entity.DTO.Common
{
    public class Result
    {
        public object data { get; set; }
        public int totalRecords { get; set; }
        public bool Correcto { get; set; }
        public string Mensaje { get; set; }
        public int IdMovimiento { get; set; }
        public string Agent { get; set; } //Axel Aguilar 12/09/2023 Se agrega para recuperar algun dato extra que se necesite en el proyecto de bancos
        public object Route { get; set; } //Axel Aguilar 10/08/2023 Se agrega para recuperar una ruta
    }
}
