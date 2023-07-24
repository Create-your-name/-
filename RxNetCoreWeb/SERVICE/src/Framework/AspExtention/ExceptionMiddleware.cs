
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Arch
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;


        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)System.Net.HttpStatusCode.OK;

            return context.Response.WriteAsync(
                JsonUtil.Serialize(
                    new APIResponse 
                    { 
                        result = ErrorCode.ServerException, 
                        errorMsg = ErrorCode.CodeToString(ErrorCode.ServerException)+" : "+exception.Message 
                    } ));
        }
    }
}
