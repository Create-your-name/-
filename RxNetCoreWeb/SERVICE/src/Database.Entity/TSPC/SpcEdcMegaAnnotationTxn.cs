using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcMegaAnnotationTxn
    {

        public string dataCollSysId { get; set; }
        public string edcPlanId { get; set; }
        public string productName { get; set; }
        public string planId { get; set; }
        public string initialStepId { get; set; }
        public string lotId { get; set; }
        public string batchId { get; set; }
        public string stageId { get; set; }
        public string areaId { get; set; }
        public string tag1 { get; set; }
        public string tag2 { get; set; }
        public string groupHistKey { get; set; }
        public string clientId { get; set; }
        public List<CEdcRuleRes> ruleResults { get; set; }

        private CEdcRuleRpt _ruleReport;
        public bool store(out Result<bool> result)
        {
            // don't do as a sub-transaction to avoid multiple plan stores / publics

            // the rule report class is a bussable object 
            // "wrapper" for publishing information contained 
            // in this transaction, i.e. the results of 
            // evaluating rules on a data collection
            result = new Result<bool>();
            SPCErrCodes invalidSysIdErr = (SPCErrCodes.invalidSysId);
            SPCErrCodes invalidMeasSpecErr = (SPCErrCodes.invalidMeasSpecId);
            SPCErrCodes insertErr = (SPCErrCodes.cltnInsertErr);

            // prepare for out-of-collection datapoints
            const int collRefMax = 256;
            TEdcDataCollection[] collRefs = new TEdcDataCollection[collRefMax];
            int collRefCount = 0;
            const int measRefMax = 512;
            TEdcMeasurement[] measRefs = new TEdcMeasurement[measRefMax];
            int[] measToCollIndx = new int[measRefMax];
            int measRefCount = 0;
            const int dtPtRefMax = 1024;
            TEdcDataPoint[] dtPtRefs = new TEdcDataPoint[dtPtRefMax];
            int[] dtPtToMeasIndx = new int[dtPtRefMax];
            int dtPtRefCount = 0;
            TEdcDataPoint dtPtRef = new TEdcDataPoint();
            TEdcMeasurement measRef = new TEdcMeasurement();
            TEdcDataCollection collRef = new TEdcDataCollection();
            foreach (CEdcRuleRes ruleRes in ruleResults)
            {
                foreach (CEdcChartRes chartRes in ruleRes.chartResults)
                {

                    foreach (CEdcDataPtHistory histInt in chartRes.dataPointHistories)
                    {

                        int i = 0, j = 0, k = 0;
                        string dtPtSysIdStr = (histInt.dataSysId);
                        string dtPtSysId = dtPtSysIdStr;

                        dtPtRef = new TEdcDataPoint(dtPtSysId);
                        if (dtPtRef == null)
                        {
                            result.error = (invalidSysIdErr); /* purecov: inspected */
                            return false; /* purecov: inspected */
                        }
                        for (i = 0; i < dtPtRefCount; ++i)
                            if (dtPtRefs[i].sysId == dtPtRef.sysId)
                                break;
                        if (i == dtPtRefCount)
                        {
                            dtPtRefs[dtPtRefCount++] = dtPtRef;
                            if (dtPtRefCount == dtPtRefMax)
                            {
                                result.error = (insertErr); /* purecov: inspected */
                                return false; /* purecov: inspected */
                            }
                        }

                        measRef = dtPtRef.measurement;
                        if (measRef == null)
                        {
                            result.error = (invalidSysIdErr); /* purecov: inspected */
                            return false; /* purecov: inspected */
                        }
                        for (j = 0; j < measRefCount; ++j)
                            if (measRefs[j].sysId == measRef.sysId)
                                break;
                        if (j == measRefCount)
                        {
                            measRefs[measRefCount++] = measRef;
                            if (measRefCount == measRefMax)
                            {
                                result.error = (insertErr); /* purecov: inspected */
                                return false; /* purecov: inspected */
                            }
                        }
                        dtPtToMeasIndx[i] = j;

                        collRef = measRef.dataCollection;
                        if (collRef == null)
                        {
                            result.error = (invalidSysIdErr); /* purecov: inspected */
                            return false; /* purecov: inspected */
                        }
                        for (k = 0; k < collRefCount; ++k)
                            if (collRefs[k].sysId == collRef.sysId)
                                break;
                        if (k == collRefCount)
                        {
                            collRefs[collRefCount++] = collRef;
                            if (collRefCount == collRefMax)
                            {
                                result.error = (insertErr); /* purecov: inspected */
                                return false; /* purecov: inspected */
                            }
                        }
                        measToCollIndx[j] = k;

                    }
                }

            }


            // get the top level data collection
            //FwSysId dataCollSysId((const char*)_dataCollSysId);
            collRef = new TEdcDataCollection(dataCollSysId);
            if (collRef == null)
            {
                result.error = (invalidSysIdErr);
                return false;
            }

            // copy datacollection properties over to the rule report
            TEdcDataCollection.CopyToRuleRpt(ref collRef, ref _ruleReport);
            _ruleReport.dataCollSysId = dataCollSysId;

            // there is one rule result for each measurement spec
            foreach (CEdcRuleRes ruleRes in ruleResults)
            {
                CEdcRuleRes ruleResCopy = ruleRes;
                _ruleReport.ruleResults.Add(ruleResCopy);

                // there is one chart result for each chart using the measSpec.
                foreach (CEdcChartRes chartRes in ruleRes.chartResults)
                {
                    CEdcChartRes chartResCopy = (chartRes);
                    TEdcData edcData = null;
                    ruleResCopy.chartResults.Add(chartResCopy);
                    //if (!(chartResCopy = (FwEdcChartResInterchange*)ruleResCopy->addChartResult(chartResCopy)))
                    //{
                    //    result.error(insertErr); /* purecov: inspected */
                    //    return FALSE; /* purecov: inspected */
                    //}

                    // there is one datapointhistory for each datapoint with violations
                    foreach (CEdcDataPtHistory histInt in chartRes.dataPointHistories)
                    {
                        string dtPtSysId = histInt.dataSysId;
                        int k = 0;
                        for (; k < dtPtRefCount; ++k)
                            if (dtPtRefs[k].sysId == dtPtSysId)
                                break;
                        if (k == dtPtRefCount)
                        {
                            result.error = (invalidSysIdErr);
                            return false;
                        }

                        dtPtRef = dtPtRefs[k];
                        dtPtRef.markDirty();
                        int j = dtPtToMeasIndx[k];
                        measRef = measRefs[j];
                        measRef.markDirty();
                        int i = measToCollIndx[j];
                        collRef = collRefs[i];
                        collRef.markDirty();

                        TEdcDataPointHistory histRef;
                        List<OracleParameter> dataSet = new List<OracleParameter>();
                        List<TEdcDataPointHistory> fetchColl = new List<TEdcDataPointHistory>(); ;
                        string whereClause = ("dataSysId=:dataSysId");

                        SpcDbBindItem.bindValue(":dataSysId", dtPtRef.sysId, ref dataSet);
                        if (StringUtil.NullString(histInt.chart))
                        {
                            whereClause = whereClause + " and chart is null";
                        }
                        else if (histInt.chart != "*")
                        {
                            whereClause = whereClause + " and chart=:chart";
                            SpcDbBindItem.bindValue(":chart", histInt.chart, ref dataSet);
                        }
                        if (StringUtil.NullString(histInt.graph))
                        {
                            whereClause = whereClause + " and graph is null";
                        }
                        else if (histInt.graph != "*")
                        {
                            whereClause = whereClause + " and graph=:graph";
                            SpcDbBindItem.bindValue(":graph", histInt.graph, ref dataSet);
                        }
                        if (StringUtil.NullString(histInt.dataset))
                        {
                            whereClause = whereClause + " and dataset is null";
                        }
                        else if (histInt.dataset != "*")
                        {
                            whereClause = whereClause + " and dataset=:dataset";
                            SpcDbBindItem.bindValue(":dataset", histInt.dataset, ref dataSet);
                        }

                        // Now fetch matching rows
                        fetchColl = TEdcDataPointHistory.fetchWhere<TEdcDataPointHistory>(whereClause, dataSet, true);


                        if (fetchColl == null || fetchColl.Count == 0)
                        {
                            // if history doesn't exist, create a new history
                            histRef = new TEdcDataPointHistory();
                            histRef.dataSysId = (dtPtRef.sysId);
                            histRef.chart = (histInt.chart);
                            histRef.graph = (histInt.graph);
                            histRef.dataset = (histInt.dataset);
                            histRef.initialValue = (histInt.initialValue);  // client sets

                            // get the data type
                            string dtype;
                            TEdcMeasurementSpec specRef = new TEdcMeasurementSpec();
                            try
                            {
                                specRef = measRef.getMeasurementSpec();
                            }
                            catch
                            {

                                result.error = (SPCErrCodes.globalErr);
                                return false;
                            }
                            if (specRef == null)
                            {
                                result.error = (invalidMeasSpecErr);
                                return false;
                            }
                            dtype = specRef.dataType;
                            histRef.dataType = (dtype);
                        }
                        else
                        {
                            histRef = fetchColl[0];
                        }

                        if (histRef == null)
                        {
                            result.error = SPCErrCodes.unexpectedNilObj; /* purecov: inspected */
                            return false; /* purecov: inspected */
                        }

                        CEdcDataPtHistory histCopy = histRef.makeInterchange();
                        chartResCopy.dataPointHistories.Add(histCopy);


                        // NOTE: we are only going to pass on new annotations from this
                        // txn to the rule report bbd.
                        foreach (CEdcAnnotation noteInt in histInt.annotations)
                        {
                            // create the annotation
                            TEdcAnnotation noteRef = new TEdcAnnotation(noteInt);
                            try
                            {
                                histRef.addAnnotation(noteRef);
                            }
                            catch
                            {
                                result.error = (SPCErrCodes.globalErr); /* purecov: inspected */
                                return false; /* purecov: inspected */
                            }

                            CEdcAnnotation noteCopy = (noteInt);

                            try
                            {
                                histCopy.annotations.Add(noteCopy);
                            }
                            catch
                            {
                                result.error = (insertErr); /* purecov: inspected */
                                return false;
                            }
                        }

                        // if any (rule violation) annotations were reported
                        histCopy.hasViolations = (histRef.hasViolations);

                        // NOTE: because we aren't using a persistent collection for
                        // owned sub-objects, need to add history (possibly anew) 
                        // to the data point so that it gets picked up in addChildrenIfDirty
                        try
                        {
                            dtPtRef.addHistory(histRef);
                        }
                        catch
                        {
                            result.error = (SPCErrCodes.globalErr); /* purecov: inspected */
                            return false; /* purecov: inspected */
                        }

                        if (edcData != null)
                        {
                            CEdcDataCollection dataInt = (edcData.interchanges[0]);
                            if (dataInt.dataCollSysId == collRef.sysId)
                            {
                                CEdcMeas mInter = null;
                                foreach (CEdcMeas measInt in dataInt.measurements)
                                {
                                    if (measInt.measurementSpec == measRef.measurementSpec)
                                    {
                                        mInter = measInt;
                                        break;
                                    }
                                }
                                 ;
                                if (mInter != null)
                                {
                                    TEdcMeasurementSpec specRef = measRef.getMeasurementSpec();
                                    if (specRef == null)
                                    {
                                        // missing measurementSpec 
                                        result.error = SPCErrCodes.invalidMeasSpecId;  /* purecov: inspected */
                                        return false;
                                    }
                                    mInter = measRef.makeInterchange(specRef);
                                    try
                                    {
                                        dataInt.measurements.Add(mInter);
                                    }
                                    catch
                                    {

                                        result.error = SPCErrCodes.unableToConstructInter; /* purecov: inspected */
                                        return false;
                                    }
                                }
                                CEdcDataPoint  dataPtInter = null;
                                foreach (CEdcDataPoint  ptInt  in mInter.datapoints ) 
        {
                                    if (ptInt.dataSysId == dtPtRef.sysId )
                                    {
                                        dataPtInter =  ptInt;
                                        break;
                                    }
                                }
                                 ;
                                if (dataPtInter==null)
                                {
                                    dataPtInter = dtPtRef.makeInterchange(false );
                                    try
                                    {
                                        mInter.datapoints.Add(dataPtInter);
                                    }
                                    catch
                                    {
                                        result.error = SPCErrCodes.unableToConstructInter; /* purecov: inspected */
                                        return false;
                                    }
                                   
                                    dataPtInter.modified =(true );
                                }
                               CEdcDataPtHistory histInter =  histRef.makeInterchange();
                                
                                dataPtInter.dataPointHistories.Add(histInter);
                                 
                            }
                            else
                            {
        //                        FOREACH_REF(edcData.mailboxes(), FwString, mailboxName)


        //{
        //                            const FwObject* objPtr =
        //                            _bbdMessages.insert(*edcData.getObject(), mailboxName);
        //                            if (!objPtr)
        //                            {
        //                                result.error(insertErr); /* purecov: inspected */
        //                                return FALSE;
        //                            }
        //                        }
        //                        END_FOREACH;
                                edcData = null;
                            }
                        }
                        if (!(edcData==null))
                        {
                            // prepare to publish the rule violation update
      //                      FwTry


      //{
      //                          edcData = FwEdcData::asBBDMsg(collRef, measRef, dtPtRef, histRef);
      //                      }
      //                      FwCatchAll()


      //{
      //                          result.error(FwError::getGlobal()); /* purecov: inspected */
      //                          return FALSE; /* purecov: inspected */
      //                      }
                        }
                    } 

                    if (edcData!=null)
                    {
                        //FOREACH_REF(edcData.mailboxes(), FwString, mailboxName)
                        //{
                        //    const FwObject* objPtr =
                        //            _bbdMessages.insert(*edcData.getObject(), mailboxName);
                        //    if (!objPtr)
                        //    {
                        //        result.error(insertErr); /* purecov: inspected */
                        //        return FALSE;
                        //    }
                        //}
                        //END_FOREACH;
                    }

                } 
            } 

            // dataCollection store will publish changes to data point annotations
            for (int i = 0; i < collRefCount; i++)
            {
                bool err = collRefs[i].store();
                if (err)
                {
                    result.error=(SPCErrCodes.storeErr); /* purecov: inspected */
                    return false ;
                }
            }

            return true ;
        }



    }
}

