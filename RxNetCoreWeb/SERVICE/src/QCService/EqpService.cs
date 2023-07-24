using Microsoft.AspNetCore.JsonPatch.Operations;
using Protocol;
using SPCService.Database;
using SPCService.Helper;
using SPCService.src.Database.Entity.EQP;
using System.Collections.Generic;
using System.Linq;

namespace SPCService.src.QCService
{
    public class EqpService
    {
        public static Dictionary<string, string> eqpPartsDir = new Dictionary<string, string>()
        {
            {"薄膜部","10008" },{"腐蚀部","10007" },{"光刻部","10001" },{"扩散部","10003" },{"设备支持部","10009" },{"外延","10004" },{"注入","10011" }
        };
        public static object getAreaEqpList(SpcContext db)
        {
            string sql = "SELECT MDL.area,MDL.eqp,EQP.STATE from " +
                         "(select a.name area, b.keydata eqp  from fwmfgareaversion a, fwmfgareaversion_pn2m b where a.revstate = 'Active'  and a.name != 'FAB1' and a.sysid = b.fromid) MDL " +
                         "LEFT JOIN " +
                         "(SELECT A.NAME, B.STATE FROM FWEQPEQUIPMENT A, FWEQPcURRENTSTATE B WHERE  A.CURRENTSTATE = B.SYSID) EQP " +
                         "on MDL.eqp = EQP.NAME ORDER BY MDL.AREA";
            var robj = DapperHelper.Query<EQP_LIST>(sql);
            return robj;
        }
        public static object getEqpDetail(SpcContext db, QueryEqpReq json)
        {
            return null;
        }
        public static object getEqpParts(SpcContext db, QueryEqpPartsReq json)
        {
            var query = (from c in db.EQP_PARTS
                         select new EQP_PARTS()
                         {
                             MOUDLE = c.MOUDLE,
                             PARTNO = c.PARTNO,
                             PARTNAME = c.PARTNAME,
                             LIFE = c.LIFE,
                             DEPT_INDEX = c.DEPT_INDEX,
                             MATERIAL_STATUS_INDEX = c.MATERIAL_STATUS_INDEX,
                             STATUS = c.STATUS,
                             PARTNUMBER = c.PARTNUMBER,
                             PARTSERIES = c.PARTSERIES,
                             OPERATOR = c.OPERATOR
                         }
                         ).ToList();
            if (!string.IsNullOrEmpty(json.MOUDLE))
            {
                query = query.Where(u => u.MOUDLE.IndexOf(json.MOUDLE) >= 0).ToList();
            }
            if (!string.IsNullOrEmpty(json.PARTNO))
            {
                query = query.Where(u => u.PARTNO.IndexOf(json.PARTNO) >= 0).ToList();
            }
            if (!string.IsNullOrEmpty(json.PARTNAME))
            {
                query = query.Where(u => u.PARTNAME.IndexOf(json.PARTNAME) >= 0).ToList();
            }
            return query;
        }

        public static object addEqpParts(SpcContext db, SaveEqpPartsReq json)
        {
            var query = (from c in db.EQP_PARTS
                         .Where(u => u.MOUDLE == json.MOUDLE && u.PARTNO == json.PARTNO && u.PARTNAME == json.PARTNAME)
                         select new EQP_PARTS()
                         {
                             MOUDLE = c.MOUDLE,
                             PARTNO = c.PARTNO,
                             PARTNAME = c.PARTNAME,
                         }
                         ).ToList();
            if (query.Count > 0)
            {
                return "当前设备部件已存在,不可重复创建！";
            }
            EQP_PARTS eqpPart = new EQP_PARTS();
            eqpPart.MOUDLE = json.MOUDLE;
            eqpPart.PARTNO = json.PARTNO;
            eqpPart.PARTNAME = json.PARTNAME;
            string deptIndex = "";
            eqpPartsDir.TryGetValue(json.MOUDLE, out deptIndex);
            eqpPart.DEPT_INDEX = deptIndex;
            eqpPart.MATERIAL_STATUS_INDEX = "Normal";
            eqpPart.STATUS = "Normal";
            db.Add(eqpPart);
            db.SaveChanges();
            return "success";
        }
        public static object updateEqpParts(SpcContext db, UpdateEqpPartsReq json)
        {
            var query = (from c in db.EQP_PARTS
                         .Where(u => u.MOUDLE == json.nMOUDLE && u.PARTNO == json.nPARTNO && u.PARTNAME == json.nPARTNAME)
                         select new EQP_PARTS()
                         {
                             MOUDLE = c.MOUDLE,
                             PARTNO = c.PARTNO,
                             PARTNAME = c.PARTNAME,
                         }
                         ).ToList();
            if (query.Count>0)
            {
                return "当前设备部件已存在,更新失败！";
            }
            string sql = "delete CUST_EQP_PARTS where moudle = '" + json.oMOUDLE + "' and PARTNO = '" + json.oPARTNO + "' AND PARTNAME = '" + json.oPARTNAME + "'";
            var robj = DapperHelper.Query<EQP_LIST>(sql);
            EQP_PARTS eqpPart = new EQP_PARTS();
            eqpPart.MOUDLE = json.nMOUDLE;
            eqpPart.PARTNO = json.nPARTNO;
            eqpPart.PARTNAME = json.nPARTNAME;
            string deptIndex = "";
            eqpPartsDir.TryGetValue(json.nMOUDLE, out deptIndex);
            eqpPart.DEPT_INDEX = deptIndex;
            eqpPart.MATERIAL_STATUS_INDEX = "Normal";
            eqpPart.STATUS = "Normal";
            db.Add(eqpPart);
            db.SaveChanges();
            return "success";
        }
        public static object deleteEqpParts(SpcContext db, SaveEqpPartsReq json)
        {
            string sql = "delete CUST_EQP_PARTS where moudle = '" + json.MOUDLE + "' and PARTNO = '" + json.PARTNO + "' AND PARTNAME = '" + json.PARTNAME + "'";
            var robj = DapperHelper.Query<EQP_LIST>(sql);
            return "success";
        }
    }
}
