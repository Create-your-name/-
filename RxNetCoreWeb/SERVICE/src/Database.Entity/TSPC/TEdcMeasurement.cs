using Arch;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using Protocol;
using SPCService.Database;
using System.Linq;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;
using Oracle.ManagedDataAccess.Client;

namespace SPCService.BusinessModel
{
    [SpcDbTableName("SPC_MEASUREMENT")]
    public class TEdcMeasurement : SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("DATACOLLECTION")]
        public string datacollectionid { get; set; }
        [SpcDbField("MEASUREMENTSPEC")]
        public string measurementSpec { get; set; }
        [SpcDbField("MEASUREMENTSTEP")]
        public string measurementStep { get; set; }
        [SpcDbField("MEASUREMENTRESOURCE")]
        public string measurementResource { get; set; }
        [SpcDbField("PROCESSSTEP")]
        public string processStep { get; set; }
        [SpcDbField("PROCESSRESOURCE")]
        public string processResource { get; set; }
        [SpcDbField("USERNAME")]
        public string username { get; set; }
        [SpcDbField("SPECLIMITS")]
        public string specLimitsId { get; set; }
        [SpcDbField("SPECLIMITS", true)]
        public TEdcSpecLimit specLimits { get; set; }
        [SpcDbField("SYSID", true,true, "MEASUREMENT")]
        public List<TEdcDataPoint> datapoints { get; set; }

        [SpcDbField("DATACOLLECTION", true)]
        public TEdcDataCollection dataCollection { get; set; }
        private TEdcMeasurementSpec _specPtr;
        public void specPtr(TEdcMeasurementSpec measpec)
        {
            _specPtr = measpec;

        }
        public TEdcMeasurement()
        {
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
                    var oldObj = (from c in db.SPC_MEASUREMENT
                                  where c.SYSID == sysId
                                  select c).SingleOrDefault<SPC_MEASUREMENT>();
                    if (oldObj == null)
                        bNew = true;

                    SPC_MEASUREMENT dbobj = new SPC_MEASUREMENT();
                    dbobj.SYSID = sysId;
                    dbobj.DATACOLLECTION = dataCollection.sysId;
                    dbobj.MEASUREMENTSPEC = measurementSpec;
                    dbobj.MEASUREMENTSTEP = measurementStep;
                    dbobj.MEASUREMENTRESOURCE = measurementResource;
                    dbobj.PROCESSSTEP = processStep;
                    dbobj.PROCESSRESOURCE = processResource;
                    dbobj.USERNAME = username;
                    if (specLimits != null)
                    {
                        specLimits.measurementSysId = sysId;
                        specLimits.Save();
                    }
                    if (specLimits == null)
                    { dbobj.SPECLIMITS = "00000000.00000000.00000000.00000000.0"; }
                    else
                    {
                        dbobj.SPECLIMITS = specLimits.sysId;
                    }
                    if (bNew)
                        db.SPC_MEASUREMENT.Add(dbobj);


                    foreach (TEdcDataPoint dpt in datapoints)
                        dpt.Save();

                    db.SaveChanges();





                }
                catch (Exception ex)
                {

                    trans.Rollback();

                }
            }
            return spcError;

        }


    

        public CEdcSpecRes GetCEdcSpecRes()
        {
            CEdcSpecRes cc = new CEdcSpecRes();
            cc.measurementSpec = measurementSpec;
            cc.measurementStep = measurementStep;
            cc.measurementResource = measurementResource;
            cc.processStep = processStep;
            cc.processResource = processResource;
            cc.username = username;

            return cc;
        }



        public TEdcMeasurement(CEdcMeas measInter)
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcMeasurement));
            measurementSpec = measInter.measurementSpec;
            measurementStep = measInter.measurementStep;
            measurementResource = measInter.measurementResource;
            processStep = measInter.procAessStep;
            processResource = measInter.processResource;
            if (!StringUtil.NullString(measInter.upperScreeningLimit)
                || !StringUtil.NullString(measInter.upperSpecLimit)
                || !StringUtil.NullString(measInter.lowerSpecLimit)
                || !StringUtil.NullString(measInter.lowerScreeningLimit))
            {
                specLimits = new TEdcSpecLimit();
                specLimits.upperScreeningLimit = measInter.upperScreeningLimit;
                specLimits.upperSpecLimit = measInter.upperSpecLimit;
                specLimits.target = measInter.target;
                specLimits.lowerSpecLimit = measInter.lowerSpecLimit;
                specLimits.lowerScreeningLimit = measInter.lowerScreeningLimit;
            }


            datapoints = new List<TEdcDataPoint>();
            foreach (CEdcDataPoint cEdcDataPoint in measInter.datapoints)
            {
                TEdcDataPoint tp = new TEdcDataPoint(cEdcDataPoint);
                tp.measurement = this;
                datapoints.Add(tp);
            }

        }
        public TEdcDataPoint findData(int seq)
        {
            return datapoints.Find(p => p.sequence == seq);
        }
        public TEdcMeasurementSpec getMeasurementSpec()
        {
            return TEdcMeasurementSpec.getMeasurementSpec(measurementSpec);
        }


        public CEdcMeas makeInterchange()
        {
            CEdcMeas measInter;
            TEdcMeasurementSpec specRef = getMeasurementSpec();

            measInter = makeInterchange(specRef);


            return measInter;
        }

        public CEdcMeas makeInterchange(TEdcMeasurementSpec specRef)
        {
            // Construct an interchange object from this.


            // use the base copy constructor to get common contents

            CEdcMeas measInter = new CEdcMeas();

            if ((specRef.name == measurementSpec))
            {
                measInter.dataType = (specRef.dataType);
                measInter.isDerived = (specRef.isDerived);
                measInter.measurementType = (specRef.measurementType);

                //  Processing Custom Spec Limits
                if (specLimits != null)
                {
                    measInter.overRideLimits = true;

                    measInter.upperScreeningLimit = specLimits.upperScreeningLimit;
                    measInter.upperSpecLimit = specLimits.upperSpecLimit;
                    measInter.target = specLimits.target;
                    measInter.lowerSpecLimit = specLimits.lowerSpecLimit;
                    measInter.lowerScreeningLimit = specLimits.lowerScreeningLimit;
                    measInter.autoExclude = specLimits.autoExclude;
                }
            }
            else
            {
                throw new Exception(SPCErrCodes.selectedMeasSpecNotFound.ToString());
            }

            return measInter;
        }

        public void addData(TEdcDataPoint aRef)
        {

            if (aRef != null)
            {
                string str = aRef.sequence.ToString().PadLeft(2, '0');
                aRef.measurement = this;
                datapoints.Add(aRef);

            }
        }


    }


}
