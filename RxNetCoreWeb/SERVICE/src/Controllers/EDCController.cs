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
    [Route("api/edc")]
    [ApiController]
    public class EDCController : ControllerExt
    {
        private SpcContext dbContext;
        public EDCController(SpcContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("SaveEdcMeasurementSpec")]
        public APIResponse SaveEdcMeasurementSpec()
        {
            var json = GetBodyJson<SaveEdcMeasurementSpecReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcMDataService.SaveEdcMeasurementSpec(dbContext, GetClientInfo(), json.Object);

            return OK(robj);
        }

        [HttpPost("ModifyMeasurementSpec")]
        public APIResponse ModifyMeasurementSpec()
        {
            var json = this.GetBodyJson<SaveEdcMeasurementSpecReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcMeasurementSpecService.UpdateCEdcMeasurementSpec(dbContext, GetClientInfo(), json.Object);

            return OK(robj);
        }

        
        [HttpPost("QueryEdcMeasurementSpecs")]
        public APIResponse QueryEdcMeasurementSpecs()
        {

            var json = this.GetBodyJson<QueryEdcMeasurementSpecsReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcMDataService.QueryEdcMeasurementSpecs(dbContext, json);

            return OK(robj);
        }
        [HttpPost("QueryEdcCharts")]
        public APIResponse QueryEdcCharts()
        {

            var json = this.GetBodyJson<QueryEdcChartsReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcMDataService.QueryEdcCharts(dbContext, json);

            return OK(robj);
        }

        [HttpPost("QueryEdcSystemRules")]
        public APIResponse QueryEdcSystemRules()
        {
  
            var robj = EdcMDataService.QueryEdcSystemRules(dbContext );

            return OK(robj);
        }
        [HttpPost("QueryEdcCustomRules")]
        public APIResponse QueryEdcCustomRules()
        {

            var robj = EdcMDataService.QueryEdcCustomRules(dbContext); 
            return OK(robj);
        }

        [HttpPost("QueryEdcChartTemplates")]
        public APIResponse QueryEdcChartTemplates()
        { 
             
            var robj = EdcMDataService.QueryEdcChartTemplates(dbContext );

            return OK(robj);
        }
        
        [HttpPost("GetMeasurementSpecs")]
        public APIResponse GetMeasurementSpecs()
        {
            var json = this.GetBodyJson<QueryEdcMeasurementSpecsReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcMeasurementSpecService.GetCEdcMeasurementSpecs(dbContext, json.Name);

            return OK(robj);
        }

        [HttpPost("SpcEdcDataTxn")]
        public APIResponse SpcEdcDataTxn()
        {
            var json = this.GetBodyJson<CEdcDataCollection>();

            string sreq = JsonUtil.Serialize(json); 
             var robj = EdcTxnService.SpcEdcDataTxn(json); 
            return OK(robj);
        }

        [HttpPost("SpcEdcQueryChartsTxn")]
        public APIResponse SpcEdcQueryChartsTxn()
        {
            var json = this.GetBodyJson<SPCEdcQueryChartsTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcQueryChartsTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcQueryChartsWithStatusTxn")]
        public APIResponse SpcEdcQueryChartsWithStatusTxn()
        {
            var json = this.GetBodyJson<SpcEdcQueryChartsWithStatusTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcQueryChartsWithStatusTxn(json);
            return OK(robj);
        }


        [HttpPost("SPCEdcQueryChartTxn")]
        public APIResponse SPCEdcQueryChartTxn()
        {
            var json = this.GetBodyJson<SPCEdcQueryChartTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SPCEdcQueryChartTxn(json);
            return OK(robj);
        }
        [HttpPost("SPCEdcQueryDataTxn")]
        public APIResponse SPCEdcQueryDataTxn()
        {
            var json = this.GetBodyJson<SPCEdcQueryDataTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SPCEdcQueryDataTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcAnnotationTxn")]
        public APIResponse SpcEdcAnnotationTxn()
        {
            var json = this.GetBodyJson<SpcEdcAnnotationTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcAnnotationTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcFetchDataTxn")]
        public APIResponse SpcEdcFetchDataTxn()
        {
            var json = this.GetBodyJson<SpcEdcFetchDataTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcFetchDataTxn (json);
            return OK(robj);
        }
        [HttpPost("SpcEdcQueryPointTxn")]
        public APIResponse SpcEdcQueryPointTxn()
        {
            var json = this.GetBodyJson<SpcEdcQueryPointTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcQueryPointTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcCreateSpcRuleTxn")]
        public APIResponse SpcEdcCreateSpcRuleTxn()
        {
            var json = this.GetBodyJson<SpcEdcCreateSpcRuleTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcCreateSpcRuleTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcDeleteSpcRuleTxn")]
        public APIResponse SpcEdcDeleteSpcRuleTxn()
        {
            var json = this.GetBodyJson<SpcEdcDeleteSpcRuleTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcDeleteSpcRuleTxn(json);
            return OK(robj);
        }

        [HttpPost("SpcEdcExcludePointTxn")]
        public APIResponse SpcEdcExcludePointTxn()
        {
            var json = this.GetBodyJson<SpcEdcExcludePointTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcExcludePointTxn(json);
            return OK(robj);
        }

        [HttpPost("SpcEdcFetchMeasSpecTxn")]
        public APIResponse SpcEdcFetchMeasSpecTxn()
        {
            var json = this.GetBodyJson<SpcEdcFetchMeasSpecTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcFetchMeasSpecTxn(json);
            return OK(robj);
        }

        [HttpPost("SpcEdcListChartsTxn")]
        public APIResponse SpcEdcListChartsTxn()
        {
            var json = this.GetBodyJson<SpcEdcListChartsTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcListChartsTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcListPlansTxn")]
        public APIResponse SpcEdcListPlansTxn()
        {
            var json = this.GetBodyJson<SpcEdcListPlansTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcListPlansTxn(json);
            return OK(robj);
        }

        [HttpPost("SpcEdcListSpcRulesTxn")]
        public APIResponse SpcEdcListSpcRulesTxn()
        {
            var json = this.GetBodyJson<SpcEdcListSpcRulesTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcListSpcRulesTxn(json);
            return OK(robj);
        }

        [HttpPost("SpcEdcMegaAnnotationTxn")]
        public APIResponse SpcEdcMegaAnnotationTxn()
        {
            var json = this.GetBodyJson<SpcEdcMegaAnnotationTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcMegaAnnotationTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcQueryContextTxn")]
        public APIResponse SpcEdcQueryContextTxn()
        {
            var json = this.GetBodyJson<SpcEdcQueryContextTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcQueryContextTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcQueryPlanTxn")]
        public APIResponse SpcEdcQueryPlanTxn()
        {
            var json = this.GetBodyJson<SpcEdcQueryPlanTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcQueryPlanTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcQuerySpcRuleTxn")]
        public APIResponse SpcEdcQuerySpcRuleTxn()
        {
            var json = this.GetBodyJson<SpcEdcQuerySpcRuleTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcQuerySpcRuleTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcUpdateSpcRuleTxn")]
        public APIResponse SpcEdcUpdateSpcRuleTxn()
        {
            var json = this.GetBodyJson<SpcEdcUpdateSpcRuleTxnReq>();

            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcUpdateSpcRuleTxn(json);
            return OK(robj);
        }
        



        [HttpPost("DeleteMeasurementSpec")]
        public APIResponse DeleteMeasurementSpecs()
        {
            var json = this.GetBodyJson<DeleteMeasurementSpecReq>();

            string sreq = JsonUtil.Serialize(json);
            EdcMeasurementSpecService.DeleteCEdcMeasurementSpecByName(dbContext, GetClientInfo(), json.Name);

            return OK();
        }


        [HttpPost("SpcEdcDeleteObjectsTxn")]
        public APIResponse SpcEdcDeleteObjectsTxn()
        { 
            var json = this.GetBodyJson<SpcEdcDeleteObjectsTxnReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj =   EdcTxnService.SpcEdcDeleteObjectsTxn(json); 
            return OK(robj); 
        }
        [HttpPost("SpcEdcDeleteSingleObjectTxn")]
        public APIResponse SpcEdcDeleteSingleObjectTxn()
        {
            var json = this.GetBodyJson<SpcEdcDeleteSingleObjectTxnReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcDeleteSingleObjectTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcFetchObjectsTxn")]
        public APIResponse SpcEdcFetchObjectsTxn()
        {
            var json = this.GetBodyJson<SpcEdcFetchObjectsTxnReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcFetchObjectsTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcFetchSingleObjectTxn")]
        public APIResponse SpcEdcFetchSingleObjectTxn()
        {
            var json = this.GetBodyJson<SpcEdcFetchSingleObjectTxnReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcFetchSingleObjectTxn(json);
            return OK(robj);
        }
        [HttpPost("SpcEdcSaveObjectsTxn")]
        public APIResponse SpcEdcSaveObjectsTxn()
        {
            var json = this.GetBodyJson<SpcEdcSaveObjectsTxnReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcSaveObjectsTxn(json);
            return OK(robj);
        }

        [HttpPost("SpcEdcSaveSingleObjectTxn")]
        public APIResponse SpcEdcSaveSingleObjectTxn()
        {
            var json = this.GetBodyJson<SpcEdcSaveSingleObjectTxnReq>();
            string sreq = JsonUtil.Serialize(json);
            var robj = EdcTxnService.SpcEdcSaveSingleObjectTxn(json);
            return OK(robj);
        }



        [HttpPost("get-plan-list")]
        public APIResponse GetEdcPlanList()
        {

            var obj = EdcPlanService.GetCEdcPlans(dbContext, null);

            return OK(obj);
        }

        [HttpPost("get-plan")]
        public APIResponse GetEdcPlan()
        {

            var obj = EdcPlanService.GetCEdcPlan(dbContext, null);

            return OK(obj);
        }

        [HttpPost("create-plan")]
        public APIResponse CreateEdcPlan()
        {
            var req = GetBodyJson<CEdcPlanVersion>();
            var obj = EdcPlanService.CreateCEdcPlan(dbContext, GetClientInfo(),  req);

            return OK(obj);
        }

        [HttpPost("update-plan")]
        public APIResponse UpdateEdcPlan()
        {
            var req = GetBodyJson<CEdcPlanVersion>();
            var obj = EdcPlanService.UpdateCEdcPlan(dbContext, GetClientInfo(), req);

            return OK(obj);
        }

        [HttpPost("delete-plan")]
        public APIResponse DeleteEdcPlan()
        {
            //var req = GetBodyJson<CEdcPlanVersion>();
            //var obj = EdcPlanService.de(dbContext, GetClientInfo(), req);

            return OK();
        }
    }


}
