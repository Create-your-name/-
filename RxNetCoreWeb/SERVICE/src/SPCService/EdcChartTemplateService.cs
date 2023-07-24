using Arch; 
using System;
using System.Collections.Generic;
using System.Linq; 
using System.Linq.Dynamic.Core; 
using SPCService.Database; 
using SPCService.DbModel;
using SPCService.src.Framework.Common;
using Protocol;
using SPCService.BusinessModel;

namespace SPCService
{
    public class EdcChartTemplateService

    {
        public static object GetCEdcChartTemplates(SpcContext db, List<KeyValue> where)
        {
            string sWhere = EDCService.CreateWhereClause(where);
            var query = (from c in db.SPC_CHARTTEMPLATE
                        .Where(sWhere)
                         select new CEdcChartTemplate()
                         {
                             Sysid = c.SYSID,
                             Name = c.NAME,
                             Description = c.DESCRIPTION,
                             spcTemplate = c.SPCTEMPLATE 
                         }).OrderBy("Name").ToList<CEdcChartTemplate>();

            return query;


        } 
        public static object GetCEdcChartTemplate(SpcContext db, List<KeyValue> where)
        {
            string sWhere = EDCService.CreateWhereClause(where);
            var query = (from c in db.SPC_CHARTTEMPLATE
                        .Where(sWhere)
                         select new CEdcChartTemplate()
                         {
                             Sysid = c.SYSID,
                             Name = c.NAME,
                             Description = c.DESCRIPTION,
                             spcTemplate = c.SPCTEMPLATE,
                            
                             
                         }).FirstOrDefault<CEdcChartTemplate>();


            query.defaultParameters.AddRange((from e in db.SPC_CHARTTEMPLATE_N2M
                                              where e.FROMID == query.Sysid && e.LINKNAME == EnumLinkName.defaultParameters.ToString()
                                              join f in db.SPC_CHARTPARAMETER
                                              on e.TOID equals f.SYSID
                                              select new CEdcChartParameter()
                                              {
                                                  property = f.PROPERTY,
                                                  value = f.VALUE
                                              }).ToList<CEdcChartParameter>());
            return query;
             


        }
        public static object SaveCEdcChartTemplate(SpcContext db, Arch.ClientInfo client, CEdcChartTemplate obj, bool isCreate)
        {
            var oldObj = (from c in db.SPC_CHART
                          where c.NAME == obj.Name
                          select c).SingleOrDefault<SPC_CHART>();

            if (oldObj == null && isCreate)
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        SPC_CHART chart = new SPC_CHART();
                        chart.NAME = obj.Name;
                        chart.DESCRIPTION = obj.Description;

                        SPC_LOG log = new SPC_LOG(client, EnumOpType.Create);
                        log.OLDVALUE = JsonUtil.Serialize(oldObj);
                        log.ObjectName = typeof(SPC_CHART).Name;
                        log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                        db.SPC_LOG.Add(log);
                        db.SPC_CHART.Add(chart);
                        db.SaveChanges();
                        trans.Commit();
                        return new CEdcChartTemplate()
                        {
                            Sysid = chart.SYSID,
                            Name = chart.NAME,
                            Description = chart.DESCRIPTION,

                        };
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();

                    }
                }

            }
            else if (!isCreate)//modify
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {

                        SPC_LOG log = new SPC_LOG(client, EnumOpType.Modify);
                        log.OLDVALUE = JsonUtil.Serialize(oldObj);


                        oldObj.NAME = obj.Name;
                        oldObj.DESCRIPTION = obj.Description;

                        oldObj.TIMESTAMP = oldObj.TIMESTAMP + 1;

                        log.NEWVALUE = JsonUtil.Serialize(oldObj);
                        log.ObjectName = typeof(SPC_CHART).Name;
                        log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                        db.SPC_LOG.Add(log);
                        db.SaveChanges();
                        trans.Commit();
                        return new CEdcChartTemplate()
                        {
                            Sysid = oldObj.SYSID,
                            Name = oldObj.NAME,
                            Description = oldObj.DESCRIPTION,

                        };
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();

                    }
                }
            }
            return null;

        }
        public static void DeleteCEdcChartTemplate(SpcContext db, Arch.ClientInfo client, CEdcChartTemplate obj)
        {
            var queryObj = (from c in db.SPC_CHART
                            where c.NAME == obj.Name
                            select c).SingleOrDefault<SPC_CHART>(); 

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
                        db.SPC_CHART.Remove(queryObj);
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
    }
}

