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
    [Route("api/bm")]
    [ApiController]
    public class BMController : ControllerExt
    {
        private SpcContext dbContext;
        public BMController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("getBMForm")]
        public APIResponse getBMForm()
        {
            var json = this.GetBodyJson<QueryBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.GetBMFormList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBMFormCheckList")]
        public APIResponse getBMFormCheckList()
        {
            var json = this.GetBodyJson<QueryBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.getBMFormCheckList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("addBMForm")]
        public APIResponse addBMForm()
        {
            var json = this.GetBodyJson<SaveBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.addBMForm(dbContext, json);

            if (robj == "add") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("updateBMForm")]
        public APIResponse updateBMForm()
        {
            var json = this.GetBodyJson<SaveBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.updateBMForm(dbContext, json);

            if (robj == "update") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("deleteBMForm")]
        public APIResponse deleteBMForm()
        {
            var json = this.GetBodyJson<SaveBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.deleteBMForm(dbContext, json);

            if (robj == "delete") return OK("success");
            else
            {
                return OK(robj.ToString());
            }
        }

        [HttpPost("getPMBMHis")]
        public APIResponse getPMBMHis()
        {
            var json = this.GetBodyJson<QueryPMBMHisReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.getPMBMHis(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getPMBMHisCheckList")]
        public APIResponse getPMBMHisCheckList()
        {
            var json = this.GetBodyJson<QueryBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.getPMBMHisCheckList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBMHis")]
        public APIResponse getBMHis()
        {
            var json = this.GetBodyJson<QueryBMHisReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.getBMHis(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBMGroupHis")]
        public APIResponse getBMGroupHis()
        {
            var json = this.GetBodyJson<QueryBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.getBMGroupHis(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBMHisChartCheckList")]
        public APIResponse getBMHisChartCheckList()
        {
            var json = this.GetBodyJson<QueryBMFormReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.getBMHisChartCheckList(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBMChartPoint")]
        public APIResponse getBMChartPoint()
        {
            var json = this.GetBodyJson<QueryBMChartPointReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = BMService.getBMChartPoint(dbContext, json);

            return OK(robj);
        }
    }
}
