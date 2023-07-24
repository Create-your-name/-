using Arch;
using System;
using System.Collections.Generic;
using System.Linq;
using SPCService.Database;
using System.Linq.Dynamic.Core; 
using SPCService.DbModel;
using SPCService.src.Framework.Common;
using Protocol;
using SPCService.BusinessModel;

namespace SPCService
{
    public partial class EdcChartService

    {

        public static object GetCEdcCharts(SpcContext db, List<KeyValue> where)
        {
            string sWhere = EDCService.CreateWhereClause(where);
            var query = (from c in db.SPC_CHART
                        .Where(sWhere)
                         select new CEdcChart()
                         {
                             Sysid = c.SYSID,
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             spcTemplate = c.CHARTTEMPLATE,
                             measurementSpec = c.MEASUREMENTSPEC,
                             edcPlan = c.EDCPLAN,
                             planId = c.PROCESSPLAN,
                             productName = c.PRODUCT,
                             stepId = c.STEP,
                             lotId = c.LOT,
                             equipment = c.EQUIPMENT,
                             partition = c.PARTITION,
                             publishToName = c.PUBLISHTONAME == "T" ? true : false,
                             loadOnStartup = c.LOADONSTARTUP == "T" ? true : false,
                             whenToDisplay = c.WHENTODISPLAY,
                             historicalHours = c.HISTORICALHOURS,
                             historicalPoints = c.HISTORICALPOINTS
                         }).OrderBy("Name").ToList<CEdcChart>();

            return query;


        }



        public static object GetCEdcChart(string chartName)
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_CHART
                         
                         select new CEdcChart()
                         {
                             Sysid = c.SYSID,
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             spcTemplate = c.CHARTTEMPLATE,
                             measurementSpec = c.MEASUREMENTSPEC,
                             edcPlan = c.EDCPLAN,
                             planId = c.PROCESSPLAN,
                             productName = c.PRODUCT,
                             stepId = c.STEP,
                             lotId = c.LOT,
                             equipment = c.EQUIPMENT,
                             partition = c.PARTITION,
                             publishToName = c.PUBLISHTONAME == "T" ? true : false,
                             loadOnStartup = c.LOADONSTARTUP == "T" ? true : false,
                             whenToDisplay = c.WHENTODISPLAY,
                             historicalHours = c.HISTORICALHOURS ,
                             historicalPoints = c.HISTORICALPOINTS , 
                         });
             
             

            //(from d in db.SPC_CHARTTEMPLATE
            // where d.SYSID == c.CHARTTEMPLATE
            // select new CEdcChartTemplate()
            // {
            //     Sysid = d.SYSID,
            //     Name = d.NAME,
            //     Description = d.DESCRIPTION,
            //     spcTemplate = d.SPCTEMPLATE,
            //     defaultParameters = (from e in db.SPC_CHARTTEMPLATE_N2M
            //                          where e.FROMID == d.SYSID && e.LINKNAME == EnumLinkName.defaultParameters.ToString()
            //                          join f in db.SPC_CHARTPARAMETER
            //                          on e.TOID equals f.SYSID
            //                          select new CEdcChartParameter()
            //                          {
            //                              Property = f.SYSID,
            //                              Value = f.VALUE
            //                          }).ToList<CEdcChartParameter>()
            // }).FirstOrDefault<CEdcChartTemplate>()


            //overrideParameters = (from e in db.SPC_CHART_N2M
            //                      where e.FROMID == c.SYSID && e.LINKNAME == EnumLinkName.overrideParameters.ToString()
            //                      join f in db.SPC_CHARTPARAMETER
            //                      on e.TOID equals f.SYSID
            //                      select new CEdcChartParameter()
            //                      {
            //                          Property = f.SYSID,
            //                          Value = f.VALUE
            //                      }).ToList<CEdcChartParameter>(),
            //                 spcCustomRule = (from e in db.SPC_CHART_N2M
            //                                  where e.FROMID == c.SYSID && e.LINKNAME == EnumLinkName.spcCustomRule.ToString()
            //                                  join f in db.SPC_CUSTOMRULE
            //                                  on e.TOID equals f.SYSID
            //                                  select new CEdcSpcCustomRule()
            //                                  {
            //                                      Name = f.NAME,
            //                                      reason = f.REASON,
            //                                      testCount = f.TESTCOUNT.Value,
            //                                      outOf = f.OUTOF.Value,
            //                                      comparison = f.COMPARISON,
            //                                      withRespectTo = f.WITHRESPECTTO,
            //                                      value = f.VALUE,
            //                                      stdDevs = f.STDDEVS,
            //                                      datasetName = f.DATASETNAME,
            //                                      intervalFrom = f.INTERVALFROM,
            //                                      intervalTo = f.INTERVALTO

            //                                  }).ToList<CEdcSpcCustomRule>()
            return query;




        }
        public static object SaveCEdcChart(SpcContext db, Arch.ClientInfo client, CEdcChart obj, bool isCreate)
        {
            var oldObj = (from c in db.SPC_CHART
                          where c.NAME == obj.name
                          select c).SingleOrDefault<SPC_CHART>();

            if (oldObj == null && isCreate)
            {
                using (var trans = db.Database.BeginTransaction())
                {
                    try
                    {
                        SPC_CHART chart = new SPC_CHART();
                        chart.NAME = obj.name;
                        chart.DESCRIPTION = obj.description;

                        SPC_LOG log = new SPC_LOG(client, EnumOpType.Create);
                        log.OLDVALUE = JsonUtil.Serialize(oldObj);
                        log.ObjectName = typeof(SPC_CHART).Name;
                        log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                        db.SPC_LOG.Add(log);
                        db.SPC_CHART.Add(chart);
                        db.SaveChanges();
                        trans.Commit();
                        return new CEdcChart()
                        {
                            Sysid = chart.SYSID,
                            name = chart.NAME,
                            description = chart.DESCRIPTION,

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


                        oldObj.NAME = obj.name;
                        oldObj.DESCRIPTION = obj.description; 
                        oldObj.TIMESTAMP = oldObj.TIMESTAMP + 1; 
                        log.NEWVALUE = JsonUtil.Serialize(oldObj);
                        log.ObjectName = typeof(SPC_CHART).Name;
                        log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
                        db.SPC_LOG.Add(log);
                        db.SaveChanges();
                        trans.Commit();
                        return new CEdcChart()
                        {
                            Sysid = oldObj.SYSID,
                            name = oldObj.NAME,
                            description = oldObj.DESCRIPTION,

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
        public static void DeleteCEdcChart(SpcContext db, Arch.ClientInfo client, CEdcChart obj)
        {
            var queryObj = (from c in db.SPC_CHART
                            where c.NAME == obj.name
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

