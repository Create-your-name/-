using Microsoft.AspNetCore.WebUtilities;
using System;

namespace Arch
{
    public class RandomUUID
    {
        public static string GenUUIDString()
        {
            return Guid.NewGuid().ToString();
        }

        public static string GenBase64UrlSafe()
        {
            return WebEncoders.Base64UrlEncode(Guid.NewGuid().ToByteArray());
        }
    }
}
