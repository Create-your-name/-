using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.WebUtilities;
using System;

namespace Arch
{
    public static class AuthCodec
    {
        

        public static string GenSalt()
        {
            var randomBytes = Guid.NewGuid().ToByteArray();
            return WebEncoders.Base64UrlEncode(randomBytes);
        }

        

        public static string GenAuthToken()
        {
            var randomBytes = Guid.NewGuid().ToByteArray();
            return WebEncoders.Base64UrlEncode(randomBytes);
        }

        public static class Pkbdf2
        {
            public const int Pkbdf2Count = 17;
            public static string Pbkdf2Pwd(string pwd, string salt, int time = Pkbdf2Count)
            {
                var hashBytes = KeyDerivation.Pbkdf2(pwd, Bytes.ToBytes(salt), KeyDerivationPrf.HMACSHA256, time, 256 / 8);
                return Convert.ToBase64String(hashBytes);
            }

            public static string HashPassword(string password, string salt)
            {
                return Pbkdf2Pwd(password, salt, Pkbdf2Count);
            }

            public static bool CheckPassword(string password, string salt, string hash)
            {
                return HashPassword(password, salt) == hash;
            }
        }

        public static class Md5
        {
            public static string HashPassword(string password, string salt)
            {
                return StringUtil.CalcMd5Hex(password + salt);
            }

            public static bool CheckPassword(string password, string salt, string hash)
            {
                return HashPassword(password, salt) == hash;
            }
        }
    }
}
