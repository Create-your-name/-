using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;

namespace SPCService.src.RoleService
{
    public class SystemRoleMenuService
    {
        public static void CreateRoleMenu(AdminContext db, RoleMenuCreateReq createData)
        {
            List<RoleMenu> roleMenuList = db.SYS_ROLE_MENU.Where(u => u.ROLE_ID == int.Parse(createData.ROLE_ID)).ToList();
            foreach (var item in roleMenuList)
            {
                db.Remove(item);
                db.SaveChanges();
            }

            foreach (var item in createData.MENU_ID)
            {
                var sys_role_menu = new RoleMenu
                {
                    ID = db.SYS_ROLE_MENU.Select(u => u.ID).Max() + 1,
                    ROLE_ID = int.Parse(createData.ROLE_ID),
                    MENU_ID = int.Parse(item)
                };
                db.SYS_ROLE_MENU.Add(sys_role_menu);
                db.SaveChanges();
            }
        }

        public static RoleMenuSelectByIDResp SelectRoleMenuByRole_ID(AdminContext db, RoleMenuSelectByIDReq Data)
        {
            RoleMenuSelectByIDResp res = new RoleMenuSelectByIDResp();
            List<RoleMenu> roleMenuList = db.SYS_ROLE_MENU.Where(u => u.ROLE_ID == int.Parse(Data.ROLE_ID)).ToList();
            foreach (var item in roleMenuList)
            {
                var temp = new RoleMenuInfoPb
                {
                    ROLE_ID = item.ROLE_ID.ToString(),
                    ID = item.ID.ToString(),
                    MENU_ID = item.MENU_ID.ToString()
                };
                res.singleRoleMenus.Add(temp);
            }
            return res;

        }
    }
}
