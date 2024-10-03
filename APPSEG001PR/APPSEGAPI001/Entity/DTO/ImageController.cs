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
        public byte[] getNoBase64Image(string Image)
        {
            byte[] byteArray = null;
                string suffixToFind = ";base64,";

                int suffixIndex = Image.LastIndexOf(suffixToFind, StringComparison.OrdinalIgnoreCase);

                if (suffixIndex != -1)
                {
                    Image = Image.Substring(suffixIndex + suffixToFind.Length);
                }

                byteArray = Convert.FromBase64String(Image);
            return byteArray;
        }
    }
}
