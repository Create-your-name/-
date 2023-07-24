using Protocol;
using SPCService.Database;
using System;
using System.Collections.Generic;
using Arch;
using System.Linq;
using System.Linq.Dynamic.Core;
using SPCService.src.Framework.Common;
using SPCService.DbModel;
using Oracle.ManagedDataAccess.Client;

namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_DATACOLLECTION")]
    public class TEdcDataCollection : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("EDCPLAN")]
        public string edcPlan { get; set; }
        [SpcDbField("PRODUCT")]
        public string product { get; set; }
        [SpcDbField("PLAN")]
        public string processPlan { get; set; }
        [SpcDbField("INITIALSTEP")]
        public string initialStep { get; set; }
        [SpcDbField("LOT")]
        public string lot { get; set; }
        [SpcDbField("BATCH")]
        public string batch { get; set; }
        [SpcDbField("STAGE")]
        public string stage { get; set; }
        [SpcDbField("AREA")]
        public string area { get; set; }
        [SpcDbField("TAG1")]
        public string tag1 { get; set; }
        [SpcDbField("TAG2")]
        public string tag2 { get; set; }
        [SpcDbField("GROUPHISTKEY")]
        public string groupHistKey { get; set; }
        [SpcDbField("DONE")]
        public bool done { get; set; }
        [SpcDbField("MODIFIEDDATETIME")]
        public DateTime modifiedDatetime { get; set; } 
        public string clientId { get; set; }
        [SpcDbField("TIMESTAMP")] 
        public int timeStamp { get; set; } 
        public bool inStore { get; set; }
        public List<TEdcMeasurement> measurements { get; set; }
        public TEdcDataCollection()
        {

        }
        public void addMeasurement(TEdcMeasurement aRef)
        {
            if (aRef != null)
            {
                aRef.dataCollection = this;
                measurements.Add(aRef);

            }


        }
        public static void CopyToRuleRpt(ref TEdcDataCollection datacol, ref CEdcRuleRpt rpt)
        {
            rpt.edcPlanId = datacol.edcPlan;
            rpt.edcPlanId = datacol.product;
            rpt.edcPlanId = datacol.processPlan;
            rpt.edcPlanId = datacol.initialStep;
            rpt.edcPlanId = datacol.lot;
            rpt.edcPlanId = datacol.batch;
            rpt.edcPlanId = datacol.stage;
            rpt.edcPlanId = datacol.area;
            rpt.edcPlanId = datacol.tag1;
            rpt.edcPlanId = datacol.tag2;
            rpt.edcPlanId = datacol.groupHistKey;
            rpt.edcPlanId = datacol.clientId;
        }
        public TEdcDataCollection(string datacollid)
        {

            sysId = datacollid;
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_DATACOLLECTION
                         where c.SYSID == datacollid
                         select c).FirstOrDefault<SPC_DATACOLLECTION>();
            if (query != null)
            {
                edcPlan = query.EDCPLAN;
                product = query.PRODUCT;
                processPlan = query.PLAN;
                initialStep = query.INITIALSTEP;
                batch = query.BATCH;
                stage = query.STAGE;
                area = query.AREA;
                tag1 = query.TAG1;
                tag2 = query.TAG2;
                groupHistKey = query.GROUPHISTKEY;
                done = query.DONE == "T" ? true : false;
                modifiedDatetime = TimeUtil.ParseSPC(query.MODIFIEDDATETIME).Value;
                timeStamp = query.TIMESTAMP;

                measurements = GetMeasurements();
            }


        }

        public List<TEdcMeasurement> GetMeasurements()
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_MEASUREMENT
                         where c.DATACOLLECTION == sysId
                         select new TEdcMeasurement()
                         {
                             sysId = c.SYSID,
                             measurementSpec = c.MEASUREMENTSPEC,
                             measurementStep = c.MEASUREMENTSTEP,
                             measurementResource = c.MEASUREMENTRESOURCE,
                             processStep = c.PROCESSSTEP,
                             processResource = c.PROCESSRESOURCE,
                             username = c.USERNAME,
                             datapoints = (from e in db.SPC_DATAPOINT
                                           where e.MEASUREMENT == c.SYSID
                                           select new TEdcDataPoint()
                                           {
                                               sysId = e.SYSID,
                                               measurementid = e.MEASUREMENT,
                                               unitId = e.UNITIDENTIFIER,
                                               siteId = e.SITEIDENTIFIER,
                                               sampleId = e.SAMPLEIDENTIFIER,
                                               sequence = e.SEQUENCE,
                                               value = e.VALUE,
                                               isExcluded = e.ISEXCLUDED == "T" ? true : false,
                                               hasHistory = e.HASHISTORY == "T" ? true : false,
                                               isDataBoundary = e.ISDATABOUNDARY == "T" ? true : false
                                           }).ToList<TEdcDataPoint>()

                         }).ToList<TEdcMeasurement>();

            return query;
        }


        public CEdcDataCollection makeInterchange()
        {
            CEdcDataCollection datacoll = new CEdcDataCollection();
            datacoll.edcPlanId = edcPlan;
            datacoll.productName = product;
            datacoll.planId = processPlan;
            datacoll.initialStepId = initialStep;
            datacoll.lotId = lot;
            datacoll.batchId = batch;
            datacoll.stageId = stage;
            datacoll.areaId = area;
            datacoll.tag1 = tag1;
            datacoll.tag2 = tag2;
            datacoll.groupHistKey = groupHistKey;
            datacoll.done = done;
            datacoll.datetime = TimeUtil.GetSPCTime(modifiedDatetime);


            return datacoll;
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
                    var oldObj = (from c in db.SPC_DATACOLLECTION
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_DATACOLLECTION>();
                    if (oldObj == null)
                        bNew = true;

                    SPC_DATACOLLECTION dc = new SPC_DATACOLLECTION();
                    dc.SYSID = sysId;
                    dc.EDCPLAN = edcPlan;
                    dc.PRODUCT = product;
                    dc.PLAN = processPlan;
                    dc.INITIALSTEP = initialStep;
                    dc.LOT = lot;
                    dc.BATCH = batch;
                    dc.STAGE = stage;
                    dc.AREA = area;
                    dc.TAG1 = tag1;
                    dc.TAG2 = tag2;
                    dc.GROUPHISTKEY = groupHistKey;
                    dc.DONE = done ? "T" : "F";
                    dc.MODIFIEDDATETIME = sysId;
                    dc.TIMESTAMP = timeStamp;
                    if (bNew)
                        db.SPC_DATACOLLECTION.Add(dc);

                    foreach (TEdcMeasurement emaas in measurements)
                        emaas.Save();

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
        public bool store()
        {
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


            return true;
        }
        public void removeMeasurement(string measurementSpecName)
        {
            TEdcMeasurement meas = findMeasurement(measurementSpecName);
            measurements.Remove(meas);
        }
        public TEdcDataCollection(CEdcDataCollection _interchange)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcDataCollection));
            edcPlan = _interchange.edcPlanId;
            product = _interchange.productName;
            // plan = _interchange.planId;
            initialStep = _interchange.initialStepId;
            lot = _interchange.lotId;
            batch = _interchange.batchId;
            stage = _interchange.stageId;
            area = _interchange.areaId;
            tag1 = _interchange.tag1;
            tag2 = _interchange.tag2;
            groupHistKey = _interchange.groupHistKey;

            measurements = new List<TEdcMeasurement>();
            foreach (CEdcMeas cEdcMea in _interchange.measurements)
            {
                TEdcMeasurement meas = new TEdcMeasurement(cEdcMea);
                meas.dataCollection = this;
                measurements.Add(meas);
            }
        }

        public static TEdcDataCollection deepFetch(string sysid)
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
        public TEdcMeasurement findMeasurement(string measurementspecName)
        {
            return measurements.Find(p => p.measurementSpec.Equals(measurementspecName));
        }
        public bool postFetchFrom()
        {


            // these objects are going to be marked fetchCompleted, 
            // so do a deep fetch to get sub-components if any

            List<TEdcMeasurement> fetchColl = new List<TEdcMeasurement>();
            string whereClause = ("dataCollection=:dataCollection");
            List<OracleParameter> dataSet = new List<OracleParameter>();

            SpcDbBindItem.bindValue(":dataCollection", sysId, ref dataSet);

            fetchColl = TEdcMeasurement.fetchWhere<TEdcMeasurement>(whereClause, dataSet, true);


            foreach (TEdcMeasurement aRef in fetchColl)
            {
                // NOTE: the measurements' dataCollection is already set
                // to my sysId in the database

                if (aRef != null)
                {
                    measurements.Add(aRef);

                }
                else
                {
                    // unexpected nil reference

                    throw new Exception(SPCErrCodes.unexpectedNilObj.ToString());

                }

            }

            return true;
        }


    }

}
