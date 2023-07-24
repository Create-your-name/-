using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using ProtoBuf;
using Protocol;
using System.Buffers;
using System.IO;
using System.Threading.Tasks;

namespace Arch
{
    public static class AspExtention
    {
        public static bool Development { get; set; } = false;
        public static string GetAuthToken(this HttpContext httpContext)
        {
            string authHeader = httpContext.Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(authHeader))
                return null;

            if (authHeader.StartsWith("Bearer"))
            {
                return authHeader.Substring("Bearer".Length).Trim();
            }

            return authHeader;
        }

        public static string ExtGetAuthToken(this Controller controller)
        {
            return controller.HttpContext.GetAuthToken();
        }

        public static string ExtGetBodyText(this Controller controller)
        {
            using var reader = new StreamReader(controller.HttpContext.Request.Body);
            return reader.ReadToEnd();
        }

        public static async Task<string> ExtGetBodyTextAsync(this Controller controller)
        {
            using var reader = new StreamReader(controller.HttpContext.Request.Body);
            return await reader.ReadToEndAsync();
        }

        public static byte[] ExtGetBodyBytes(this Controller controller)
        {
            using var ms = new MemoryStream();
            controller.HttpContext.Request.Body.CopyTo(ms);
            return ms.ToArray();
        }

        public static async Task<byte[]> ExtGetBodyBytesAsync(this Controller controller)
        {
            var read = await controller.HttpContext.Request.BodyReader.ReadAsync();
            return read.Buffer.ToArray();
        }

        public static JObject ExtGetBodyJson(this Controller controller)
        { 
            return JsonUtil.ToJObject(controller.ExtGetBodyText() ?? "");
        }

        public static T ExtGetBodyJson<T>(this Controller controller)
        {
            return JsonUtil.Deserialize<T>(controller.ExtGetBodyText() ?? "");
        }

        public static async Task<T> ExtGetBodyJsonAsync<T>(this Controller controller)
        {
            return JsonUtil.Deserialize<T>(await controller.ExtGetBodyTextAsync() ?? "");
        }

        public static JsonResult ExtOkJson(this Controller controller, object data = null)
        {
            return controller.ExtErrorJson(ErrorCode.OK, data);
        }

        public static JsonResult ExtErrorJson(this Controller controller, int errorCode, object data = null)
        {
            return errorCode switch
            {
                ErrorCode.OK => controller.Json(new { result = 0, data }),
                _ => controller.Json(new { result = errorCode, errorMsg = ErrorCode.CodeToDesc(errorCode), data })
            };
        }



        public static ActionResult ExtBytes(this Controller controller, byte[] data)
            => controller.File(data, "application/octet-stream");


        public static string ExtForwordIP(this Controller controller)
        {
            string forward = controller.HttpContext.Request.Headers["X-Forwarded-For"];
            if (string.IsNullOrEmpty(forward))
                return null;

            string[] ipArr = forward.Split(",");
            if (ipArr != null && ipArr.Length > 0)
                return ipArr[0];
            return null;
        }

        public static ContentResult ExtStringAsJson(this Controller controller, string data)
        {
            return controller.Content(data, "application/json");
        }
    }
}
