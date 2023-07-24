using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;

namespace SPCService.BusinessModel
{
    public class SpcEdcQueryChartTxn
    {

        public string name { get; set; }
         
        public Result<CEdcChart> store(  )
        {

            Result<CEdcChart> result = new Result<CEdcChart>();

            // return the detailed definition of the named chart 
            //if (!FwTransaction::store(result))
            //    return FALSE;

            if (StringUtil.NullString( name ) )
            {
                // chart name is required .
                throw new Exception(SPCErrCodes.invalidChartName.ToString()); 
            }
            string  whereClause = "name=:name";
            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcChart> fetchColl =new List<TEdcChart>();

            // First, bind data values.
            SpcDbBindItem.bindValue(":name",  name ,ref  dataSet);
                fetchColl= TEdcChart.fetchWhere<TEdcChart>(whereClause, dataSet,   true );
             
             
            if (fetchColl==null || fetchColl.Count ==0)
            {
                // no match found, invalid chart name
                throw new Exception( SPCErrCodes.invalidChartName.ToString()); 
            }

            TEdcChart  aRef  =fetchColl[0];
             

            CEdcChart anInter = aRef.makeInterchange();
           result.value=(anInter);

            return result;


        }
    }
}
