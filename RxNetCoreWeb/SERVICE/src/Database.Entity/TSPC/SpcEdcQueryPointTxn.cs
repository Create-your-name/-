using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcQueryPointTxn
    {
        public string dataSysId { get; set; }
        public string chart { get; set; }
        public string graph { get; set; }
        public string dataset { get; set; }
        public string initialValue { get; set; }
        public string annotationCode { get; set; }




        public Result<CEdcDataPtHistory> store()
        {
            Result<CEdcDataPtHistory> result = new Result<CEdcDataPtHistory>();
            Exception nilErr = new Exception(SPCErrCodes.unexpectedNilObj.ToString());
            Exception badId = new Exception(SPCErrCodes.invalidSysId.ToString());
            Exception insertErr = new Exception(SPCErrCodes.cltnInsertErr.ToString());

            // validate the data sysId

            string sysId = dataSysId;
            if (SPCUtils.classIdOf(sysId) != typeof(TEdcDataPoint))
            {
                // wrong type of sysId passed
                throw badId;
            }

            TEdcDataPoint dataPtRef = new TEdcDataPoint(sysId);
            if (dataPtRef == null)
            {
                throw nilErr;
            }

            bool chartIsEmpty = (StringUtil.NullString(chart));
            TEdcDataPointHistory histRef;
            List<OracleParameter> dataSet = new List<OracleParameter>();
            List<TEdcDataPointHistory> fetchColl = new List<TEdcDataPointHistory>();
            //SPC_DATAPOINTHISTORY  @
            string whereClause = "dataSysId=:dataSysId";
            SpcDbBindItem.bindValue(":dataSysId", dataSysId, ref dataSet);

            if (chartIsEmpty)
            {
                whereClause = whereClause + " and chart is null";
            }
            else if (chart != "*")
            {
                whereClause = whereClause + " and chart=:chart";
                SpcDbBindItem.bindValue(":chart", chart, ref dataSet);
            }
            if (chartIsEmpty || StringUtil.NullString(graph))
            {
                whereClause = whereClause + " and graph is null";
            }
            else if (graph != "*")
            {
                whereClause = whereClause + " and graph=:graph";
                SpcDbBindItem.bindValue(":graph", graph, ref dataSet);
            }
            if (chartIsEmpty || StringUtil.NullString(dataset))
            {
                whereClause = whereClause + " and dataset is null";
            }
            else if (dataset != "*")
            {
                whereClause = whereClause + " and dataset=:dataset";
                SpcDbBindItem.bindValue(":dataset", dataset, ref dataSet);
            }


            fetchColl = TEdcDataPointHistory.fetchWhere<TEdcDataPointHistory>(whereClause, dataSet, true);

            if (fetchColl == null || fetchColl.Count == 0)
            {
                //# ifdef DO_NOT_ALLOW_EMPTY_CHART		/* --ychen 8/17/99 */
                //                // don't create empty datapoint histories without chartname
                //                if (chartIsEmpty)
                //                {
                //                    result.value((FwEdcDataPtHistoryInterchange*)nil);
                //                    return TRUE;
                //                }
                //#endif
                // if history doesn't exist, create a new history
                histRef = new TEdcDataPointHistory();
                histRef.dataSysId = (sysId);
                histRef.chart = (chart);
                histRef.graph = (graph);
                histRef.dataset = (dataset);
                histRef.initialValue = (initialValue);

                // get the data type
                string dtype;
                TEdcMeasurement measRef = dataPtRef.measurement;
                if (measRef == null)
                {
                    throw nilErr;
                }
                TEdcMeasurementSpec specRef = measRef.getMeasurementSpec();

                if (specRef == null)
                {
                    throw nilErr;
                }
                dtype = specRef.dataType;
                histRef.dataType = (dtype);

                // store the new history with the data point
                dataPtRef.addHistory(histRef);
                dataPtRef.store ();
                bool storStat = true;
                if (!storStat)
                {
                    throw new Exception("dataPt store error");
                }
            }
            else
            {
                histRef = fetchColl[0];
            }

            if (histRef == null)
            {
                throw (nilErr);
            }

            CEdcDataPtHistory histInt = histRef.makeInterchange();
            if (histRef.annotations != null)
            {
                foreach (TEdcAnnotation noteRef in histRef.annotations)
                {
                    CEdcAnnotation noteInt = noteRef.makeInterchange();
                    histInt.annotations.Add(noteInt);
                }
            }

            result.value = (histInt);
            return result;
        }
    }
}

