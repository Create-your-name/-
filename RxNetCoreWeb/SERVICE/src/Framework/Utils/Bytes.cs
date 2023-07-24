using System;

namespace Arch
{
    public class Bytes
    {
        public static string ToString(byte[] data)
        {
            return System.Text.Encoding.UTF8.GetString(data);
        }

        public static byte[] ToBytes(string txt)
        {
            return System.Text.Encoding.UTF8.GetBytes(txt);
        }

        public static string ToHexString(byte[] data)
        {
            return BitConverter.ToString(data).Replace("-", "");
        }
    }
}
