using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Arch;
using Microsoft.AspNetCore.Authorization;
using Protocol;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SPCService
{
    //[AuthRoles(RoleGroup.AppSetting)]
    [Route("api/setting")]
    public class AppSettingController : ControllerExt
    {

        [HttpPost("getv")]
        public async Task<APIResponse> GetV()
        {
            var req = await GetBodyJsonAsync<GetAppSettingReq>();
            var resp = await AppConfigService.GetTextV(req);
            
            return OK(resp);
        }

        [HttpPost("setv")]
        public async Task<APIResponse> SetV()
        {
            var req = await GetBodyJsonAsync<SetAppSettingReq>();

            var (err, resp) = await AppConfigService.SetTextV(req);

            if (err != ErrorCode.OK)
            {
                return err;
            }

            AppSettings.OnUpdate(req.name);
            return OK(resp);
        }
    }
}
