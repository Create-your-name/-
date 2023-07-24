using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPCService
{
    public enum UserOpType
    {
        Login,
        CreateUser,
    }

    public static class UserOperationService
    {
        public static void LogOperation(string account, string ip, UserOpType userOpType, string data)
        {

        }
    }
}
