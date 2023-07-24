using Arch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Oracle;
using SPCService.Database;
using System.IO;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;
using SPCService.src.Framework.Common;
using Protocol;
using SPCService.BusinessModel;

namespace SPCService
{
    public class EdcMeasurementSpecService
    {

        public static List<CEdcMeasSpec> GetCEdcMeasurementSpecs(SpcContext db, string name)
        {
            var query = (from c in db.SPC_MEASUREMENTSPEC
                         where c.NAME.Contains(name)
                         select new CEdcMeasSpec()
                         {
                             //Sysid = c.SYSID,
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             measurementType = c.MEASUREMENTTYPE,
                             dataType = c.DATATYPE,
                             unit = c.UNIT,
                             isDerived = c.ISDERIVED == "T" ? true : false,
                             autoExclude = c.AUTOEXCLUDE == "T" ? true : false,
                             allowLimitOverride = c.ALLOWLIMITOVERRIDE == "T" ? true : false,
                             upperScreeningLimit = c.UPPERSCREENINGLIMIT,
                             upperSpecLimit = c.UPPERSPECLIMIT,
                             target = c.TARGET,
                             lowerSpecLimit = c.LOWERSPECLIMIT,
                             lowerScreeningLimit = c.LOWERSCREENINGLIMIT

                         }).OrderBy("Name").ToList();

            return query;
        }

        public static CEdcMeasSpec GetCEdcMeasurementSpecByName(SpcContext db, string name)
        {
            var query = (from c in db.SPC_MEASUREMENTSPEC
                         where c.NAME == name
                         join d in db.SPC_SAMPLINGPLAN
                          on c.SAMPLINGPLAN equals (d.SYSID)
                         select new CEdcMeasSpec()
                         {
                             //Sysid = c.SYSID,
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             measurementType = c.MEASUREMENTTYPE,
                             dataType = c.DATATYPE,
                             unit = c.UNIT,
                             isDerived = c.ISDERIVED == "T" ? true : false,
                             autoExclude = c.AUTOEXCLUDE == "T" ? true : false,
                             allowLimitOverride = c.ALLOWLIMITOVERRIDE == "T" ? true : false,
                             upperScreeningLimit = c.UPPERSCREENINGLIMIT,
                             upperSpecLimit = c.UPPERSPECLIMIT,
                             target = c.TARGET,
                             lowerSpecLimit = c.LOWERSPECLIMIT,
                             lowerScreeningLimit = c.LOWERSCREENINGLIMIT,
                             collectionType = d.COLLECTIONTYPE,
                             prompt = d.COLLECTIONTYPE,
                             numberOfUnits = d.NUMBEROFUNITS,
                             numberOfSites = d.NUMBEROFSITES,
                             numberOfSamples = d.NUMBEROFSAMPLES

                             //samplingPlan = (from d in db.SPC_SAMPLINGPLAN
                             //                where d.SYSID == c.SAMPLINGPLAN
                             //                select new CEdcSamplingPlan()
                             //                {
                             //                    collectionType = d.COLLECTIONTYPE,
                             //                    prompt = d.COLLECTIONTYPE,
                             //                    operatorInstructions = d.COLLECTIONTYPE,
                             //                    numberOfUnits = d.NUMBEROFUNITS.Value,
                             //                    numberOfSites = d.NUMBEROFSITES.Value,
                             //                    numberOfSamples = d.NUMBEROFSAMPLES.Value
                             //                }).FirstOrDefault<CEdcSamplingPlan>(),
                             //derivation = (from d in db.SPC_DERIVATION
                             //              where d.SYSID == c.DERIVATION
                             //              select new CEdcDerivation()
                             //              {
                             //                  edcOperator = d.EDCOPERATOR,
                             //                  operand1 = d.OPERAND1,
                             //                  operand2 = d.OPERAND2,
                             //                  dataHandlingType = d.DATAHANDLINGTYPE,
                             //                  Data1 = d.DATA1,
                             //                  Data2 = d.DATA2,
                             //                  limitSelection = d.LIMITSELECTION,
                             //                  upperLimit = d.UPPERLIMIT,
                             //                  lowerLimit = d.LOWERLIMIT,
                             //                  storeInDatabase = d.STOREINDATABASE == "T" ? true : false
                             //              }).FirstOrDefault<CEdcDerivation>()
                         }).ToList<CEdcMeasSpec>().FirstOrDefault<CEdcMeasSpec>();

            return query;
        }


