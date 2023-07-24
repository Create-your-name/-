using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcListPlansTxn
    {
         
        public bool store(out Result<List<string>> result)
        {
            result = new Result<List<string>>();
            
            string  whereClause = "activeversion > -1" ;

            List<string> fetchDict  = TEdcPlan.fetchRefsWithAppId< TEdcPlan>(whereClause );

            //if (storStat.isError())
            //{
            //    result.error(storStat);
            //    return FALSE;
            //}

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

            result.value =(fetchDict);
            return true ;
        }
    }
}

