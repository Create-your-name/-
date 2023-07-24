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
    [SpcDbTableName("SPC_CHART")]
    public class TEdcChart : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("NAME")]
        public string name { get; set; }
        [SpcDbField("DESCRIPTION")]
        public string description { get; set; }
        [SpcDbField("CHARTTEMPLATE")]
        public string chartTemplateId { get; set; }
        [SpcDbField("MEASUREMENTSPEC")]
        public string measurementSpec { get; set; }
        [SpcDbField("EDCPLAN")]
        public string edcPlan { get; set; }
        [SpcDbField("PROCESSPLAN")]
        public string processPlan { get; set; }
        [SpcDbField("PRODUCT")]
        public string product { get; set; }
        [SpcDbField("STEP")]
        public string step { get; set; }
        [SpcDbField("LOT")]
        public string lot { get; set; }
        [SpcDbField("EQUIPMENT")]
        public string equipment { get; set; }
        [SpcDbField("PARTITION")]
        public string partition { get; set; }
        [SpcDbField("PUBLISHTONAME")]
        public bool publishToName { get; set; }
        [SpcDbField("LOADONSTARTUP")]
        public bool loadOnStartup { get; set; }
        [SpcDbField("WHENTODISPLAY")]
        public string whenToDisplay { get; set; }
        [SpcDbField("HISTORICALHOURS")]
        public int historicalHours { get; set; }
        [SpcDbField("HISTORICALPOINTS")]
        public int historicalPoints { get; set; }
        [SpcDbField("TIMESTAMP")]
        public int timestamp { get; set; }

        [SpcN2MList("overrideParameters", "SPC_CHART_N2M", typeof(TEdcChartParameter))]
        public List<TEdcChartParameter> overrideParameters { get; set; }
        [SpcN2MList("spcCustomRule", "SPC_CHART_N2M", typeof(TEdcSpcCustomRule))]
        public List<TEdcSpcCustomRule> spcCustomRule { get; set; }
        public List<string> edc { get; set; }
        [SpcDbField("CHARTTEMPLATE", true)]
        public TEdcChartTemplate chartTemplate { get; set; }

        public TEdcChart()
        {


        }
        internal static string CreateWhereClause(List<KeyValue> kvs)
        {
            string sWhere = "1== 1";
            if (kvs != null)
            {
                foreach (KeyValue kv in kvs)
                {
                    if (kv != null && kv.Key != null && kv.Value != null)
                        sWhere = sWhere + " and " + kv.Key + " == \"" + kv.Value + "\"";
                }
            }
            return sWhere;
        }



        public void removeSpcCustomRule(TEdcSpcCustomRule aRef)
        {
            // this method will _not_ throw an error if the SpcCustomRule is not found 

            if (aRef != null)
            {
                spcCustomRule.Remove(aRef);

            }
        }
        public void removeSpcCustomRule(string name)
        {
            // this method will _not_ throw an error if the key is not found


            spcCustomRule.Remove(spcCustomRule.Find(p => p.name == name));
        }



        //public static List<TEdcChart> fetchWhere(List<KeyValue> where)
        //{
        //    SpcContext db = new SpcContext();
        //    string sWhere = EDCService.CreateWhereClause(where);
        //    var query = (from c in db.SPC_CHART
        //                 .Where(sWhere)
        //                 select new TEdcChart()
        //                 {
        //                     sysId = c.SYSID,
        //                     name = c.NAME,
        //                     description = c.DESCRIPTION,
        //                     chartTemplate = c.CHARTTEMPLATE,
        //                     measurementSpec = c.MEASUREMENTSPEC,
        //                     edcPlan = c.EDCPLAN,
        //                     processPlan = c.PROCESSPLAN,
        //                     product = c.PRODUCT,
        //                     step = c.STEP,
        //                     lot = c.LOT,
        //                     equipment = c.EQUIPMENT,
        //                     partition = c.PARTITION,
        //                     publishToName = c.PUBLISHTONAME == "T" ? true : false,
        //                     loadOnStartup = c.LOADONSTARTUP == "T" ? true : false,
        //                     whenToDisplay = c.WHENTODISPLAY,
        //                     historicalHours = c.HISTORICALHOURS.Value,
        //                     historicalPoints = c.HISTORICALPOINTS.Value,
        //                     spcCustomRule = (from d in db.SPC_CHART_N2M
        //                                      where d.FROMID == c.SYSID && d.LINKNAME == EnumLinkName.spcCustomRule.ToString()
        //                                      join f in db.SPC_CUSTOMRULE
        //                                       on d.TOID equals f.SYSID
        //                                      select new TEdcSpcCustomRule()
        //                                      {
        //                                          sysId = f.SYSID,
        //                                          name = f.NAME,
        //                                          reason = f.REASON,
        //                                          testCount = f.TESTCOUNT.Value,
        //                                          outOf = f.OUTOF.Value,
        //                                          comparison = f.COMPARISON,
        //                                          withRespectTo = f.WITHRESPECTTO,
        //                                          value = f.VALUE,
        //                                          stdDevs = f.STDDEVS,
        //                                          datasetName = f.DATASETNAME,
        //                                          intervalTo = f.INTERVALTO,

        //                                      }).ToList< TEdcSpcCustomRule > (),
        //                     overrideParameters = (from d in db.SPC_CHART_N2M
        //                                           where d.FROMID == c.SYSID && d.LINKNAME == EnumLinkName.overrideParameters.ToString()
        //                                           join f in db.SPC_CHARTPARAMETER
        //                                            on d.TOID equals f.SYSID
        //                                           select new TEdcChartParameter()
        //                                           {
        //                                               sysId = f.SYSID,
        //                                               property = f.PROPERTY,
        //                                               value = f.VALUE 
        //                                           }).ToList<TEdcChartParameter>()
        //                 }).ToList<TEdcChart>() ;

        //    return query;

        //}


        public SPCErrCodes store()
        {
            SPCErrCodes spcError = new SPCErrCodes();
            SpcContext db = new SpcContext();

            bool bNew = false;
            using (var trans = db.Database.BeginTransaction())
            {
                try
                {
                    var oldObj = (from c in db.SPC_CHART
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_CHART>();
                    if (oldObj == null)
                        bNew = true;

                    SPC_CHART dc = new SPC_CHART();
                    dc.SYSID = sysId;
                    dc.NAME = name;
                    dc.DESCRIPTION = description;
                    dc.CHARTTEMPLATE = chartTemplateId;
                    dc.MEASUREMENTSPEC = measurementSpec;
                    dc.EDCPLAN = edcPlan;
                    dc.PROCESSPLAN = processPlan;
                    dc.PRODUCT = product;
                    dc.STEP = step;
                    dc.LOT = lot;
                    dc.EQUIPMENT = equipment;
                    dc.PARTITION = partition;
                    dc.PUBLISHTONAME = publishToName ? "T" : "F";
                    dc.LOADONSTARTUP = loadOnStartup ? "T" : "F";
                    dc.WHENTODISPLAY = whenToDisplay;
                    dc.HISTORICALHOURS = historicalHours;
                    dc.HISTORICALPOINTS = historicalPoints;

                    if (bNew)
                        dc.TIMESTAMP = 1;
                    else
                        dc.TIMESTAMP = oldObj.TIMESTAMP = 1;

                    if (bNew)
                        db.SPC_CHART.Add(dc);


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
        public TEdcChart(CEdcChart cEdcChart)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcDataPoint));
            name = cEdcChart.name;
            description = cEdcChart.description;
            chartTemplateId = cEdcChart.spcTemplate;
            measurementSpec = cEdcChart.measurementSpec;
            edcPlan = cEdcChart.edcPlan;
            processPlan = cEdcChart.planId;
            product = cEdcChart.productName;
            step = cEdcChart.stepId;
            lot = cEdcChart.lotId;
            equipment = cEdcChart.equipment;
            partition = cEdcChart.partition;
            publishToName = cEdcChart.publishToName;
            loadOnStartup = cEdcChart.loadOnStartup;
            whenToDisplay = cEdcChart.whenToDisplay;
            historicalHours = cEdcChart.historicalHours;
            historicalPoints = cEdcChart.historicalPoints;




            //histories = new List<TEdcDataPointHistory>();
            //foreach (CEdcDataPtHistory cEdcDataPtHis in cEdcChart.rrulesDataInterchanges)
            //{
            //    histories.Add(new TEdcDataPointHistory(cEdcDataPtHis));
            //}



        }


        //public CEdcChart makeInterchange()
        //{
        //    CEdcChart cdata = new CEdcChart();
        //    cdata.Sysid = sysId;
        //    cdata.name = name;
        //    cdata.description = description;
        //    cdata.spcTemplate = chartTemplate;
        //    cdata.measurementSpec = measurementSpec;
        //    cdata.edcPlan = edcPlan;
        //    cdata.planId = processPlan;
        //    cdata.productName = product;
        //    cdata.stepId = step;
        //    cdata.lotId = lot;
        //    cdata.equipment = equipment;
        //    cdata.partition = partition;
        //    cdata.publishToName = publishToName;
        //    cdata.loadOnStartup = loadOnStartup;
        //    cdata.whenToDisplay = whenToDisplay;
        //    cdata.historicalHours = historicalHours;
        //    cdata.historicalPoints = historicalPoints;
        //    return cdata;


        //}
        public TEdcChartParameter findParameter(string propertyName)
        {
            // this method returns a nil reference if the parameter is not found


            string key = (propertyName);
            TEdcChartParameter refPtr = overrideParameters.Find(p => p.property == key);

            // NOTE: refPtr is a pointer to an FwOwnRef since edc parameters
            // are owned sub-objects

            if (refPtr != null)
            {
                // convert from an own ref to a ref 
                return refPtr;
            }
            else
            {
                // return a nil reference if not found 
                return null;
            }
        }

        public CEdcChart makeInterchange()
        {
            // NOTE: caller is responsible for freeing this memory

            CEdcChart anInter = new CEdcChart();
            anInter.Sysid = sysId;
            anInter.name = name;
            anInter.description = description;
            anInter.spcTemplate = chartTemplateId;
            anInter.measurementSpec = measurementSpec;
            anInter.edcPlan = edcPlan;
            anInter.planId = processPlan;
            anInter.productName = product;
            anInter.stepId = step;
            anInter.lotId = lot;
            anInter.equipment = equipment;
            anInter.partition = partition;
            anInter.publishToName = publishToName;
            anInter.loadOnStartup = loadOnStartup;
            anInter.whenToDisplay = whenToDisplay;
            anInter.historicalHours = historicalHours;
            anInter.historicalPoints = historicalPoints;

            // now populate the parameter collection using the default collection
            // as base truth, and overriding any values specified in the edc analysis

            TEdcChartTemplate tmplRef = (chartTemplate);
            if (tmplRef == null)
            {
                // invalid template object
                throw new Exception(SPCErrCodes.noTemplateFound.ToString());
            }

            anInter.spcTemplate = tmplRef.spcTemplate;
            if (tmplRef.defaultParameters != null)
            {
                foreach (TEdcChartParameter ownRef in tmplRef.defaultParameters)
                {
                    string sysid = (ownRef.sysId);
                    string property = (ownRef.property);
                    string value = (ownRef.value);
                    if (overrideParameters  != null)
                    {
                        TEdcChartParameter pRef = findParameter(property);
                        if (pRef != null)
                            value = pRef.value;
                    }
                    CEdcChartParameter pInter = new CEdcChartParameter();
                    pInter.sysid = sysid;
                    pInter.property = property;
                    pInter.value = value;

                    anInter.edcParameters.Add(pInter);
                }
            }
            if (spcCustomRule != null)
            {
                foreach (TEdcSpcCustomRule sRef in spcCustomRule)

                {
                    CEdcSpcCustomRule pscInter = sRef.makeInterchange();
                    anInter.spcCustomRules.Add(pscInter);

                }
            } 
            return anInter;
        } 
    }



}


