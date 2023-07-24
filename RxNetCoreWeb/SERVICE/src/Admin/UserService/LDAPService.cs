using Arch;
using Microsoft.AspNetCore.Authentication;
using Novell.Directory.Ldap;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.DirectoryServices;
using System.DirectoryServices.ActiveDirectory;
using System.Linq;
using System.Threading.Tasks;

namespace SPCService
{
    public class LDAPService
    {
        public static string Domain = "crmicro";//域名称
        public static string Host = "crm-dc24.crmicro.com";//域服务器地址
        public static string BaseDC = "ou=华润安盛,dc=crmicro,dc=com";//根据上面的域服务器地址，每个点拆分为一个DC，例如上面的apac.contoso.com，拆分后就是DC=apac,DC=contoso,DC=com
        public static int Port = 389;//域服务器端口，一般默认就是389
        //public static string DomainAdminUser = "shenhaibo6";//域管理员账号用户名，如果只是验证登录用户，不对域做修改，可以就是登录用户名
        //public static string DomainAdminPassword = "July2021@";//域管理员账号密码，如果只是验证登录用户，不对域做修改，可以就是登录用户的密码


        public static bool ValidateUser(string username, string password)
        {
            try
            {
                Log.Trace($"LDAP Valid {username} : {password}");
                using (var conn = new LdapConnection())
                {
                    conn.Connect(Host, Port);
                    conn.Bind(Domain + "\\" + username, password);//这里用户名或密码错误会抛出异常LdapException

                    Log.Trace($"LDAP Bound = {conn.Bound}");
                    if (conn.Bound)
                        return true;

                    conn.Disconnect();
                    return true;
                }
            }
            catch (LdapException ldapEx)
            {
                Log.Error(ldapEx);
                string message = ldapEx.Message;

                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
