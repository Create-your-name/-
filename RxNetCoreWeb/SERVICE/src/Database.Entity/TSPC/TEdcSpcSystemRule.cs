using Arch;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using Protocol;
using SPCService.Database;
using System.Linq;
using System.Linq.Dynamic.Core;



namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_SYSTEMRULE")]
    public class TEdcSpcSystemRule : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("NAME")]
        public string name { get; set; }
        [SpcDbField("DESCRIPTION")]
        public string description { get; set; }
        [SpcDbField("DETAILDESC_EN")]
        public string detaildesc_en { get; set; }
        [SpcDbField("DETAILDESC_ZH")]
        public string detaildesc_zh { get; set; }
        [SpcDbField("SEQ")]
        public int seq { get; set; }


        public CEdcSpcSystemRule makeInterchange()
        {
            CEdcSpcSystemRule cdata = new CEdcSpcSystemRule();
            cdata.Sysid = sysId;
            cdata.name = name;

            cdata.description = description;
            cdata.detaildesc_en = detaildesc_en;
            cdata.detaildesc_zh = detaildesc_zh;
            cdata.seq = seq;
            return cdata;
        }


        public SPCErrCodes Save()
        {
            SPCErrCodes spcError = new SPCErrCodes();
            return spcError;
            //SpcContext db = new SpcContext();

            //bool bNew = false;
            //using (var trans = db.Database.BeginTransaction())
            //{
            //    try
            //    {
            //        var oldObj = (from c in db.SPC_Spe
            //                      where c.SYSID == sysId
            //                      select c).SingleOrDefault<SPC_DATACOLLECTION>();
            //        if (oldObj != null)
            //            bNew = true;

            //        SPC_DATACOLLECTION dc = new SPC_DATACOLLECTION();
            //        dc.SYSID = sysId;
            //        dc.EDCPLAN = edcPlan;
            //        dc.PRODUCT = product;
            //        dc.PLAN = plan;
            //        dc.INITIALSTEP = initialStep;
            //        dc.LOT = lot;
            //        dc.BATCH = batch;
            //        dc.STAGE = stage;
            //        dc.AREA = area;
            //        dc.TAG1 = tag1;
            //        dc.TAG2 = tag2;
            //        dc.GROUPHISTKEY = groupHistKey;
            //        dc.DONE = done ? "T" : "F";
            //        dc.MODIFIEDDATETIME = sysId;
            //        dc.FWTIMESTAMP = TimeStamp;
            //        if (bNew)
            //            db.SPC_DATACOLLECTION.Add(dc);

            //        foreach (TEdcMeasurement emaas in measurements)
            //            emaas.Save();

            //        db.SaveChanges();
            //        trans.Commit();

            //    }
            //    catch (Exception ex)
            //    {

            //        trans.Rollback();

            //    }
            //}
            //return spcError;

        }
 
    }
} 
