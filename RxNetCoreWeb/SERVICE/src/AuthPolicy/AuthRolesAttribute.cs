using Arch;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPCService
{
    public class AuthRolesAttribute : ActionFilterAttribute
    {
        private readonly RoleGroup _roles;

        public AuthRolesAttribute(RoleGroup roles)
        {
            _roles = roles;
        }

        private T GetJwt<T>(HttpContext httpContext)
        {
            try
            {
                string authToken = httpContext.GetAuthToken();
                if (authToken == null)
                    return default;

                string json = JwtUtil.Verify(AuthorizeExt.JwtSecret, authToken);

                if (json == null)
                    return default;

                return JsonUtil.Deserialize<T>(json);
            }
            catch(Exception e)
            {
                Log.Error(e);
            }
            return default;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var httpContext = context.HttpContext;
           
            var user = GetJwt<UserJwt>(httpContext);
            if (user == null)
            {
                var error = ErrorCode.GMAuthenticationFail;
                context.Result = new JsonResult(new { result = error, errorMsg = ErrorCode.CodeToDesc(error), data=(object)null });
                return;
            }

            var roleStrings = RoleGroupReg.Data.GetValueOrDefault(_roles);
            if (roleStrings == null)
            {
                var error = ErrorCode.PermissionDenied;
                context.Result = new JsonResult(new { result = error, errorMsg = ErrorCode.CodeToDesc(error), data = (object)null });
                return;
            }

            if (!roleStrings.Contains(user.role))
            {
                var error = ErrorCode.PermissionDenied;
                context.Result = new JsonResult(new { result = error, errorMsg = ErrorCode.CodeToDesc(error), data = (object)null });
                return;
            }
        }

    }
}
