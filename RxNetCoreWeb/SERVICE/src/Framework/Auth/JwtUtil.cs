using JWT.Algorithms;
using JWT.Builder;
using Microsoft.AspNetCore.WebUtilities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Arch
{
    public class JwtUtil
    {
        public static string GenSecret()
        {
            var b1 = Guid.NewGuid().ToByteArray();
            var b2 = Guid.NewGuid().ToByteArray();
            var b3 = b1.Concat(b2).ToArray();
            return WebEncoders.Base64UrlEncode(b3);
        }

        public static string BuildJwt(string secret, DateTime expire, string json)
        {
            var jsonDict = JsonUtil.Deserialize<Dictionary<string, object>>(json);
            var secretData = WebEncoders.Base64UrlDecode(secret);
            var jwtBuilder = new JwtBuilder()
              .WithAlgorithm(new HMACSHA256Algorithm())
              .WithSecret(secretData)
              .AddClaim("exp", new DateTimeOffset(expire).ToUnixTimeSeconds());

            foreach (var kv in jsonDict)
            {
                jwtBuilder.AddClaim(kv.Key, kv.Value);
            }

            return jwtBuilder.Encode();
        }

        public static string Verify(string secret, string jwt)
        {
            try
            {
                var secretData = WebEncoders.Base64UrlDecode(secret);
                var json = new JwtBuilder()
                    .WithAlgorithm(new HMACSHA256Algorithm())
                    .WithSecret(secretData)
                    .MustVerifySignature()
                    .Decode(jwt);
                return json;
            }
            catch (Exception e)
            {
                Log.Error(e);
            }

            return null;
        }

        /// <summary>
        /// 微软版本
        /// </summary>
        //public string CreateSecret(string secret, DateTime expire, string json)
        //{

        //    var handler = new JwtSecurityTokenHandler();
        //    var secretBytes = new SymmetricSecurityKey(WebEncoders.Base64UrlDecode(secret));
        //    var token = new SecurityTokenDescriptor()
        //    {
        //        Expires = expire,
        //        SigningCredentials = new SigningCredentials(secretBytes, SecurityAlgorithms.HmacSha256Signature)
        //    };
        //    var jsonDict = JsonUtil.Deserialize<Dictionary<string, object>>(json);

        //    foreach (var kv in jsonDict)
        //    {
        //        token.Claims[kv.Key] = kv.Value;
        //    }

        //    return handler.CreateEncodedJwt(token);
        //}
    }
}
