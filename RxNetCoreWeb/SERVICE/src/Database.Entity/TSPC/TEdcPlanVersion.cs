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
    [SpcDbTableName("SPC_PLANVERSION")]
    public class TEdcPlanVersion:SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("NAME")]
        public string name { get; set; }
        [SpcDbField("DESCRIPTION")]
        public string description { get; set; }
        [SpcDbField("OWNER")]
        public string owner { get; set; }
        [SpcDbField("REVISION")]
        public string revision { get; set; }
        [SpcDbField("REVSTATE")]
        public string revState { get; set; }

        public TEdcPlanVersion()
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcMeasurement));
        }
        [SpcN2MList("measurementSpecs", "SPC_PLANVERSION_N2M", typeof(TEdcMeasurementSpec))]
        public List<TEdcMeasurementSpec> measurementSpecs { get; set; }


        public TEdcMeasurementSpec findMeasurementSpec(string measname)
        {
            return measurementSpecs.Find(p => p.name == measname);
        }

        public CEdcPlan makeInterchange()
        {

            CEdcPlan planInter = new CEdcPlan();

            planInter.name = name;
            planInter.description = description;
            planInter.owner = owner;
            planInter.revision = revision;
            planInter.revState = revState;

            foreach (TEdcMeasurementSpec specRef in measurementSpecs)
            {
                if (specRef == null)
                {
                    throw new System.Exception(SPCErrCodes.unexpectedNilObj.ToString());

                }

                if (specRef.isDerived)
                    specRef.deriveSamplingPlan(this);

                CEdcMeasSpec specInter = specRef.makeInterchange();

                if (specInter != null)
                {
                    planInter.measurementSpecs.Add(specInter);
                }

            }

            return planInter;
        }


    }


}
