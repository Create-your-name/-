using Arch;
using System;
using System.Collections.Generic;
using System.Linq;
using SPCService.Database;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;
using SPCService.src.Framework.Common;
using Protocol;
using SPCService.BusinessModel;

namespace SPCService
{
    public class EdcTxnService
    {

        public static Result<string > SpcEdcFetchObjectsTxn(SpcEdcFetchObjectsTxnReq reqdata)
        {
            SpcEdcFetchObjectsTxn fetchObjectsTxn = new SpcEdcFetchObjectsTxn
            {
                className = reqdata.ClassName,
                sWhere = reqdata.sWhere
            };
            var cReply = fetchObjectsTxn.store();
            return cReply;
        }

        public static Result<bool> SpcEdcFetchSingleObjectTxn(SpcEdcFetchSingleObjectTxnReq reqdata)
        {
            SpcEdcFetchSingleObjectTxn edcGetSingleObjectTxn = new SpcEdcFetchSingleObjectTxn
            {
                className = reqdata.ClassName,
                sWhere = reqdata.sWhere
            };
            var cReply = edcGetSingleObjectTxn.store();
            return cReply;
        }

        public static Result<bool> SpcEdcSaveSingleObjectTxn(SpcEdcSaveSingleObjectTxnReq reqdata)
        {
            SpcEdcSaveSingleObjectTxn saveSingleObjectTxn = new SpcEdcSaveSingleObjectTxn
            {
                className = reqdata.ClassName,
                ObjectJson = reqdata.SpcObject
            };
            var cReply = saveSingleObjectTxn.store();
            return cReply;
        }

        public static Result<bool> SpcEdcSaveObjectsTxn(SpcEdcSaveObjectsTxnReq reqdata)
        {
            SpcEdcSaveObjectsTxn edcSaveObjectsTxn = new SpcEdcSaveObjectsTxn
            {
                className = reqdata.ClassName,
                ObjectsJson = reqdata.SpcObjects
            };
            var cReply = edcSaveObjectsTxn.store();
            return cReply;
        }


        public static Result<bool> SpcEdcDeleteSingleObjectTxn(SpcEdcDeleteSingleObjectTxnReq reqdata)
        {
            SpcEdcDeleteSingleObjectTxn edcDeleteSingleObjectTxn = new SpcEdcDeleteSingleObjectTxn
            {
                 className =   reqdata.ClassName,
                 ObjectJson = reqdata.SpcObject  
            };
            var cReply = edcDeleteSingleObjectTxn.store();
            return cReply;
        }


        public static Result<bool> SpcEdcDeleteObjectsTxn(SpcEdcDeleteObjectsTxnReq reqdata)
        {
            SpcEdcDeleteObjectsTxn edcDeleteObjectsTxn = new SpcEdcDeleteObjectsTxn
            {
                className = reqdata.ClassName,
                ObjectsJson = reqdata.SpcObjects
                // name = reqdata.Name 
                //   reqdata.ClassName  为 C开头的  interchange object
                // C 反射到  T  T在反射到SPC_后保存
                //                message SpcEdcDeleteObjectsTxnReq
                //{
                //   string ClassName =1;
                //            string SpcObjects = 2;
                //        }

                //        message SpcEdcDeleteSingleObjectTxnReq
                //        {
                //   string ClassName = 1;
                //        string SpcObject = 2;
                //    }


                //    message SpcEdcFetchObjectsTxnReq
                //    {  
                //   string ClassName =1;  
                //   bool  IsDeepFetch =2;
                //   string sWhere =3;
                //    }
                //    message SpcEdcGetSingleObjectTxnReq
                //    {  
                //   string ClassName =1;  
                //   bool  IsDeepFetch =2;
                //   string sWhere =3;
                //    }
                //    message SpcEdcSaveObjectsTxnReq
                //    {  
                //   string ClassName =1;  
                //   string SpcObjects =2;
                //    }

                //    message SpcEdcSaveSingleObjectTxnReq
                //    {  
                //   string ClassName =1;  
                //   string  SpcObject  =2;
                //    }




            };
            var cEdcDataReply = edcDeleteObjectsTxn.store();
            return cEdcDataReply;
        }


