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
    [SpcDbTableName("SPC_SPECLIMIT")]
    public class TEdcSpecLimit : SpcDBObject
    {
        public string sysId { get; set; }
        public string measurementSysId { get; set; }
        public string upperScreeningLimit { get; set; }
        public string upperSpecLimit { get; set; }
        public string target { get; set; }
        public string lowerSpecLimit { get; set; }
        public string lowerScreeningLimit { get; set; }
        public bool autoExclude { get; set; }
        public string  dataType { get; set; }


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

        public SPCErrCodes validateLimits(  )
        {

            //        // >>>>>>> field validation <<<<<<<
            //        //   Field               Test 
            //        // ----------------      --------------------------
            //        // Upper Spec Limit      Greater than Lower Spec Limit
            //        // Target Value          Between upper and lower
            //        // Lower Spec Limit      Less than Upper Spec Limit
            //        //
            //        // Extract data from Upper and Lower spec field in 
            //        // format according to selected meas type.
            if (dataType == "FLOAT")
            {
                double maxScrn = double.MaxValue;
                double uprScrn = (StringUtil.NullString(upperScreeningLimit))
                                  ? (maxScrn) : (double.Parse(upperScreeningLimit));
                double uprSpec = (StringUtil.NullString(upperSpecLimit))
                                        ? (uprScrn) : (double.Parse(upperSpecLimit));
                if (uprScrn < uprSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // check -maxScrn <= lwrScrn <= lwrSpec
                double lwrScrn = (StringUtil.NullString(lowerScreeningLimit))
                                   ? (-maxScrn) : (double.Parse(lowerScreeningLimit));
                double lwrSpec = (!StringUtil.DoubleableString(lowerSpecLimit))
                                   ? (lwrScrn) : (double.Parse(lowerSpecLimit));
                if (lwrScrn > lwrSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                //// check lwrSpec <= targVal <= uprSpec
                if (StringUtil.NullString(target))
                {
                    if (lwrSpec > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
                else
                {
                    double targVal = double.Parse(target);
                    if (lwrSpec > targVal || targVal > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
            }
            else if (dataType == "INTEGER")
            {
                double maxScrn = 2147483647;

                int iMaxScrn = int.MaxValue;
                // check maxScrn >= uprScrn >= uprSpec
                double uprScrn = (StringUtil.NullString(upperScreeningLimit))
                               ? (maxScrn) : (double.Parse(upperScreeningLimit));
                double uprSpec = (StringUtil.NullString(upperSpecLimit))
                                 ? (uprScrn) : (double.Parse(upperSpecLimit));
                if (maxScrn < uprScrn || uprScrn < uprSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                int iUprScrn = (StringUtil.NullString(upperScreeningLimit))
                               ? (iMaxScrn) : (int.Parse(upperScreeningLimit));
                int iUprSpec = (StringUtil.NullString(upperSpecLimit))
                               ? (iUprScrn) : (int.Parse(upperSpecLimit));
                if (iUprScrn != uprScrn || iUprSpec != uprSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // check -maxScrn <= lwrScrn <= lwrSpec
                double lwrScrn = (StringUtil.NullString(lowerScreeningLimit))
                                 ? (-maxScrn) : (double.Parse(lowerScreeningLimit));
                double lwrSpec = (StringUtil.NullString(lowerSpecLimit))
                                 ? (lwrScrn) : (double.Parse(lowerSpecLimit));
                if (-maxScrn > lwrScrn || lwrScrn > lwrSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                int iLwrScrn = (StringUtil.NullString(lowerScreeningLimit))
                               ? (-iMaxScrn) : (int.Parse(lowerScreeningLimit));
                int iLwrSpec = (StringUtil.NullString(lowerSpecLimit))
                               ? (iLwrScrn) : (int.Parse(lowerSpecLimit));
                if (iLwrScrn != lwrScrn || iLwrSpec != lwrSpec)
                {
                    return SPCErrCodes.errBadSpecLimits;
                }

                // check lwrSpec <= targVal <= uprSpec
                if (StringUtil.NullString(target))
                {
                    if (lwrSpec > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
                else
                {
                    double targVal = double.Parse(target);
                    if (lwrSpec > targVal || targVal > uprSpec)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                    int iTargVal = int.Parse(target);
                    if (iTargVal != targVal)
                    {
                        return SPCErrCodes.errBadSpecLimits;
                    }
                }
            }
            else if (dataType != "STRING")
            {
                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                return SPCErrCodes.errBadDataType;

            } // end-if dataType 

            return SPCErrCodes.ok;
        }

    }
} 
