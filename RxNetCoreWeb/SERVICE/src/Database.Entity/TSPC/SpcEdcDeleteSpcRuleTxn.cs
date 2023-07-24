using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcDeleteSpcRuleTxn
    {
        public string name { get; set; }


        public bool store()
        {


            if (StringUtil.NullString(name))
            {
                // Spc rule name is required
                throw new Exception(SPCErrCodes.invalidSpcRuleName.ToString());
            }

            string whereClause = "name=:name";
            List<OracleParameter> dataSet = new List<OracleParameter>();
            List<TEdcSpcCustomRule> fetchColl = new List<TEdcSpcCustomRule>(); ;

            // First, bind data values.
            SpcDbBindItem.bindValue(":name", name, ref dataSet);

            fetchColl = TEdcSpcCustomRule.fetchWhere<TEdcSpcCustomRule>(whereClause, dataSet, true);
            

            if (fetchColl==null || fetchColl.Count ==0)
            {
                // Spc rule was not found, it does not exist
                throw new Exception(SPCErrCodes.spcRuleDoesNotExists.ToString());
                 
            }

            TEdcSpcCustomRule aRef =   fetchColl[0] ;

            if (aRef!=null)
  {
                aRef.markDeleted();
                  aRef.store();
                
            }

            whereClause = "";
            List<TEdcChart> chartCol = new List<TEdcChart>(); ;

            chartCol = TEdcChart.fetchWhereBase< TEdcChart>(whereClause, true);
 
            if (chartCol!=null && chartCol.Count>0  )
            {
                foreach(TEdcChart cRef in  chartCol  )
                {
                    if (cRef!=null)
          {
                        cRef.removeSpcCustomRule(name );
                        cRef.store();
                    }
                } 
            }


            return true ;
        }

    }
}

