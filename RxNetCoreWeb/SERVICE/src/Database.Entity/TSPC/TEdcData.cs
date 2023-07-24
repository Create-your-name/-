using Arch;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using Protocol;
using SPCService.Database;
using System.Linq;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class TEdcData
    {
        public static string formatForFile(TEdcDataCollection dataCollRef,
                       TEdcMeasurement measRef,
                       TEdcDataPoint dataPtRef,
                       string fieldSeparator,
                       string nullIndicator)
        {
            // assign all variables a value

            string edcPlan = dataCollRef.edcPlan;
            if (StringUtil.NullString(edcPlan)) edcPlan = nullIndicator;

            string product = dataCollRef.product;
            if (StringUtil.NullString(product)) product = nullIndicator;

            string processPlan = dataCollRef.processPlan;
            if (StringUtil.NullString(processPlan)) processPlan = nullIndicator;

            string initialStep = dataCollRef.initialStep;
            if (StringUtil.NullString(initialStep)) initialStep = nullIndicator;

            string lot = dataCollRef.lot;
            if (StringUtil.NullString(lot)) lot = nullIndicator;

            string batch = dataCollRef.batch;
            if (StringUtil.NullString(batch)) batch = nullIndicator;

            string stage = dataCollRef.stage;
            if (StringUtil.NullString(stage)) stage = nullIndicator;

            string area = dataCollRef.area;
            if (StringUtil.NullString(area)) area = nullIndicator;

            string tag1 = dataCollRef.tag1;
            if (StringUtil.NullString(tag1)) tag1 = nullIndicator;

            string tag2 = dataCollRef.tag2;
            if (StringUtil.NullString(tag2)) tag2 = nullIndicator;

            string groupHistKey = dataCollRef.groupHistKey;
            if (StringUtil.NullString(groupHistKey)) groupHistKey = nullIndicator;

            string modifiedDatetime;
            modifiedDatetime = TimeUtil.GetSPCTimeNoSpace(dataCollRef.modifiedDatetime);

            //// note: this code is copied from the fwedcdatacollection 
            //// datetime setter

            //int indx = dbString.first(' ');
            //if (indx > 0)
            //{
            //    // because the string index starts at 0, can use the index of 
            //    // the ' ' as the number of characters to extract from dbString.

            //    FwString newStr = dbString(0, indx);
            //    newStr << '_' << dbString.tailFrom(indx + 1);

            //    modifiedDatetime = newStr;
            //}
            //else
            //    modifiedDatetime = nullIndicator;

            string measurementSpec = measRef.measurementSpec;
            if (StringUtil.NullString(measurementSpec)) measurementSpec = nullIndicator;

            string measurementStep = measRef.measurementStep;
            if (StringUtil.NullString(measurementStep)) measurementStep = nullIndicator;

            string measurementResource = measRef.measurementResource;
            if (StringUtil.NullString(measurementResource))
                measurementResource = nullIndicator;

            string processStep = measRef.processStep;
            if (StringUtil.NullString(processStep)) processStep = nullIndicator;

            string processResource = measRef.processResource;
            if (StringUtil.NullString(processResource)) processResource = nullIndicator;

            string username = measRef.username;
            if (StringUtil.NullString(username)) username = nullIndicator;

            string dataSysId = dataPtRef.sysId;
            if (StringUtil.NullString(dataSysId)) dataSysId = nullIndicator;

            string unitId = dataPtRef.unitId;
            if (StringUtil.NullString(unitId)) unitId = nullIndicator;

            string siteId = dataPtRef.siteId;
            if (StringUtil.NullString(siteId)) siteId = nullIndicator;

            string sampleId = dataPtRef.sampleId;
            if (StringUtil.NullString(sampleId)) sampleId = nullIndicator;

            string value = dataPtRef.value;
            if (StringUtil.NullString(value)) value = nullIndicator;

            string isExcluded;
            if (dataPtRef.isExcluded)
                isExcluded = "T";
            else
                isExcluded = "F";

            string hasHistory;
            if (dataPtRef.hasHistory)
                hasHistory = "T";
            else
                hasHistory = "F";

            string isDataBoundary;
            if (dataPtRef.isDataBoundary)
                isDataBoundary = "T";
            else
                isDataBoundary = "F";

            // create an output buffer

            string linebuf = "";
            linebuf = linebuf + dataSysId + fieldSeparator
                    + edcPlan + fieldSeparator
                    + product + fieldSeparator
                    + processPlan + fieldSeparator
                    + initialStep + fieldSeparator
                    + lot + fieldSeparator
                    + batch + fieldSeparator
                    + stage + fieldSeparator
                    + area + fieldSeparator
                    + tag1 + fieldSeparator
                    + tag2 + fieldSeparator
                    + groupHistKey + fieldSeparator
                    + modifiedDatetime + fieldSeparator
                    + measurementSpec + fieldSeparator
                    + measurementStep + fieldSeparator
                    + measurementResource + fieldSeparator
                    + processStep + fieldSeparator
                    + processResource + fieldSeparator
                    + username + fieldSeparator
                    + unitId + fieldSeparator
                    + siteId + fieldSeparator
                    + sampleId + fieldSeparator
                    + value + fieldSeparator
                    + isExcluded + fieldSeparator
                    + hasHistory + fieldSeparator
                    + isDataBoundary + fieldSeparator;

            return linebuf;
        }
        private static string WildCardToRegex(string rex)
        {
            return "^" + Regex.Escape(rex).Replace("\\?", ".").Replace("\\*", ".*") + "$";
        }
        // This function will implement wildcard matching, two wildcard characters support here, 
        // '*' and '?', if a string matched wildcard pattern, return (1), otherwise return (0)
        private static int wildMatch(string data, string pat)
        {
            if (Regex.IsMatch(data, WildCardToRegex(pat)))
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        public List<CEdcDataCollection> interchanges = new List<CEdcDataCollection>();
        public void addMeasurementData(TEdcDataCollection dataCollRef,
                              TEdcMeasurement measRef,
                              TEdcMeasurementSpec specRef,
                              string unitId,
                              string siteId)
        {
            // add a measurement's worth of data to this used by FwEdcQueryDataTxn
            // NOTE: this method both throws and returns an error status 

            Exception constructErr = new Exception(SPCErrCodes.unableToConstructInter.ToString());


            CEdcDataCollection dataCollInter = dataCollRef.makeInterchange();

            interchanges.Add(dataCollInter);

            CEdcMeas mInter = measRef.makeInterchange(specRef);
            dataCollInter.measurements.Add(mInter);

            bool unitFlag = (!StringUtil.NullString(unitId));
            bool siteFlag = (!StringUtil.NullString(siteId));

            foreach (TEdcDataPoint dataPtRef in measRef.datapoints)
            {


                if (!((unitFlag && ((unitId.IndexOfAny(new char[] { '*', '?', '\'', '"' })) < 0) ?
                                    (dataPtRef.unitId != unitId) : wildMatch(dataPtRef.unitId, unitId) == 0)) ||
                      (siteFlag && ((siteId.IndexOfAny(new char[] { '*', '?', '\'', '"' })) < 0) ?
                                    (dataPtRef.siteId != siteId) : wildMatch(dataPtRef.siteId, siteId) == 0))
                {
                    CEdcDataPoint dataPtInter = dataPtRef.makeInterchange(true);
                    mInter.datapoints.Add(dataPtInter);
                }

            }

        }



        public Result<bool> addContext(TEdcDataCollection dataCollRef,
                             bool includeMeasurements)
        {
            // used by the FwEdcQueryContextTxn to provide a lightweight
            // description of incomplete data collections


            //------------ Create the interchanges -------------------

            Result<bool> result = new Result<bool>();

            SPCErrCodes constructErr = SPCErrCodes.unableToConstructInter;

            CEdcDataCollection dataCollInter = dataCollRef.makeInterchange();

            //if (!(dataCollInter && (dataCollInter = (FwEdcDataCollInterchange*)addInterchange(dataCollInter))))
            //{
            //    FwThrow(constructErr, constructErr);
            //}

            if (includeMeasurements)
            {
                // use the storage adaptor for this class and post fetch measurements now

                //FwStorageAdaptor & storadpt = FwEdcDataCollection::classStorageAdaptor();
                dataCollRef.postFetchFrom();

                // use the EDC plan to look up the meas spec, since the data coll
                // is incomplete the plan is probably still active

                TEdcPlanVersion planVRef = TEdcPlan.extractActive(dataCollRef.edcPlan);
                TEdcMeasurementSpec specRef;

                foreach (TEdcMeasurement measRef in dataCollRef.measurements)
                {

                    if (planVRef==null)
                    specRef = planVRef.findMeasurementSpec(measRef.measurementSpec );
                else
                        specRef = measRef.getMeasurementSpec();

                    if ( specRef==null )
          {
                        // missing measurementSpec
                        result.error= SPCErrCodes.invalidMeasSpecId  ;
                        return result;
                    }

                    CEdcMeas  mInter = measRef.makeInterchange(specRef);
                    dataCollInter.measurements.Add(mInter); 
                }
            }

            return result ;
        }

        public static TEdcData asReply(TEdcDataCollection dataCollRef)
        {
            // Used by FwEdcFetchDataTxn to get the data coll for a given sysId
            // Somewhat inefficient to get meas spec for interchange on a per
            // measurement basis rather than from the plan, but plan version may
            // have changed since data coll was stored


            Exception constructErr = new Exception(SPCErrCodes.unableToConstructInter.ToString());
            Exception nilErr = new Exception(SPCErrCodes.unexpectedNilObj.ToString());


            if (dataCollRef == null)
                throw nilErr;

            // note: don't exit on failure as we have another way of getting
            // the measurement spec (see below)
            TEdcPlanVersion planVRef = TEdcPlan.extractActive(dataCollRef.edcPlan);

            TEdcData edcData = new TEdcData();

            CEdcDataCollection dataCollInter = dataCollRef.makeInterchange();
            edcData.interchanges.Add(dataCollInter);

            TEdcMeasurementSpec specRef;
            foreach (TEdcMeasurement measRef in dataCollRef.measurements)
            {
                if (planVRef != null)
                    specRef = planVRef.findMeasurementSpec(measRef.measurementSpec);
                else
                    specRef = measRef.getMeasurementSpec();

                if (specRef == null)
                {
                    // missing measurementSpec
                    throw new Exception(SPCErrCodes.invalidMeasSpecId.ToString());
                }

                CEdcMeas mInter = measRef.makeInterchange(specRef);


                foreach (TEdcDataPoint dataPtRef in measRef.datapoints)
                {
                    CEdcDataPoint dataPtInter = dataPtRef.makeInterchange(false);
                    mInter.datapoints.Add(dataPtInter);
                }
                dataCollInter.measurements.Add(mInter);

            }
            return edcData;
        }


    }

}
