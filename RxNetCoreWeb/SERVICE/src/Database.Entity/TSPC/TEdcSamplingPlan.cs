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
    [SpcDbTableName("SPC_SAMPLINGPLAN")]
    public class TEdcSamplingPlan:SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("COLLECTIONTYPE")]

        public string collectionType { get; set; }
        [SpcDbField("PROMPT")]
        public string prompt { get; set; }
        [SpcDbField("OPERATORINSTRUCTIONS")]
        public string operatorInstructions { get; set; }
        [SpcDbField("NUMBEROFUNITS")]
        public int numberOfUnits { get; set; }
        [SpcDbField("NUMBEROFSITES")]
        public int numberOfSites { get; set; }
        [SpcDbField("NUMBEROFSAMPLES")]
        public int numberOfSamples { get; set; }

        public TEdcSamplingPlan()
        {
            sysId = SPCUtils.GetSysID(typeof(TEdcSamplingPlan));
        }

    }
}