        public static Result<CEdcDataReply> SpcEdcDataTxn(CEdcDataCollection dataCollection)
        {
            SpcEdcDataTxn edcDataTxn = new SpcEdcDataTxn
            {
                _interchange = dataCollection
            };
            var cEdcDataReply = edcDataTxn.store();
            return cEdcDataReply;
        }
        public static Result<CEdcChart> SPCEdcQueryChartTxn(SPCEdcQueryChartTxnReq reqdata)
        {
            SpcEdcQueryChartTxn queryChartTxn = new SpcEdcQueryChartTxn
            {
                name = reqdata.Name



            };
            var cEdcDataReply = queryChartTxn.store();
            return cEdcDataReply;
        }
        public static Result<List<CEdcChart>> SpcEdcQueryChartsTxn(SPCEdcQueryChartsTxnReq reqdata)
        {
            SpcEdcQueryChartsTxn queryChartTxn = new SpcEdcQueryChartsTxn
            {
                names = reqdata.measurementSpecs 

            };
            var cEdcDataReply = queryChartTxn.store();
            return cEdcDataReply;
        }

        public static Result<List<CEdcChartStatus>> SpcEdcQueryChartsWithStatusTxn(SpcEdcQueryChartsWithStatusTxnReq reqdata)
        {
            SpcEdcQueryChartsWithStatusTxn queryChartsWithStatusTxn = new SpcEdcQueryChartsWithStatusTxn
            {
                names = reqdata.measurementSpecs,
                SearchDays = reqdata.SearchDays 
            };
            var cEdcDataReply = queryChartsWithStatusTxn.store();
            return cEdcDataReply;
        }
        
        public static Result<TEdcData> SPCEdcQueryDataTxn(SPCEdcQueryDataTxnReq reqdata)
        {
            SpcEdcQueryDataTxn queryDataTxn = new SpcEdcQueryDataTxn
            {
                measurementSpec = reqdata.measurementSpec,
                measurementStep = reqdata.measurementStep,
                measurementResource = reqdata.measurementResource,
                processStep = reqdata.processStep,
                processResource = reqdata.processResource,
                historicalPoints = reqdata.historicalPoints,
                edcPlan = reqdata.edcPlan,
                product = reqdata.productName,
                processPlan = reqdata.planId,
                initialStep = reqdata.initialStepId,
                lot = reqdata.lotId,
                batch = reqdata.batchId,
                stage = reqdata.stageId,
                area = reqdata.areaId,
                tag1 = reqdata.tag1,
                tag2 = reqdata.tag2,
                groupHistKey = reqdata.groupHistKey,
                unitId = reqdata.unitId,
                siteId = reqdata.siteId,
                fromDate = reqdata.fromDate,
                toDate = reqdata.toDate,


                username = reqdata.userId
            };
            var cEdcDataReply = queryDataTxn.store();
            return cEdcDataReply;
        }

