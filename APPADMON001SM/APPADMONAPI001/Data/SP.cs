
namespace Data
{
    public class SP
    {
        private static readonly string PROCESO = "FCA";
        private static readonly string SUBPROCESO = "INGE";
        private static readonly string SUFIJOCONSULTA = "SPC";
        private static readonly string SUFIJOACTUALIZA = "SPA";

        public static string USUARIOOEESPC = PROCESO + SUBPROCESO + "UsuarioOEE" + SUFIJOCONSULTA + "001";
        public static string USUARIOOEESPA = PROCESO + SUBPROCESO + "UsuarioOEE" + SUFIJOACTUALIZA + "002";
        public static string SUPERVISORESSPA = $"{PROCESO}{SUBPROCESO}CAT002{SUFIJOCONSULTA}";
        public static string TRIPULACIONESSPA = $"{PROCESO}{SUBPROCESO}CAT004{SUFIJOCONSULTA}";

    }
}