        //public static TEdcMeasurementSpec GetTEdcMeasurementSpecByName( string name)
        //{
        //    SpcContext db = new SpcContext();
        //    var query = (from c in db.SPC_MEASUREMENTSPEC
        //                 where c.NAME == name
        //                 select new TEdcMeasurementSpec()
        //                 { 
        //                     name = c.NAME,
        //                     description = c.DESCRIPTION,
        //                     measurementType = c.MEASUREMENTTYPE,
        //                     dataType = c.DATATYPE,
        //                     unit = c.UNIT,
        //                     isDerived = c.ISDERIVED == "T" ? true : false,
        //                     autoExclude = c.AUTOEXCLUDE == "T" ? true : false,
        //                     allowLimitOverride = c.ALLOWLIMITOVERRIDE == "T" ? true : false,
        //                     upperScreeningLimit = c.UPPERSCREENINGLIMIT,
        //                     upperSpecLimit = c.UPPERSPECLIMIT,
        //                     target = c.TARGET,
        //                     lowerSpecLimit = c.LOWERSPECLIMIT,
        //                     lowerScreeningLimit = c.LOWERSCREENINGLIMIT,
        //                     samplingPlan = (from d in db.SPC_SAMPLINGPLAN
        //                                     where d.SYSID == c.SAMPLINGPLAN
        //                                     select new TEdcSamplingPlan()
        //                                     {
        //                                         collectionType = d.COLLECTIONTYPE,
        //                                         prompt = d.COLLECTIONTYPE,
        //                                         operatorInstructions = d.COLLECTIONTYPE,
        //                                         numberOfUnits = d.NUMBEROFUNITS,
        //                                         numberOfSites = d.NUMBEROFSITES,
        //                                         numberOfSamples = d.NUMBEROFSAMPLES
        //                                     }).FirstOrDefault<TEdcSamplingPlan>(),
        //                     derivation = (from d in db.SPC_DERIVATION
        //                                   where d.SYSID == c.DERIVATION
        //                                   select new TEdcDerivation()
        //                                   {
        //                                       edcOperator = d.EDCOPERATOR,
        //                                       operand1 = d.OPERAND1,
        //                                       operand2 = d.OPERAND2,
        //                                       dataHandlingType = d.DATAHANDLINGTYPE,
        //                                       data1 = d.DATA1,
        //                                       data2 = d.DATA2,
        //                                       limitSelection = d.LIMITSELECTION,
        //                                       upperLimit = d.UPPERLIMIT,
        //                                       lowerLimit = d.LOWERLIMIT,
        //                                       storeInDatabase = d.STOREINDATABASE == "T" ? true : false
        //                                   }).FirstOrDefault<TEdcDerivation>()
        //                 }).ToList<TEdcMeasurementSpec>().FirstOrDefault<TEdcMeasurementSpec>();