        public static Result<bool> SpcEdcAnnotationTxn(SpcEdcAnnotationTxnReq reqdata)
        {
            SpcEdcAnnotationTxn edcAnnotationTxn = new SpcEdcAnnotationTxn
            {
                historySysId = reqdata.historySysId,
                statusFlag = reqdata.statusFlag == "T" ? true : false,
                annotationCode = reqdata.annotationCode,
                reasonCode = reqdata.reasonCode,
                briefDescription = reqdata.briefDescription,
                detailDescription = reqdata.detailDescription,
                userId = reqdata.userId,
                datetime = reqdata.datetime
            };
            var cEdcDataReply = edcAnnotationTxn.store();
            return cEdcDataReply;
        }
        public static Result<CEdcDataCollection> SpcEdcFetchDataTxn(SpcEdcFetchDataTxnReq reqdata)
        {
            SpcEdcFetchDataTxn edcAnnotationTxn = new SpcEdcFetchDataTxn
            {
                dataCollSysId = reqdata.dataCollSysId
            };
            var cEdcDataReply = edcAnnotationTxn.store();
            return cEdcDataReply.value.interchanges[0];
        }
        public static Result<CEdcDataPtHistory> SpcEdcQueryPointTxn(SpcEdcQueryPointTxnReq reqdata)
        {
            SpcEdcQueryPointTxn edcQueryPointTxn = new SpcEdcQueryPointTxn
            {
                dataSysId = reqdata.dataSysId,
                chart = reqdata.chart,
                graph = reqdata.graph,
                dataset = reqdata.dataset,
                initialValue = reqdata.initialValue,
                annotationCode = reqdata.annotationCode
            };
            var cEdcDataReply = edcQueryPointTxn.store();
            return cEdcDataReply.value;
        }
        public static Result<bool> SpcEdcCreateSpcRuleTxn(SpcEdcCreateSpcRuleTxnReq reqdata)
        {
            SpcEdcCreateSpcRuleTxn edcCreateSpcRuleTxn = new SpcEdcCreateSpcRuleTxn
            {
                name = reqdata.name,
                reason = reqdata.reason,
                testCount = reqdata.testCount,
                outOf = reqdata.outOf,
                comparison = reqdata.comparison,
                withRespectTo = reqdata.withRespectTo,
                value = reqdata.value,
                stdDevs = reqdata.stdDevs,
                datasetName = reqdata.datasetName,
                intervalFrom = reqdata.intervalFrom,
                intervalTo = reqdata.intervalTo,

            };
            var cEdcDataReply = edcCreateSpcRuleTxn.store();
            return cEdcDataReply;
        }
        public static Result<bool> SpcEdcDeleteSpcRuleTxn(SpcEdcDeleteSpcRuleTxnReq reqdata)
        {
            SpcEdcDeleteSpcRuleTxn edcDeleteSpcRuleTxn = new SpcEdcDeleteSpcRuleTxn
            {
                name = reqdata.name
            };
            var cEdcDataReply = edcDeleteSpcRuleTxn.store();
            return cEdcDataReply;
        }

        public static Result<bool> SpcEdcExcludePointTxn(SpcEdcExcludePointTxnReq reqdata)
        {
            SpcEdcExcludePointTxn edcExcludePointTxn = new SpcEdcExcludePointTxn
            {
                historySysId = reqdata.historySysId,
                briefDescription = reqdata.briefDescription,
                detailDescription = reqdata.detailDescription,
                excludeFlag = reqdata.excludeFlag
            };

            Result<bool> result = new Result<bool>();
            var cEdcDataReply = edcExcludePointTxn.store(out result);
            return cEdcDataReply;
        }

        public static Result<CEdcMeasSpec> SpcEdcFetchMeasSpecTxn(SpcEdcFetchMeasSpecTxnReq reqdata)
        {
            SpcEdcFetchMeasSpecTxn edcFetchMeasSpecTxn = new SpcEdcFetchMeasSpecTxn
            {
                name = reqdata.name
            };
            Result<CEdcMeasSpec> result = new Result<CEdcMeasSpec>();

            //  result.value = EDCService.GetCEdcMeasurementByName1111(reqdata.name);

            var cEdcDataReply = edcFetchMeasSpecTxn.store(out result);
            return result;
        }

