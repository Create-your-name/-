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
    public partial class EDCService

    {

        //public static object GetCEdcCharts(SpcContext db, List<KeyValue> where)
        //{
        //    string sWhere = CreateWhereClause(where);
        //    var query = (from c in db.SPC_CHART
        //                .Where(sWhere)
        //                 select new CEdcChart()
        //                 {
        //                     Sysid = c.SYSID,
        //                     Name = c.NAME,
        //                     Description = c.DESCRIPTION,
        //                     measurementSpec = c.MEASUREMENTSPEC,
        //                     EDCPlan = c.EDCPLAN,
        //                     processPlan = c.PROCESSPLAN,
        //                     product = c.PRODUCT,
        //                     Step = c.STEP,
        //                     Lot = c.LOT,
        //                     equipment = c.EQUIPMENT,
        //                     Partition = c.PARTITION,
        //                     publishToName = c.PUBLISHTONAME == "T" ? true : false,
        //                     loadOnStartup = c.LOADONSTARTUP == "T" ? true : false,
        //                     whenToDisplay = c.WHENTODISPLAY,
        //                     historicalHours = c.HISTORICALHOURS.Value,
        //                     historicalPoints = c.HISTORICALPOINTS.Value
        //                 }).OrderBy("Name").ToList<CEdcChart>();

        //    return query;


        //}



        public static TEdcDataCollection GetCEdcDataCollection(string sysid)
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_DATACOLLECTION
                         where c.SYSID == sysid
                         select new TEdcDataCollection()
                         {
                             sysId = c.SYSID,
                             edcPlan = c.EDCPLAN,
                             product = c.PRODUCT,
                             processPlan = c.PLAN,
                             initialStep = c.INITIALSTEP,
                             lot = c.LOT,
                             batch = c.BATCH,
                             stage = c.STAGE,
                             area = c.AREA,
                             tag1 = c.TAG1,
                             tag2 = c.TAG2,
                             groupHistKey = c.GROUPHISTKEY,
                             done = c.DONE == "T" ? true : false,
                             modifiedDatetime = TimeUtil.ParseSPC(c.MODIFIEDDATETIME).Value,

                         });
            //string edcPlan = 1;
            //int32 product = 2;
            //string plan = 3;
            //string initialStep = 4;
            //string lot = 5;
            //string batch = 6;
            //string stage = 7;
            //string area = 8;
            //string tag1 = 9;
            //string tag2 = 10;
            //string groupHistKey = 11;
            //string done = 12;
            //google.protobuf.Timestamp modifiedDatetime = 13;
            //string clientId = 14;
            //string sysId = 15;


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
            return (TEdcDataCollection)query;




        }
        //public static object SaveCEdcChart(SpcContext db, ClientInfo client, CEdcChart obj, bool isCreate)
        //{
        //    var oldObj = (from c in db.SPC_CHART
        //                  where c.NAME == obj.Name
        //                  select c).SingleOrDefault<SPC_CHART>();

        //    if (oldObj == null && isCreate)
        //    {
        //        using (var trans = db.Database.BeginTransaction())
        //        {
        //            try
        //            {
        //                SPC_CHART chart = new SPC_CHART();
        //                chart.NAME = obj.Name;
        //                chart.DESCRIPTION = obj.Description;

        //                SPC_LOG log = new SPC_LOG(client, EnumOpType.Create.ToString());
        //                log.OLDVALUE = JsonUtil.Serialize(oldObj);
        //                log.ObjectName = typeof(SPC_CHART).Name;
        //                log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
        //                db.SPC_LOG.Add(log);
        //                db.SPC_CHART.Add(chart);
        //                db.SaveChanges();
        //                trans.Commit();
        //                return new CEdcChart()
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

        //                SPC_LOG log = new SPC_LOG(client, EnumOpType.Modify.ToString());
        //                log.OLDVALUE = JsonUtil.Serialize(oldObj);


        //                oldObj.NAME = obj.Name;
        //                oldObj.DESCRIPTION = obj.Description;

        //                oldObj.FWTIMESTAMP = oldObj.FWTIMESTAMP + 1;

        //                log.NEWVALUE = JsonUtil.Serialize(oldObj);
        //                log.ObjectName = typeof(SPC_CHART).Name;
        //                log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
        //                db.SPC_LOG.Add(log);
        //                db.SaveChanges();
        //                trans.Commit();
        //                return new CEdcChart()
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
        //public static void DeleteCEdcChart(SpcContext db, ClientInfo client, CEdcChart obj)
        //{
        //    var queryObj = (from c in db.SPC_CHART
        //                    where c.NAME == obj.Name
        //                    select c).SingleOrDefault<SPC_CHART>();

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
        //                log.ObjectName = typeof(SPC_CHART).Name;
        //                log.SYSID = SPCUtils.GetSysID(typeof(SPC_LOG));
        //                db.SPC_LOG.Add(log);
        //                db.SPC_CHART.Remove(queryObj);
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


