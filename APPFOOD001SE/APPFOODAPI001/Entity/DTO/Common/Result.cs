namespace Entity.DTO.Common
{
    public class Result
    {
        public object data { get; set; }
        public object data2 { get; set; }
        public int totalRecords { get; set; }
        public bool Correcto { get; set; }
        public string Mensaje { get; set; }
        public int IdMovimiento { get; set; }
    }
}
