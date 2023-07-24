using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Arch
{
    public class StringUtil
    {
        public static byte[] CalcMd5(string txt)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                return md5Hash.ComputeHash(Bytes.ToBytes(txt));
            }
        }
        public static bool DoubleableString(string inStr)
        {
            if (inStr == null || inStr == "")
            {

                return false;
            }
            else
            {
                bool bResult = false;
                double dValue;
                bResult = double.TryParse(inStr, out dValue);
                if (bResult)
                    return true;
                else
                    return false;
            }
        }
        public static bool NullString(string inStr)
        {
            if (inStr == null || inStr == "")
            {

                return true;
            }
            else
            {

                return false;
            }
        }
        public static string CalcMd5Hex(string txt)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                return Bytes.ToHexString(md5Hash.ComputeHash(Bytes.ToBytes(txt))).ToLower();
            }
        }

        public static string CalcSha1Hex(string txt)
        {

            using (SHA1 shaHash = SHA1.Create())
            {
                return Bytes.ToHexString(shaHash.ComputeHash(Bytes.ToBytes(txt))).ToLower();
            }
        }

        public static string Base64UrlsafeEncode(string txt)
        {
            return WebEncoders.Base64UrlEncode(Bytes.ToBytes(txt));
        }

        public static byte[] Base64UrlsafeDecode(string txt)
        {
            return WebEncoders.Base64UrlDecode(txt);
        }

        public static Func<string, string> UrlEncode => System.Web.HttpUtility.UrlEncode;
        public static Func<string, string> UrlDecode => System.Web.HttpUtility.UrlDecode;

        public static string ToUnicodeHex(char ch)
        {
            if (BitConverter.IsLittleEndian)
                return Bytes.ToHexString(BitConverter.GetBytes(ch).Reverse().ToArray());
            else
                return Bytes.ToHexString(BitConverter.GetBytes(ch));
        }

        public static string Sha256(string data)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(data);
            byte[] hash = SHA256Managed.Create().ComputeHash(bytes);

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                builder.Append(hash[i].ToString("X2"));
            }

            return builder.ToString().ToLower();
        }
    }
}
