using Microsoft.AspNetCore.Mvc;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Arch
{
    public class ControllerExt : ControllerBase
    {
        public ClientInfo GetClientInfo()
        {
            //临时测试代码
            return new ClientInfo
            {
                UserName = "TestName",
                LoginUser = "TestUser",
                IPAddress = "127.0.0.1",
                MACInfo = "AABBC"
            };
        }

        public T GetBodyJson<T>()
        {
            return JsonUtil.Deserialize<T>(GetBodyText() ?? "");
        }

        public async Task<T> GetBodyJsonAsync<T>()
        {
            return JsonUtil.Deserialize<T>(await GetBodyTextAsync() ?? "");
        }

        public string GetBodyText()
        {
            using var reader = new StreamReader(HttpContext.Request.Body);
            return reader.ReadToEnd();
        }

        public async Task<string> GetBodyTextAsync()
        {
            using var reader = new StreamReader(HttpContext.Request.Body);
            return await reader.ReadToEndAsync();
        }

        public static APIResponse OK(object data = null)
        {
            return new APIResponse
            {
                result = ErrorCode.OK,
                data = data
            };
        }

        public static APIResponse OK<T>(Result<T> result)
        {
            return new APIResponse
            {
                result = (int)result.error,
                errorMsg = result.error.ToString(),
                data = result.value
            };
        }

        public static APIResponse Error(int err)
        {
            return new APIResponse { result = err, errorMsg = ErrorCode.CodeToString(err) };
        }
        public static APIResponse Error(int err,string errMessage )
        {
            return new APIResponse { result = err, errorMsg = errMessage };
        }

        public string GetAuthToken()
        {
            string authHeader = HttpContext.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(authHeader))
                return null;

            if (authHeader.StartsWith("Bearer"))
            {
                return authHeader.Substring("Bearer".Length).Trim();
            }

            return authHeader;
        }

        public T GetJwt<T>()
        {
            try
            {
                string authToken = GetAuthToken();
                if (authToken == null)
                    return default;

                return AuthorizeExt.ParseJWT<T>(authToken);
            }
            catch (Exception e)
            {
                Log.Error(e);
            }
            return default;
        }

        public string GetForwordIP()
        {
            string forward = HttpContext.Request.Headers["X-Forwarded-For"];
            if (string.IsNullOrEmpty(forward))
                return null;

            string[] ipArr = forward.Split(",");
            if (ipArr != null && ipArr.Length > 0)
                return ipArr[0];
            return null;
        }
    }

}
