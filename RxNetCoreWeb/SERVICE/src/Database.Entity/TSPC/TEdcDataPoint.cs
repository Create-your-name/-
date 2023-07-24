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
    [SpcDbTableName("SPC_DATAPOINT")]
    public class TEdcDataPoint : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }

        [SpcDbField("MEASUREMENT")]
        public string measurementid { get; set; }

        [SpcDbField("UNITIDENTIFIER")]
        public string unitId { get; set; }
        [SpcDbField("SITEIDENTIFIER")]
        public string siteId { get; set; }
        [SpcDbField("SAMPLEIDENTIFIER")]
        public string sampleId { get; set; }
        [SpcDbField("SEQUENCE")]
        public int sequence { get; set; }
        [SpcDbField("VALUE")]
        public string value { get; set; }
        [SpcDbField("ISEXCLUDED")]
        public bool isExcluded { get; set; }
        [SpcDbField("HASHISTORY")]
        public bool hasHistory { get; set; }
        [SpcDbField("ISDATABOUNDARY")]
        public bool isDataBoundary { get; set; }

        [SpcDbField("CREATEDATE")]
        public DateTime createdate { get; set; }

       // [SpcDbField("MEASUREMENT", true)]
        public TEdcMeasurement measurement { get; set; }
        [SpcDbField("SYSID", true,true,"DATASYSID" )]
        public List<TEdcDataPointHistory> histories { get; set; }
        public TEdcDataPoint()
        {


        }
        private const int DATA_TYPE_FLOAT = 0;
        private const int DATA_TYPE_INTEGER = 1;
        private const int DATA_FLOAT_DIV_BY_ZERO = 2;
        private const int DATA_INT_DIV_BY_ZERO = 3;
        private const int DATA_LOG_OF_NEGATIVE = 4;

        private const string PositiveInf = " TooLarge";
        private const string NegativeInf = " TooSmall";
        public TEdcDataPoint(string datasysid)
        {

            string whereClause = "sysid=:sysid";
            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcDataPoint> fetchColl = new List<TEdcDataPoint>(); 
            // First, bind data values.
            SpcDbBindItem.bindValue(":sysid", datasysid, ref dataSet);
            fetchColl = TEdcDataPoint.fetchWhere<TEdcDataPoint>(whereClause, dataSet, true); 
            if (fetchColl == null || fetchColl.Count == 0)
            {
                // no match found, invalid sysid
                throw new Exception(SPCErrCodes.invalidSysId.ToString());
            }

            AssignValue(  this ,  fetchColl[0]);

             

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
                    var oldObj = (from c in db.SPC_DATAPOINT
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_DATAPOINT>();
                    if (oldObj == null)
                        bNew = true;

                    SPC_DATAPOINT dc = new SPC_DATAPOINT();
                    dc.SYSID = sysId;
                    dc.MEASUREMENT = measurement.sysId;
                    dc.UNITIDENTIFIER = unitId;
                    dc.SITEIDENTIFIER = siteId;
                    dc.SAMPLEIDENTIFIER = sampleId;
                    dc.SEQUENCE = sequence;
                    dc.ISEXCLUDED = isExcluded ? "T" : "F";
                    dc.HASHISTORY = hasHistory ? "T" : "F";
                    dc.ISDATABOUNDARY = isDataBoundary ? "T" : "F";


                    if (bNew)
                        db.SPC_DATAPOINT.Add(dc);
                    if (hasHistory)
                    {
                        foreach (TEdcDataPointHistory history in histories)
                        {

                            history.Save();
                        }
                    }

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
        public TEdcDataPoint(CEdcDataPoint cEdcDataPt)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcDataPoint));
            unitId = cEdcDataPt.unitId;

            siteId = cEdcDataPt.siteId;
            sampleId = cEdcDataPt.sampleId;
            sequence = cEdcDataPt.sequence;
            value = cEdcDataPt.value;
            isExcluded = cEdcDataPt.isExcluded;
            isDataBoundary = cEdcDataPt.isDataBoundary;
            hasHistory = cEdcDataPt.hasHistory;


            histories = new List<TEdcDataPointHistory>();
            foreach (CEdcDataPtHistory cEdcDataPtHis in cEdcDataPt.dataPointHistories)
            {
                histories.Add(new TEdcDataPointHistory(cEdcDataPtHis));
            }



        }

        public bool store()
        {

            TrySaveObject(this);




            return true;
        }

        public CEdcDataPoint makeInterchange(bool includeHistories)
        {
            // create an interchange object out of this
            // NOTE: The modified flag has to be set at point of usage of the 
            // interchange, because it also depends on publication status
            // of the plan instance!!

            CEdcDataPoint dataPtInt = new CEdcDataPoint();
            dataPtInt.dataSysId = (sysId);
            dataPtInt.unitId = unitId;
            dataPtInt.siteId = siteId;
            dataPtInt.sampleId = sampleId;
            dataPtInt.sequence = sequence;
            dataPtInt.value = value;
            dataPtInt.isExcluded = isExcluded;
            dataPtInt.hasHistory = hasHistory;
            dataPtInt.isDataBoundary = isDataBoundary;
            if (includeHistories && hasHistory)
            {
                // get the histories
                List<TEdcDataPointHistory> fetchColl = TEdcDataPointHistory.fetchByDataSysid(sysId);

                foreach (TEdcDataPointHistory dataPointHistory in fetchColl)
                {
                    CEdcDataPtHistory historyInt = dataPointHistory.makeInterchange();

                    dataPtInt.dataPointHistories.Add(historyInt);

                }
            }

            return dataPtInt;
        }
        public void convertValue(double val, int valueType)
        {
            string reason, dataType;
            string detail;
            string annotation = "GENERAL";
            string brief = "CALCULATION";
            switch (valueType)
            {
                case DATA_TYPE_FLOAT:
                    if (val > (double)1e30 || val < (double)-1e30)
                    {
                        if (val > (double)1e30)
                        {
                            reason = "Floating Point Overflow";
                            detail = PositiveInf;
                        }
                        else
                        {
                            reason = "Floating Point Underflow";
                            detail = NegativeInf;
                        }
                    }
                    else
                    {
                        value = val.ToString();
                        return;
                    }
                    break;
                case DATA_TYPE_INTEGER:
                    if (val > int.MaxValue || val < int.MinValue)
                    {
                        if (val > int.MaxValue)
                        {
                            reason = "Integer Overflow";
                            detail = PositiveInf;
                        }
                        else
                        {
                            reason = "Integer Underflow";
                            detail = NegativeInf;
                        }
                    }
                    else
                    {
                        value = (SpcEdcCalculator.SpcEdcDoubleToInt(val)).ToString();
                        return;
                    }
                    break;
                case DATA_LOG_OF_NEGATIVE:
                    reason = "Log of Non-positive";
                    detail = "Log of " + val;
                    break;
                default:        // DATA_DIV_BY_ZERO
                    reason = "Division by Zero";
                    detail = PositiveInf;
                    break;
            }
            switch (valueType)
            {
                case DATA_LOG_OF_NEGATIVE:
                case DATA_TYPE_FLOAT:
                case DATA_FLOAT_DIV_BY_ZERO:
                    dataType = "FLOAT";
                    break;
                default:
                    dataType = "INTEGER";
                    break;
            }
            value = (valueType == DATA_LOG_OF_NEGATIVE ? "" : detail);
            Annotation(annotation, reason, brief, detail, dataType, true);
        }

        public CEdcDataPoint GetCEdcData()
        {
            return new CEdcDataPoint()
            {
                dataSysId = sysId,
                unitId = unitId,
                siteId = siteId,
                sampleId = sampleId,
                sequence = sequence,
                value = value,
                isExcluded = isExcluded,
                isDataBoundary = isDataBoundary,
                hasHistory = hasHistory

            };
        }

        public void addHistory(TEdcDataPointHistory aRef)
        {


            if (aRef == null)
            {
                throw new System.Exception(SPCErrCodes.unexpectedNilObj.ToString());

            }
            bool isDuplicate = false;
            // HISTORY_DUPLICATES_CHECK
            if (!(histories == null))
            {
                foreach (TEdcDataPointHistory histRef in histories)
                {
                    if (aRef.chart == histRef.chart
                        && aRef.graph == histRef.graph
                        && aRef.dataset == histRef.dataset
                        && aRef.initialValue == histRef.initialValue)
                    {
                        isDuplicate = true;
                        break;
                    }
                }
            }
            else
            {
                histories = new List<TEdcDataPointHistory>();
            }


            bool insertOk = true;
            if (!isDuplicate)
            {
                histories.Add(aRef);
                insertOk = true;
            }

            if (insertOk)
            {
                hasHistory = true;
                isDataBoundary = aRef.isDataBoundary;
                // NAH 990511: don't switch datapoint's isExcluded based on history
                // if (aRef->isExcluded())
                //   isExcluded(TRUE);
                aRef.dataSysId = sysId;

            }
            else
            {
                // insert failed
                throw new System.Exception(SPCErrCodes.cltnInsertErr.ToString());

            }
        }


        public bool Annotation(string annotation, string reason,
                string brief, string detailDesc,
               string dataType, bool newPoint,
               bool dataModify = false)
        {
            TEdcDataPointHistory histRef = new TEdcDataPointHistory(); ;
            bool foundGenHist = false;
            bool isNewDataHistory = false;
            string chartNameEtc = ""; ;

            if (dataModify)
                chartNameEtc = "NONE";

            if (!newPoint || hasHistory)
            {
                if (histories == null || histories.Count == 0)
                {
                    //FwStorageAdaptor& storadpt = FwEdcDataPoint::classStorageAdaptor();
                    //FwTry
                    //{
                    //    postFetchFrom(storadpt);
                    //    }
                    //    FwCatchAll()
                    //    {
                    //        return FwError::getGlobal();
                    //    }
                }
                if (histories == null || histories.Count == 0)
                {
                    hasHistory = false;
                }
                else
                {
                    foreach (TEdcDataPointHistory aRef in histories)
                    {
                        if (aRef.chart == chartNameEtc
                            && aRef.graph == chartNameEtc
                            && aRef.dataset == chartNameEtc)
                        {
                            foundGenHist = true;
                            histRef = aRef;
                            break;
                        }
                    }
                }
            }

            // instead of 'else': use inverted condition and evaluate again
            if (!foundGenHist)
            {
                isNewDataHistory = true;
                histRef = new TEdcDataPointHistory();
                histRef.chart = chartNameEtc;
                histRef.graph = chartNameEtc;
                histRef.dataset = chartNameEtc;
                histRef.dataSysId = sysId;
                histRef.initialValue = value;
                histRef.dataType = dataType;
            }
            // make sure history gets the isExcluded state too
            if (isExcluded)
            {
                histRef.isExcluded = true;
            }
            // add annotation to data point history

            TEdcAnnotation noteRef = new TEdcAnnotation();
            noteRef.annotationCode = annotation;
            noteRef.reasonCode = reason;
            noteRef.briefDescription = brief;
            noteRef.detailDescription = detailDesc;
            noteRef.username = "EDCsrv";

            histRef.addAnnotation(noteRef);

            // add history to data point
            if (isNewDataHistory)
            {

                addHistory(histRef);

            }
            return true;
        }
    }




}
