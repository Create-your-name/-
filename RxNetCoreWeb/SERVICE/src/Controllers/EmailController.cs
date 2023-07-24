using Arch;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Protocol;
using SPCService.Database;
using SPCService.src.Framework.Utils;

namespace SPCService
{
    [Route("api/email")]
    [ApiController]
    public class EmailController : ControllerExt
    {
        private SpcContext dbContext;
        public EmailController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("sendEmail")]
        public APIResponse sendEmail()
        {
            var json = this.GetBodyJson<SendEmailReq>();
            string sreq = JsonUtil.Serialize(json);
            Log.Trace("Send email:" + json.emailBody);
            var robj = EmailHelper.SendEmail(json.sendTo, json.sendCc, ServerConfig.GetString("emailUsername"), ServerConfig.GetString("emailPassword"), json.fromName, json.emailTitle, json.emailBody);
            //var robj = EmailHelper.SendEmail(json.sendTo, json.sendCc,"liuhai82@rxgz.crmicro.com", "A121328lh", json.fromName, json.emailTitle, json.emailBody);
            return OK("success");
        }
    }
}
