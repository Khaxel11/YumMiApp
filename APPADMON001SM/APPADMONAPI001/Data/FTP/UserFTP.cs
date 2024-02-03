using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Configuration;
using System.Web;
//using System.Web.Security;
//using System.Web.UI;
//using System.Web.UI.WebControls;
//using System.Web.UI.WebControls.WebParts;
//using System.Web.UI.HtmlControls;
using System.IO.Compression;

namespace Data.FTP
{
    /// <summary>
    /// Summary description for User
    /// </summary>
    public class UserFTP
    {
        private string remoteHostFTP;
        private string folderFTP;
        private string userNameFTP;
        private string passwordFTP;
        private int portFTP;
        private string userSQLFTP;
        private string pswSQLFTP;
        private string serverSQLFTP;
        private List<FTPFile> files;

        private string baseDatos;
        private string zonaFTP;
        private string sP_Lectura;
        private string sP_Escritura;
        private int opcionGuardar;
        private int opcionEliminar;
        private int opcionActualizar;
        private int opcionBuscarArchivosFTP;
        private int opcionBuscarArchivoExistente;
        private int opcionBuscarCarpeta;
        private string carpeta;

        public List<FTPFile> Files
        {
            get { return files; }
            set { files = value; }
        }

        public string RemoteHostFTP
        {
            get { return remoteHostFTP; }
            set { remoteHostFTP = value; }
        }

        public string FolderFTP
        {
            get { return folderFTP; }
            set { folderFTP = value; }
        }

        public string PasswordFTP
        {
            get { return passwordFTP; }
            set { passwordFTP = value; }
        }

        public string UserNameFTP
        {
            get { return userNameFTP; }
            set { userNameFTP = value; }
        }

        public int PortFTP
        {
            get { return portFTP; }
            set { portFTP = value; }
        }

        public string BaseDatos
        {
            get { return baseDatos; }
            set { baseDatos = value; }
        }

        public string ZonaFTP
        {
            get { return zonaFTP; }
            set { zonaFTP = value; }
        }

        public string UserSQLFTP
        {
            get { return userSQLFTP; }
            set { userSQLFTP = value; }
        }
        public string PswSQLFTP
        {
            get { return pswSQLFTP; }
            set { pswSQLFTP = value; }
        }

        public string ServerSQLFTP
        {
            get { return serverSQLFTP; }
            set { serverSQLFTP = value; }
        }


        public string SP_Lectura
        {
            get { return sP_Lectura; }
            set { sP_Lectura = value; }
        }

        public string SP_Escritura
        {
            get { return sP_Escritura; }
            set { sP_Escritura = value; }
        }

        public int OpcionGuardar
        {
            get { return opcionGuardar; }
            set { opcionGuardar = value; }
        }

        public int OpcionEliminar
        {
            get { return opcionEliminar; }
            set { opcionEliminar = value; }
        }

        public int OpcionActualizar
        {
            get { return opcionActualizar; }
            set { opcionActualizar = value; }
        }

        public int OpcionBuscarArchivosFTP
        {
            get { return opcionBuscarArchivosFTP; }
            set { opcionBuscarArchivosFTP = value; }
        }

        public int OpcionBuscarArchivoExistente
        {
            get { return opcionBuscarArchivoExistente; }
            set { opcionBuscarArchivoExistente = value; }
        }

        public string Carpeta
        {
            get { return carpeta; }
            set { carpeta = value; }
        }

        public int OpcionBuscarCarpeta
        {
            get { return opcionBuscarCarpeta; }
            set { opcionBuscarCarpeta = value; }
        }

        public UserFTP()
        {
        }
    }
}
