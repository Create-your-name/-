using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;

namespace SPCService.BusinessModel
{
    public class SpcEdcQueryChartsWithStatusTxn
    {

        public List<string>  names { get; set; }
        public int SearchDays  { get; set; }

        public Result<List<CEdcChartStatus>> store(  )
        {

            Result<List<CEdcChartStatus>> result = new Result<List<CEdcChartStatus>>();

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
                fetchColl= TEdcChart.fetchWhere<TEdcChart>(whereClause, dataSet,   true  ,false  );
             
             
            if (fetchColl==null || fetchColl.Count ==0)
            {
                // no match found, invalid chart name
                throw new Exception( SPCErrCodes.invalidChartName.ToString()); 
            }
            List<CEdcChartStatus> chats = new List<CEdcChartStatus>();

            foreach (TEdcChart c in fetchColl)
            {
                CEdcChartStatus chartstatus = new CEdcChartStatus();
                chartstatus.chat = c.makeInterchange(); 
                chartstatus.OOC = CheckChartOOC(c.measurementSpec, c.name, SearchDays);
                chats.Add(chartstatus);

            }
             
           result.value=(chats);

            return result;


        }
        private bool CheckChartOOC(string measurementSpec,string chartname,int days   )
        {
            string whereClause = "  measurementspec = '"+ measurementSpec 
                + "'and chart = '"+chartname 
                + "' and(HASVIOLATIONS = 'T')  and to_date(DATACREATETIME,'yyyymmdd hh24miss') > sysdate - "+ days ;

            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcDataPointHistory> fetchColl = new List<TEdcDataPointHistory>();

            fetchColl = TEdcChart.fetchWhere<TEdcDataPointHistory>(whereClause, dataSet, true, false);

            if (fetchColl.Count > 0)
                return true;
            else
                return false; 
        }

    }
}