        public static Result<List<string>> SpcEdcListChartsTxn(SpcEdcListChartsTxnReq reqdata)
        {
            SpcEdcListChartsTxn edcListChartsTxn = new SpcEdcListChartsTxn
            {
                partition = reqdata.partition,
                measurementSpec = reqdata.measurementSpec,
                startupCheck = reqdata.startupCheck
            };
            Result<List<string>> result = new Result<List<string>>();
            var cEdcDataReply = edcListChartsTxn.store(out result);
            return result;
        }
        public static Result<List<string>> SpcEdcListPlansTxn(SpcEdcListPlansTxnReq reqdata)
        {
            SpcEdcListPlansTxn edcListPlansTxn = new SpcEdcListPlansTxn
            {
            };
            Result<List<string>> result = new Result<List<string>>();
            var cEdcDataReply = edcListPlansTxn.store(out result);
            return result;
        }
        public static Result<List<string>> SpcEdcListSpcRulesTxn(SpcEdcListSpcRulesTxnReq reqdata)
        {
            SpcEdcListSpcRulesTxn edcListSpcRulesTxn = new SpcEdcListSpcRulesTxn
            {
            };
            Result<List<string>> result = new Result<List<string>>();
            var cEdcDataReply = edcListSpcRulesTxn.store(out result);
            return result;
        }

        public static Result<bool> SpcEdcMegaAnnotationTxn(SpcEdcMegaAnnotationTxnReq reqdata)
        {
            SpcEdcMegaAnnotationTxn edcListSpcRulesTxn = new SpcEdcMegaAnnotationTxn
            {
            };
            Result<bool> result = new Result<bool>();
            var creply = edcListSpcRulesTxn.store(out result);
            return result;
        }

        public static Result<TEdcData> SpcEdcQueryContextTxn(SpcEdcQueryContextTxnReq reqdata)
        {
            SpcEdcQueryContextTxn edcQueryContextTxn = new SpcEdcQueryContextTxn
            {
                edcPlan = reqdata.edcPlanId,
                product = reqdata.productName,
                processPlan = reqdata.planId,
                initialStep = reqdata.initialStepId,
                lot = reqdata.lotId,
                batch = reqdata.batchId,
                stage = reqdata.stageId,
                area = reqdata.areaId,
                tag1 = reqdata.tag1,
                tag2 = reqdata.tag2,
                groupHistKey = reqdata.groupHistKey,
                includeMeasurements = reqdata.includeMeasurements
            };


            Result<TEdcData> result = new Result<TEdcData>();
            var creply = edcQueryContextTxn.store(out result);
            return result;
        }
        public static Result<List<CEdcPlan>> SpcEdcQueryPlanTxn(SpcEdcQueryPlanTxnReq reqdata)
        {
            SpcEdcQueryPlanTxn edcQueryPlanTxn = new SpcEdcQueryPlanTxn
            {
                planName = reqdata.planName
            };
            Result<List<CEdcPlan>> result = new Result<List<CEdcPlan>>();
            var creply = edcQueryPlanTxn.store(out result);
            return result;
        }

        public static Result<CEdcSpcCustomRule> SpcEdcQuerySpcRuleTxn(SpcEdcQuerySpcRuleTxnReq reqdata)
        {
            SpcEdcQuerySpcRuleTxn edccQuerySpcRuleTxn = new SpcEdcQuerySpcRuleTxn
            {
                name = reqdata.name
            };
            Result<CEdcSpcCustomRule> result = new Result<CEdcSpcCustomRule>();
            var creply = edccQuerySpcRuleTxn.store(out result);
            return result;
        }



        public static Result<CEdcSpcCustomRule> SpcEdcUpdateSpcRuleTxn(SpcEdcUpdateSpcRuleTxnReq reqdata)
        {
            SpcEdcUpdateSpcRuleTxn edcUpdateSpcRuleTxn = new SpcEdcUpdateSpcRuleTxn
            {
                name = reqdata.name,
                reason = reqdata.reason,
                testCount = reqdata.testCount,
                outOf = reqdata.outOf,
                comparison = reqdata.comparison,
                withRespectTo = reqdata.withRespectTo,
                value = reqdata.value,
                stdDevs = reqdata.stdDevs,
                datasetName = reqdata.datasetName,
                intervalFrom = reqdata.intervalFrom,
                intervalTo = reqdata.intervalTo,

            };
            Result<CEdcSpcCustomRule> result = new Result<CEdcSpcCustomRule>();
            var cEdcDataReply = edcUpdateSpcRuleTxn.store(out result);
            return result;
        }

    }

}

