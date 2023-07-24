
using Microsoft.AspNetCore.Builder;

namespace Arch
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureCustomExceptionMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }

    public static class OptionsExtensions
    {
        public static void ConfigureCustomOptionsMiddleware(this IApplicationBuilder app)
        {
            app.UseMiddleware<OptionsMiddleware>();
        }
    }
}