        //    return query;
        //}

  
        public static CEdcMeasSpec CreateCEdcMeasurementSpec(SpcContext db, Arch.ClientInfo client, CEdcMeasSpec obj)
        {
            if (!ValidateLimits(obj))
            {
                throw new Exception("Limits validation Error");
            }

            var oldObj = (from c in db.SPC_MEASUREMENTSPEC
                          where c.NAME == obj.name
                          select c).SingleOrDefault<SPC_MEASUREMENTSPEC>();

            if (oldObj != null)
            {
                throw new Exception(SPCErrCodes.measSpecNameAlreadyExist.ToString());
            }

            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    SPC_MEASUREMENTSPEC measureSpec = new SPC_MEASUREMENTSPEC();
                    measureSpec.SYSID = SPCUtils.GetSysID(typeof(SPC_MEASUREMENTSPEC));
                    measureSpec.NAME = obj.name;
                    measureSpec.DESCRIPTION = obj.description;
                    measureSpec.MEASUREMENTTYPE = obj.measurementType;
                    measureSpec.DATATYPE = obj.dataType;
                    measureSpec.UNIT = obj.unit;
                    measureSpec.ISDERIVED = obj.isDerived ? "T" : "F";
                    measureSpec.AUTOEXCLUDE = obj.autoExclude ? "T" : "F";
                    measureSpec.ALLOWLIMITOVERRIDE = obj.allowLimitOverride ? "T" : "F";
                    measureSpec.UPPERSCREENINGLIMIT = obj.upperScreeningLimit;
                    measureSpec.UPPERSPECLIMIT = obj.upperSpecLimit;
                    measureSpec.TARGET = obj.target;
                    measureSpec.LOWERSPECLIMIT = obj.lowerSpecLimit;
                    measureSpec.LOWERSCREENINGLIMIT = obj.lowerScreeningLimit;


                    //     samplingPlan = (from d in db.SPC_SAMPLINGPLAN
                    //                     where d.SYSID == c.SAMPLINGPLAN
                    //                     select new CEdcSamplingPlan()
                    //                     {
                    //                         collectionType = d.COLLECTIONTYPE,
                    //                         prompt = d.COLLECTIONTYPE,
                    //                         operatorInstructions = d.COLLECTIONTYPE,
                    //                         numberOfUnits = d.NUMBEROFUNITS,
                    //                         numberOfSites = d.NUMBEROFSITES,
                    //                         numberOfSamples = d.NUMBEROFSAMPLES
                    //                     }).FirstOrDefault<CEdcSamplingPlan>(),
                    //     derivation = (from d in db.SPC_DERIVATION
                    //                   where d.SYSID == c.DERIVATION
                    //                   select new CEdcDerivation()
                    //                   {
                    //                       edcOperator = d.EDCOPERATOR,
                    //                       operand1 = d.OPERAND1,
                    //                       operand2 = d.OPERAND2,
                    //                       dataHandlingType = d.DATAHANDLINGTYPE,
                    //                       Data1 = d.DATA1,
                    //                       Data2 = d.DATA2,
                    //                       limitSelection = d.LIMITSELECTION,
                    //                       upperLimit = d.UPPERLIMIT,
                    //                       lowerLimit = d.LOWERLIMIT,
                    //                       storeInDatabase = d.STOREINDATABASE == "T" ? true : false
                    //                   }).FirstOrDefault<CEdcDerivation>()




                    SPC_LOG log = new SPC_LOG(client, EnumOpType.Create)
                    {
                        OLDVALUE = JsonUtil.Serialize(oldObj),
                        ObjectName = typeof(SPC_CHART).Name,
                        SYSID = SPCUtils.GetSysID(typeof(SPC_LOG))
                    };

                    db.SPC_LOG.Add(log);
                    db.SPC_MEASUREMENTSPEC.Add(measureSpec);
                    db.SaveChanges();
                    trans.Commit();
                    return new CEdcMeasSpec()
                    {
                        name = measureSpec.NAME,
                        description = measureSpec.DESCRIPTION
                    };
                }
                catch
                {
                    trans.Rollback();
                }
            }
            return null;
        }

        public static CEdcMeasSpec UpdateCEdcMeasurementSpec(SpcContext db, Arch.ClientInfo client, CEdcMeasSpec obj)
        {
            if (!ValidateLimits(obj))
            {
                throw new Exception("Limits validation Error");
            }

            var oldObj = (from c in db.SPC_MEASUREMENTSPEC
                          where c.NAME == obj.name
                          select c).SingleOrDefault<SPC_MEASUREMENTSPEC>();

            if (oldObj == null)
            {
                throw new Exception("MeasSpecNameNotExist");
            }

            using var trans = db.Database.BeginTransaction();
            try
            {
                SPC_MEASUREMENTSPEC measureSpec = new SPC_MEASUREMENTSPEC
                {
                    SYSID = oldObj.SYSID,
                    NAME = oldObj.NAME,
                    DESCRIPTION = obj.description,
                    MEASUREMENTTYPE = obj.measurementType,
                    DATATYPE = obj.description,
                    UNIT = obj.unit,
                    ISDERIVED = obj.isDerived ? "T" : "F",
                    AUTOEXCLUDE = obj.autoExclude ? "T" : "F",
                    ALLOWLIMITOVERRIDE = obj.allowLimitOverride ? "T" : "F",
                    UPPERSCREENINGLIMIT = obj.upperScreeningLimit,
                    UPPERSPECLIMIT = obj.upperSpecLimit,
                    TARGET = obj.target,
                    LOWERSPECLIMIT = obj.lowerSpecLimit,
                    LOWERSCREENINGLIMIT = obj.lowerScreeningLimit
                };
                SPC_LOG log = new SPC_LOG(client, EnumOpType.Modify);
                log.OLDVALUE = JsonUtil.Serialize(oldObj);


                oldObj.NAME = obj.name;
                oldObj.DESCRIPTION = obj.description;

                oldObj.TIMESTAMP = oldObj.TIMESTAMP + 1;

                log.NEWVALUE = JsonUtil.Serialize(oldObj);
                log.ObjectName = typeof(SPC_CHART).Name;
                log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                db.SPC_LOG.Add(log);
                db.SPC_MEASUREMENTSPEC.Update(measureSpec);
                db.SaveChanges();
                trans.Commit();
                return new CEdcMeasSpec()
                {
                    name = oldObj.NAME,
                    description = oldObj.DESCRIPTION

                };
            }
            catch
            {
                trans.Rollback();

            }

            return null;
        }

        public static void DeleteCEdcMeasurementSpecByName(SpcContext db, Arch.ClientInfo client, string name)
        {
            var queryObj = (from c in db.SPC_MEASUREMENTSPEC
                            where c.NAME == name
                            select c).SingleOrDefault<SPC_MEASUREMENTSPEC>();

            if (queryObj == null)
            {

            }
            else
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        SPC_LOG log = new SPC_LOG(client, EnumOpType.Delete);
                        log.OLDVALUE = JsonUtil.Serialize(queryObj);
                        log.ObjectName = typeof(SPC_CHART).Name;
                        log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                        db.SPC_LOG.Add(log);
                        db.SPC_MEASUREMENTSPEC.Remove(queryObj);
                        db.SaveChanges();
                        trans.Commit();
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();

                    }
                }


            }




        }


        public static bool ValidateLimits(CEdcMeasSpec measurespec)
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
            if (measurespec.dataType == DataType.FLOAT.ToString())
            {
                double maxScrn = double.MaxValue;
                double uprScrn = (StringUtil.NullString(measurespec.upperScreeningLimit))
                                  ? (maxScrn) : (double.Parse(measurespec.upperScreeningLimit));
                double uprSpec = (StringUtil.NullString(measurespec.upperSpecLimit))
                                        ? (uprScrn) : (double.Parse(measurespec.upperSpecLimit));
                if (uprScrn < uprSpec)
                {
                    throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                }

                // check -maxScrn <= lwrScrn <= lwrSpec
                double lwrScrn = (StringUtil.NullString(measurespec.lowerScreeningLimit))
                                   ? (-maxScrn) : (double.Parse(measurespec.lowerScreeningLimit));
                double lwrSpec = (!StringUtil.DoubleableString(measurespec.lowerSpecLimit))
                                   ? (lwrScrn) : (double.Parse(measurespec.lowerSpecLimit));
                if (lwrScrn > lwrSpec)
                {
                    throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                }

                //// check lwrSpec <= targVal <= uprSpec
                if (StringUtil.NullString(measurespec.target))
                {
                    if (lwrSpec > uprSpec)
                    {
                        throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                    }
                }
                else
                {
                    double targVal = double.Parse(measurespec.target);
                    if (lwrSpec > targVal || targVal > uprSpec)
                    {
                        throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                    }
                }
            }
            else if (measurespec.dataType == DataType.INTEGER.ToString())
            {
                double maxScrn = 2147483647;

                int iMaxScrn = int.MaxValue;
                // check maxScrn >= uprScrn >= uprSpec
                double uprScrn = (StringUtil.NullString(measurespec.upperScreeningLimit))
                               ? (maxScrn) : (double.Parse(measurespec.upperScreeningLimit));
                double uprSpec = (StringUtil.NullString(measurespec.upperSpecLimit))
                                 ? (uprScrn) : (double.Parse(measurespec.upperSpecLimit));
                if (maxScrn < uprScrn || uprScrn < uprSpec)
                {
                    throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                }

                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                int iUprScrn = (StringUtil.NullString(measurespec.upperScreeningLimit))
                               ? (iMaxScrn) : (int.Parse(measurespec.upperScreeningLimit));
                int iUprSpec = (StringUtil.NullString(measurespec.upperSpecLimit))
                               ? (iUprScrn) : (int.Parse(measurespec.upperSpecLimit));
                if (iUprScrn != uprScrn || iUprSpec != uprSpec)
                {
                    throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                }

                // check -maxScrn <= lwrScrn <= lwrSpec
                double lwrScrn = (StringUtil.NullString(measurespec.lowerScreeningLimit))
                                 ? (-maxScrn) : (double.Parse(measurespec.lowerScreeningLimit));
                double lwrSpec = (StringUtil.NullString(measurespec.lowerSpecLimit))
                                 ? (lwrScrn) : (double.Parse(measurespec.lowerSpecLimit));
                if (-maxScrn > lwrScrn || lwrScrn > lwrSpec)
                {
                    throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                }

                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                int iLwrScrn = (StringUtil.NullString(measurespec.lowerScreeningLimit))
                               ? (-iMaxScrn) : (int.Parse(measurespec.lowerScreeningLimit));
                int iLwrSpec = (StringUtil.NullString(measurespec.lowerSpecLimit))
                               ? (iLwrScrn) : (int.Parse(measurespec.lowerSpecLimit));
                if (iLwrScrn != lwrScrn || iLwrSpec != lwrSpec)
                {
                    throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                }

                // check lwrSpec <= targVal <= uprSpec
                if (StringUtil.NullString(measurespec.target))
                {
                    if (lwrSpec > uprSpec)
                    {
                        throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                    }
                }
                else
                {
                    double targVal = double.Parse(measurespec.target);
                    if (lwrSpec > targVal || targVal > uprSpec)
                    {
                        throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                    }
                    int iTargVal = int.Parse(measurespec.target);
                    if (iTargVal != targVal)
                    {
                        throw new Exception(SPCErrCodes.errBadSpecLimits.ToString());
                    }
                }
            }
            else if (measurespec.dataType != DataType.STRING.ToString())
            {
                // This  error should be caught by the client, but a catch
                //  is here just in case a 3rd party app is written.
                throw new Exception(SPCErrCodes.errBadDataType.ToString());

            } // end-if dataType 

            return true;
        }

    }
}
