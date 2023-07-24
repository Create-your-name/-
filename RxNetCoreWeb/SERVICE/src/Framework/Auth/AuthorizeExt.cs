using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Arch
{
    public static class AuthorizeExt
    {
        public static string JwtSecret { get; set; }


        public static bool ExtIsAuthorized(this Controller controller, List<string> policy, out int result)
        {
            var jwt = ExtGetJwt<UserJwt>(controller);
            if (jwt == null)
                return ErrorCode.OK == (result = ErrorCode.GMAuthenticationFail);

            if (!policy.Find(r => r.ToUpper() == jwt.role.ToUpper()).Any())
            {
                return ErrorCode.OK == (result = ErrorCode.PermissionDenied);
            }

            return ErrorCode.OK == (result = ErrorCode.OK);
        }

        public static T ExtGetJwt<T>(this Controller controller)
        {
            try
            {
                string authToken = controller.ExtGetAuthToken();
                if (authToken == null)
                    return default;

                return ParseJWT<T>(authToken);
            }
            catch(Exception e)
            {
                Log.Error(e);
            }
            return default;
        }

        public static T ParseJWT<T>(string authToken)
        {
            try
            {
                string json = JwtUtil.Verify(JwtSecret, authToken);

                if (json == null)
                    return default;

                return JsonUtil.Deserialize<T>(json);
            }
            catch (Exception e)
            {
                Log.Error(e);
            }
            return default;
        }
    }
}
