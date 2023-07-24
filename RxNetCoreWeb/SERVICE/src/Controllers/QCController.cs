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

namespace SPCService
{
    [Route("api/qc")]
    [ApiController]
    public class QCController : ControllerExt
    {
        private SpcContext dbContext;
        public QCController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("GetQCList")]
        public APIResponse getQCList()
        {
            var json = this.GetBodyJson<QueryQCReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = QCService.GetQCList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("GetEDCPlan")]
        public APIResponse getEDCPlan()
        {
            var json = this.GetBodyJson<QueryQCReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = QCService.GetEDCPlan(dbContext, json);

            return OK(robj);
        }

        [HttpPost("GetEqp")]
        public APIResponse getEqp()
        {
            //var json = this.GetBodyJson<QueryQCReq>();
            //string sreq = JsonUtil.Serialize(json);
            var robj = QCService.GetEqp(dbContext);

            return OK(robj);
        }

        [HttpPost("UpdateQC")]
        public APIResponse updateQC()
        {
            var json = this.GetBodyJson<SaveQCReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = QCService.UpdataQC(dbContext, json);

            if(robj == "update") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("AddQC")]
        public APIResponse addQC()
        {
            var json = this.GetBodyJson<SaveQCReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = QCService.AddQC(dbContext, json);

            if (robj == "add") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("DeleteQC")]
        public APIResponse deleteQC()
        {
            var json = this.GetBodyJson<SaveQCReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = QCService.DeleteQC(dbContext, json);

            if (robj == "delete") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("DeleteQCDirect")]
        public APIResponse deleteQCDirect()
        {
            var json = this.GetBodyJson<SaveQCReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = QCService.DeleteQCDirect(dbContext, json);

            if (robj == "delete") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }
    }


}
