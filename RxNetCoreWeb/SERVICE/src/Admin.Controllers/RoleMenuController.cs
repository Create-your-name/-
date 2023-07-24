using Arch;
using Microsoft.AspNetCore.Mvc;
using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.src.RoleService;

namespace SPCService.src.Controllers
{
    [Route("api/role_menu")]
    [ApiController]
    public class RoleMenuController : ControllerExt
    {
        private AdminContext dbContext;
        public RoleMenuController(AdminContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("create")]
        public APIResponse CreateRoleMenu()
        {
            var json = GetBodyJson<RoleMenuCreateReq>();

            SystemRoleMenuService.CreateRoleMenu(dbContext, json);
            return OK();
        }

        [HttpPost("selectbyid")]
        public APIResponse SelectRoleMenuByRole_ID()
        {
            var json = GetBodyJson<RoleMenuSelectByIDReq>();
            RoleMenuSelectByIDResp res = SystemRoleMenuService.SelectRoleMenuByRole_ID(dbContext, json);
            return OK(res);
        }
    }
}
