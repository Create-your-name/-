using Protocol;
using SPCService.Database;
using System;
using System.Collections.Generic;
using Arch;
using System.Linq;
using System.Linq.Dynamic.Core;
using SPCService.src.Framework.Common;
using SPCService.DbModel;
using Oracle.ManagedDataAccess.Client;

namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_CHARTTEMPLATE")]
    public class TEdcChartTemplate:SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("NAME")]
        public string name { get; set; }
        [SpcDbField("DESCRIPTION")]
        public string description { get; set; }
        [SpcDbField("SPCTEMPLATE")]
        public string spcTemplate { get; set; }
        [SpcDbField("TIMESTAMP")]
        public int timestamp { get; set; }



        [SpcN2MList("defaultParameters", "SPC_CHARTTEMPLATE_N2M", typeof(TEdcChartParameter))]
        public List<TEdcChartParameter> defaultParameters { get; set; }


        public TEdcChartTemplate()
        {

        }
        private const string tableName = "SPC_CHARTTEMPLATE";
        public CEdcChartTemplate makeInterchange()
        {
            CEdcChartTemplate chartTemplate = new CEdcChartTemplate();
            chartTemplate.Sysid = sysId;
            chartTemplate.Name = name;
            chartTemplate.Description = description;
            chartTemplate.spcTemplate = spcTemplate;
             
            if (defaultParameters != null && defaultParameters.Count >0)
            {
               
                foreach (TEdcChartParameter cpara in defaultParameters)
                {
                    chartTemplate.defaultParameters.Add(cpara.makeInterchange());
                }

            }
            return chartTemplate;

        }
        public bool postBeginTxnCheck()
        { 
            // check where-used before allowing deletion

            if (deleted)
            {
                List<TEdcChart> fetchColl = new List<TEdcChart>();
                string  whereClause = "charttemplate = ( select sysid from " + tableName 
                   + " where name=:name )";

                List<OracleParameter> dataSet =new List<OracleParameter>() ;
                SpcDbBindItem.bindValue(":name",  name,ref    dataSet);

                // do not do post fetch since we just want to confirm the entry exists
                // but don't need to access its contents
                fetchColl = TEdcChart.fetchWhere<TEdcChart>(whereClause, dataSet,  false );
              

                int numRefs = fetchColl.Count;
                if (numRefs > 0)
                {
                    // in use
                    throw new Exception(SPCErrCodes.objectInUse.ToString()); 
                }
            }
            return true ;

        }

    }
}
