using System;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

namespace Arch
{
    public class XmlUtil
    {
        public static T Deserialize<T>(string xml, string xmlRootName = "Root")
        {
            T result = default(T);

            using (StringReader sr = new StringReader(xml))
            {
                XmlSerializer xmlSerializer = string.IsNullOrWhiteSpace(xmlRootName) ?
                    new XmlSerializer(typeof(T)) : new XmlSerializer(typeof(T), new XmlRootAttribute(xmlRootName));

                result = (T)xmlSerializer.Deserialize(sr);
            }

            return result;
        }

        public static T DeserializeFile<T>(string filePath, string xmlRootName = "Root")
        {
            T result = default(T);

            if (File.Exists(filePath))
            {
                using (StreamReader reader = new StreamReader(filePath))
                {
                    XmlSerializer xmlSerializer = string.IsNullOrWhiteSpace(xmlRootName) ?
                        new XmlSerializer(typeof(T)) : new XmlSerializer(typeof(T), new XmlRootAttribute(xmlRootName));
                    result = (T)xmlSerializer.Deserialize(reader);
                }
            }

            return result;
        }

        public static string Serializer(object sourceObj, string xmlRootName = "Root")
        {
            MemoryStream Stream = new MemoryStream();

            Type type = sourceObj.GetType();

            XmlSerializer xmlSerializer = string.IsNullOrWhiteSpace(xmlRootName) ?
                new XmlSerializer(type) : new XmlSerializer(type, new XmlRootAttribute(xmlRootName));

            //序列化对象
            xmlSerializer.Serialize(Stream, sourceObj);
            Stream.Position = 0;
            StreamReader sr = new StreamReader(Stream);
            string str = sr.ReadToEnd();

            sr.Dispose();
            Stream.Dispose();

            return str;
        }


        public static void SerializerFile(string filePath, object sourceObj, string xmlRootName = "Root")
        {
            if (!string.IsNullOrWhiteSpace(filePath) && sourceObj != null)
            {
                Type type = sourceObj.GetType();

                using (StreamWriter writer = new StreamWriter(filePath))
                {
                    XmlSerializer xmlSerializer = string.IsNullOrWhiteSpace(xmlRootName) ?
                        new XmlSerializer(type) : new XmlSerializer(type, new XmlRootAttribute(xmlRootName));
                    xmlSerializer.Serialize(writer, sourceObj);
                }
            }
        }

        public static XmlDocument ReadTree(string data)
        {
            try
            {
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(data);
                return doc;
            }
            catch (Exception e)
            {
                Log.Error(e);
                return null;
            }
        }
    }
}
