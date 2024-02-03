using System;
using System.Net;
using System.IO;
using System.Text;
using System.Net.Sockets;

namespace Data.Control_FTP
{
    public class FTPClient
    {

        private string
            remoteHost, remotePath, remoteUser, remotePass, mes;
        private int remotePort, bytes;
        private Socket clientSocket;

        private int retValue;
        private Boolean debug;
        private Boolean logined;
        private string reply;

        private static int BLOCK_SIZE = 512;

        Byte[] buffer = new Byte[BLOCK_SIZE];
        Encoding ASCII = Encoding.ASCII;


        ///<summary>
        ///Creates a FTPClient object. 
        ///</summary>
        public FTPClient()
        {
            debug = false;
            logined = false;

        }


        /// <summary>
        /// Get / Set the remote host name 
        /// </summary>

        public string RemoteHost
        {
            get { return remoteHost; }
            set { remoteHost = value; }
        }

        /// <summary>
        /// Get / set the remote port 
        /// </summary>
        public int RemotePort
        {
            get { return remotePort; }
            set { remotePort = value; }
        }

        /// <summary>
        /// Get / Set the remote path 
        /// </summary>
        public string RemotePath
        {
            get { return remotePath; }
            set { remotePath = value; }
        }

        /// <summary>
        /// Sets the username to log into the remote server with 
        /// </summary>
        public string UserName
        {
            get { return remoteUser; }
            set { remoteUser = value; }
        }

        /// <summary>
        /// Sets the password for logging into the remote server
        /// </summary>
        public string Password
        {
            get { return remotePass; }
            set { remotePass = value; }
        }


        /// <summary>
        /// Return a string array containing the remote directory's file list.
        /// </summary>
        /// <param name="mask">Search Pattern</param>
        /// <param name="longDirListing">Sends LIST insted of NLST</param>
        /// <returns>String array of files / directories</returns>
        public string[] GetFileList(string mask, bool longDirListing)
        {
            if (!logined)
            {
                Login();
            }

            Socket cSocket = createDataSocket();

            if (!longDirListing)
                sendCommand("NLST " + mask);
            else
                sendCommand("LIST " + mask);

            if (!(retValue == 150 || retValue == 125))
            {
                //throw new IOException(reply.Substring(4));
            }

            mes = "";

            while (true)
            {

                int bytes = cSocket.Receive(buffer, buffer.Length, 0);
                mes += ASCII.GetString(buffer, 0, bytes);

                if (bytes < buffer.Length)
                {
                    break;
                }
            }

            char[] seperator = { '\n' };
            mes = mes.Replace('\r', ' ');
            string[] mess = mes.Split(seperator);

            string[] files = new string[mess.Length - 1];

            for (int i = 0; i < mess.Length - 1; i++)
            {
                files[i] = mess[i].Trim();
            }

            cSocket.Close();

            //readReply();

            //if(retValue != 226)
            //{
            //    throw new IOException(reply.Substring(4));
            //}
            return files;

        }



        /// <summary>
        /// Return the size of a file.
        /// </summary>
        /// <param name="fileName">Name of remote file</param>
        /// <returns>Size of file in bytes</returns>
        public long GetFileSize(string fileName)
        {

            if (!logined)
            {
                Login();
            }

            sendCommand("SIZE " + fileName);
            long size = 0;

            if (retValue == 213)
            {
                size = Int64.Parse(reply.Substring(4));
            }
            else
            {
                throw new IOException(reply.Substring(4));
            }

            return size;

        }

        /// <summary>
        /// Login to the remote server.
        /// </summary>
        public void Login()
        {

            clientSocket = new
                Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            IPEndPoint ep = new
                IPEndPoint(Dns.Resolve(remoteHost).AddressList[0], remotePort);

            try
            {
                clientSocket.Connect(ep);
            }
            catch (Exception)
            {
                throw new IOException("Couldn't connect to remote server");
            }

            readReply();
            if (retValue != 220)
            {
                Close();
                throw new IOException(reply.Substring(4));
            }
            if (debug)
                Console.WriteLine("USER " + remoteUser);

            sendCommand("USER " + remoteUser);

            if (!(retValue == 331 || retValue == 230))
            {
                cleanup();
                throw new IOException(reply.Substring(4));
            }

            if (retValue != 230)
            {
                if (debug)
                    Console.WriteLine("PASS xxx");

                sendCommand("PASS " + remotePass);
                if (!(retValue == 230 || retValue == 202))
                {
                    cleanup();
                    throw new IOException(reply.Substring(4));
                }
            }

            logined = true;
            Console.WriteLine("Connected to " + remoteHost);

            Chdir(remotePath);

        }


