using System.Net.Http;

namespace Arch
{
    public class HttpUtil
    {
        public static HttpClient HttpClient { get; } = new HttpClient();
    }
}
