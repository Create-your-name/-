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
using SPCService.Helper;
using SPCService.src.Database.Entity.EQP;
using SPCService.src.QCService;

namespace SPCService
{
    [Route("api/eqp")]
    [ApiController]
    public class EQPController : ControllerExt
    {
        private SpcContext dbContext;
        public EQPController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("getAreaEqpList")]
        public APIResponse getAreaEqpList()
        {
            var robj = EqpService.getAreaEqpList(dbContext);

            return OK(robj);
        }

        [HttpPost("getEqpDetail")]
        public APIResponse getEqpDetail()
        {
            var json = this.GetBodyJson<QueryEqpReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EqpService.getEqpDetail(dbContext,json);

            return OK(robj);
        }

        [HttpPost("getEqpParts")]
        public APIResponse getEqpParts()
        {
            var json = this.GetBodyJson<QueryEqpPartsReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EqpService.getEqpParts(dbContext, json);

            return OK(robj);
        }

        [HttpPost("addEqpParts")]
        public APIResponse addEqpParts()
        {
            var json = this.GetBodyJson<SaveEqpPartsReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EqpService.addEqpParts(dbContext, json);

            if (robj == "success") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("updateEqpParts")]
        public APIResponse updateEqpParts()
        {
            var json = this.GetBodyJson<UpdateEqpPartsReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EqpService.updateEqpParts(dbContext, json);

            if (robj == "success") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("deleteEqpParts")]
        public APIResponse deleteEqpParts()
        {
            var json = this.GetBodyJson<SaveEqpPartsReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EqpService.deleteEqpParts(dbContext, json);

            if (robj == "success") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }
    }
}
