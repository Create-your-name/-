
using Protocol;
using System.Collections.Generic;

namespace SPCService
{
    public partial class EDCService
    {


        //public static async Task<FwEdcUpdateSpcRuleTxnResp> ExecuteFwEdcUpdateSpcRuleTxn(SpcContext db, FwEdcUpdateSpcRuleTxnReq req)
        //{
        //    FwEdcUpdateSpcRuleTxnResp resp = new FwEdcUpdateSpcRuleTxnResp();
        //    return resp;
        //}

        internal static string CreateWhereClause(List<KeyValue> kvs)
        {
            string sWhere = "1== 1";
            if (kvs != null)
            {
                foreach (KeyValue kv in kvs)
                {
                    if (kv != null && kv.Key != null && kv.Value != null)
                        sWhere = sWhere + " and " + kv.Key + " == \"" + kv.Value + "\"";
                }
            }
            return sWhere;
        }

    }

}
