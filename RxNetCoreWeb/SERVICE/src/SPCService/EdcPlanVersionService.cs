using Arch; 
using System;
using System.Collections.Generic;
using System.Linq; 
using System.Linq.Dynamic.Core; 

namespace SPCService
{
    public class EdcPlanVersionService

    {



        //public static object GetCFwEdcPlanVersions(SpcContext db, List<KeyValue> where)
        //{
        //    string sWhere = CreateWhereClause(where);
        //    var query = (from c in db.FWEDCPLANVERSION
        //                .Where(sWhere)
        //                 select new CEdcPlanVersion()
        //                 {
                         
                            
        //                 }).OrderBy("Name").ToList<CFwEdcPlanVersion>();

        //    return query;


        //}


        //public static object GetCFwEdcPlanVersion(SpcContext db, List<KeyValue> where)
        //{
        //    string sWhere = CreateWhereClause(where);
        //    var query = (from c in db.FWEDCPLANVERSION
        //                .Where(sWhere)
        //                 select new CFwEdcPlanVersion()
        //                 {
                            
                              
        //                 }).ToList<CFwEdcPlanVersion>().FirstOrDefault<CFwEdcPlanVersion>();

        //    return query;


        //}
        //public static object SaveCFwEdcPlanVersion(SpcContext db, ClientInfo client, CFwEdcPlanVersion obj, bool isCreate)
        //{
        //    var oldObj = (from c in db.FWEDCCHART
        //                  where c.NAME == obj.Name
        //                  select c).SingleOrDefault<FWEDCCHART>();

        //    if (oldObj == null && isCreate)
        //    {
        //        using (var trans = db.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                FWEDCCHART chart = new FWEDCCHART();

        //                chart.NAME = obj.Name;
        //                chart.DESCRIPTION = obj.Description;
                        


        //                FwIDELog log = new FwIDELog(client, EnumOpType.Create.ToString());
        //                log.OLDVALUE = JsonUtil.Serialize(oldObj);
        //                log.ObjectName = typeof(FWEDCCHART).Name;
        //                log.SYSID = MESUtils.GetSysID(typeof(FwIDELog));
        //                db.FwIDELog.Add(log);
        //                db.FWEDCCHART.Add(chart);
        //                db.SaveChanges();
        //                trans.Commit();
        //                return new CFwEdcPlanVersion()
        //                {
        //                    Sysid = chart.SYSID,
        //                    Name = chart.NAME,
        //                    Description = chart.DESCRIPTION,
                            
        //                };
        //            }
        //            catch (Exception ex)
        //            {
        //                trans.Rollback();

        //            }
        //        }

        //    }
        //    else if (!isCreate)//modify
        //    {
        //        using (var trans = db.Database.BeginTransaction())
        //        {
        //            try
        //            {

        //                FwIDELog log = new FwIDELog(client, EnumOpType.Modify.ToString());
        //                log.OLDVALUE = JsonUtil.Serialize(oldObj);


        //                oldObj.NAME = obj.Name;
        //                oldObj.DESCRIPTION = obj.Description;
                        
        //                oldObj.FWTIMESTAMP = oldObj.FWTIMESTAMP + 1;
                         
        //                log.NEWVALUE = JsonUtil.Serialize(oldObj);
        //                log.ObjectName = typeof(FWEDCCHART).Name;
        //                log.SYSID = MESUtils.GetSysID(typeof(FwIDELog));
        //                db.FwIDELog.Add(log); 
        //                db.SaveChanges();
        //                trans.Commit();
        //                return new CFwEdcPlanVersion()
        //                {
        //                    Sysid = oldObj.SYSID,
        //                    Name = oldObj.NAME,
        //                    Description = oldObj.DESCRIPTION,
                            
        //                };
        //            }
        //            catch (Exception ex)
        //            {
        //                trans.Rollback();

        //            }
        //        }
        //    }
        //    return null;

        //}
        //public static void DeleteCFwEdcPlanVersion(SpcContext db, ClientInfo client, CFwEdcPlanVersion obj)
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
        //                FwIDELog log = new FwIDELog(client, EnumOpType.Delete.ToString());
        //                log.OLDVALUE = JsonUtil.Serialize(queryObj);
        //                log.ObjectName = typeof(FWEDCCHART).Name;
        //                log.SYSID = MESUtils.GetSysID(typeof(FwIDELog));
        //                db.FwIDELog.Add(log);
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




        //}
    }
}

