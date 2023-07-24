using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcCreateSpcRuleTxn
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




        private bool validateSpcRule()
        {

            bool noErr;

            // Validate the Custom Spc Rule 
            if (testCount > outOf)
            {
                throw new Exception(SPCErrCodes.invalidRuleValue.ToString());

            }
            if (withRespectTo != "Value" && withRespectTo != "Dataset" &&
                withRespectTo != "StdDevs" && withRespectTo != "Interval" &&
                comparison != "increasing" && comparison != "decreasing" &&
                comparison != "strictlyincreasing" &&
                comparison != "strictlydecreasing" && comparison != "alternating")
            {
                throw new Exception(SPCErrCodes.invalidRuleValue.ToString());
            }
            if (withRespectTo == "Value" && StringUtil.NullString(value))
            {
                throw new Exception(SPCErrCodes.invalidRuleValue.ToString());
            }
            if (withRespectTo == "Dataset" && StringUtil.NullString(datasetName))
            {
                throw new Exception(SPCErrCodes.invalidRuleValue.ToString());
            }
            if (withRespectTo == "StdDevs" && StringUtil.NullString(stdDevs))
            {
                throw new Exception(SPCErrCodes.invalidRuleValue.ToString());
            }
            if (withRespectTo == "Interval" && StringUtil.NullString(intervalFrom) || StringUtil.NullString(intervalTo))
            {
                throw new Exception(SPCErrCodes.invalidRuleValue.ToString());
            }
            if (comparison != ">" && comparison != "<" &&
                comparison != ">=" && comparison != "<=" &&
                comparison != "=" && comparison != "!=" &&
                comparison != "outside" && comparison != "inside" &&
                comparison != "increasing" && comparison != "decreasing" &&
                comparison != "strictlyincreasing" &&
                comparison != "strictlydecreasing" && comparison != "alternating")
            {
                throw new Exception(SPCErrCodes.invalidComparison.ToString());

            }

            return true;
        }

        public bool store()
        {
            if (StringUtil.NullString(name))
            {
                // Spc rule name is required
                throw new Exception(SPCErrCodes.invalidSpcRuleName.ToString());
            }

            string whereClause = "name=:name";
            List<OracleParameter> dataSet = new List<OracleParameter>();
            List<TEdcSpcCustomRule> fetchColl = new List<TEdcSpcCustomRule>();

            // First, bind data values.
            SpcDbBindItem.bindValue(":name", name, ref dataSet);

            fetchColl = TEdcSpcCustomRule.fetchWhere<TEdcSpcCustomRule>(whereClause, dataSet, true);

            if (fetchColl != null && fetchColl.Count > 0)
            {
                // Spc rule was found, it is a duplicated spc rule
                throw new Exception(SPCErrCodes.spcAlreadyExists.ToString());

            }

            validateSpcRule();

            TEdcSpcCustomRule spcRef = new TEdcSpcCustomRule();
            spcRef.name = name;
            spcRef.reason = reason;
            spcRef.testCount = testCount;
            spcRef.outOf = outOf;
            spcRef.comparison = comparison;
            spcRef.withRespectTo = withRespectTo;
            spcRef.value = value;
            spcRef.stdDevs = stdDevs;
            spcRef.datasetName = datasetName;
            spcRef.intervalFrom = intervalFrom;
            spcRef.intervalTo = intervalTo;

            spcRef.store();
            return true;
        }
    }
}

