using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcFetchMeasSpecTxn
    {
        public string name { get; set; }


        public bool store(out Result<CEdcMeasSpec> result)
        {
            // return the Active plan version if one exists
            result = new Result<CEdcMeasSpec>();



            Result<bool> fetchResult = new Result<bool>();

            TEdcMeasurementSpec aRef = TEdcMeasurementSpec.fetch(name, out fetchResult);
            if (aRef == null)
                return false;

            if (aRef.isDerived)
                aRef.deriveSamplingPlan(null);

            result.value = (aRef.makeInterchange());
            return true;
        }


    }
}

