using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcQueryPlanTxn
    {

        public string planName { get; set; }
        public bool store(out Result<List<CEdcPlan>> result)
        {

            result = new Result<List<CEdcPlan>>();
            // return the Active plan version if one exists

            string whereClause = "name=:name and revstate=:revstate";
            List<OracleParameter> dataSet = new List<OracleParameter>();


            // First, bind data values.
            SpcDbBindItem.bindValue(":name", planName, ref dataSet);
            SpcDbBindItem.bindValue(":revstate", ("Active"), ref dataSet);

            List<TEdcPlanVersion> fetchColl = TEdcPlanVersion.fetchWhere<TEdcPlanVersion>(whereClause, dataSet, true);


            if (fetchColl == null || fetchColl.Count == 0)
            {
                result.error = SPCErrCodes.noActivePlan;
                return false;
            }
            List<CEdcPlan> retColl = new List<CEdcPlan>();

            foreach (TEdcPlanVersion planRef in fetchColl)
            {
                if (planRef == null)
                {
                    result.error = SPCErrCodes.unexpectedNilObj;
                    return false;
                }

                CEdcPlan planInter = planRef.makeInterchange();
                retColl.Add(planInter);

            }


            result.value = (retColl);
            return true;

        }

    }
}

