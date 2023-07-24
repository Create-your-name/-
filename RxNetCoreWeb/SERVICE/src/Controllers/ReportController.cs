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
using SPCService.src.Database.Entity.REPORT;

namespace SPCService
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerExt
    {
        private SpcContext dbContext;
        public ReportController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("eqpQuery1")]
        public APIResponse eqpQuery1()
        {
            var json = this.GetBodyJson<EqpQueryReq>();
            var robj = ReportService.eqpQuery1(dbContext, json);

            return OK(robj);
        }

        [HttpPost("eqpQuery2")]
        public APIResponse eqpQuery2()
        {
            var json = this.GetBodyJson<EqpQueryReq>();
            var robj = ReportService.eqpQuery2(dbContext, json);

            return OK(robj);
        }

        [HttpPost("eqpQcQuery")]
        public APIResponse eqpQcQuery()
        {
            var robj = ReportService.eqpQcQuery(dbContext);

            return OK(robj);
        }

        [HttpPost("getBStageMap")]
        public APIResponse getBStageMap()
        {
            var robj = ReportService.getBStageMap(dbContext);

            return OK(robj);
        }

        [HttpPost("addBStageMap")]
        public APIResponse addBStageMap()
        {
            var json = this.GetBodyJson<BStageMap>();
            var robj = ReportService.addBStageMap(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delBStageMap")]
        public APIResponse delBStageMap()
        {
            var json = this.GetBodyJson<BStageMap>();
            var robj = ReportService.delBStageMap(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBRepstage")]
        public APIResponse getBRepstage()
        {
            var robj = ReportService.getBRepstage(dbContext);

            return OK(robj);
        }

        [HttpPost("addBRepstage")]
        public APIResponse addBRepstage()
        {
            var json = this.GetBodyJson<BRepstage>();
            var robj = ReportService.addBRepstage(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delBRepstage")]
        public APIResponse delBRepstage()
        {
            var json = this.GetBodyJson<BRepstage>();
            var robj = ReportService.delBRepstage(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getRandyEpmTar")]
        public APIResponse getRandyEpmTar()
        {
            var robj = ReportService.getRandyEpmTar(dbContext);

            return OK(robj);
        }

        [HttpPost("addRandyEpmTar")]
        public APIResponse addRandyEpmTar()
        {
            var json = this.GetBodyJson<RandyEpmTar>();
            var robj = ReportService.addRandyEpmTar(dbContext, json);

            return OK(robj);
        }

        [HttpPost("updateRandyEpmTar")]
        public APIResponse updateRandyEpmTar()
        {
            var json = this.GetBodyJson<RandyEpmTar>();
            var robj = ReportService.updateRandyEpmTar(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delRandyEpmTar")]
        public APIResponse delRandyEpmTar()
        {
            var json = this.GetBodyJson<RandyEpmTar>();
            var robj = ReportService.delRandyEpmTar(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getWtTargetIndex")]
        public APIResponse getWtTargetIndex()
        {
            var robj = ReportService.getWtTargetIndex(dbContext);

            return OK(robj);
        }

        [HttpPost("addWtTargetIndex")]
        public APIResponse addWtTargetIndex()
        {
            var json = this.GetBodyJson<WtTargetIndex>();
            var robj = ReportService.addWtTargetIndex(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delWtTargetIndex")]
        public APIResponse delWtTargetIndex()
        {
            var json = this.GetBodyJson<WtTargetIndex>();
            var robj = ReportService.delWtTargetIndex(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getCustProductSetting")]
        public APIResponse getCustProductSetting()
        {
            var robj = ReportService.getCustProductSetting(dbContext);

            return OK(robj);
        }
        
        [HttpPost("addCustProductSetting")]
        public APIResponse addCustProductSetting()
        {
            var json = this.GetBodyJson<CustProductSetting>();
            var robj = ReportService.addCustProductSetting(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delCustProductSetting")]
        public APIResponse delCustProductSetting()
        {
            var json = this.GetBodyJson<CustProductSetting>();
            var robj = ReportService.delCustProductSetting(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBCapagroup")]
        public APIResponse getBCapagroup()
        {
            var robj = ReportService.getBCapagroup(dbContext);

            return OK(robj);
        }

        [HttpPost("addBCapagroup")]
        public APIResponse addBCapagroup()
        {
            var json = this.GetBodyJson<BCapagroup>();
            var robj = ReportService.addBCapagroup(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delBCapagroup")]
        public APIResponse delBCapagroup()
        {
            var json = this.GetBodyJson<BCapagroup>();
            var robj = ReportService.delBCapagroup(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBCapagroupMap")]
        public APIResponse getBCapagroupMap()
        {
            var robj = ReportService.getBCapagroupMap(dbContext);

            return OK(robj);
        }

        [HttpPost("addBCapagroupMap")]
        public APIResponse addBCapagroupMap()
        {
            var json = this.GetBodyJson<BCapagroupMap>();
            var robj = ReportService.addBCapagroupMap(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delBCapagroupMap")]
        public APIResponse delBCapagroupMap()
        {
            var json = this.GetBodyJson<BCapagroupMap>();
            var robj = ReportService.delBCapagroupMap(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBCapagroupType")]
        public APIResponse getBCapagroupType()
        {
            var robj = ReportService.getBCapagroupType(dbContext);

            return OK(robj);
        }

        [HttpPost("addBCapagroupType")]
        public APIResponse addBCapagroupType()
        {
            var json = this.GetBodyJson<BCapagroupType>();
            var robj = ReportService.addBCapagroupType(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delBCapagroupType")]
        public APIResponse delBCapagroupType()
        {
            var json = this.GetBodyJson<BCapagroupType>();
            var robj = ReportService.delBCapagroupType(dbContext, json);

            return OK(robj);
        }

        [HttpPost("getBCapagroupMove")]
        public APIResponse getBCapagroupMove()
        {
            var robj = ReportService.getBCapagroupMove(dbContext);

            return OK(robj);
        }

        [HttpPost("addBCapagroupMove")]
        public APIResponse addBCapagroupMove()
        {
            var json = this.GetBodyJson<BCapagroupMove>();
            var robj = ReportService.addBCapagroupMove(dbContext, json);

            return OK(robj);
        }

        [HttpPost("delBCapagroupMove")]
        public APIResponse delBCapagroupMove()
        {
            var json = this.GetBodyJson<BCapagroupMove>();
            var robj = ReportService.delBCapagroupMove(dbContext, json);

            return OK(robj);
        }
    }
}
