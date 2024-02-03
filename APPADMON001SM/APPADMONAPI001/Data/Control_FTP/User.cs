using System;
using System.Data;
using System.Configuration;
using System.Web;
//using System.Web.Security;
//using System.Web.UI;
//using System.Web.UI.WebControls;
//using System.Web.UI.WebControls.WebParts;
//using System.Web.UI.HtmlControls;
using System.Collections.Generic;
namespace Data.Control_FTP
{
    /// <summary>
    /// Summary description for User
    /// </summary>
    public class User
    {
        private int userID;
        private string userName;
        private string password;
        private List<FTPFile> files;

        public List<FTPFile> Files
        {
            get { return files; }
            set { files = value; }
        }

        public string Password
        {
            get { return password; }
            set { password = value; }
        }

        public string UserNameFTP
        {
            get { return userName; }
            set { userName = value; }
        }

        public int UserID
        {
            get { return userID; }
            set { userID = value; }
        }

        public User()
        {
        }
    }
}
