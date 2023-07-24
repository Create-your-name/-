using Arch;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.src.MenuService;

namespace SPCService.src.Controllers
{
    [Route("api/menu")]
    [ApiController]
    public class MenuController : ControllerExt
    {
        private AdminContext dbContext;
        public MenuController(AdminContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("create")]
        public APIResponse CreateMenu()
        {
            var json = GetBodyJson<MenuCreateReq>();

            SystemMenuService.CreateMenu(dbContext, json);
            return OK();
        }

        [HttpPost("delete")]
        public APIResponse DeleteMenu()
        {
            var json = GetBodyJson<MenuDeleteReq>();
            var err = SystemMenuService.DeleteMenu(dbContext, json);
            return err;
        }

        [HttpPost("select")]
        public APIResponse SelectMenu()
        {
            var json = GetBodyJson<MenuSelectReq>();
            var allMenus = SystemMenuService.SelectMenu(dbContext, json).Select(u => new MenuInfoPb
            {
                MENU_ID = u.MENU_ID.ToString(),
                MENU_NAME = u.MENU_NAME,
                PARENT_ID = u.PARENT_ID.ToString(),
                ORDER_NUM = u.ORDER_NUM.ToString(),
                URL = u.URL,
                TARGET = u.TARGET,
                MENU_TYPE = u.MENU_TYPE,
                VISIBLE = u.VISIBLE,
                IS_REFRESH = u.IS_REFRESH,
                PERMS = u.PERMS,
                ICON = u.ICON,
                CREATE_BY = u.CREATE_BY,
                CREATE_TIME = u.CREATE_TIME.ToString(),
                UPDATE_BY = u.UPDATE_BY,
                UPDATE_TIME = u.UPDATE_TIME.ToString(),
                REMARK = u.REMARK

            });
            return OK(allMenus);

        }

        [HttpPost("update")]
        public APIResponse UpdateMenu()
        {
            var json = GetBodyJson<MenuUpdateReq>();

            var result = SystemMenuService.UpdateMenu(dbContext, json);
            
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
