using Arch;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Protocol;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;
using SPCService.src.RoleService;

namespace SPCService.src.Controllers
{
    //[AuthRoles(RoleGroup.RoleManager)]
    [Route("api/role")]
    [ApiController]
    public class RoleController : ControllerExt
    {
        private AdminContext dbContext;
        public RoleController(AdminContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("create")]
        public APIResponse CreateRole()
        {
            var json = GetBodyJson<RoleCreateReq>();
            var opUser = GetJwt<UserJwt>();

            SystemRoleService.CreateRole(opUser.uname, dbContext, json);
            return OK();
        }

        [HttpPost("select")]
        public APIResponse SelectRoles()
        {
            var json = GetBodyJson<RoleSelectReq>();
            var allRoles = SystemRoleService.SelectRoles(dbContext, json).Select(u => new RoleInfoPb 
            {
                ROLE_ID = u.ROLE_ID.ToString(),
                ROLE_NAME = u.ROLE_NAME,
                ROLE_KEY = u.ROLE_KEY,
                ROLE_SORT = u.ROLE_SORT.ToString(),
                CREATE_TIME = u.CREATE_TIME.ToString(),
                STATUS = u.STATUS,
                REMARK=u.REMARK
                
            });

            return OK(allRoles);
        }

        [HttpPost("selectrolebyid")]
        public APIResponse SelectRoleByID()
        {
            var json = GetBodyJson<RoleSelectRoleByIDReq>();
            Role role = SystemRoleService.SelectRoleByID(dbContext, json);
            if(role!=null)
            {
                return OK(new RoleSelectRoleByIDResp
                {
                    ROLE_KEY=role.ROLE_KEY,
                    ROLE_NAME=role.ROLE_NAME,
                    ROLE_SORT=role.ROLE_SORT.ToString(),
                    REMARK=role.REMARK,
                    STATUS=role.STATUS
                });
            }
            else
            {
                return ErrorCode.RequestParaError;
            }
        }

        [HttpPost("delete")]
        public APIResponse DeleteRole()
        {
            var json = GetBodyJson<RoleDeleteReq>();

            SystemRoleService.DeleteRole(dbContext, json);
            return OK();
        }

        [HttpPost("update")]
        public APIResponse UpdateRole()
        {
            var json = GetBodyJson<RoleUpdateReq>();
            var jwt = GetJwt<UserJwt>();

            SystemRoleService.UpdateRole(jwt.uname, dbContext, json);
            return OK();
        }
    }
}