        /// <summary>
        /// Sets transfer type 
        /// </summary>
        /// <param name="mode">True for binary transfres, false otherwise</param>
        public void SetBinaryMode(Boolean mode)
        {

            if (mode)
            {
                sendCommand("TYPE I");
            }
            else
            {
                sendCommand("TYPE A");
            }
            if (retValue != 200)
            {
                throw new IOException(reply.Substring(4));
            }
        }



        /// <summary>
        /// Download a file to the Assembly's local directory,
        /// keeping the same file name.
        /// </summary>
        /// <param name="remFileName">Remote file name</param>
        public void Download(string remFileName)
        {
            Download(remFileName, "", false);
        }


        /// <summary>
        /// Download a remote file to the Assembly's local 	directory,
        /// keeping the same file name, and set the resume flag.
        /// </summary>
        /// <param name="remFileName">Remote file name</param>
        /// <param name="resume">Resume</param>
        public void Download(string remFileName, Boolean resume)
        {
            Download(remFileName, "", resume);
        }


        /// <summary>
        /// Download a remote file to a local file name which can include
        /// a path. The local file name will be created or 	overwritten,
        /// but the path must exist.
        /// </summary>
        /// <param name="remFileName">Remote file name</param>
        /// <param name="locFileName">Local file name</param>
        public void Download(string remFileName, string locFileName)
        {
            Download(remFileName, locFileName, false);
        }


        /// <summary>
        /// Download a remote file to a local file name which can include
        /// a path, and set the resume flag. The local file name will 	be
        /// created or overwritten, but the path must exist.
        /// </summary>
        /// <param name="remFileName">Remote file name</param>
        /// <param name="locFileName">Local file name</param>
        /// <param name="resume">Resume flag</param>
        public void Download(string remFileName, string
            locFileName, Boolean resume)
        {
            if (!logined)
            {
                Login();
            }

            SetBinaryMode(true);

            Console.WriteLine("Downloading file " + remFileName + " from " + remoteHost + "/" + remotePath);

            if (locFileName.Equals(""))
            {
                locFileName = remFileName;
            }

            if (!File.Exists(locFileName))
            {
                Stream st = File.Create(locFileName);
                st.Close();
            }

            FileStream output = new
                FileStream(locFileName, FileMode.Open);

            Socket cSocket = createDataSocket();

            long offset = 0;

            if (resume)
            {

                offset = output.Length;

                if (offset > 0)
                {
                    sendCommand("REST " + offset);
                    if (retValue != 350)
                    {
                        //throw new IOException(reply.Substring(4));
                        //Some servers may not support resuming.
                        offset = 0;
                    }
                }

                if (offset > 0)
                {
                    if (debug)
                    {
                        Console.WriteLine("seeking to " + offset);
                    }
                    long npos = output.Seek(offset, SeekOrigin.Begin);
                    Console.WriteLine("new pos=" + npos);
                }
            }

            sendCommand("RETR " + remFileName);

            if (!(retValue == 150 || retValue == 125))
            {
                //    throw new IOException(reply.Substring(4));
            }

            while (true)
            {

                bytes = cSocket.Receive(buffer, buffer.Length, 0);
                output.Write(buffer, 0, bytes);

                if (bytes <= 0)
                {
                    break;
                }
            }

            output.Close();
            if (cSocket.Connected)
            {
                cSocket.Close();
            }

            Console.WriteLine("");

            //	readReply();

            if (!(retValue == 226 || retValue == 250))
            {
                //		throw new IOException(reply.Substring(4));
            }

        }

