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
using Oracle.ManagedDataAccess.Client;

namespace SPCService
{
    public class EdcMDataService
    {
        public const string measurementspecN2Mtable = "SPC_MEASUREMENTSPEC_N2M";
        public const string measurementspectable = "SPC_MEASUREMENTSPEC";
        public static bool SaveEdcMeasurementSpec(SpcContext db, Arch.ClientInfo client, CEdcMeasSpec obj)
        {
            TEdcMeasurementSpec tmeas = new TEdcMeasurementSpec(obj);
            tmeas.store();
            return true;
        }


        public static List<CEdcChart> QueryEdcCharts(SpcContext db, QueryEdcChartsReq reqdata)
        {

            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcChart> fetchColl = new List<TEdcChart>();

            string whereClause = "name like :name";
            SpcDbBindItem.bindValue(":name", "%" + reqdata.Name + "%", ref dataSet);
            if (!StringUtil.NullString(reqdata.CatagoryId))
            {
                whereClause = whereClause + " and measurementspec in( select  name from " + measurementspectable + " where sysid in ( select fromid from " + measurementspecN2Mtable + " where toid =:toid and linkname ='" + EnumLinkName.catagory.ToString() + "'))";
                SpcDbBindItem.bindValue(":toid", reqdata.CatagoryId, ref dataSet);
                SpcDbBindItem.bindValue(":toid", reqdata.CatagoryId, ref dataSet);
            }


            // First, bind data values.



            fetchColl = TEdcChart.fetchWhere<TEdcChart>(whereClause, dataSet, true);

            if (fetchColl == null || fetchColl.Count == 0)
            {

                return null;
            }
            List<CEdcChart> val = new List<CEdcChart>();
            foreach (TEdcChart spec in fetchColl)
            {
                val.Add(spec.makeInterchange());

            }
            return val;

            //TEdcMeasurementSpec tmeas = new TEdcMeasurementSpec(obj);
            //tmeas.store();
            //return true;
        }
        public static List<CEdcMeasSpec> QueryEdcMeasurementSpecs(SpcContext db, QueryEdcMeasurementSpecsReq reqdata)
        {


            string whereClause = "name like :name";
            whereClause = whereClause + " or sysid in ( select fromid from " + measurementspecN2Mtable + " where toid =:toid and linkname ='" + EnumLinkName.catagory.ToString() + "')";

            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcMeasurementSpec> fetchColl = new List<TEdcMeasurementSpec>();


            // First, bind data values.
            SpcDbBindItem.bindValue(":name", "%" + reqdata.Name + "%", ref dataSet);
            SpcDbBindItem.bindValue(":toid", reqdata.CatagoryId, ref dataSet);

            fetchColl = TEdcMeasurementSpec.fetchWhere<TEdcMeasurementSpec>(whereClause, dataSet, true);

            if (fetchColl == null || fetchColl.Count == 0)
            {

                return null;
            }
            List<CEdcMeasSpec> val = new List<CEdcMeasSpec>();
            foreach (TEdcMeasurementSpec spec in fetchColl)
            {
                val.Add(spec.makeInterchange());

            }
            return val;

            //TEdcMeasurementSpec tmeas = new TEdcMeasurementSpec(obj);
            //tmeas.store();
            //return true;
        }
        public static List<CEdcChartTemplate> QueryEdcChartTemplates(SpcContext db)
        {


            string whereClause = "1 =1";

            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcChartTemplate> fetchColl = new List<TEdcChartTemplate>();


            // First, bind data values.

            fetchColl = TEdcChartTemplate.fetchWhere<TEdcChartTemplate>(whereClause, dataSet, true);

            if (fetchColl == null || fetchColl.Count == 0)
            {

                return null;
            }
            List<CEdcChartTemplate> val = new List<CEdcChartTemplate>();
            foreach (TEdcChartTemplate spec in fetchColl)
            {
                val.Add(spec.makeInterchange());
            }
            return val;

            //TEdcMeasurementSpec tmeas = new TEdcMeasurementSpec(obj);
            //tmeas.store();
            //return true;
        }
        public static List<CEdcSpcSystemRule> QueryEdcSystemRules(SpcContext db)
        {


            string whereClause = "1 =1";

            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcSpcSystemRule> fetchColl = new List<TEdcSpcSystemRule>();


            // First, bind data values.

            fetchColl = TEdcSpcSystemRule.fetchWhere<TEdcSpcSystemRule>(whereClause, dataSet, true);

            if (fetchColl == null || fetchColl.Count == 0)
            {

                return null;
            }
            List<CEdcSpcSystemRule> val = new List<CEdcSpcSystemRule>();
            foreach (TEdcSpcSystemRule spec in fetchColl)
            {
                val.Add(spec.makeInterchange());
            }
            return val;

            //TEdcMeasurementSpec tmeas = new TEdcMeasurementSpec(obj);
            //tmeas.store();
            //return true;
        }


        public static List<CEdcSpcCustomRule> QueryEdcCustomRules(SpcContext db)
        {


            string whereClause = "1 =1";

            List<OracleParameter> dataSet = new List<OracleParameter>(); ;
            List<TEdcSpcCustomRule> fetchColl = new List<TEdcSpcCustomRule>();


            // First, bind data values.

            fetchColl = TEdcSpcCustomRule.fetchWhere<TEdcSpcCustomRule>(whereClause, dataSet, true);

            if (fetchColl == null || fetchColl.Count == 0)
            {

                return null;
            }
            List<CEdcSpcCustomRule> val = new List<CEdcSpcCustomRule>();
            foreach (TEdcSpcCustomRule spec in fetchColl)
            {
                val.Add(spec.makeInterchange());
            }
            return val;

            //TEdcMeasurementSpec tmeas = new TEdcMeasurementSpec(obj);
            //tmeas.store();
            //return true;
        }




    }
}
