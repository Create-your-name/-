using Arch;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Oracle;

namespace SPCService
{
    [Route("api/spc")]
    [ApiController]
    public class SPCController : ControllerExt
    {

        [HttpGet("sample-data")]
        public async Task<APIResponse> GetSampleData()
        {

            //SaveMeasurementSpecReq reqp = new SaveMeasurementSpecReq();
            //reqp.Object = new SPCBase.Core.CEdcMeasurementSpec();
            //reqp.Object.Name = "TEST111";
            //reqp.Client = new SPCBase.Core.FWIDE.ClientInfo();
            //reqp.Client.UserName = "u01";
            //reqp.TypeName = "CEdcMeasurementSpec";
            //reqp.IsCreate = true;

            //string ss = JsonUtil.Serialize(reqp);

            var data = await System.IO.File.ReadAllTextAsync("sample.json");
            var json = JsonUtil.Deserialize<List<SpcPoint2>>(data);

            var groups = json.GroupBy(data => data.UNITIDENTIFIER)
                .Select(g => (key: g.Key, datas: g.OrderBy(d => d.SEQUENCE).ToList()))
                .Take(10)
                .ToList();

            var avgList = groups.Select(kv => new { key = kv.key, value = kv.datas.Average(d => d.VALUE) })
                .ToList();

            var rangeList = groups.Select(kv =>
            {
                var datas = kv.datas
                .Select(d => d.VALUE)
                .ToList();

                var range = datas.Max() - datas.Min();
                return new { key = kv.key, value = range };
            }).ToList();

            var box = groups.Select(gp => new 
            { 
                key = gp.key, 
                data = StatisticsUtils.BoxPlot( gp.datas.Select(d => d.VALUE).ToList())
            }).ToList();
            return OK(new { raw = json.Take(50).ToList(), avg=avgList, range=rangeList, box});
        }


 

        //[HttpPost("FwEdcQueryDataTxn")]
        //public async Task<ActionResult> FwEdcQueryDataTxn()
        //{
        //    //try
        //    //{
        //     //  var json = this.ExtGetBodyJson<FwEdcQueryDataTxnReq>();
        //     //  var areas = await EDCService.ExecuteFwEdcQueryDataTxn(dbContext, json);
        //     //return this.ExtOkJson( );
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    return this.ExtErrorJson(111, ex.Message);
        //    //}
        //}
    }


}
