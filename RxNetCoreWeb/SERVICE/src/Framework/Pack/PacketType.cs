
namespace Arch
{
    public class PacketType
    {
        public const int RequestResponse = 1; //客户端向gameServer发起请求，gameServer对客户端响应，双向
        public const int ServerInform = 2; //gameServer向客户端发送消息，单向
        public const int Forward = 3;
        public const int Report = 4; //客户端向gameServer上报错误等，单向
        public const int Sync = 5;   //客户端向roomServer发送消息或者roomServer向客户端发送消息，单向
        public const int IPC = 6; //服务器之间发送消息，单向
        public const int IPCRequest = 7;  //服务器之间发送请求，单向
        public const int IPCResponse = 8; //服务器之间响应，单向
        public const int SyncRequest = 9; //客户端向roomServer发起请求，roomServer对客户端响应，双向
    }
}
