using Arch;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using Protocol;
using SPCService.Database;
using System.Linq;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;
using Oracle.ManagedDataAccess.Client;

namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_DATAPOINTHISTORY")]
    public class TEdcDataPointHistory : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("DATASYSID")]
        public string dataSysId { get; set; }
        [SpcDbField("CHART")]
        public string chart { get; set; }
        [SpcDbField("GRAPH")]
        public string graph { get; set; }
        [SpcDbField("DATASET")]
        public string dataset { get; set; }
        [SpcDbField("INITIALVALUE")]
        public string initialValue { get; set; }
        [SpcDbField("DATATYPE")]
        public string dataType { get; set; }
        [SpcDbField("ISEXCLUDED")]
        public bool isExcluded { get; set; }
        [SpcDbField("HASVIOLATIONS")]
        public bool hasViolations { get; set; }
        [SpcDbField("HASCOMMENTS")]
        public bool hasComments { get; set; }
        [SpcDbField("ISDATABOUNDARY")]
        public bool isDataBoundary { get; set; }
        [SpcDbField("INOCAP")]
        public bool isOCAP { get; set; } 
        [SpcDbField("TIMESTAMP")]

        public int timestamp { get; set; }

        [SpcDbField("MEASUREMENTSPEC")]
        public string MeasurementSpec { get; set; }
        [SpcDbField("DATACREATETIME")]
        public string DataCreateTime { get; set; }

        [SpcDbField("SYSID", true, true, "HISTORYSYSID")] 
        public List<TEdcAnnotation> annotations { get; set; }

        public TEdcDataPointHistory()
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcDataPointHistory));
        }
        public TEdcDataPointHistory(string dataHissysid)
        {
            //sysId = dataHissysid;
            //SpcContext db = new SpcContext();
            //var query = (from c in db.SPC_DATAPOINTHISTORY
            //             where c.SYSID == dataHissysid
            //             select c).FirstOrDefault<SPC_DATAPOINTHISTORY>();
            //if (query != null)
            //{
            //    dataSysId = query.DATASYSID;
            //    chart = query.CHART;
            //    graph = query.GRAPH;
            //    dataset = query.DATASET;
            //    initialValue = query.INITIALVALUE;
            //    dataType = query.DATATYPE;
            //    isExcluded = query.ISEXCLUDED == "T" ? true : false;
            //    hasViolations = query.HASVIOLATIONS == "T" ? true : false;
            //    hasComments = query.HASCOMMENTS == "T" ? true : false;
            //    isDataBoundary = query.ISDATABOUNDARY == "T" ? true : false; 
            //}

            string whereClause = "sysid=:sysid";
            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcDataPointHistory> fetchColl = new List<TEdcDataPointHistory>();
            // First, bind data values.
            SpcDbBindItem.bindValue(":sysid", dataHissysid, ref dataSet);
            fetchColl = TEdcDataPointHistory.fetchWhere<TEdcDataPointHistory>(whereClause, dataSet, true);
            if (fetchColl == null || fetchColl.Count == 0)
            {
                // no match found, invalid sysid
                throw new Exception(SPCErrCodes.invalidSysId.ToString());
            }

            AssignValue(this, fetchColl[0]);


        }

        public SPCErrCodes Save()
        {
            SPCErrCodes spcError = new SPCErrCodes();
            SpcContext db = new SpcContext();

            bool bNew = false;
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    var oldObj = (from c in db.SPC_DATAPOINTHISTORY
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_DATAPOINTHISTORY>();
                    if (oldObj == null)
                        bNew = true;

                    SPC_DATAPOINTHISTORY dc = new SPC_DATAPOINTHISTORY();
                    dc.SYSID = sysId;
                    dc.DATASYSID = dataSysId;
                    dc.CHART = chart;
                    dc.GRAPH = graph;
                    dc.DATASET = dataset;
                    dc.INITIALVALUE = initialValue;
                    dc.DATATYPE = dataType;
                    dc.HASVIOLATIONS = hasViolations ? "T" : "F";
                    dc.HASCOMMENTS = hasComments ? "T" : "F"; ;
                    dc.ISDATABOUNDARY = isDataBoundary ? "T" : "F"; ;
                    dc.INOCAP = isOCAP ? "T" : "F";  
                    dc.TIMESTAMP = 1;

                    if (bNew)
                        db.SPC_DATAPOINTHISTORY.Add(dc);

                    db.SaveChanges();
                    trans.Commit();

                }
                catch (Exception ex)
                {

                    trans.Rollback();

                }
            }
            return spcError;

        }
        public TEdcDataPointHistory(CEdcDataPtHistory cEdcDataPtHistory)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcDataPointHistory));


            chart = cEdcDataPtHistory.chart;
            graph = cEdcDataPtHistory.graph;
            dataset = cEdcDataPtHistory.dataset;
            initialValue = cEdcDataPtHistory.initialValue;
            dataType = cEdcDataPtHistory.dataType;
            isExcluded = cEdcDataPtHistory.isExcluded;
            hasViolations = cEdcDataPtHistory.hasViolations;
            hasComments = cEdcDataPtHistory.hasComments;
            isDataBoundary = cEdcDataPtHistory.isDataBoundary;

            annotations = new List<TEdcAnnotation>();
            foreach (CEdcAnnotation cEdcAnnotation in cEdcDataPtHistory.annotations)
            {
                annotations.Add(new TEdcAnnotation(cEdcAnnotation));
            }

        }

        public static List<TEdcDataPointHistory> fetchByDataSysid(string sysid)
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_DATAPOINTHISTORY
                         where c.DATASYSID == sysid
                         select new TEdcDataPointHistory()
                         {
                             sysId = c.SYSID,
                             chart = c.CHART,
                             graph = c.GRAPH,
                             dataset = c.DATASET,
                             initialValue = c.INITIALVALUE,
                             dataType = c.DATATYPE,
                             isExcluded = c.ISEXCLUDED == "T" ? true : false,
                             hasViolations = c.HASVIOLATIONS == "T" ? true : false,
                             hasComments = c.HASCOMMENTS == "T" ? true : false,
                             isDataBoundary = c.ISDATABOUNDARY == "T" ? true : false,


                         }).ToList<TEdcDataPointHistory>();

            return query;


        }


        public CEdcDataPtHistory makeInterchange()
        {
            // Construct an interchange object from this


            CEdcDataPtHistory historyInter = new CEdcDataPtHistory();

            historyInter.chart = chart;
            historyInter.graph = graph;
            historyInter.dataset = dataset;
            historyInter.initialValue = initialValue;
            historyInter.dataType = dataType;
            historyInter.isExcluded = isExcluded;
            historyInter.hasViolations = hasViolations;
            historyInter.hasComments = hasComments;
            historyInter.hasViolations = hasViolations;
            historyInter.isDataBoundary = isDataBoundary;


            //historyInter.annotations.AddRange(); 
            historyInter.dataSysId = (dataSysId);
            historyInter.historySysId = (sysId);
            historyInter.measurementSpec = (MeasurementSpec);
            historyInter.dataCreateTime = (DataCreateTime);



            return historyInter;
        }


        public void addAnnotation(TEdcAnnotation aRef)
        {
            if (annotations == null)
            {
                annotations = new List<TEdcAnnotation>();
            }
            if (aRef != null)
            {
                annotations.Add(aRef);

                //if (objPtr)  // don't get out of synch
                //{
                //    aRef = *(FwRef(FwEdcAnnotation) *)objPtr;
                aRef.historySysId = sysId;
                if (aRef.annotationCode == "VIOLATION")
                {
                    hasViolations = true;
                }
                // 19990602 ychen: annotationCode() "EXCLUSION" and "DATABOUNDARY" are handled
                //		   in notetxn.cpp.
                // 19990517 NAH: before enabling these next lines check for side effects ...

                else if (aRef.annotationCode == "EXCLUSION")
                {
                    isExcluded = true;
                }
                else if ((aRef.annotationCode == "CAUSECODE") ||
                    (aRef.annotationCode == "GENERAL"))
                {
                    hasComments = true;
                }
            }

        }
    }


}
