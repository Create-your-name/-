using Oracle.ManagedDataAccess.Client;
using System.Collections.Generic;

namespace SPCService.BusinessModel
{
    public   class SpcDbBindItem
    { 
        public static void bindValue(string colName, string coldata, ref List<OracleParameter> dataSet) 
        {
            OracleParameter para = new OracleParameter();
            para.ParameterName = colName;
            para.Value = coldata;
            dataSet.Add(para);
        }

    }
} 
