using System;
using System.Collections.Generic;
using System.Text;

namespace Data.BDAdmon
{
    public class ImageBuilder
    {   
        private byte[] Picture { get; set; }
        
        public ImageBuilder() {
            
        }
        
        public byte [] buildSQLImage(string Image)
        {
            string suffixToFind = ";base64,";
            int suffixIndex = Image.LastIndexOf(suffixToFind, StringComparison.OrdinalIgnoreCase);
            if (suffixIndex != -1)
            {
                Image = Image.Substring(suffixIndex + suffixToFind.Length);

            }
            return Convert.FromBase64String(Image);
        }
    }
}
