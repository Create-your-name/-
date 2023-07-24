using Arch;
using Microsoft.AspNetCore.Mvc;
using Protocol;
using SPCService.Database;
using SPCService.src.EQPPartService;
using System;

using SPCService.src.QCService;

using SPCService.src.EQPPartService;


namespace SPCService
{
    [Route("api/BackPar")]
    [ApiController]
    public class BackParController : ControllerExt
    {
        private SpcContext dbContext;
        public BackParController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("ConfirmData")]
        public APIResponse ConfirmData()
        {
            var json = this.GetBodyJson<ConfirmDATA>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BackParService.ConfirmData(dbContext, json);
            return OK(robj.ToString());
        }


        [HttpPost("getBackParForm")]
        public APIResponse getBMForm()
        {
            var json = this.GetBodyJson<QueryBankFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BackParService.GetBPFormList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("addParts")]
        public APIResponse addParts()
        {
            var json = this.GetBodyJson<SaveEqpParts>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BackParService.addEqpPart(dbContext, json);

            return OK(robj);
        }

        [HttpPost("updateEqpParts")]
        public APIResponse updateEqpParts()
        {
            var json = this.GetBodyJson<UpdateEqpParts>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BackParService.upEqpParts(dbContext, json);

            if (robj == "success") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("deleteEqpParts")]
        public APIResponse deleteEqpParts()
        {
            var json = this.GetBodyJson<delete>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BackParService.deleteEqp(dbContext, json);

            if (robj == "success") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }
    }
}
