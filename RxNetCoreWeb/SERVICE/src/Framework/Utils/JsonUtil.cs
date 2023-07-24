using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;

namespace Arch
{
    public class JsonUtil
    {
        private static JsonSerializerSettings setting = new JsonSerializerSettings()
        {
            Converters = new List<JsonConverter> {
            new Newtonsoft.Json.Converters.StringEnumConverter()
            }
        };

        public static string Serialize(object poco)
        {
            try
            {
                return JsonConvert.SerializeObject(poco, setting);
            }
            catch (Exception e)
            {
                Log.Error(e);
                return null;
            }
        }

        public static string SerializePrettyPrint(object poco)
        {
            try
            {
                return JsonConvert.SerializeObject(poco, Formatting.Indented, setting);
            }
            catch (Exception e)
            {
                Log.Error(e);
                return null;
            }
        }

        public static T Deserialize<T>(string data)
        {
            try
            {
                return JsonConvert.DeserializeObject<T>(data, setting);
            }
            catch (Exception e)
            {
                Log.Error(e);
                return default;
            }
        }

        //public static object Deserialize(string data)
        //{
        //    try
        //    {
        //        return JsonConvert.DeserializeObject(data);
        //    }
        //    catch (Exception e)
        //    {
        //        Log.Error(e);
        //        return default;
        //    }
        //}

        public static JObject ToJObject(string data)
        {
            try
            {
                return JObject.Parse(data);
            }
            catch (Exception e)
            {
                Log.Error(e);
                return null;
            }
        }

        public static JArray ToJArray(string data)
        {
            try
            {
                return JArray.Parse(data);
            }
            catch (Exception e)
            {
                Log.Error(e);
                return null;
            }
        }

        public static JToken ToToken(string data)
        {
            try
            {
                return JToken.Parse(data);
            }
            catch (Exception e)
            {
                Log.Error(e);
                return null;
            }
        }

        public static bool CheckJsonFormat(string data)
        {
            try
            {
                var j = JToken.Parse(data);
                return j != null;
            }
            catch //(Exception e)
            {
            }
            return false;
        }
    }
}
