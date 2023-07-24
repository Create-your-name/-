using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcUpdateSpcRuleTxn
    {
        public string name { get; set; }
        public string reason { get; set; }

        public int testCount { get; set; }
        public int outOf { get; set; }
        public string comparison { get; set; }
        public string withRespectTo { get; set; }
        public string value { get; set; }
        public string stdDevs { get; set; }
        public string datasetName { get; set; }
        public string intervalFrom { get; set; }
        public string intervalTo { get; set; }


        public bool store(out Result<CEdcSpcCustomRule> result)
        {
            result = new Result<CEdcSpcCustomRule>();

            if (StringUtil.NullString(name))
            {
                // Spc rule name is required 
                result.error = SPCErrCodes.invalidSpcRuleName;
                return false;
            }

            string whereClause = "name=:name";
            List<OracleParameter> dataSet = new List<OracleParameter>();


            // First, bind data values.
            SpcDbBindItem.bindValue(":name", name, ref dataSet);

            List<TEdcSpcCustomRule> fetchColl = TEdcSpcCustomRule.fetchWhere<TEdcSpcCustomRule>(whereClause,  dataSet, true);


            if (fetchColl == null || fetchColl.Count == 0)
            {
                // Spc rule was not found, it does not exist 
                result.error = SPCErrCodes.spcRuleDoesNotExists;
                return false;
            }

            TEdcSpcCustomRule aRef = fetchColl[0];

            // Update Custom Spc Rule 
            if (aRef != null)
            {
                if (!StringUtil.NullString(reason))
                {
                    aRef.reason = (reason);
                }
                if (testCount != 0)
                {
                    aRef.testCount=testCount;
                }
                if ( outOf  != 0)
                {
                    aRef.outOf=(outOf);
                }
                if (!StringUtil.NullString(comparison))
                {
                    aRef.comparison=(comparison);
                }
                if (!StringUtil.NullString(withRespectTo))
                {
                    aRef.withRespectTo = (withRespectTo);
                }
                if (!StringUtil.NullString(value))
                {
                    aRef.value = (value);
                }
                if (!StringUtil.NullString(stdDevs))
                {
                    aRef.stdDevs=(stdDevs);
                }
                if (!StringUtil.NullString(datasetName))
                {
                    aRef.datasetName=(datasetName);
                }
                if (!StringUtil.NullString(intervalFrom))
                {
                    aRef.intervalFrom=(intervalFrom);
                }
                if (!StringUtil.NullString(intervalTo))
                {
                    aRef.intervalTo=(intervalTo);
                }

                bool bValid = aRef.validateSpcRule();
                if (!bValid)
                {
                    result.error=SPCErrCodes.invalidRuleValue;
                    return false ;
                }

                aRef.markDirty();
                SPCErrCodes err = aRef.store();
                if (err!= SPCErrCodes.ok)
                {
                    result.error=(err);
                    return false ;
                }
            }

            CEdcSpcCustomRule  anInter = aRef.makeInterchange();
            result.value=(anInter);

            return true ;
        }



    }
}

