
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Arch;
using JWT.Serializers;
using SPCService.Database;
using SPCService.Database.Entity;

namespace SPCService
{
    public static class JwtService
    {
        public static string JwtSecret { get; private set; }

        /// <summary>
        /// 不连接数据库演示代码
        /// </summary>
        public static void DemoInit()
        {
            JwtSecret = JwtUtil.GenSecret();
            AuthorizeExt.JwtSecret = JwtSecret;
        }

        public static void InitSecret()
        {
            string dbKey = "JWTSECRET";
            using var db = new AdminContext();
            var secret = db.JWTSECRETS.Where(s => s.ID == dbKey).FirstOrDefault();

            if (secret == null)
            {
                Log.Trace("Create JwtSecret");
                var record = new JwtSecret
                {
                    ID = dbKey,
                    SECRET = JwtUtil.GenSecret()
                };
                db.JWTSECRETS.Add(record);
                db.SaveChanges();
                JwtSecret = record.SECRET;
            }
            else
            {
                JwtSecret = secret.SECRET;
            }
            AuthorizeExt.JwtSecret = JwtSecret;
        }

        public static string GenAuthToken(User user)
        {
            //这部分是可伪造的
            var jwt = new UserJwt
            {
                userId = user.USER_ID,
                uname = user.USER_NAME,
                account = user.LOGIN_NAME,
                authToken = AuthCodec.GenAuthToken(),
                role = user.ROLE_KEY,
            };
            var expire = DateTime.Now.AddDays(1);
            //通过buildJwt去校验是不是我们的信息
            return JwtUtil.BuildJwt(JwtSecret, expire, JsonUtil.Serialize(jwt));
        }
    }
}
