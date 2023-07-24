using Arch;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using Protocol;
using SPCService.Database;
using System.Linq;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;

namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_CHARTPARAMETER")]
    public class TEdcChartParameter : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }

        [SpcDbField("PROPERTY")]
        public string property { get; set; }
        [SpcDbField("VALUE")]
        public string value { get; set; }


        public TEdcChartParameter()
        {


        }


        public SPCErrCodes Save()
        {
            SPCErrCodes spcError = new SPCErrCodes();
            SpcContext db = new SpcContext();

            bool bNew = false;
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    var oldObj = (from c in db.SPC_CHARTPARAMETER
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_CHARTPARAMETER>();
                    if (oldObj == null)
                        bNew = true;

                    SPC_CHARTPARAMETER dc = new SPC_CHARTPARAMETER();
                    dc.SYSID = sysId;
                    dc.PROPERTY = property;
                    dc.VALUE = value;
                    if (bNew)
                        db.SPC_CHARTPARAMETER.Add(dc);


                    db.SaveChanges();
                    trans.Commit();

                }
                catch (Exception ex)
                {

                    trans.Rollback();

                }
            }
            return spcError;

        }
        public TEdcChartParameter(CEdcChartParameter cEdcChartPara)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcDataPoint));
            property = cEdcChartPara.property;
            value = cEdcChartPara.value;


            //histories = new List<TEdcDataPointHistory>();
            //foreach (CEdcDataPtHistory cEdcDataPtHis in cEdcChart.rrulesDataInterchanges)
            //{
            //    histories.Add(new TEdcDataPointHistory(cEdcDataPtHis));
            //}



        }



        public CEdcChartParameter makeInterchange()
        {
            // create an interchange object out of this
            // NOTE: The modified flag has to be set at point of usage of the 
            // interchange, because it also depends on publication status
            // of the plan instance!!

            CEdcChartParameter chartPara = new CEdcChartParameter();
            chartPara.sysid = (sysId);
            chartPara.property = property;
            chartPara.value  = (value );  
            return chartPara;
        }

    }




}
