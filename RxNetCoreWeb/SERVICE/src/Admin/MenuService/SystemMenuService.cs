using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;

namespace SPCService.src.MenuService
{
    public class SystemMenuService
    {
        public static void CreateMenu(AdminContext db, MenuCreateReq createData)
        {
            Menu mENU = new Menu()
            {
                MENU_ID = db.SYS_MENU.Select(u => u.MENU_ID).Max() + 1,
                MENU_NAME = createData.MENU_NAME,
                PARENT_ID = int.Parse(createData.PARENT_ID),
                URL = createData.URL,
                TARGET = createData.TARGET,
                MENU_TYPE = createData.MENU_TYPE,
                VISIBLE = createData.VISIBLE,
                IS_REFRESH = createData.IS_REFRESH,
                PERMS = createData.PERMS,
                ICON = createData.ICON,
                CREATE_BY = createData.CREATE_BY,
                CREATE_TIME = DateTime.Now,
                UPDATE_BY = null,
                UPDATE_TIME = null,
                REMARK = createData.REMARK

            };
            db.SYS_MENU.Add(mENU);
            db.SaveChanges();
        }

        public static int DeleteMenu(AdminContext db, MenuDeleteReq delData)
        {
            List<Menu> dels = db.SYS_MENU.Where(u => u.PARENT_ID == int.Parse(delData.Menu_ID)).ToList();
            if (dels.Count > 0)
            {
                return ErrorCode.HasSubMenu;
            }
            else
            {
                Menu del = db.SYS_MENU.Where(u => u.MENU_ID == int.Parse(delData.Menu_ID)).FirstOrDefault();
                if (del != null)
                {
                    db.SYS_MENU.Remove(del);
                    db.SaveChanges();
                    return ErrorCode.OK;
                }
                else
                {
                    return ErrorCode.ServerDataError;
                }
            }
        }
        public static List<Menu> SelectMenu(AdminContext db, MenuSelectReq selData)
        {
            try
            {
                List<Menu> menus = new List<Menu>();
                if (string.IsNullOrEmpty(selData.VISIBLE))
                {
                    menus = db.SYS_MENU.ToList();
                }
                else
                {
                    menus = db.SYS_MENU.Where(u => u.VISIBLE == selData.VISIBLE).ToList();
                }
                if (!string.IsNullOrEmpty(selData.MENU_NAME))
                {
                    menus = menus.Where(u => u.MENU_NAME.Contains(selData.MENU_NAME)).ToList();
                }

                return menus;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public static int UpdateMenu(AdminContext db, MenuUpdateReq upData)
        {
            Menu menu = db.SYS_MENU.Where(u => u.MENU_ID == int.Parse(upData.MENU_ID)).FirstOrDefault();
            if (menu != null)
            {
                if (upData.MENU_NAME != null)
                {
                    menu.MENU_NAME = upData.MENU_NAME;
                }
                if (upData.PARENT_ID != null)
                {
                    menu.PARENT_ID = int.Parse(upData.PARENT_ID);
                }
                if (upData.URL != null)
                {
                    menu.URL = upData.URL;
                }
                if (upData.TARGET != null)
                {
                    menu.TARGET = upData.TARGET;
                }
                if (upData.MENU_TYPE != null)
                {
                    menu.MENU_TYPE = upData.MENU_TYPE;
                }
                if (upData.VISIBLE != null)
                {
                    menu.VISIBLE = upData.VISIBLE;
                }
                if (upData.IS_REFRESH != null)
                {
                    menu.IS_REFRESH = upData.IS_REFRESH;
                }
                if (upData.PERMS != null)
                {
                    menu.PERMS = upData.PERMS;
                }
                if (upData.ICON != null)
                {
                    menu.ICON = upData.ICON;
                }
                if (upData.UPDATE_BY != null)
                {
                    menu.UPDATE_BY = upData.UPDATE_BY;
                }
                if (upData.REMARK != null)
                {
                    menu.REMARK = upData.REMARK;
                }
                menu.UPDATE_TIME = DateTime.Now;
                db.Update(menu);
                db.SaveChanges();
                return ErrorCode.OK;
            }
            else
            {
                return ErrorCode.MenuNotExist;
            }
        }
    }
}
