using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcQueryDataTxn : TEdcDataCollectionBase
    {

        public string measurementSpec { get; set; }
        public string measurementStep { get; set; }
        public string measurementResource { get; set; }
        public string processStep { get; set; }
        public string processResource { get; set; }

        public string unitId { get; set; }
        public string siteId { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }

        public string username { get; set; }
        public int historicalPoints
        {
            get { return _historicalPoints; }
            set { _historicalPoints = value; }
        }



        public int _numberOfGroups { get; set; }
        public int _groupSize { get; set; }

        private const string _measTableAlias = ("m");
        private const string _measTableName = ("spc_measurement");
        private const string _dataTableAlias = ("p");
        private const string _dataTableName = ("spc_datacollection");


        private int _historicalPoints = (0);
        private const string _fieldSeparator = (" ");
        private const string _nullIndicator = ("?");
        private string _filename { get; set; }

        private bool _firstAttr = true;


        private void makeSelectStatement(ref string whereClause, ref List<OracleParameter> dataSet, bool subselect)
        {
            // get the "clauses" for each table's selection criteria
            // filter selected records according to user's criteria

            _firstAttr = true;

            if (subselect)
            {
                whereClause = whereClause + makeMeasurementClause(ref dataSet) + nextWord()
                            + " datacollection in ( select sysId from "
                             + _dataTableName
                             + " where";
                _firstAttr = true;
                whereClause = whereClause + makeDataCollectionClause(ref dataSet)
                            + nextWord()
                            + " done='T' )";
            }
            else  // use a table join
            {
                // NAH 19990414 NOTE:                                                    !!
                // left-to-right order of execution is NOT guaranteed for "<<" operator  !!
                // multiple assignment needed to sequentialize function calls            !!
                whereClause = whereClause + makeMeasurementClause(ref dataSet);
                whereClause = whereClause + nextWord()
                            + " "
                             + _measTableAlias
                             + ".datacollection"
                             + "="
                             + _dataTableAlias
                             + ".sysid";
                whereClause = whereClause + makeDataCollectionClause(ref dataSet);
                whereClause = whereClause + nextWord()
                            + " "
                             + _dataTableAlias
                             + ".done='T' order by "
                             + _dataTableAlias
                             + ".modifieddatetime ";

                if ((_historicalPoints > 0)
                     || (_numberOfGroups > 0)
                     || (!StringUtil.NullString(unitId))
                     || (!StringUtil.NullString(siteId)))
                {
                    whereClause = whereClause + "desc";
                }
                else
                {
                    whereClause = whereClause + "asc";
                }
            }
        }

        private string LMakeQuery(SpcEdcQueryDataTxn txn, string colname, string coldata, ref List<OracleParameter> dataSet)
        {
            string whereClause = "";
            if (!StringUtil.NullString(coldata))
            {
                string bname = ":" + colname;

                if (coldata.IndexOf(",") >= 0)
                {
                    whereClause = txn.nextWord() + " " + colname + " IN ( " + coldata + " )";
                }
                else
                {
                    if (coldata.IndexOfAny(new char[] { '*', '?' }) >= 0)
                    {
                        whereClause = whereClause + txn.nextWord() + " " + colname + " LIKE TRANSLATE(" + bname + ", '*?', '%_')";
                    }
                    else
                    {
                        whereClause = whereClause + txn.nextWord() + " " + colname + "=" + bname;
                    }
                    SpcDbBindItem.bindValue(bname, coldata, ref dataSet);
                }
            }
            return whereClause;
        }


        private string makeMeasurementClause(ref List<OracleParameter> dataSet)
        {
            string whereClause = "";

            whereClause = whereClause + LMakeQuery(this, "measurementSpec", measurementSpec, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "measurementStep", measurementStep, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "measurementResource", measurementResource, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "processStep", processStep, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "processResource", processResource, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "username", username, ref dataSet);

            return whereClause;
        }


        private string makeDataCollectionClause(ref List<OracleParameter> dataSet)
        {
            string whereClause = "";
            whereClause = whereClause + LMakeQuery(this, "edcPlan", edcPlan, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "product", product, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "plan", processPlan, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "initialStep", initialStep, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "lot", lot, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "batch", batch, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "stage", stage, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "area", area, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "tag1", tag1, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "tag2", tag2, ref dataSet);
            whereClause = whereClause + LMakeQuery(this, "groupHistKey", groupHistKey, ref dataSet);
             

            if (!StringUtil.NullString(fromDate))
            {
                DateTime fw_dt = TimeUtil.ParseSPC(fromDate).Value;
                whereClause = whereClause + nextWord() + " modifiedDatetime >= :fromDate";

            }
            if (!StringUtil.NullString(toDate))
            {
                DateTime fw_dt = TimeUtil.ParseSPC(toDate).Value;
                whereClause = whereClause + nextWord() + " modifiedDatetime <= :toDate";

            }
            if (StringUtil.NullString(fromDate) && StringUtil.NullString(toDate))
            {
                whereClause = whereClause + " and ROWNUM < " + historicalPoints.ToString();
            }

            return whereClause;
        }


        public string nextWord()
        {
            if (_firstAttr)
            {
                _firstAttr = false;
                return "";
            }
            else
            {
                return " and";
            }
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
        //{
        //   char c;
        //        char test;
        //        char buf[256], databuf[256];
        //        char* str, *pattern;

        //   strncpy(buf, pat, 256);
        //        buf[255] = '\0';
        //   strcpy(databuf, data);
        //        str = databuf;
        //   pattern = strtok(buf, "',"); 
        //   while (pattern != NULL)
        //   {
        //      for (;;) {
        //         switch (c = *pattern++) {
        //            case '\0' :
        //                return (* str == '\0');
        //            case '?' :
        //                if (! *str)  return (0);
        //                str++;
        //                break;
        //            case '*' :
        //                c = *pattern;
        //                while (c == '*')
        //                   c = *++pattern;
        //                if (c == '\0')
        //                   return (1);
        //                while ((test = *str) != '\0') {
        //                   if (wildMatch(str, pattern))
        //                       return (1);
        //                   str++;
        //                }
        //                return (0);
        //            default :
        //                if (c != * str)
        //                   return (0);
        //                str++;
        //                break;
        //         }
        //      }
        //      pattern = strtok(NULL, "',");
        //   }
        //   return (0);
        //}

        public Result<TEdcData> store()
        {

            Result<TEdcData> result = new Result<TEdcData>();

            Exception nilErr = new Exception(SPCErrCodes.unexpectedNilObj.ToString());  // nil object error
            Exception insertErr = new Exception(SPCErrCodes.cltnInsertErr.ToString());  // nil object error

            // STEP 1:  Verify the mode of result return, file or bus
            // attempt to open the file

            // ofstream outFile(_filename);

            bool replyFlag = true;
            //if ( !StringUtil.NullString( _filename  ))
            //{
            //    // output results to a file 
            //    replyFlag = false ;

            //    // validate the filename
            //    if (!outFile)
            //    {
            //        // can't open file for write

            //        FwError err(FwErrorCode(FwEdc, cantOpenFile));
            //        result.error(err);
            //        return FALSE;
            //    }
            //}

            // STEP 2: get meas records that match the meas and plan criteria
            // and are sorted in the order of the plan modification time and date
            // don't do postfetch of data points at this time

            // Don't let references go out of scope!! Performance will be effected if
            // we have to refetch meas and plan objects, so keep a cltn of plans as well.

            List<TEdcDataCollection> planColl = new List<TEdcDataCollection>();
            List<TEdcMeasurement> measColl = new List<TEdcMeasurement>();

            string whereClause = "";
            List<OracleParameter> dataSet = new List<OracleParameter>();
            List<TEdcMeasurement> fetchColl;

            // NOTE: the following fetches are getting meas refs only, 
            // and the datapoints are deepFetched on an as needed basis
            // below.  The theory being that the benefits of doing a 
            // batch fetch are outweighed by the overhead of creating
            // data instance objects unnecessarily.  This assumption
            // should be performance tested, to do so, change FRefs
            // to FWhere or DFWhere (ask BBoyle re which and what
            // post fetch flag should be set to).  ljs - 6/23/98

            string ftype = "FRefs";
            bool pfFlag = true ;
            bool plansInRefMgt = false;

            //#if 0

            //  ftype = FwPersistObject::DFWhere;
            //  pfFlag = TRUE;

            //#endif


            // use a subselect, then sort here

            makeSelectStatement(ref whereClause, ref dataSet, true);
            fetchColl = TEdcMeasurement.fetchWhere<TEdcMeasurement>(whereClause, dataSet, pfFlag, false, ftype);


            List<TEdcMeasurement> tmpColl = new List<TEdcMeasurement>();

            foreach (TEdcMeasurement measRef in fetchColl)

            // NOTE: dereferencing the plan pulls it into ref mgt
            {
                TEdcDataCollection dataCollRef = measRef.dataCollection;

                tmpColl.Add(measRef);
                planColl.Add(dataCollRef);
                //if (!tmpColl.Add((measRef, key) &&
                //    planColl.insert(dataCollRef))
                //{
                //    result.error(insertErr);
                //    return FALSE;
                //}
            }

            fetchColl = tmpColl;
            plansInRefMgt = true;



            // STEP 3: Determine which measurements are needed 
            // in order to satisfy historical data requirements,
            // and add them to the measurement collection.
            // While we're at it, construct references to plan instances 
            // still in the database for a batch fetch.

            bool unitFlag = (!StringUtil.NullString(unitId));
            bool siteFlag = (!StringUtil.NullString(siteId));

            if (!((_historicalPoints > 0) || (_numberOfGroups > 0) ||
                   unitFlag || siteFlag))
            {
                // we are not looking at data point properties, 
                // do a batch deep fetch to get them, rather than 
                // incremental by measurement

                // fetchErr = FwEdcMeasurement::fetchMembersOf(fetchColl,TRUE); //pfFlag
                TEdcMeasurement.deepFetchMembersOf<TEdcMeasurement>(ref fetchColl, false); //lkFlag


                if (!plansInRefMgt)
                {
                    foreach (TEdcMeasurement measRef in fetchColl)
                    {

                        planColl.Add(measRef.dataCollection);
                    }
                }

                measColl = fetchColl;  // copy the references
            }
            else
            {
                // we need to go through the data points to check identifiers
                // or to keep excluded points out of the count

                int count = 0;  // groups or non-excluded points, dep. on _numberOfGroups
                bool forceBreak = false; ;

                foreach (TEdcMeasurement measRef in fetchColl)
                {


                    int numOfEntries = 0;
                    int numOfExclusions = 0;

                    measRef.deepFetchObject<TEdcMeasurement>(false);

                    foreach (TEdcDataPoint dataPtRef in measRef.datapoints)
                    {

                        // skip non-matching datapoints, don't count them either

                        if ((unitFlag && ((unitId.IndexOfAny(new char[] { '*', '?', '\'', '"' }) < 0) ?
                                          (dataPtRef.unitId != unitId) : wildMatch(dataPtRef.unitId, unitId) == 0)) ||
                            (siteFlag && ((siteId.IndexOfAny(new char[] { '*', '?', '\'', '"' }) < 0) ?
                                          (dataPtRef.siteId != siteId) : wildMatch(dataPtRef.siteId, siteId) == 0)))
                        {
                            // If it fails, don't count this data point.
                            // Use in case of counting historical points,
                            // as well as to determine if this meas should
                            // be included.

                            continue;
                        }

                        ++numOfEntries;

                        // use a worst case approach:
                        // if there are any comments in the chart history, 
                        // assume that it may be an exclusion of the derived point

                        if (((_historicalPoints > 0) && dataPtRef.isExcluded) ||
                            ((_numberOfGroups > 0) && dataPtRef.hasHistory))
                        {
                            ++numOfExclusions;
                        }

                        // respect data boundaries if counting groups
                        if ((_numberOfGroups > 0) && dataPtRef.isDataBoundary)
                        {
                            forceBreak = true;
                        }
                    }// END_FOREACH



                    if (_numberOfGroups > 0)
                    {
                        // we are counting groups, check for exclusions.
                        // if there are enough non-excluded points, include group

                        // 02/01/00 ychen: if nothing is excluded, then we got a group.
                        //                 in other words, _groupSize setting is wrong.
                        if (numOfEntries > 0 &&
                            (numOfEntries - numOfExclusions >= _groupSize ||
                             numOfExclusions == 0))
                            ++count;
                    }
                    else
                    {
                        // we are counting contributers or getting all
                        // unexcluded data points in the history

                        count = count + numOfEntries - numOfExclusions;
                    }

                    // Only add this measurement if we have some data points
                    // reverse the order when adding to measColl

                    if ((numOfEntries > 0))
                    {
                        measColl.Add(measRef);
                        planColl.Add(measRef.dataCollection);
                    }


                    if (forceBreak ||
                        ((_historicalPoints > 0) && (count >= _historicalPoints)) ||
                        ((_numberOfGroups > 0) && (count >= _numberOfGroups)))
                    {
                        // we have enough measurements or hit data boundary 
                        break;
                    }
                }

            }

            // pull the associated plan instances into ref mgt
            // do not do post fetch, since the sub-objects are already in ref mgt!

            if (!plansInRefMgt)
            {
                planColl = TEdcDataCollection.fetchMembersOf<TEdcDataCollection>(false);

            }

            // STEP 4: now  construct the reply message or file output
            // using only those measurements needed to satisfy the data window

            TEdcData edcData = new TEdcData();
            TEdcMeasurementSpec specRef;   // assume all meas use the same attribute

            foreach (TEdcMeasurement measRef in measColl)
            {
                if (measRef == null)
                {
                    throw nilErr;
                }

                TEdcDataCollection dataCollRef = measRef.dataCollection;
                if (dataCollRef == null)
                {
                    // error, missing plan
                    throw nilErr;
                }

                specRef = measRef.getMeasurementSpec();



                if (replyFlag)
                {
                    edcData.addMeasurementData(dataCollRef, measRef, specRef, unitId, siteId);

                }
                else
                {
                    // construct a flat data record for the file below
                    foreach (TEdcDataPoint dataPtRef in measRef.datapoints)
                    {

                        string linebuf = TEdcData.formatForFile(dataCollRef, measRef, dataPtRef,
                                                          _fieldSeparator, _nullIndicator);
                        //outFile << linebuf << endl;

                    }// END_FOREACH
                }
            }//                END_FOREACH



            if (replyFlag)
                result.value = (edcData);

            return result;



        }
    }
}

