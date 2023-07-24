using Arch;
using System;
using System.Collections.Generic;
using System.Linq;
using SPCService.Database;
using System.Linq.Dynamic.Core;
using SPCService.DbModel;
using SPCService.src.Framework.Common;
using Protocol;
using SPCService.BusinessModel;
using SPCService.Helper;
using SPCService.src.Database.Entity.EQP;

namespace SPCService
{
    public partial class QCService
    {
        public static object GetQCList(SpcContext db, QueryQCReq json)
        {
            var query = (from c in db.QC_LIST
                         select new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         }
                         ).OrderBy("SYSID").ToList();
            if (!string.IsNullOrEmpty(json.MOUDLE))
            {
                query = query.Where(u => u.MOUDLE == json.MOUDLE).ToList();
            }
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                query = query.Where(u => u.EQPID == json.EQPID).ToList();
            }
            if (!string.IsNullOrEmpty(json.QCNAME))
            {
                query = query.Where(u => u.QCNAME.IndexOf(json.QCNAME) >= 0).ToList();
            }
            if (!string.IsNullOrEmpty(json.EDCPLAN))
            {
                query = query.Where(u => u.EDCPLAN == json.EDCPLAN).ToList();
            }
            return query;
        }

        public static object GetEDCPlan(SpcContext db, QueryQCReq json)
        {
            var query = (from c in db.CUST_EQP_EDC_PLAN
                         where c.EQUIPMENTID == json.EQPID
                         select new CUST_EQP_EDC_PLAN()
                         {
                             EDCPLANID = c.EDCPLANID,
                         }
                         ).Distinct().OrderBy("EDCPLANID").ToList();
            return query;
        }

        public static object GetEqp(SpcContext db)
        {
            //var query = (from c in db.EQUIPMENT_VERSION
            //             select new EQUIPMENT_VERSION()
            //             {
            //                 NAME = c.NAME,
            //             }
            //             ).Distinct().OrderBy("NAME").ToList();
            //return query;
            string sql = "SELECT DISTINCT B.NAME AS NAME,A.NAME AS EQPTYPE FROM FWEQPTYPE A,FWEQPEQUIPMENTVERSION B WHERE A.SYSID = B.EQPTYPE AND B.REVSTATE = 'Active' ORDER BY B.NAME";
            var robj = DapperHelper.Query<EQP_LIST>(sql);
            return robj;
        }

        public static object UpdataQC(SpcContext db, SaveQCReq json)
        {
            var query = db.QC_LIST
                         .Where(u => u.SYSID == int.Parse(json.SYSID))
                         .Where(u => u.PLANDATE != null || u.CSTATUS == "QC")
                         .OrderBy(x => x.SYSID)
                         .Select(c => new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         })
                         .ToList();
            if (query.Count > 0)
            {
                return "该QC计划已生成，请完成后更改！";
            }
            var isExist = db.QC_LIST
                         .Where(u => u.EQPID == json.EQPID)
                         .Where(u => u.EDCPLAN == json.EDCPLAN && u.SYSID != int.Parse(json.SYSID))
                         .OrderBy(x => x.SYSID)
                         .Select(c => new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         })
                         .ToList();
            if (isExist.Count > 0)
            {
                return "设备：" + json.EQPID + "的当前QC已存在！";
            }
            var qcList = db.QC_LIST
                         .Where(u => u.SYSID == int.Parse(json.SYSID))
                         .Select(c => new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         })
                         .ToList();
            QC_LIST qc = qcList[0];
            if (!string.IsNullOrEmpty(json.MOUDLE))
            {
                qc.MOUDLE = json.MOUDLE;
            }
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                qc.EQPID = json.EQPID;
            }
            if (!string.IsNullOrEmpty(json.QCNAME))
            {
                qc.QCNAME = json.QCNAME;
            }
            if (!string.IsNullOrEmpty(json.EDCPLAN))
            {
                qc.EDCPLAN = json.EDCPLAN;
            }
            if (!string.IsNullOrEmpty(json.QHOUR))
            {
                qc.QHOUR = int.Parse(json.QHOUR);
            }
            qc.CSTATUS = "Active";
            qc.HASF = "N";
            qc.CHOUR = "1";
            qc.FORCETRACKIN = "Y";
            qc.COMMENTS = json.COMMENTS;
            qc.TYPE = json.TYPE;
            if (qc.TYPE == "2")
            {
                if (json.W1 == "Y") { qc.W1 = "Y"; } else { qc.W1 = ""; }
                if (json.W2 == "Y") { qc.W2 = "Y"; } else { qc.W2 = ""; }
                if (json.W3 == "Y") { qc.W3 = "Y"; } else { qc.W3 = ""; }
                if (json.W4 == "Y") { qc.W4 = "Y"; } else { qc.W4 = ""; }
                if (json.W5 == "Y") { qc.W5 = "Y"; } else { qc.W5 = ""; }
                if (json.W6 == "Y") { qc.W6 = "Y"; } else { qc.W6 = ""; }
                if (json.W7 == "Y") { qc.W7 = "Y"; } else { qc.W7 = ""; }
                qc.M1 = null;
                qc.M2 = null;
                qc.M3 = null;
                qc.CYCLESTARTDATE = null;
                qc.CYCLE = null;
            }
            if (qc.TYPE == "3")
            {
                if (json.M1 != null && json.M1.Length > 0) { qc.M1 = int.Parse(json.M1); } else { qc.M1 = null; }
                if (json.M2 != null && json.M2.Length > 0) { qc.M2 = int.Parse(json.M2); } else { qc.M2 = null; }
                if (json.M3 != null && json.M3.Length > 0) { qc.M3 = int.Parse(json.M3); } else { qc.M3 = null; }
                qc.W1 = null;
                qc.W2 = null;
                qc.W3 = null;
                qc.W4 = null;
                qc.W5 = null;
                qc.W6 = null;
                qc.W7 = null;
                qc.CYCLESTARTDATE = null;
                qc.CYCLE = null;
            }
            if (qc.TYPE == "4")
            {
                string sdate = json.CYCLESTARTDATE.IndexOf("-") >= 0 ? json.CYCLESTARTDATE.Replace("-", "") : json.CYCLESTARTDATE;
                qc.CYCLESTARTDATE = sdate;
                qc.LASTCOMPLETEDATE = sdate;
                qc.CYCLE = int.Parse(json.CYCLE);
                qc.W1 = null;
                qc.W2 = null;
                qc.W3 = null;
                qc.W4 = null;
                qc.W5 = null;
                qc.W6 = null;
                qc.W7 = null;
                qc.M1 = null;
                qc.M2 = null;
                qc.M3 = null;
            }
            string sql = "insert into cust_qc_list_log select a.*,sysdate,'UPDATE','" + json.USERID + "' from cust_qc_list a where sysid='" + qc.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            db.Update(qc);
            db.SaveChanges();
            return "update";
        }

        public static object AddQC(SpcContext db, SaveQCReq json)
        {
            var query = db.QC_LIST
                         .Where(u => u.EQPID == json.EQPID)
                         .Where(u => u.EDCPLAN == json.EDCPLAN)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         })
                         .ToList();
            if (query.Count > 0)
            {
                return "设备：" + json.EQPID + "的当前QC已存在！";
            }
            var query2 = (from c in db.QC_LIST
                          select new QC_LIST()
                          {
                              SYSID = c.SYSID,
                              MOUDLE = c.MOUDLE,
                              EQPID = c.EQPID,
                              QCNAME = c.QCNAME,
                              EDCPLAN = c.EDCPLAN,
                              QHOUR = c.QHOUR,
                              TYPE = c.TYPE,
                              SWEAK = c.SWEAK,
                              TWEAK = c.TWEAK,
                              W1 = c.W1,
                              W2 = c.W2,
                              W3 = c.W3,
                              W4 = c.W4,
                              W5 = c.W5,
                              W6 = c.W6,
                              W7 = c.W7,
                              M1 = c.M1,
                              M2 = c.M2,
                              M3 = c.M3,
                              CSTATUS = c.CSTATUS,
                              LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                              PLANDATE = c.PLANDATE,
                              FORCETRACKIN = c.FORCETRACKIN,
                              HASF = c.HASF,
                              CHOUR = c.CHOUR,
                              CYCLE = c.CYCLE,
                              CYCLESTARTDATE = c.CYCLESTARTDATE,
                              COMMENTS = c.COMMENTS,
                          }
                        ).OrderBy("SYSID").ToList();
            QC_LIST qc = new QC_LIST();
            if (query2.Count == 0)
            {
                qc.SYSID = 1;
            }
            else
            {
                qc.SYSID = query2.Select(u => u.SYSID).Max() + 1;
            }
            if (!string.IsNullOrEmpty(json.MOUDLE))
            {
                qc.MOUDLE = json.MOUDLE;
            }
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                qc.EQPID = json.EQPID;
            }
            if (!string.IsNullOrEmpty(json.QCNAME))
            {
                qc.QCNAME = json.QCNAME;
            }
            if (!string.IsNullOrEmpty(json.EDCPLAN))
            {
                qc.EDCPLAN = json.EDCPLAN;
            }
            if (!string.IsNullOrEmpty(json.QHOUR))
            {
                qc.QHOUR = int.Parse(json.QHOUR);
            }
            qc.CSTATUS = "Active";
            qc.HASF = "N";
            qc.CHOUR = "1";
            qc.FORCETRACKIN = "Y";
            qc.COMMENTS = json.COMMENTS;
            qc.TYPE = json.TYPE;
            if (qc.TYPE == "2")
            {
                if (json.W1 == "Y") { qc.W1 = "Y"; } else { qc.W1 = ""; }
                if (json.W2 == "Y") { qc.W2 = "Y"; } else { qc.W2 = ""; }
                if (json.W3 == "Y") { qc.W3 = "Y"; } else { qc.W3 = ""; }
                if (json.W4 == "Y") { qc.W4 = "Y"; } else { qc.W4 = ""; }
                if (json.W5 == "Y") { qc.W5 = "Y"; } else { qc.W5 = ""; }
                if (json.W6 == "Y") { qc.W6 = "Y"; } else { qc.W6 = ""; }
                if (json.W7 == "Y") { qc.W7 = "Y"; } else { qc.W7 = ""; }
            }
            if (qc.TYPE == "3")
            {
                if (json.M1 != null && json.M1.Length > 0) { qc.M1 = int.Parse(json.M1); } else { qc.M1 = null; }
                if (json.M2 != null && json.M2.Length > 0) { qc.M2 = int.Parse(json.M2); } else { qc.M2 = null; }
                if (json.M3 != null && json.M3.Length > 0) { qc.M3 = int.Parse(json.M3); } else { qc.M3 = null; }
            }
            if (qc.TYPE == "4")
            {
                string sdate = json.CYCLESTARTDATE.IndexOf("-") >= 0 ? json.CYCLESTARTDATE.Replace("-", "") : json.CYCLESTARTDATE;
                qc.CYCLESTARTDATE = sdate;
                qc.LASTCOMPLETEDATE = sdate;
                qc.CYCLE = int.Parse(json.CYCLE);
            }
            db.Add(qc);
            db.SaveChanges();
            string sql = "insert into cust_qc_list_log select a.*,sysdate,'NEW','" + json.USERID + "' from cust_qc_list a where sysid='" + qc.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            return "add";
        }

        public static object DeleteQC(SpcContext db, SaveQCReq json)
        {
            var query = db.QC_LIST
                         .Where(u => u.SYSID == int.Parse(json.SYSID))
                         .Where(u => u.PLANDATE != null || u.CSTATUS == "QC")
                         .OrderBy(x => x.SYSID)
                         .Select(c => new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         })
                         .ToList();
            if (query.Count > 0)
            {
                return "fail501";
            }
            var qcList = db.QC_LIST
                         .Where(u => u.SYSID == int.Parse(json.SYSID))
                         .OrderBy(x => x.SYSID)
                         .Select(c => new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         })
                         .ToList();
            QC_LIST qc = qcList[0];
            string sql = "insert into cust_qc_list_log select a.*,sysdate,'DELETE','" + json.USERID + "' from cust_qc_list a where sysid='" + qc.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            db.Remove(qc);
            db.SaveChanges();
            return "delete";
        }

        public static object DeleteQCDirect(SpcContext db, SaveQCReq json)
        {
            var qcList = db.QC_LIST
                         .Where(u => u.SYSID == int.Parse(json.SYSID))
                         .OrderBy(x => x.SYSID)
                         .Select(c => new QC_LIST()
                         {
                             SYSID = c.SYSID,
                             MOUDLE = c.MOUDLE,
                             EQPID = c.EQPID,
                             QCNAME = c.QCNAME,
                             EDCPLAN = c.EDCPLAN,
                             QHOUR = c.QHOUR,
                             TYPE = c.TYPE,
                             SWEAK = c.SWEAK,
                             TWEAK = c.TWEAK,
                             W1 = c.W1,
                             W2 = c.W2,
                             W3 = c.W3,
                             W4 = c.W4,
                             W5 = c.W5,
                             W6 = c.W6,
                             W7 = c.W7,
                             M1 = c.M1,
                             M2 = c.M2,
                             M3 = c.M3,
                             CSTATUS = c.CSTATUS,
                             LASTCOMPLETEDATE = c.LASTCOMPLETEDATE,
                             PLANDATE = c.PLANDATE,
                             FORCETRACKIN = c.FORCETRACKIN,
                             HASF = c.HASF,
                             CHOUR = c.CHOUR,
                             CYCLE = c.CYCLE,
                             CYCLESTARTDATE = c.CYCLESTARTDATE,
                             COMMENTS = c.COMMENTS,
                         })
                         .ToList();
            QC_LIST qc = qcList[0];
            string sql = "insert into cust_qc_list_log select a.*,sysdate,'DELETE','" + json.USERID + "' from cust_qc_list a where sysid='" + qc.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            sql = "delete from cust_trackin_check where sysid='" + qc.SYSID + "'";
            num = DapperHelper.Execute(sql);
            db.Remove(qc);
            db.SaveChanges();
            return "delete";
        }
    }
}

