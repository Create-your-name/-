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
using System.Xml.Linq;
using System.Xml;

namespace SPCService
{
    public partial class PMService
    {
        public static object getPMFormList(SpcContext db, QueryPMFormReq json)
        {
            var query = (from c in db.CUST_PM_FORM
                         select new CUST_PM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             EQPTYPE = c.EQPTYPE,
                         }
                         ).OrderBy("SYSID").ToList();
            if (!string.IsNullOrEmpty(json.FORMNAME))
            {
                query = query.Where(u => u.FORMNAME.IndexOf(json.FORMNAME) >= 0).ToList();
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                query = query.Where(u => u.EQPTYPE == json.EQPTYPE).ToList();
            }
            return query;
        }

        public static object getPMFormCheckList(SpcContext db, QueryPMFormReq json)
        {
            var query = (from c in db.CUST_PM_CHECKLIST
                         .Where(u => u.PMFORMID == json.SYSID)
                         select new CUST_PM_CHECKLIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             CHKINDEX = c.CHKINDEX,
                             ITEMNAME = c.ITEMNAME,
                             ITEMTYPE = c.ITEMTYPE,
                             ITEMVALUE = c.ITEMVALUE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                         }
                         ).OrderBy("CHKINDEX").ToList();
            return query;
        }

        public static object addPMForm(SpcContext db, SavePMFormReq json)
        {
            var query = db.CUST_PM_FORM
                         .Where(u => u.FORMNAME == json.FORMNAME && u.EQPTYPE == json.EQPTYPE)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new CUST_PM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             EQPTYPE = c.EQPTYPE,
                         })
                         .ToList();
            if (query.Count > 0)
            {
                return "该设备类型的此PM表单已存在！";
            }
            CUST_PM_FORM pmForm = new CUST_PM_FORM();
            string guid = RandomUUID.GenUUIDString().Replace("-", "");
            pmForm.SYSID = guid;
            if (!string.IsNullOrEmpty(json.FORMNAME))
            {
                pmForm.FORMNAME = json.FORMNAME;
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                pmForm.EQPTYPE = json.EQPTYPE;
            }
            pmForm.CREATEUSER = json.USERID;
            pmForm.MODIFYTIME = DateTime.Now.ToString("yyyyMMdd");
            List<CUST_PM_CHECKLIST> checkList = new List<CUST_PM_CHECKLIST>();
            for (int i = 0; i < json.checkList.Count; i++)
            {
                string guid2 = RandomUUID.GenUUIDString().Replace("-", "");
                var check = json.checkList[i];
                checkList.Add(new CUST_PM_CHECKLIST
                {
                    SYSID = guid2,
                    PMFORMID = pmForm.SYSID,
                    CHKINDEX = int.Parse(check.CHKINDEX),
                    ITEMNAME = check.ITEMNAME,
                    ITEMTYPE = check.ITEMTYPE,
                    ITEMVALUE = check.ITEMVALUE,
                    CREATEUSER = json.USERID,
                    MODIFYTIME = DateTime.Now.ToString("yyyyMMdd"),
                });
            }
            foreach (var check in checkList)
            {
                db.Add(check);
            }
            db.Add(pmForm);
            db.SaveChanges();
            return "add";
        }

        public static object updatePMForm(SpcContext db, SavePMFormReq json)
        {
            var isUsed = db.EQP_PM_LIST
                         .Where(u => u.PMFORMID == json.SYSID)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMNAME = c.PMNAME,
                         })
                         .ToList();
            if (isUsed.Count > 0)
            {
                return "当前PM表单已被 " + isUsed[0].PMNAME + " 的PM项目使用，无法修改！";
            }
            var isExist = db.CUST_PM_FORM
                         .Where(u => u.FORMNAME == json.FORMNAME && u.EQPTYPE == json.EQPTYPE && u.SYSID != json.SYSID)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new CUST_PM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             EQPTYPE = c.EQPTYPE,
                         })
                         .ToList();
            if (isExist.Count > 0)
            {
                return "该设备类型的此PM表单已存在！";
            }
            var query = (from c in db.CUST_PM_FORM
                          .Where(u => u.SYSID == json.SYSID)
                         select new CUST_PM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             EQPTYPE = c.EQPTYPE,
                         })
                          .OrderBy("SYSID").ToList();
            CUST_PM_FORM pmForm = query[0];
            if (!string.IsNullOrEmpty(json.FORMNAME))
            {
                pmForm.FORMNAME = json.FORMNAME;
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                pmForm.EQPTYPE = json.EQPTYPE;
            }
            var query2 = (from c in db.CUST_PM_CHECKLIST
                          .Where(u => u.PMFORMID == json.SYSID)
                          select new CUST_PM_CHECKLIST()
                          {
                              SYSID = c.SYSID,
                              PMFORMID = c.PMFORMID,
                              CHKINDEX = c.CHKINDEX,
                              ITEMNAME = c.ITEMNAME,
                              ITEMTYPE = c.ITEMTYPE,
                              ITEMVALUE = c.ITEMVALUE,
                              CREATEUSER = c.CREATEUSER,
                              MODIFYTIME = c.MODIFYTIME,
                          })
                          .OrderBy("SYSID").ToList();
            foreach (var check in query2)
            {
                db.Remove(check);
            }
            List<CUST_PM_CHECKLIST> checkList = new List<CUST_PM_CHECKLIST>();
            for (int i = 0; i < json.checkList.Count; i++)
            {
                string guid = RandomUUID.GenUUIDString().Replace("-", "");
                var check = json.checkList[i];
                checkList.Add(new CUST_PM_CHECKLIST
                {
                    SYSID = guid,
                    PMFORMID = pmForm.SYSID,
                    CHKINDEX = int.Parse(check.CHKINDEX),
                    ITEMNAME = check.ITEMNAME,
                    ITEMTYPE = check.ITEMTYPE,
                    ITEMVALUE = check.ITEMVALUE,
                });
            }
            foreach (var check in checkList)
            {
                db.Add(check);
            }
            db.Update(pmForm);
            db.SaveChanges();
            return "update";
        }

        public static object deletePMForm(SpcContext db, SavePMFormReq json)
        {
            var query = db.EQP_PM_LIST
                         .Where(u => u.PMFORMID == json.SYSID)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMNAME = c.PMNAME,
                         })
                         .ToList();
            if (query.Count > 0)
            {
                return "当前PM表单已被 " + query[0].PMNAME + " 的PM项目使用，无法删除！";
            }
            var query2 = (from c in db.CUST_PM_FORM
                          .Where(u => u.SYSID == json.SYSID)
                          select new CUST_PM_FORM()
                          {
                              SYSID = c.SYSID,
                              FORMNAME = c.FORMNAME,
                              CREATEUSER = c.CREATEUSER,
                              MODIFYTIME = c.MODIFYTIME,
                          })
                          .OrderBy("SYSID").ToList();
            CUST_PM_FORM pmForm = query2[0];
            db.Remove(pmForm);
            var query3 = (from c in db.CUST_PM_CHECKLIST
                          .Where(u => u.PMFORMID == json.SYSID)
                          select new CUST_PM_CHECKLIST()
                          {
                              SYSID = c.SYSID,
                              PMFORMID = c.PMFORMID,
                              CHKINDEX = c.CHKINDEX,
                              ITEMNAME = c.ITEMNAME,
                              ITEMTYPE = c.ITEMTYPE,
                              ITEMVALUE = c.ITEMVALUE,
                              CREATEUSER = c.CREATEUSER,
                              MODIFYTIME = c.MODIFYTIME,
                          })
                          .OrderBy("SYSID").ToList();
            foreach (var check in query3)
            {
                db.Remove(check);
            }
            db.SaveChanges();
            return "delete";
        }

        public static object getEqpType(SpcContext db)
        {
            string sql = "SELECT DISTINCT A.NAME AS NAME FROM FWEQPTYPE A, FWEQPEQUIPMENTVERSION B WHERE A.SYSID = B.EQPTYPE AND B.REVSTATE = 'Active' ORDER BY A.NAME";
            var robj = DapperHelper.Query<EQP_LIST>(sql);
            return robj;
        }

        public static object getPMList(SpcContext db, QueryPMReq json)
        {
            var query = (from c in db.EQP_PM_LIST
                         select new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
            if (!string.IsNullOrEmpty(json.PMNAME))
            {
                query = query.Where(u => u.PMNAME.IndexOf(json.PMNAME) >= 0).ToList();
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                query = query.Where(u => u.EQPTYPE == json.EQPTYPE).ToList();
            }
            if (!string.IsNullOrEmpty(json.PMFORMID))
            {
                query = query.Where(u => u.PMFORMID == json.PMFORMID).ToList();
            }
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                query = query.Where(u => u.EQPID == json.EQPID).ToList();
            }
            return query;
        }

        public static object addPM(SpcContext db, SavePMReq json)
        {
            var query = db.EQP_PM_LIST
                         .Where(u => u.EQPID == json.EQPID)
                         .Where(u => u.PMFORMID == json.PMFORMID)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
                return "设备：" + json.EQPID + "的当前PM已存在！";
            }
            string guid = RandomUUID.GenUUIDString().Replace("-", "");
            EQP_PM_LIST pm = new EQP_PM_LIST();
            pm.SYSID = guid;
            if (!string.IsNullOrEmpty(json.MOUDLE))
            {
                pm.MOUDLE = json.MOUDLE;
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                pm.EQPTYPE = json.EQPTYPE;
            }
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                pm.EQPID = json.EQPID;
            }
            if (!string.IsNullOrEmpty(json.PMNAME))
            {
                pm.PMNAME = json.PMNAME;
            }
            if (!string.IsNullOrEmpty(json.PMFORMID))
            {
                pm.PMFORMID = json.PMFORMID;
            }
            if (!string.IsNullOrEmpty(json.QHOUR))
            {
                pm.QHOUR = int.Parse(json.QHOUR);
            }
            pm.PMSTATUS = "Active";
            pm.HASF = "N";
            pm.CHOUR = "1";
            pm.FORCETRACKIN = "Y";
            pm.COMMENTS = json.COMMENTS;
            pm.TYPE = json.TYPE;
            if (pm.TYPE == "2")
            {
                if (json.W1 == "Y") { pm.W1 = "Y"; } else { pm.W1 = ""; }
                if (json.W2 == "Y") { pm.W2 = "Y"; } else { pm.W2 = ""; }
                if (json.W3 == "Y") { pm.W3 = "Y"; } else { pm.W3 = ""; }
                if (json.W4 == "Y") { pm.W4 = "Y"; } else { pm.W4 = ""; }
                if (json.W5 == "Y") { pm.W5 = "Y"; } else { pm.W5 = ""; }
                if (json.W6 == "Y") { pm.W6 = "Y"; } else { pm.W6 = ""; }
                if (json.W7 == "Y") { pm.W7 = "Y"; } else { pm.W7 = ""; }
            }
            if (pm.TYPE == "3")
            {
                if (json.M1 != null && json.M1.Length > 0) { pm.M1 = int.Parse(json.M1); } else { pm.M1 = null; }
                if (json.M2 != null && json.M2.Length > 0) { pm.M2 = int.Parse(json.M2); } else { pm.M2 = null; }
                if (json.M3 != null && json.M3.Length > 0) { pm.M3 = int.Parse(json.M3); } else { pm.M3 = null; }
            }
            if (pm.TYPE == "4")
            {
                string sdate = json.CYCLESTARTDATE.IndexOf("-") >= 0 ? json.CYCLESTARTDATE.Replace("-", "") : json.CYCLESTARTDATE;
                pm.CYCLESTARTDATE = sdate;
                pm.LASTCOMPLETEDATE = sdate;
                pm.CYCLE = int.Parse(json.CYCLE);
            }
            db.Add(pm);
            db.SaveChanges();
            string sql = "insert into cust_eqp_pm_list_log select a.*,sysdate,'NEW','" + json.USERID + "' from cust_eqp_pm_list a where sysid='" + pm.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            return "add";
        }

        public static object deletePM(SpcContext db, SavePMReq json)
        {
            var query = db.EQP_PM_LIST
                         .Where(u => u.SYSID == json.SYSID)
                         .Where(u => u.PLANDATE != null || u.PMSTATUS == "PM")
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
            var pmList = db.EQP_PM_LIST
                         .Where(u => u.SYSID == json.SYSID)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
            EQP_PM_LIST pm = pmList[0];
            string sql = "insert into cust_eqp_pm_list_log select a.*,sysdate,'DELETE','" + json.USERID + "' from cust_eqp_pm_list a where sysid='" + pm.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            db.Remove(pm);
            db.SaveChanges();
            return "delete";
        }

        public static object deletePMDirect(SpcContext db, SavePMReq json)
        {
            var pmList = db.EQP_PM_LIST
                         .Where(u => u.SYSID == json.SYSID)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
            EQP_PM_LIST pm = pmList[0];
            string sql = "insert into cust_eqp_pm_list_log select a.*,sysdate,'DELETE','" + json.USERID + "' from cust_eqp_pm_list a where sysid='" + pm.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            sql = "delete from cust_trackin_check where sysid='" + pm.SYSID + "'";
            num = DapperHelper.Execute(sql);
            db.Remove(pm);
            db.SaveChanges();
            return "delete";
        }

        public static object updatePM(SpcContext db, SavePMReq json)
        {
            var query = db.EQP_PM_LIST
                         .Where(u => u.SYSID == json.SYSID)
                         .Where(u => u.PLANDATE != null || u.PMSTATUS == "PM")
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
                return "该PM计划已生成，请完成后更改！";
            }
            var isExist = db.EQP_PM_LIST
                         .Where(u => u.EQPID == json.EQPID)
                         .Where(u => u.PMFORMID == json.PMFORMID && u.SYSID != json.SYSID)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
                return "设备：" + json.EQPID + "的当前PM已存在！";
            }
            var pmList = db.EQP_PM_LIST
                         .Where(u => u.SYSID == json.SYSID)
                         .Select(c => new EQP_PM_LIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             MOUDLE = c.MOUDLE,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             PMNAME = c.PMNAME,
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
                             PMSTATUS = c.PMSTATUS,
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
            EQP_PM_LIST pm = pmList[0];
            if (!string.IsNullOrEmpty(json.MOUDLE))
            {
                pm.MOUDLE = json.MOUDLE;
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                pm.EQPTYPE = json.EQPTYPE;
            }
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                pm.EQPID = json.EQPID;
            }
            if (!string.IsNullOrEmpty(json.PMNAME))
            {
                pm.PMNAME = json.PMNAME;
            }
            if (!string.IsNullOrEmpty(json.PMFORMID))
            {
                pm.PMFORMID = json.PMFORMID;
            }
            if (!string.IsNullOrEmpty(json.QHOUR))
            {
                pm.QHOUR = int.Parse(json.QHOUR);
            }
            pm.PMSTATUS = "Active";
            pm.HASF = "N";
            pm.CHOUR = "1";
            pm.FORCETRACKIN = "Y";
            pm.COMMENTS = json.COMMENTS;
            pm.TYPE = json.TYPE;
            if (pm.TYPE == "2")
            {
                if (json.W1 == "Y") { pm.W1 = "Y"; } else { pm.W1 = ""; }
                if (json.W2 == "Y") { pm.W2 = "Y"; } else { pm.W2 = ""; }
                if (json.W3 == "Y") { pm.W3 = "Y"; } else { pm.W3 = ""; }
                if (json.W4 == "Y") { pm.W4 = "Y"; } else { pm.W4 = ""; }
                if (json.W5 == "Y") { pm.W5 = "Y"; } else { pm.W5 = ""; }
                if (json.W6 == "Y") { pm.W6 = "Y"; } else { pm.W6 = ""; }
                if (json.W7 == "Y") { pm.W7 = "Y"; } else { pm.W7 = ""; }
                pm.M1 = null;
                pm.M2 = null;
                pm.M3 = null;
                pm.CYCLESTARTDATE = null;
                pm.CYCLE = null;
            }
            if (pm.TYPE == "3")
            {
                if (json.M1 != null && json.M1.Length > 0) { pm.M1 = int.Parse(json.M1); } else { pm.M1 = null; }
                if (json.M2 != null && json.M2.Length > 0) { pm.M2 = int.Parse(json.M2); } else { pm.M2 = null; }
                if (json.M3 != null && json.M3.Length > 0) { pm.M3 = int.Parse(json.M3); } else { pm.M3 = null; }
                pm.W1 = null;
                pm.W2 = null;
                pm.W3 = null;
                pm.W4 = null;
                pm.W5 = null;
                pm.W6 = null;
                pm.W7 = null;
                pm.CYCLESTARTDATE = null;
                pm.CYCLE = null;
            }
            if (pm.TYPE == "4")
            {
                string sdate = json.CYCLESTARTDATE.IndexOf("-") >= 0 ? json.CYCLESTARTDATE.Replace("-", "") : json.CYCLESTARTDATE;
                pm.CYCLESTARTDATE = sdate;
                pm.LASTCOMPLETEDATE = sdate;
                pm.CYCLE = int.Parse(json.CYCLE);
                pm.W1 = null;
                pm.W2 = null;
                pm.W3 = null;
                pm.W4 = null;
                pm.W5 = null;
                pm.W6 = null;
                pm.W7 = null;
                pm.M1 = null;
                pm.M2 = null;
                pm.M3 = null;
            }
            string sql = "insert into cust_eqp_pm_list_log select a.*,sysdate,'UPDATE','" + json.USERID + "' from cust_eqp_pm_list a where sysid='" + pm.SYSID + "'";
            int num = DapperHelper.Execute(sql);
            pm.PMID = null;
            db.Update(pm);
            db.SaveChanges();
            return "update";
        }

        public static object getPMHis(SpcContext db, QueryPMHisReq json)
        {
            var query = (from c in db.CUST_PM_BM_DATA
                         .Where(u => u.PMID != null)
                         .Where(u => System.Convert.ToInt64(u.MODIFYTIME.Substring(0, 8)) >= System.Convert.ToInt64(json.STARTDATE) && System.Convert.ToInt64(u.MODIFYTIME.Substring(0, 8)) <= System.Convert.ToInt64(json.ENDDATE))
                         select new CUST_PM_BM_DATA()
                         {
                             SYSID = c.SYSID,
                             PMID = c.PMID,
                             PMNAME = c.PMNAME,
                             PMFORMID = c.PMFORMID,
                             BMFORMID = c.BMFORMID,
                             FORMNAME = c.FORMNAME,
                             EQPTYPE = c.EQPTYPE,
                             EQPID = c.EQPID,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                         }
                         ).OrderByDescending(x => x.MODIFYTIME).ToList();
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                query = query.Where(u => u.EQPTYPE == json.EQPTYPE).ToList();
            }
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                query = query.Where(u => u.EQPID == json.EQPID).ToList();
            }
            if (!string.IsNullOrEmpty(json.PMFORMID))
            {
                query = query.Where(u => u.PMFORMID == json.PMFORMID).ToList();
            }
            return query;
        }

        public static object getPMHisChartCheckList(SpcContext db, QueryPMFormReq json)
        {
            var query = (from c in db.CUST_PM_CHECKLIST
                          .Where(u => u.PMFORMID == json.SYSID)
                          .Where(u => u.ITEMTYPE == "4")
                         select new CUST_PM_CHECKLIST()
                         {
                             SYSID = c.SYSID,
                             PMFORMID = c.PMFORMID,
                             CHKINDEX = c.CHKINDEX,
                             ITEMNAME = c.ITEMNAME,
                             ITEMTYPE = c.ITEMTYPE,
                             ITEMVALUE = c.ITEMVALUE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                         }
                          ).OrderBy("CHKINDEX").ToList();
            return query;
        }

        public static object getPMChartPoint(SpcContext db, QueryPMChartPointReq json)
        {
            var query = (from a in db.CUST_PM_BM_DATA_CHECKLIST
                         join b in db.CUST_PM_BM_DATA on a.DATAID equals b.SYSID
                         where a.ITEMTYPE == "4" && b.EQPTYPE == json.EQPTYPE && a.CHKINDEX == System.Convert.ToInt64(json.CHKINDEX)
                         && b.PMFORMID != null && b.PMFORMID == json.PMFORMID
                         && System.Convert.ToInt64(a.MODIFYTIME.Substring(0, 8)) >= System.Convert.ToInt64(json.STARTDATE) && System.Convert.ToInt64(a.MODIFYTIME.Substring(0, 8)) <= System.Convert.ToInt64(json.ENDDATE)
                         select new
                         {
                             ITEMVALUE = a.ITEMVALUE,
                             CHECKVALUE = a.CHECKVALUE,
                             EQPID = b.EQPID,
                             MODIFYTIME = a.MODIFYTIME
                         }
                          ).OrderBy(x => x.MODIFYTIME).ToList();
            if (!string.IsNullOrEmpty(json.EQPID))
            {
                query = query.Where(u => u.EQPID == json.EQPID).ToList();
            }
            return query;
        }
    }
}

