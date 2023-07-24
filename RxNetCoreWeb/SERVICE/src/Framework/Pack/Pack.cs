using ProtoBuf;
using System;
using System.IO;

namespace Arch
{
    public static class Pack
    {
        public static T Deserialize<T>(byte[] data)
        {
            return Serializer.Deserialize<T>(new ReadOnlyMemory<byte>(data));
        }

        public static T Deserialize<T>(Stream data)
        {
            return Serializer.Deserialize<T>(data);
        }

        public static byte[] ToArray<T>(T data)
        {
            using var stream = new MemoryStream();
            Serializer.Serialize<T>(stream, data);
            stream.Seek(0, SeekOrigin.Begin);
            return stream.ToArray();
        }

        public static Stream ToStream<T>(T data)
        {
            var stream = new MemoryStream();
            Serializer.Serialize<T>(stream, data);
            stream.Seek(0, SeekOrigin.Begin);
            return stream;
        }

        public static byte[] ToBytes<T>(this T data) where T : IExtensible
        {
            return ToArray(data);
        }
    }
}
