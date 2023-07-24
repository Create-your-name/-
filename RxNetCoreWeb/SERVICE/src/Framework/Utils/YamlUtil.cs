using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YamlDotNet.Serialization;

namespace Arch
{
    public class YamlUtil
    {
        public static object ToObject(string data)
        {
            try
            {
                var des = new DeserializerBuilder()
                .Build();
                return des.Deserialize(new StringReader(data));
            }
            catch
            {
                return null;
            }
        }

        public static T Deserialize<T>(string data)
        {
            try
            {
                var des = new DeserializerBuilder().IgnoreUnmatchedProperties().Build();
                return des.Deserialize<T>(data);
            }
            catch (Exception e)
            {
                Log.Error(e);
                return default;
            }
        }
    }
}
