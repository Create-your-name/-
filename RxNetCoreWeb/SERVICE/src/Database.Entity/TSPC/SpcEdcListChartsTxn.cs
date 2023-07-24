using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcListChartsTxn
    {
        public string partition { get; set; }
        public string measurementSpec { get; set; }
        public bool startupCheck { get; set; }



        public bool store(out Result<List<string>> result)
        {
            // return the names of all charts that match the criteria
            result = new Result<List<string>>();

            string whereClause = "";
            List<OracleParameter> dataSet = new List<OracleParameter>();

            if (!StringUtil.NullString( measurementSpec ))
            {
                whereClause  = whereClause + "measurementSpec=:measurementSpec";
                SpcDbBindItem.bindValue(":measurementSpec", (measurementSpec ),ref dataSet);
            }

            if (!StringUtil.NullString(partition ))
            {
                if (!StringUtil.NullString(whereClause ))
                    whereClause = whereClause +" and ";

                whereClause = whereClause+  "partition=:partition";
                SpcDbBindItem.bindValue(":partition",  (partition), ref dataSet);
            }

            if (startupCheck )
            {
                if (!StringUtil.NullString(whereClause ))
                    whereClause = whereClause + " and ";

                whereClause  = whereClause+ "loadOnStartup=:loadOnStartup";
                SpcDbBindItem.bindValue(":loadOnStartup",  ("T"), ref dataSet);
            }

            // make the query

            List<string> fetchDict =TEdcChart.fetchRefsWithAppId<TEdcChart>(whereClause, dataSet);
             
            // process the results

            //GcRef(FwBusOrdered) retColl = new FwBusOrdered;

            //// would like to include the load on startup switch as
            //// another value ( possibly in an assoc ) but can't
            //// add it as a boolean, needs to be a true object

            //if (fetchDict.entries() > 0)
            //{
            //    FOREACH_REF(fetchDict, FwReference, aRef)
            //    {
            //        FwString name = *FOREACH_GET_KEY(FwPrim(FwString));
            //        if (!retColl->insert(FwPrim(FwString)(name)))
            //        {
            //            FwError insertErr(FwErrorCode(FwEdc, cltnInsertErr));
            //            result.error(insertErr);
            //            return FALSE;
            //        }
            //    }
            //    END_FOREACH
            //  }

            result.value=(fetchDict);
            return true ;
        }
    }
}

