using Arch;
using Protocol;
using SPCService.BusinessModel;
using SPCService.Database;
using SPCService.DbModel;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;

namespace SPCService
{
    public class EdcPlanService
    {
        public static List<CEdcPlanVersion> GetCEdcPlans(SpcContext db, List<KeyValue> where)
        {
            string sWhere = EDCService.CreateWhereClause(where);
            var query = (from c in db.SPC_PLANVERSION
                        .Where(sWhere)
                         select new CEdcPlanVersion()
                         {
                             Name = c.NAME,
                             Description = c.DESCRIPTION,
                             Owner = c.OWNER,
                             Revision = c.REVISION,
                             RevState = c.REVSTATE
                         }).OrderBy("Name").ToList<CEdcPlanVersion>();
            return query;

        }

        public static TEdcPlanVersion EdcPlanextractActive(string   name)
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_PLANVERSION
                         where( c.NAME == name  && c.REVSTATE == "Active")
                        select new TEdcPlanVersion()
                         {
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             owner = c.OWNER,
                             revision = c.REVISION,
                             revState = c.REVSTATE
                         }).ToList<TEdcPlanVersion>().FirstOrDefault<TEdcPlanVersion>();
            return query;

        }
        //        FwEdcPlan::extractActive(const FwString& name)
        //{
        //// this static method does a join of the plan and 
        //// plan version tables to return the current active
        //// version

        //  TRACE_METHOD(FwEdcPlan, extractActive);

        //        FwOrdered fetchColl(TRUE);
        //        FwString whereClause("name=:name and revstate='Active'");
        //        FwSet dataSet(TRUE);
        //        FwDbBindItem::bindValue(":name",FwPrim(FwString)(name),dataSet);

        //  FwStoreStatus fetchErr =
        //      FwEdcPlanVersion::fetchWhere(whereClause, dataSet, fetchColl, TRUE);
        //  if (fetchErr)
        //    {
        //      FwThrow(fetchErr, (FwRef(FwEdcPlanVersion))nil);
        //    }

        //  if (fetchColl.entries() != 1)
        //    {
        //      FwError planErr(FwErrorCode(FwEdc, noActivePlan));
        //    FwThrow(planErr, (FwRef(FwEdcPlanVersion))nil);
        //    }

        //FwRef(FwEdcPlanVersion) planVRef =
        //    *(FwRef(FwEdcPlanVersion) *)fetchColl.first();

        //return planVRef;
        //}


        public static CEdcPlanVersion GetCEdcPlan(SpcContext db, List<KeyValue> where)
        {
            string sWhere = EDCService.CreateWhereClause(where);
            var query = (from c in db.SPC_PLANVERSION
                        .Where(sWhere)
                         select new CEdcPlanVersion()
                         {
                             Name = c.NAME,
                             Description = c.DESCRIPTION,
                             Owner = c.OWNER,
                             Revision = c.REVISION,
                             RevState = c.REVSTATE,
                             Sysid = c.SYSID, 
                         }).ToList<CEdcPlanVersion>().FirstOrDefault<CEdcPlanVersion>();

            query.MeasurementSpecs.AddRange((from e in db.SPC_PLANVERSION_N2M
                                             where e.FROMID == query.Sysid && e.LINKNAME == EnumLinkName.overrideParameters.ToString()
                                             join f in db.SPC_MEASUREMENTSPEC
                                             on e.TOID equals f.SYSID
                                             select new CEdcMeasSpec()
                                             {
                                                 name = f.NAME,
                                                 description = f.DESCRIPTION,
                                                 measurementType = f.MEASUREMENTTYPE,
                                                 dataType = f.DATATYPE,
                                                 unit = f.UNIT,
                                                 isDerived = f.ISDERIVED == "T" ? true : false,
                                                 autoExclude = f.AUTOEXCLUDE == "T" ? true : false,
                                                 allowLimitOverride = f.ALLOWLIMITOVERRIDE == "T" ? true : false,
                                                 upperScreeningLimit = f.UPPERSCREENINGLIMIT,
                                                 upperSpecLimit = f.UPPERSPECLIMIT,
                                                 target = f.TARGET,
                                                 lowerSpecLimit = f.LOWERSPECLIMIT,
                                                 lowerScreeningLimit = f.LOWERSCREENINGLIMIT
                                             }).ToList<CEdcMeasSpec>());

            return query;


        }

        public static CEdcPlanVersion CreateCEdcPlan(SpcContext db, Arch.ClientInfo client, CEdcPlanVersion obj)
        {
            var oldObj = (from c in db.SPC_PLANVERSION
                          where c.NAME == obj.Name
                          select c).SingleOrDefault<SPC_PLANVERSION>();
            if (oldObj != null)
            {
                throw new Exception("PlanAlreadExist!");
            }

            using var trans = db.Database.BeginTransaction();
            try
            {
                SPC_PLANVERSION edcplan = new SPC_PLANVERSION();

                edcplan.NAME = obj.Name;



                SPC_LOG log = new SPC_LOG(client, EnumOpType.Create);
                log.OLDVALUE = JsonUtil.Serialize(oldObj);
                log.ObjectName = typeof(SPC_PLANVERSION).Name;
                log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                db.SPC_LOG.Add(log);
                db.SPC_PLANVERSION.Add(edcplan);
                db.SaveChanges();
                trans.Commit();
                return new CEdcPlanVersion()
                {

                    Name = edcplan.NAME,

                };
            }
            catch (Exception ex)
            {
                trans.Rollback();

            }

            return null;
        }

        public static CEdcPlanVersion UpdateCEdcPlan(SpcContext db, Arch.ClientInfo client, CEdcPlanVersion obj)
        {
            var oldObj = (from c in db.SPC_PLANVERSION
                          where c.NAME == obj.Name
                          select c).SingleOrDefault<SPC_PLANVERSION>();

            using var trans = db.Database.BeginTransaction();
            try
            {

                SPC_LOG log = new SPC_LOG(client, EnumOpType.Modify);
                log.OLDVALUE = JsonUtil.Serialize(oldObj);


                oldObj.NAME = obj.Name;

                //oldObj.FWTIMESTAMP = oldObj.FWTIMESTAMP + 1;

                log.NEWVALUE = JsonUtil.Serialize(oldObj);
                log.ObjectName = typeof(CEdcPlanVersion).Name;
                log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                db.SPC_LOG.Add(log);
                db.SaveChanges();
                trans.Commit();
                return new CEdcPlanVersion()
                {

                    Name = oldObj.NAME,

                };
            }
            catch (Exception ex)
            {
                trans.Rollback();

            }
            return null;

        }
        
        //public static void DeleteCEdcPlan(SpcContext db, ClientInfo client, CEdcPlan obj)
        //{
        //    var queryObj = (from c in db.FWEDCCHART
        //                    where c.NAME == obj.Name
        //                    select c).SingleOrDefault<FWEDCCHART>();

        //    if (queryObj == null)
        //    {

        //    }
        //    else
        //    {
        //        using (var trans = db.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                SPC_LOG log = new SPC_LOG(client, EnumOpType.Delete.ToString());
        //                log.OLDVALUE = JsonUtil.Serialize(queryObj);
        //                log.ObjectName = typeof(FWEDCCHART).Name;
        //                log.SYSID = MESUtils.GetSysID(typeof(SPC_LOG));
        //                db.SPC_LOG.Add(log);
        //                db.FWEDCCHART.Remove(queryObj);
        //                db.SaveChanges();
        //                trans.Commit();
        //            }
        //            catch (Exception ex)
        //            {
        //                trans.Rollback();

        //            }
        //        }


        //    }




    }
}


