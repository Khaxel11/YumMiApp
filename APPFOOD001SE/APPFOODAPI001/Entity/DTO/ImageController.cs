using System;
using System.Collections.Generic;
using System.Text;

namespace Entity.DTO
{
    public class ImageController
    {
       
        public byte[] getImageBytes(string Image)
        {
            return Convert.FromBase64String(Image);
        }
        public string getImageString(byte[] Image)
        {
            return Convert.ToBase64String(Image);
        }

    }
}
