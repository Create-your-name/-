using Arch;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Oracle; 
using SPCService.Database;
using System.IO;

namespace SPCService
{
    public partial class SPCService
    {

        public static void GetChartsName()
        {
            var db = new SpcContext();
            var query = from doc in db.SPC_CHART
                        select doc.NAME;
            var charts = query.Distinct().ToList();
            Console.WriteLine(JsonUtil.SerializePrettyPrint(charts));
        }

        public static void GetChartsData()
        {
            var chart = "CDI2006RNR301";
            var db = new SpcContext();
            var query = from doc in db.SPC_CHART
                        where doc.NAME == chart
                        select doc;
            var charts = query.ToList();
            Console.WriteLine(JsonUtil.SerializePrettyPrint(charts));
        }

        public static void QueryData()
        {
            var db = new SpcContext();

            var query = (
                from A in db.SPC_MEASUREMENT
                join B in db.SPC_DATACOLLECTION on A.DATACOLLECTION equals B.SYSID
                join C in db.SPC_DATAPOINT on A.SYSID equals C.MEASUREMENT
                where A.MEASUREMENTSPEC == "DIHR01400053" && B.EDCPLAN == "DDI2006RNR3"
                where C.CREATEDATE.CompareTo("20100919 201839") < 0
                orderby C.CREATEDATE, C.SITEIDENTIFIER, C.SEQUENCE
                select new SpcPoint
                {
                    MEASUREMENTSPEC = A.MEASUREMENTSPEC,
                    MEASUREMENTSTEP = A.MEASUREMENTSTEP,
                    MEASUREMENTRESOURCE = A.MEASUREMENTRESOURCE,
                    PROCESSSTEP = A.PROCESSSTEP,
                    PROCESSRESOURCE = A.PROCESSRESOURCE,
                    USERNAME = A.USERNAME,

                    EDCPLAN = B.EDCPLAN,
                    PRODUCT = B.PRODUCT,
                    PLAN = B.PLAN,
                    INITIALSTEP = B.INITIALSTEP,
                    LOT = B.LOT,
                    BATCH = B.BATCH,
                    STAGE = B.STAGE,
                    TAG1 = B.TAG1,
                    TAG2 = B.TAG2,
                    MODIFIEDDATETIME = B.MODIFIEDDATETIME,


                    UNITIDENTIFIER = C.UNITIDENTIFIER,
                    SITEIDENTIFIER = C.SITEIDENTIFIER,
                    SAMPLEIDENTIFIER = C.SAMPLEIDENTIFIER,
                    SEQUENCE = C.SEQUENCE,
                    VALUE = C.VALUE,
                    ISEXCLUDED = C.ISEXCLUDED,
                    HASHISTORY = C.HASHISTORY,
                }
                );
            //query = query.Take(10);
            var datas = query.ToList();
            File.WriteAllText("out.json", JsonUtil.SerializePrettyPrint(datas));
            Console.WriteLine(JsonUtil.SerializePrettyPrint(datas));
        }
    }
}
