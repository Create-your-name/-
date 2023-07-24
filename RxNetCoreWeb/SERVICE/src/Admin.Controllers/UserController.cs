using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Arch;
using Protocol;
using SPCService.Database;
using SPCService.Database.Entity;
using SPCService.Helper;
using SPCService.src.Database.Entity.USER;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SPCService
{
    [Route("api/user")]
    public class UserController : ControllerExt
    {
        private AdminContext dbContext;
        public UserController(AdminContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("login")]
        public APIResponse Login()
        {
            var json = GetBodyJson<UserLoginReq>();

            //var user = SystemUserService.LoadByAccount(dbContext,json.account);
            var user = new User();
            user.LOGIN_NAME = json.account;
            user.PASSWORD = json.pwd;

            if (user == null)
            {
                return ErrorCode.AccountOrPwdError;
            }

            //if (user.USER_TYPE == "DA")
            //{
            //    if (!LDAPService.ValidateUser(json.account, json.pwd))
            //        return ErrorCode.AccountOrPwdError;
            //}
            //else 
            //{
            //    if (!AuthCodec.Pkbdf2.CheckPassword(json.pwd, user.SALT, user.PASSWORD))
            //        return ErrorCode.AccountOrPwdError;
            //}

            string authToken = "";
            string sql = "select * from FWUSERPROFILE WHERE USERNAME = '" + user.LOGIN_NAME + "'";
            var num = DapperHelper.Query<FwUserProfile>(sql);
            if (num.Count > 0)
            {
                string sha256Str = StringUtil.Sha256(user.PASSWORD);
                string sql2 = "select * from FWUSERPROFILE WHERE USERNAME = '" + user.LOGIN_NAME + "' AND PASSWORD = '" + sha256Str + "'";
                var num2 = DapperHelper.Query<FwUserProfile>(sql2);
                if (num2.Count > 0)
                {
                    string sql3 = "select distinct M.KEYDATA from FWUSERGROUP K,FWUSERGROUP_N2M M " +
                                "where K.SYSID in ( " +
                                "SELECT  distinct a.sysid FROM FWUSERGROUP A, FWUSERGROUP_N2M B,FWUSERPROFILE C, fwuseraccess d " +
                                "WHERE A.SYSID = B.FROMID AND B.TOID = C.SYSID AND B.LINKNAME = 'users'  AND C.USERNAME = '" + user.LOGIN_NAME + "') " +
                                "and K.sysid = M.fromid and M.LINKNAME = 'accessStrings' and(M.KEYDATA = '*' OR M.KEYDATA = 'USR:WEB:Login')";
                    var num3 = DapperHelper.Query<FwUserProfile>(sql3);
                    if (num3.Count > 0)
                    {
                        user.ROLE_KEY = num2[0].USERNAME;
                        user.USER_NAME = num2[0].USERNAME;
                        authToken = "123";
                    }
                    else
                    {
                        return ErrorCode.PermissionDenied;
                    }
                }
                else
                {
                    return ErrorCode.AccountOrPwdError;
                }
            }
            else
            {
                return ErrorCode.UserNotExist;
            }

            //将登录的用户信息生成一串token值
            //string authToken = JwtService.GenAuthToken(user);

            UserOperationService.LogOperation(json.account, GetForwordIP(), UserOpType.Login, json.account);

            //using var db = new AdminContext();
            //List<MenusJwt> temp = new List<MenusJwt>();
            //List<Menu> menuList = db.SYS_MENU.ToList();
            //List<RoleMenu> roleMenuList = db.SYS_ROLE_MENU.Where(u => u.ROLE_ID == (db.SYS_ROLE.Where(r => r.ROLE_KEY == user.ROLE_KEY).SingleOrDefault().ROLE_ID)).ToList();
            //List<string> tempRoleMenuList = new List<string>();
            //foreach (var item in roleMenuList)
            //{
            //    tempRoleMenuList.Add(item.MENU_ID.ToString());
            //}
            //foreach (var item in menuList)
            //{
            //    var tempMenu = new MenusJwt
            //    {
            //        menuTarget = item.TARGET,
            //        flag = (tempRoleMenuList.Contains(item.MENU_ID.ToString())) ? true : false,
            //    };
            //    temp.Add(tempMenu);
            //}

            return OK(new UserLoginResp
            {
                //authToken = authToken,
                //account = json.account,
                //role = user.ROLE_KEY,
                //param = JsonUtil.Serialize(temp),
                authToken = authToken,
                account = user.USER_NAME == "" ? user.LOGIN_NAME : user.USER_NAME,
                param = "[]",
            });
        }

        //[AuthRoles(RoleGroup.UserManager)]
        [HttpPost("create")]
        public async Task<APIResponse> CreateUser()
        {
            var json = GetBodyJson<UserCreateReq>();
            var result = await SystemUserService.CreateUser(dbContext, json);

            if (result == ErrorCode.OK)
            {
                return OK(null);
            }
            else
            {
                return result;
            }
        }

        //[AuthRoles(RoleGroup.UserManager)]
        [HttpPost("query")]
        public APIResponse GetSystemUserList()
        {
            //控制台打印测试数据
            var all = SystemUserService.QueryAllUser(dbContext)
                .Select(user => new UserInfoPb
                {
                    USER_ID = user.USER_ID.ToString(),
                    DEPT_ID = user.DEPT_ID.ToString(),
                    LOGIN_NAME = user.LOGIN_NAME,
                    USER_NAME = user.USER_NAME,
                    PHONENUMBER = user.PHONENUMBER,
                    STATUS = user.STATUS,
                    CREATE_TIME = user.CREATE_TIME.ToString(),
                    USER_TYPE = user.USER_TYPE,
                    REMARK = user.REMARK,
                    ROLE_KEY = user.ROLE_KEY
                });

            return OK(all);
        }

        //[AuthRoles(RoleGroup.UserManager)]
        [HttpPost("remove")]
        public APIResponse RemoveUser()
        {
            var json = GetBodyJson<UserRemoveReq>();

            var result = SystemUserService.RemoveUser(dbContext, json);
            if (result == ErrorCode.OK)
            {
                return OK(null);
            }
            else
            {
                return result;
            }
        }

        [HttpPost("resetpwd")]
        public APIResponse AdminResetPwd()
        {
            var json = GetBodyJson<UserResetPwdReq>();

            var result = SystemUserService.ResetPassword(dbContext, json);
            if (result == ErrorCode.OK)
            {
                return OK();
            }
            else
            {
                return result;
            }
        }

        [HttpPost("update")]
        public APIResponse UpdateUser()
        {
            var json = GetBodyJson<UserUpdateReq>();
            var result = SystemUserService.UpdateUser(dbContext, json);
            if (result == ErrorCode.OK)
            {
                return OK();
            }
            else
            {
                return result;
            }

        }
    }
}
