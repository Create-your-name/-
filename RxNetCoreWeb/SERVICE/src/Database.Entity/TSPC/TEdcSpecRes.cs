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
    public class TEdcSpecRes
    {
        public const string specLimitStatusPass = ("PASS");
        public const string specLimitStatusFail = ("FAIL");
        public const string specLimitStatusNoSpecs = ("NOSPECS");

    }
}
