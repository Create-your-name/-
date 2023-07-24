using Newtonsoft.Json.Linq;
using System.IO;
using System.Text;
//using SimpleJson;

namespace Arch
{
    public class ServerConfig
    {
        public static JObject JsonObject { set; get; }
        public static string ServerConfigFile { get; } = "server-config/server-config.json";
        private static string ServerBaseConfigFile { get; } = "server-config/server-base-config.json";

        public static string ServerID =>  "A01";

        public static bool LoadLocalServerConfig()
        {
            string jsonText = File.ReadAllText(ServerConfigFile);
            JsonObject = JObject.Parse(jsonText);
            return true;
        }

        private static void SaveLocalServerConfig()
        {
            string jsonText = JsonObject.ToString();
            File.WriteAllText(ServerConfigFile, jsonText);
        }

        public static string GetString(string key)
        {
            return (string)(JsonObject[key] ?? "");
        }

        public static int GetInt(string key)
        {
            return (int)(JsonObject[key] ?? 0);
        }

        public static bool GetBool(string key)
        {
            return (bool)(JsonObject[key] ?? false);
        }

        public static string[] GetStringArray(string key)
        {
            return JsonObject[key].ToObject<string[]>();
        }
    }
}