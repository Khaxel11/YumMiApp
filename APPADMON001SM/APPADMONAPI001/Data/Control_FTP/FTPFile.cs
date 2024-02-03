using System;
using System.Data;
using System.Configuration;
using System.Web;
//using System.Web.Security;
//using System.Web.UI;
//using System.Web.UI.WebControls;
//using System.Web.UI.WebControls.WebParts;
//using System.Web.UI.HtmlControls;


namespace Data.Control_FTP
{
    /// <summary>
    /// Summary description for FTPFile
    /// </summary>
    public class FTPFile
    {
        private int fileID;
        private string fileName;

        public string FileName
        {
            get { return fileName; }
            set { fileName = value; }
        }

        public int FileID
        {
            get { return fileID; }
            set { fileID = value; }
        }

        public FTPFile()
        {
            //
            // TODO: Add constructor logic here
            //
        }
    }
}