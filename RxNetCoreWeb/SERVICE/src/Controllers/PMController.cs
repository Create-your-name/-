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
    [Route("api/pm")]
    [ApiController]
    public class PMController : ControllerExt
    {
        private SpcContext dbContext;
        public PMController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("getPMForm")]
        public APIResponse getPMForm()
        {
            var json = this.GetBodyJson<QueryPMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.getPMFormList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getPMFormCheckList")]
        public APIResponse getPMFormCheckList()
        {
            var json = this.GetBodyJson<QueryPMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.getPMFormCheckList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("addPMForm")]
        public APIResponse addPMForm()
        {
            var json = this.GetBodyJson<SavePMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.addPMForm(dbContext, json);

            if (robj == "add") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("updatePMForm")]
        public APIResponse updatePMForm()
        {
            var json = this.GetBodyJson<SavePMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.updatePMForm(dbContext, json);

            if (robj == "update") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("deletePMForm")]
        public APIResponse deletePMForm()
        {
            var json = this.GetBodyJson<SavePMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.deletePMForm(dbContext, json);

            if (robj == "delete") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("getEqpType")]
        public APIResponse getEqpType()
        {
            var robj = PMService.getEqpType(dbContext);

            return OK(robj);
        }

        [HttpPost("getPMList")]
        public APIResponse getPMList()
        {
            var json = this.GetBodyJson<QueryPMReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.getPMList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("addPM")]
        public APIResponse addPM()
        {
            var json = this.GetBodyJson<SavePMReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.addPM(dbContext, json);

            if (robj == "add") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("deletePM")]
        public APIResponse deletePM()
        {
            var json = this.GetBodyJson<SavePMReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.deletePM(dbContext, json);

            if (robj == "delete") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("deletePMDirect")]
        public APIResponse deletePMDirect()
        {
            var json = this.GetBodyJson<SavePMReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.deletePMDirect(dbContext, json);

            if (robj == "delete") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("updatePM")]
        public APIResponse updatePM()
        {
            var json = this.GetBodyJson<SavePMReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.updatePM(dbContext, json);

            if (robj == "update") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("getPMHis")]
        public APIResponse getPMHis()
        {
            var json = this.GetBodyJson<QueryPMHisReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.getPMHis(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getPMHisChartCheckList")]
        public APIResponse getPMHisChartCheckList()
        {
            var json = this.GetBodyJson<QueryPMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.getPMHisChartCheckList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getPMChartPoint")]
        public APIResponse getPMChartPoint()
        {
            var json = this.GetBodyJson<QueryPMChartPointReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = PMService.getPMChartPoint(dbContext, json);

            return OK(robj);
        }
    }
}
