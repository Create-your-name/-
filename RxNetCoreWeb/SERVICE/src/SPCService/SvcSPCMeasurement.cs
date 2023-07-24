using Arch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Oracle;
using SPCService.Database;
using System.IO;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;
using SPCService.src.Framework.Common;
using Protocol;
using SPCService.BusinessModel;

namespace SPCService
{
    public partial class EDCService
    {

        

        public static CEdcMeasSpec GetCEdcMeasurementByName1111(string name)
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_MEASUREMENTSPEC
                         where c.NAME == name 
                         select c ).ToList<SPC_MEASUREMENTSPEC>().FirstOrDefault<SPC_MEASUREMENTSPEC>();


            
            TEdcMeasurementSpec cc = BConvert.EntityToTedc<TEdcMeasurementSpec>(query,false );
            return cc.makeInterchange();
            

        } 

    public static CEdcMeasSpec GetCEdcMeasurementByName( string name)
        {
            SpcContext db = new SpcContext();
            var query = (from c in db.SPC_MEASUREMENTSPEC
                         where c.NAME == name
                         select new CEdcMeasSpec()
                         {
                             name = c.NAME,
                             description = c.DESCRIPTION,
                             measurementType = c.MEASUREMENTTYPE,
                             dataType = c.DATATYPE,
                             unit = c.UNIT,
                             isDerived = c.ISDERIVED == "T" ? true : false,
                             autoExclude = c.AUTOEXCLUDE == "T" ? true : false,
                             allowLimitOverride = c.ALLOWLIMITOVERRIDE == "T" ? true : false,
                             upperScreeningLimit = c.UPPERSCREENINGLIMIT,
                             upperSpecLimit = c.UPPERSPECLIMIT,
                             target = c.TARGET,
                             lowerSpecLimit = c.LOWERSPECLIMIT,
                             lowerScreeningLimit = c.LOWERSCREENINGLIMIT,
                             //samplingPlan = (from d in db.SPC_SAMPLINGPLAN
                             //                where d.SYSID == c.SAMPLINGPLAN
                             //                select new CEdcSamplingPlan()
                             //                {
                             //                    collectionType = d.COLLECTIONTYPE,
                             //                    prompt = d.COLLECTIONTYPE,
                             //                    operatorInstructions = d.COLLECTIONTYPE,
                             //                    numberOfUnits = d.NUMBEROFUNITS.Value,
                             //                    numberOfSites = d.NUMBEROFSITES.Value,
                             //                    numberOfSamples = d.NUMBEROFSAMPLES.Value
                             //                }).FirstOrDefault<CEdcSamplingPlan>(),
                             //derivation = (from d in db.SPC_DERIVATION
                             //              where d.SYSID == c.DERIVATION
                             //              select new CEdcDerivation()
                             //              {
                             //                  edcOperator = d.EDCOPERATOR,
                             //                  operand1 = d.OPERAND1,
                             //                  operand2 = d.OPERAND2,
                             //                  dataHandlingType = d.DATAHANDLINGTYPE,
                             //                  Data1 = d.DATA1,
                             //                  Data2 = d.DATA2,
                             //                  limitSelection = d.LIMITSELECTION,
                             //                  upperLimit = d.UPPERLIMIT,
                             //                  lowerLimit = d.LOWERLIMIT,
                             //                  storeInDatabase = d.STOREINDATABASE == "T" ? true : false
                             //              }).FirstOrDefault<CEdcDerivation>()
                         }).ToList<CEdcMeasSpec>().FirstOrDefault<CEdcMeasSpec>();

            return query;

        } 
    }
}
