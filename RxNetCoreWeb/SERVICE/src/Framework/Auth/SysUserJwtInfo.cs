using System.Collections.Generic;

namespace Arch
{
    public class UserJwt
    {
        public int userId;
        public string uname;
        public string account;
        public string authToken;
        public string ipaddress;
        public string role;
        public string param;
    }

    public class MenusJwt
    {
        public string menuTarget;
        public bool flag;
    }

    public class ClientInfo
    {
        public string UserName { get; set; }
        public string IPAddress { get; set; }
        public string MACInfo { get; set; }
        public string LoginUser { get; set; }
    }
}
