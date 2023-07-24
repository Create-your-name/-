using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcSaveSingleObjectTxn
    {
        public string className { get; set; }
        public string ObjectJson { get; set; } 

        public bool store()
        {
            //TEdcMeasurementSpec
            switch   (className)
            {
                case  nameof(CEdcMeasSpec): 
                    return SaveMeasurementSpec(ObjectJson);
            }
            return true;
        }

        public bool SaveMeasurementSpec(string messurementSpec)
        {
            CEdcMeasSpec messpec = JsonUtil.Deserialize<CEdcMeasSpec>(messurementSpec);
            return true;

        }
    }
}

