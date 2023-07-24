using Arch;
using Microsoft.EntityFrameworkCore;
using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Oracle;
using SPCService.Database;
using SPCService.Database.Entity;

namespace SPCService
{
    public static class SystemUserService
    {
        public static User LoadByAccount(AdminContext db, string account)
        {
            return db.SYS_USER.Where(u => u.LOGIN_NAME == account).FirstOrDefault();
        }

        public static async Task<User> LoadByAccountAsync(AdminContext db, string account)
        {
            return await db.SYS_USER.Where(u => u.LOGIN_NAME == account).FirstOrDefaultAsync();
        }

        public static async Task<int> CreateUser(AdminContext db, UserCreateReq createData)
        {
            var old = await LoadByAccountAsync(db, createData.LOGIN_NAME);

            if (old != null)
            {
                return ErrorCode.UserAlreadyExist;
            }

            string salt = AuthCodec.GenSalt();
            User user = new User
            {
                //USER_ID = 1,
                DEPT_ID = 1,    //int.Parse(createData.DEPT_ID),
                LOGIN_NAME = createData.LOGIN_NAME,
                USER_NAME = createData.USER_NAME,
                USER_TYPE = createData.USER_TYPE,
                PHONENUMBER = createData.PHONENUMBER,
                SALT = salt,
                PASSWORD = AuthCodec.Pkbdf2.HashPassword(createData.PASSWORD, salt),
                STATUS = createData.STATUS,
                DEL_FLAG = "0",
                CREATE_TIME = DateTime.Now,
                UPDATE_TIME = null,
                REMARK = createData.REMARK,
                ROLE_KEY = createData.ROLE_KEY,
            };
            db.SYS_USER.Add(user);
            db.SaveChanges();
            return ErrorCode.OK;
        }

        public static bool CreateRootUser(string account, string pwd)
        {
            var req = new UserCreateReq
            {
                LOGIN_NAME = account,
                USER_NAME = account,
                USER_TYPE = "00",
                PASSWORD = pwd,
                DEPT_ID = "0",
                PHONENUMBER = "123",
                STATUS = "0",
                REMARK = "管理员",
                ROLE_KEY = "admin"
            };
            using var db = new AdminContext();

            var old =  LoadByAccount(db, account);
            if (old != null)
            {
                string salt = AuthCodec.GenSalt();
                var hashPwd = AuthCodec.Pkbdf2.HashPassword(pwd, salt);
                old.SALT = salt;
                old.PASSWORD = hashPwd;
                db.SaveChanges();
                return true;
            }
            else
            {
                var task = CreateUser(db, req);
                task.Wait();
                var result = task.Result;

                return result == ErrorCode.OK;
            }
            
        }

        public static int RemoveUser(AdminContext db, UserRemoveReq removeData)
        {
            User user = db.SYS_USER.Where(u => u.USER_ID == int.Parse(removeData.USER_ID)).FirstOrDefault();

            if (user == null)
            {
                return ErrorCode.UserNotExist;
            }

            user.DEL_FLAG = "1";
            db.SaveChanges();
            return ErrorCode.OK;
        }

        public static int ResetPassword(AdminContext db, UserResetPwdReq resetData)
        {
            var user = db.SYS_USER.Where(u => u.USER_ID == resetData.USER_ID).FirstOrDefault();
            if (user == null)
                return ErrorCode.UserNotExist;

            if(!AuthCodec.Pkbdf2.CheckPassword(resetData.OLD_PASSWORD,user.SALT,user.PASSWORD))
                return ErrorCode.PasswordError;

            user.SALT = AuthCodec.GenSalt();
            string password = AuthCodec.Pkbdf2.HashPassword(resetData.NEW_PASSWORD, user.SALT);
            user.PASSWORD = password;
            db.Update(user);
            db.SaveChanges();
            return ErrorCode.OK;
        }

        public static List<User> QueryAllUser(AdminContext db)
        {
            return db.SYS_USER.Where(u=>u.DEL_FLAG=="0").ToList();
        }

        public  static int UpdateUser(AdminContext db,UserUpdateReq updateData)
        {
            User user = db.SYS_USER.Where(u => u.USER_ID.ToString() == updateData.USER_ID).FirstOrDefault();

            if (user == null)
            {
                return ErrorCode.UserNotExist;
            }

            if (!string.IsNullOrEmpty(updateData.PHONENUMBER))
            {
                user.PHONENUMBER = updateData.PHONENUMBER;
            }
            if (!string.IsNullOrEmpty(updateData.REMARK))
            {
                user.REMARK = updateData.REMARK;
            }
            if (!string.IsNullOrEmpty(updateData.STATUS))
            {
                user.STATUS = updateData.STATUS;
            }
            if (!string.IsNullOrEmpty(updateData.DEPT_ID))
            {
                user.DEPT_ID = int.Parse(updateData.DEPT_ID);
            }
            if (!string.IsNullOrEmpty(updateData.LOGIN_NAME))
            {
                user.LOGIN_NAME = updateData.LOGIN_NAME;
            }
            if (!string.IsNullOrEmpty(updateData.USER_NAME))
            {
                user.USER_NAME = updateData.USER_NAME;
            }
            if (!string.IsNullOrEmpty(updateData.USER_TYPE))
            {
                user.USER_TYPE = updateData.USER_TYPE;
            }
            if (!string.IsNullOrEmpty(updateData.ROLE_KEY))
            {
                user.ROLE_KEY = updateData.ROLE_KEY;
            }
            user.UPDATE_TIME = DateTime.Now;
            db.Update(user);
            db.SaveChanges();

            return ErrorCode.OK;
        }
    }
}