        /// <summary>
        /// Upload a file.
        /// </summary>
        /// <param name="fileName">Local file name</param>
        public void Upload(string fileName)
        {
            Upload(fileName, false);
        }

        /// <summary>
        /// Upload a file and set the resume flag.
        /// </summary>
        /// <param name="fileName">Local file name</param>
        /// <param name="resume">Resume flag</param>
        public void Upload(string fileName, Boolean resume)
        {

            if (!logined)
            {
                Login();
            }

            Socket cSocket = createDataSocket();
            long offset = 0;

            if (resume)
            {

                try
                {

                    SetBinaryMode(true);
                    offset = GetFileSize(fileName);

                }
                catch (Exception)
                {
                    offset = 0;
                }
            }

            if (offset > 0)
            {
                sendCommand("REST " + offset);
                if (retValue != 350)
                {
                    //throw new IOException(reply.Substring(4));
                    //Remote server may not support resuming.
                    offset = 0;
                }
            }

            sendCommand("STOR " + Path.GetFileName(fileName));

            if (!(retValue == 125 || retValue == 150))
            {
                throw new IOException(reply.Substring(4));
            }

            // open input stream to read source file
            FileStream input = new
                FileStream(fileName, FileMode.Open);

            if (offset != 0)
            {
                if (debug)
                {
                    Console.WriteLine("seeking to " + offset);
                }
                input.Seek(offset, SeekOrigin.Begin);
            }

            Console.WriteLine("Uploading file " + fileName + " to " + remotePath);

            while ((bytes = input.Read(buffer, 0, buffer.Length)) > 0)
            {

                cSocket.Send(buffer, bytes, 0);

            }
            input.Close();

            Console.WriteLine("");

            if (cSocket.Connected)
            {
                cSocket.Close();
            }

            readReply();
            if (!(retValue == 226 || retValue == 250))
            {
                throw new IOException(reply.Substring(4));
            }
        }



        /// <summary>
        /// Delete a file from the remote FTP server.
        /// </summary>
        /// <param name="fileName">Remote file to delete</param>
        public void DeleteRemoteFile(string fileName)
        {

            if (!logined)
            {
                Login();
            }

            sendCommand("DELE " + fileName);

            if (retValue != 250)
            {
                throw new IOException(reply.Substring(4));
            }

        }


        /// <summary>
        /// Rename a file on the remote FTP server.
        /// </summary>
        /// <param name="oldFileName">Old file name</param>
        /// <param name="newFileName">New file name</param>
        public void RenameRemoteFile(string oldFileName, string
            newFileName)
        {

            if (!logined)
            {
                Login();
            }

            sendCommand("RNFR " + oldFileName);

            if (retValue != 350)
            {
                throw new IOException(reply.Substring(4));
            }

            //  known problem
            //  rnto will not take care of existing file.
            //  i.e. It will overwrite if newFileName exist
            sendCommand("RNTO " + newFileName);
            if (retValue != 250)
            {
                throw new IOException(reply.Substring(4));
            }

        }


        /// <summary>
        /// Create a directory on the remote FTP server.
        /// </summary>
        /// <param name="dirName">Directory name</param>
        public void Mkdir(string dirName)
        {

            if (!logined)
            {
                Login();
            }

            sendCommand("MKD " + dirName);

            if (retValue != 257)
            {
                throw new IOException(reply.Substring(4));
            }

        }

        /// <summary>
        /// Delete a directory on the remote FTP server.
        /// </summary>
        /// <param name="dirName">Directory name</param>
        public void Rmdir(string dirName)
        {

            if (!logined)
            {
                Login();
            }

            sendCommand("RMD " + dirName);

            if (retValue != 250)
            {
                throw new IOException(reply.Substring(4));
            }

        }


        /// <summary>
        /// Change the current working directory on the remote FTP server.
        /// </summary>
        /// <param name="dirName">Directory to change to</param>
        public void Chdir(string dirName)
        {

            if (dirName.Equals("."))
            {
                return;
            }

            if (!logined)
            {
                Login();
            }

            sendCommand("CWD " + dirName);
            /*
            if(retValue != 250)
            {
                throw new IOException(reply.Substring(4));
            }
            */
            this.remotePath = dirName;

            Console.WriteLine("Current directory is " + remotePath);

        }


