using Microsoft.AspNetCore.Mvc;
using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;

namespace SPCService.src.RoleService
{
    public class SystemRoleService
    {
        public static Role CreateRole(string opUser, AdminContext db, RoleCreateReq createData)
        {
            var sys_role = new Role
            {
                ROLE_ID = db.SYS_ROLE.Select(u => u.ROLE_ID).Max() + 1,
                ROLE_NAME = createData.ROLE_NAME,
                ROLE_KEY = createData.ROLE_KEY,
                ROLE_SORT = int.Parse(createData.ROLE_SORT),
                DATA_SCOPE = "1",
                STATUS = "0",
                DEL_FLAG = "0",
                CREATE_BY = opUser,
                CREATE_TIME = DateTime.Now,
                UPDATE_BY = null,
                UPDATE_TIME = null,
                REMARK = createData.REMARK
            };
            db.SYS_ROLE.Add(sys_role);
            db.SaveChanges();

            return sys_role;
        }

        public static List<Role> SelectRoles(AdminContext db, RoleSelectReq selectData)
        {
            var resdata = db.SYS_ROLE.Where(u => u.DEL_FLAG == "0").ToList();
            if (!string.IsNullOrEmpty(selectData.ROLE_NAME))
            {
                resdata = resdata.Where(u => u.ROLE_NAME == selectData.ROLE_NAME).ToList();
            }
            if (!string.IsNullOrEmpty(selectData.ROLE_KEY))
            {
                resdata = resdata.Where(u => u.ROLE_KEY == selectData.ROLE_KEY).ToList();
            }
            if (!string.IsNullOrEmpty(selectData.STATUS))
            {
                resdata = resdata.Where(u => u.STATUS == selectData.STATUS).ToList();
            }
            if (!string.IsNullOrEmpty(selectData.STARTTIME))
            {
                resdata = resdata.Where(u => u.CREATE_TIME >= DateTime.Parse(selectData.STARTTIME)).ToList();
            }
            if (!string.IsNullOrEmpty(selectData.ENDTIME))
            {
                resdata = resdata.Where(u => u.CREATE_TIME <= DateTime.Parse(selectData.ENDTIME)).ToList();
            }
            resdata = resdata.Where(u => u.DEL_FLAG == "0").ToList();
            return resdata;
        }

        public static Role SelectRoleByID(AdminContext db, RoleSelectRoleByIDReq selectData)
        {
            var res = db.SYS_ROLE.Where(u => u.ROLE_ID == int.Parse(selectData.ROLE_ID)).FirstOrDefault();

            return res;
        }

        public static bool DeleteRole(AdminContext db, RoleDeleteReq delData)
        {
            Role role = db.SYS_ROLE.Where(u => u.ROLE_ID == int.Parse(delData.ROLE_ID)).FirstOrDefault();
            role.DEL_FLAG = "1";
            db.SaveChanges();
            return true;
        }

        public static bool UpdateRole(string opUser, AdminContext db, RoleUpdateReq updateData)
        {

            Role role = db.SYS_ROLE.Where(u => u.ROLE_ID == int.Parse(updateData.ROLE_ID)).FirstOrDefault();
            if (!string.IsNullOrEmpty(updateData.REMARK))
            {
                role.REMARK = updateData.REMARK;
            }

            if (!string.IsNullOrEmpty(updateData.ROLE_SORT))
            {
                role.ROLE_SORT = int.Parse(updateData.ROLE_SORT);
            }

            if (!string.IsNullOrEmpty(updateData.ROLE_KEY))
            {
                role.ROLE_KEY = updateData.ROLE_KEY;
            }

            if (!string.IsNullOrEmpty(updateData.STATUS))
            {
                role.STATUS = updateData.STATUS;
            }

            if (!string.IsNullOrEmpty(updateData.ROLE_NAME))
            {
                role.ROLE_NAME = updateData.ROLE_NAME;
            }

            role.UPDATE_BY = opUser;
            role.UPDATE_TIME = DateTime.Now;
            db.SaveChanges();
            return true;

        }
    }
}
