using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcListSpcRulesTxn
    {
         
       public bool  store(out Result<List<string>>  result)
        {
             
{ 

                string  whereClause ="";
                result = new Result<List<string>>();
                List<string> lstName = new List<string>();

                List<TEdcSpcCustomRule> fetchCol =TEdcSpcCustomRule.fetchWhereBase<TEdcSpcCustomRule>(whereClause,true  );

                
                if (fetchCol!=null && fetchCol.Count >0 )
                {
                    foreach(TEdcSpcCustomRule aRef in fetchCol )
                    {
                      
                            lstName.Add( aRef.name);
                             
                    }
                   
                  }

                result.value =(lstName);
                return true ;
            }

        }


    }
}

