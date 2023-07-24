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
    [SpcDbTableName("SPC_PLAN")]
    public class TEdcPlan:SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }
        [SpcDbField("NAME")]
        public string name { get; set; } 
        public string description { get; set; } 
        public string owner { get; set; } 
        public string revision { get; set; } 
        public string revState { get; set; }  

        public TEdcPlan()
        {

        }
        public static TEdcPlanVersion extractActive( string name)
        {

            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_PLANVERSION
                         where (c.NAME == name && c.REVSTATE == "Active")
                         select new TEdcPlanVersion()
                         {  sysId = c.SYSID,
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             owner = c.OWNER,
                             revision = c.REVISION,
                             revState = c.REVSTATE, 
                         }).ToList<TEdcPlanVersion>().FirstOrDefault<TEdcPlanVersion>();

            query.measurementSpecs = new List<TEdcMeasurementSpec>();

            query.measurementSpecs.AddRange((from e in db.SPC_PLANVERSION_N2M
                                             where e.FROMID == query.sysId && e.LINKNAME == EnumLinkName.measurementSpecs.ToString()
                                             join f in db.SPC_MEASUREMENTSPEC
                                             on e.TOID equals f.SYSID
                                             select new TEdcMeasurementSpec()
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
                                                 lowerScreeningLimit = f.LOWERSCREENINGLIMIT,
                                                 customUpperScreeningLimit = f.UPPERSCREENINGLIMIT,
                                                 customUpperSpecLimit = f.UPPERSPECLIMIT,
                                                 customTarget = f.TARGET,
                                                 customLowerSpecLimit = f.LOWERSPECLIMIT,
                                                 customLowerScreeningLimit = f.LOWERSCREENINGLIMIT
                                             }).ToList<TEdcMeasurementSpec>());
            return query;


        }

    }


}
