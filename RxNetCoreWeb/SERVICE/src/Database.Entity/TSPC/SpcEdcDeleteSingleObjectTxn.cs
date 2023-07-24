using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcDeleteSingleObjectTxn 
    {
        public string className { get; set; }
        public string ObjectJson { get; set; } 

        public bool store()
        { 
            return true;
        }
    }
}

