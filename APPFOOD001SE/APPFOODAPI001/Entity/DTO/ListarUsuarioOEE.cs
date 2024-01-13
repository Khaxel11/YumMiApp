namespace Entity.DTO
{
    public class ListarUsuarioOEE
    {
        public int Id { get; set; }
        public string UsuarioId { get; set; }
        public string UsuarioNombre { get; set; }
        public bool Estatus { get; set; }
        public string EstatusDesc { get; set; }
    }
}
