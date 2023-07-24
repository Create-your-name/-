using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcQuerySpcRuleTxn
    {
        public string name { get; set; }
        public bool store(out Result<CEdcSpcCustomRule> result)
        {
            result = new Result<CEdcSpcCustomRule>();
            // return the detailed definition of the named Spc Rule 
            if (StringUtil.NullString(name))
            {
                // Spc Rule name is required

                result.error = SPCErrCodes.invalidSpcRuleName;
                return false;
            }

            string whereClause = "name=:name";
            List<OracleParameter> dataSet = new List<OracleParameter>();

            // First, bind data values.
            SpcDbBindItem.bindValue(":name", name, ref dataSet);
            List<TEdcSpcCustomRule> fetchColl = TEdcSpcCustomRule.fetchWhere<TEdcSpcCustomRule>(whereClause, dataSet, true);


            if (fetchColl == null || fetchColl.Count == 0)
            {
                // no match found, invalid Spc Rule name 
                result.error = SPCErrCodes.invalidSpcRuleName;
                return false;
            }

            TEdcSpcCustomRule aRef = fetchColl[0];

            if (aRef == null)
            {
                result.error = SPCErrCodes.unexpectedNilObj;
                return false;
            }

            CEdcSpcCustomRule anInter = aRef.makeInterchange();
            result.value=(anInter);

            return true ;
        }

    }
}

