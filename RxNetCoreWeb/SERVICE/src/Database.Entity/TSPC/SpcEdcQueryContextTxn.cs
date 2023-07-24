using Arch;
using Oracle.ManagedDataAccess.Client;
using Protocol;
using SPCService.src.Framework.Common;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace SPCService.BusinessModel
{
    public class SpcEdcQueryContextTxn
    {
        public string edcPlan { get; set; }
        public string product { get; set; }
        public string processPlan { get; set; }
        public string initialStep { get; set; }
        public string lot { get; set; }
        public string batch { get; set; }
        public string stage { get; set; }
        public string area { get; set; }
        public string tag1 { get; set; }
        public string tag2 { get; set; }
        public string groupHistKey { get; set; }
        public bool includeMeasurements { get; set; }

        private bool _firstAttr;

        public bool store(out Result<TEdcData> result)
        {
            result = new Result<TEdcData>();
            SPCErrCodes nilErr = (SPCErrCodes.unexpectedNilObj);

            string whereClause = "";
            List<OracleParameter> dataSet = new List<OracleParameter>();
            List<TEdcDataCollection> dataColls = new List<TEdcDataCollection>();

            makeSelectStatement(ref whereClause, ref dataSet);
            dataColls = TEdcDataCollection.fetchWhere<TEdcDataCollection>(whereClause, dataSet, false);


            TEdcData edcData = new TEdcData();
            foreach (TEdcDataCollection dataCollRef in dataColls)
            {

                if (dataCollRef != null)
                {
                    Result<bool> retStatus = edcData.addContext(dataCollRef, includeMeasurements);

                }
                else
                {
                    // error, missing data collection
                    result.error = nilErr;
                    return false;
                }
            }


            result.value =(edcData);

            return true ;
        }


        private void makeSelectStatement(ref string whereClause,
                                                  ref List<OracleParameter> dataSet)
        {
            // filter selected records according to user's criteria 
            _firstAttr = true;

            if (!StringUtil.NullString(edcPlan))
            {
                whereClause = whereClause + nextWord() + " edcPlan=:edcPlan";
                SpcDbBindItem.bindValue(":edcPlan", edcPlan, ref dataSet);
            }
            if (!StringUtil.NullString(product))
            {
                whereClause = whereClause + nextWord() + " product=:product";
                SpcDbBindItem.bindValue(":product", product, ref dataSet);
            }
            if (!StringUtil.NullString(processPlan))
            {
                whereClause = whereClause + nextWord() + " plan=:plan";
                SpcDbBindItem.bindValue(":plan", processPlan, ref dataSet);
            }
            if (!StringUtil.NullString(initialStep))
            {
                whereClause = whereClause + nextWord() + " initialStep=:initialStep";
                SpcDbBindItem.bindValue(":initialStep", initialStep, ref dataSet);
            }
            if (!StringUtil.NullString(lot))
            {
                whereClause = whereClause + nextWord() + " lot=:lot";
                SpcDbBindItem.bindValue(":lot", lot, ref dataSet);
            }
            if (!StringUtil.NullString(batch))
            {
                whereClause = whereClause + nextWord() + " batch=:batch";
                SpcDbBindItem.bindValue(":batch", batch, ref dataSet);
            }
            if (!StringUtil.NullString(stage))
            {
                whereClause = whereClause + nextWord() + " stage=:stage";
                SpcDbBindItem.bindValue(":stage", stage, ref dataSet);
            }
            if (!StringUtil.NullString(area))
            {
                whereClause = whereClause + nextWord() + " area=:area";
                SpcDbBindItem.bindValue(":area", area, ref dataSet);
            }
            if (!StringUtil.NullString(tag1))
            {
                whereClause = whereClause + nextWord() + " tag1=:tag1";
                SpcDbBindItem.bindValue(":tag1", tag1, ref dataSet);
            }
            if (!StringUtil.NullString(tag2))
            {
                whereClause = whereClause + nextWord() + " tag2=:tag2";
                SpcDbBindItem.bindValue(":tag2", tag2, ref dataSet);
            }
            if (!StringUtil.NullString(groupHistKey))
            {
                whereClause = whereClause + nextWord() + " groupHistKey=:groupHistKey";
                SpcDbBindItem.bindValue(":groupHistKey", groupHistKey, ref dataSet);
            }

            whereClause = whereClause + nextWord() + " done='F' order by modifiedDatetime desc";
        }


        private string nextWord()
        {
            if (_firstAttr)
            {
                _firstAttr = false;
                return "";
            }
            else
                return " and";
        }

    }
}

