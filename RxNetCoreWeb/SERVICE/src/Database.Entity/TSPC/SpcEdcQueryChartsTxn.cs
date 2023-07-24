using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;

namespace SPCService.BusinessModel
{
    public class SpcEdcQueryChartsTxn
    {

        public List<string>  names { get; set; }
         
        public Result<List<CEdcChart>> store(  )
        {

            Result<List<CEdcChart>> result = new Result<List<CEdcChart>>();

            // return the detailed definition of the named chart 
            //if (!FwTransaction::store(result))
            //    return FALSE;

            if ( names==null || names.Count ==0)
            {
                // chart name is required .
                throw new Exception(SPCErrCodes.invalidChartName.ToString()); 
            }


            string  whereClause = "measurementspec in :name";
            string sInStr = "(";
            foreach(string sName in names)
            {
                sInStr = sInStr +"'" + sName + "'," ;
            }
            sInStr = sInStr.Substring(0, sInStr.Length - 1) + ")";
            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcChart> fetchColl =new List<TEdcChart>();

            // First, bind data values.
            SpcDbBindItem.bindValue(":name", sInStr, ref  dataSet);
                fetchColl= TEdcChart.fetchWhere<TEdcChart>(whereClause, dataSet,   true,false  );
             
             
            if (fetchColl==null || fetchColl.Count ==0)
            {
                // no match found, invalid chart name
                throw new Exception( SPCErrCodes.invalidChartName.ToString()); 
            }
            List<CEdcChart> chats = new List<CEdcChart>();

            foreach (TEdcChart c in fetchColl)
            {
                chats.Add(c.makeInterchange());

            }
             
           result.value=(chats);

            return result;


        }
    }
}
