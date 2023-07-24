using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;


namespace Arch
{
    public class OptionsMiddleware
    {
        private readonly RequestDelegate _next;


        public OptionsMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                if (httpContext.Request.Method == "OPTIONS")
                {
                    //httpContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });
                    httpContext.Response.Headers.Add("Access-Control-Allow-Headers", new[] { "*" });
                    httpContext.Response.Headers.Add("Access-Control-Allow-Methods", new[] { "GET, POST, PUT, DELETE, OPTIONS" });
                    httpContext.Response.Headers.Add("Access-Control-Allow-Credentials", new[] { "true" });
                    httpContext.Response.StatusCode = 200;
                    await httpContext.Response.WriteAsync("");
                }
                else
                {
                    await _next(httpContext);
                }
                
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
        }
    }
}
