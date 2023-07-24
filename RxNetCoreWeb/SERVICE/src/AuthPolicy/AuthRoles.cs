using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPCService
{
    public class AuthRoles
    {
        //拥有系统设置权限的角色
        public static List<string> AppSetting = new List<string>
        {
            "ADMIN"
        };

        //拥有用户管理权限的角色
        public static List<string> UserManager = new List<string> 
        {
            "ADMIN"
        };

        //拥有角色管理权限的角色
        public static List<string> RoleManager = new List<string>
        {
            "ADMIN"
        };

        //拥有岗位管理权限的角色
        public static List<string> PostManager = new List<string>
        {
            "ADMIN"
        };
    }

    public enum RoleGroup
    {
        AppSetting,
        UserManager,
        RoleManager,
        PostManager,
    }

    public class RoleGroupReg
    {
        public static Dictionary<RoleGroup, List<string>> Data { get; } = new Dictionary<RoleGroup, List<string>>
        {
            { RoleGroup.AppSetting,  AuthRoles.AppSetting},
            { RoleGroup.UserManager,  AuthRoles.UserManager},
            { RoleGroup.RoleManager,  AuthRoles.RoleManager},
            { RoleGroup.PostManager,  AuthRoles.PostManager},
        };
    }
}
