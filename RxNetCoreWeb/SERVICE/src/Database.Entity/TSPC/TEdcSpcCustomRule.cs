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
    [SpcDbTableName("SPC_CUSTOMRULE")]
    public class TEdcSpcCustomRule : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("NAME")]
        public string name { get; set; }
        [SpcDbField("REASON")]
        public string reason { get; set; }
        [SpcDbField("TESTCOUNT")]
        public int testCount { get; set; }
        [SpcDbField("OUTOF")]
        public int outOf { get; set; }
        [SpcDbField("COMPARISON")]
        public string comparison { get; set; }
        [SpcDbField("WITHRESPECTTO")]
        public string withRespectTo { get; set; }
        [SpcDbField("VALUE")]
        public string value { get; set; }
        [SpcDbField("STDDEVS")]
        public string stdDevs { get; set; }
        [SpcDbField("DATASETNAME")]
        public string datasetName { get; set; }
        [SpcDbField("INTERVALFROM")]
        public string intervalFrom { get; set; }
        [SpcDbField("INTERVALTO")]
        public string intervalTo { get; set; }


        public TEdcSpcCustomRule()
        {


        }


        public SPCErrCodes store()
        {
            SPCErrCodes spcError = new SPCErrCodes();
            SpcContext db = new SpcContext();
            if (deleted)
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        var oldObj = (from c in db.SPC_CUSTOMRULE
                                      where c.SYSID == sysId
                                      select c).SingleOrDefault<SPC_CUSTOMRULE>();
                        if (oldObj != null)
                        {
                            db.SPC_CUSTOMRULE.Remove(oldObj);
                            db.SaveChanges();
                        }

                    }
                    catch (Exception ex)
                    {
                        throw new Exception(ex.Message);
                    }
                }

                return spcError;
            }



            bool bNew = false;
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    var oldObj = (from c in db.SPC_CUSTOMRULE
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_CUSTOMRULE>();
                    SPC_CUSTOMRULE dc = new SPC_CUSTOMRULE();
                    if (oldObj == null)
                    {

                        dc.SYSID = SPCUtils.GetSysID(typeof(TEdcSpcCustomRule));
                        bNew = true;
                    }
                    else

                    {

                        dc.SYSID = sysId;
                    }

                    
                    dc.NAME = name;
                    dc.REASON = reason;
                    dc.TESTCOUNT = testCount;
                    dc.OUTOF = outOf;
                    dc.COMPARISON = comparison;
                    dc.WITHRESPECTTO = withRespectTo;
                    dc.VALUE = value;
                    dc.STDDEVS = stdDevs;
                    dc.DATASETNAME = datasetName;
                    dc.INTERVALFROM = intervalFrom;
                    dc.INTERVALTO = intervalTo;

                    if (bNew)
                        db.SPC_CUSTOMRULE.Add(dc);


                    db.SaveChanges();
                    trans.Commit();

                }
                catch (Exception ex)
                {

                    trans.Rollback();
                    spcError = SPCErrCodes.storeErr;
                }
            }
            return spcError;

        }
        public TEdcSpcCustomRule(CEdcSpcCustomRule cEdcCustomRule)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcDataPoint));
            name = cEdcCustomRule.name;
            reason = cEdcCustomRule.reason;
            testCount = cEdcCustomRule.testCount;
            outOf = cEdcCustomRule.outOf;
            comparison = cEdcCustomRule.comparison;
            withRespectTo = cEdcCustomRule.withRespectTo;
            value = cEdcCustomRule.value;
            stdDevs = cEdcCustomRule.stdDevs;
            datasetName = cEdcCustomRule.datasetName;
            intervalFrom = cEdcCustomRule.intervalFrom;
            intervalTo = cEdcCustomRule.intervalTo;


            //histories = new List<TEdcDataPointHistory>();
            //foreach (CEdcDataPtHistory cEdcDataPtHis in cEdcChart.rrulesDataInterchanges)
            //{
            //    histories.Add(new TEdcDataPointHistory(cEdcDataPtHis));
            //}



        }



        public CEdcSpcCustomRule makeInterchange()
        {
            CEdcSpcCustomRule cEdcSpcCustom = new CEdcSpcCustomRule();
            cEdcSpcCustom.Sysid = sysId;
            cEdcSpcCustom.name = name;
            cEdcSpcCustom.reason = reason;
            cEdcSpcCustom.testCount = testCount;
            cEdcSpcCustom.outOf = outOf;
            cEdcSpcCustom.comparison = comparison;
            cEdcSpcCustom.withRespectTo = withRespectTo;
            cEdcSpcCustom.value = value;
            cEdcSpcCustom.stdDevs = stdDevs;
            cEdcSpcCustom.datasetName = datasetName;
            cEdcSpcCustom.intervalFrom = intervalFrom;
            cEdcSpcCustom.intervalTo = intervalTo;
            return cEdcSpcCustom;
        }
        public  bool validateSpcRule()
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





    }




}