        /// <summary>
        /// Close the FTP connection.
        /// </summary>
        public void Close()
        {

            if (clientSocket != null)
            {
                sendCommand("QUIT");
            }

            cleanup();
            Console.WriteLine("Closing...");
        }


        /// <summary>
        /// Set debug mode. In debug mode, the entire FTP 
        /// session will be written to standard output
        /// </summary>
        public bool Debug
        {
            set { debug = value; }
            get { return debug; }
        }

        ///<summary>
        /// Causes the client to read from the server.
        /// This mehod is public to allow for derived classes.</summary>
        public void readReply()
        {
            mes = "";
            reply = readLine();
            retValue = Int32.Parse(reply.Substring(0, 3));
        }

        private void cleanup()
        {
            if (clientSocket != null)
            {
                clientSocket.Close();
                clientSocket = null;
            }
            logined = false;
        }

        private string readLine()
        {

            while (true)
            {
                bytes = clientSocket.Receive(buffer, buffer.Length, 0);
                mes += ASCII.GetString(buffer, 0, bytes);
                if (bytes < buffer.Length)
                {
                    break;
                }
            }

            char[] seperator = { '\n' };
            string[] mess = mes.Split(seperator);

            if (mes.Length > 2)
            {
                mes = mess[mess.Length - 2];
            }
            else
            {
                mes = mess[0];
            }

            if (!mes.Substring(3, 1).Equals(" "))
            {
                return readLine();
            }

            if (debug)
            {
                for (int k = 0; k < mess.Length - 1; k++)
                {
                    Console.WriteLine(mess[k]);
                }
            }
            return mes;
        }


        ///<summary>
        /// Sends a command to the FTP server.
        /// The commands sent to the server with this \
        /// method must be protocol-level commands (i.e. NLST,
        /// LIST,CWD), not FTP appplication commands.
        /// This method is public so that FTPClient can be derived
        /// from.
        /// </summary>
        public void sendCommand(String command)
        {

            Byte[] cmdBytes =
                Encoding.ASCII.GetBytes((command + "\r\n").ToCharArray());
            clientSocket.Send(cmdBytes, cmdBytes.Length, 0);
            readReply();
        }

        private Socket createDataSocket()
        {

            sendCommand("PASV");

            if (retValue != 227)
            {
                throw new IOException(reply.Substring(4));
            }

            int index1 = reply.IndexOf('(');
            int index2 = reply.IndexOf(')');
            string ipData =
                reply.Substring(index1 + 1, index2 - index1 - 1);
            int[] parts = new int[6];

            int len = ipData.Length;
            int partCount = 0;
            string buf = "";

            for (int i = 0; i < len && partCount <= 6; i++)
            {

                char ch = Char.Parse(ipData.Substring(i, 1));
                if (Char.IsDigit(ch))
                    buf += ch;
                else if (ch != ',')
                {
                    throw new IOException("Malformed PASV reply: " +
                        reply);
                }

                if (ch == ',' || i + 1 == len)
                {

                    try
                    {
                        parts[partCount++] = Int32.Parse(buf);
                        buf = "";
                    }
                    catch (Exception)
                    {
                        throw new IOException("Malformed PASV reply: " +
                            reply);
                    }
                }
            }

            string ipAddress = parts[0] + "." + parts[1] + "." +
                parts[2] + "." + parts[3];

            int port = (parts[4] << 8) + parts[5];

            Socket s = new
                Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            IPEndPoint ep = new
                IPEndPoint(Dns.Resolve(ipAddress).AddressList[0], port);

            try
            {
                s.Connect(ep);
            }
            catch (Exception)
            {
                throw new IOException("Can't connect to remote server");
            }

            return s;
        }

        ///<summary>
        /// The raw response from the server fronm the
        /// last command issued
        /// </summary>
        public string ServerResponse
        {
            get { return reply; }
        }

        ///<summary>
        /// The response code from the server in response to 
        /// the last command issued 
        ///</summary>
        public int ResponseCode
        {
            get { return retValue; }
        }
    }
}

