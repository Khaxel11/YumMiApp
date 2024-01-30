using System;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public class Connection
    {
        //Data Source=172.16.2.28;Initial Catalog=ProcAppDelivery;User id=sa;Password=desarrollo2008
        public Connection() {
            //this.IP = "172.16.2.28";
            this.IP = "DESKTOP-IUJCE2C\\SQLEXPRESS";
            this.Catalog = "ProcAppDelivery";
            this.user = "sa";
            this.password = "desarrollo2008";
        }
        private string IP { get; set; }
        private string user { get; set; }
        private string password { get; set; }
        private string Catalog { get; set; }
        private string stringConection { get; set; }
        public string conect()
        {
            //stringConection = "Data Source=" + IP + ";Initial Catalog=" + Catalog + ";User id=" + user + ";Password=" + password;

            stringConection = "Data Source=" + IP + ";Initial Catalog=" + Catalog + ";Trusted_Connection=True;";// ";User id=" + user + ";Password=" + password;
            return stringConection;
        }
    }
}
