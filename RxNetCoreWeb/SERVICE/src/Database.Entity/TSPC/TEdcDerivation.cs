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
    [SpcDbTableName("SPC_DERIVATION")]
    public class TEdcDerivation:SpcDBObject
    {
        [SpcDbField("SYSID")]
        public string sysId { get; set; }

        [SpcDbField("EDCOPERATOR")] 
        public string edcOperator { get; set; }
        [SpcDbField("OPERAND1")]
        public string operand1 { get; set; }
        [SpcDbField("OPERAND2")]
        public string operand2 { get; set; }
        [SpcDbField("DATAHANDLINGTYPE")]
        public string dataHandlingType { get; set; }
        [SpcDbField("DATA1")]
        public string data1 { get; set; }
        [SpcDbField("DATA2")]
        public string data2 { get; set; }
        [SpcDbField("LIMITSELECTION")]
        public string limitSelection { get; set; }
        [SpcDbField("UPPERLIMIT")]
        public string upperLimit { get; set; }
        [SpcDbField("LOWERLIMIT")]
        public string lowerLimit { get; set; }
        [SpcDbField("STOREINDATABASE")]
        public bool storeInDatabase { get; set; }
         
        public const string  byUnit=("BYUNIT");
        public const string bySite=("BYSITE");
        public const string derived=("DERIVED");
        public const string entireSample=("ENTIRESAMPLE");
        public const string individually=("INDIVIDUALLY");
         

    }
}
 