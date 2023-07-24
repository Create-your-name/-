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

namespace SPCService
{
    public partial class BMService
    {
        public static object GetBMFormList(SpcContext db, QueryBMFormReq json)
        {
            var query = (from c in db.CUST_BM_FORM
                         select new CUST_BM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             EQPTYPE = c.EQPTYPE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             BMTYPE = c.BMTYPE,
                         }
             ).OrderBy("EQPTYPE").ToList();
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

        public static object getBMFormCheckList(SpcContext db, QueryBMFormReq json)
        {
            var query = (from c in db.CUST_BM_CHECKLIST
                         .Where(u => u.BMFORMID == json.SYSID)
                         select new CUST_BM_CHECKLIST()
                         {
                             SYSID = c.SYSID,
                             BMFORMID = c.BMFORMID,
                             CHKINDEX = c.CHKINDEX,
                             ITEMNAME = c.ITEMNAME,
                             ITEMTYPE = c.ITEMTYPE,
                             ITEMVALUE = c.ITEMVALUE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                         }
                         ).OrderBy("CHKINDEX").ToList();
            var query2 = (from c in db.CUST_BM_CHECKLIST_GROUP
                         .Where(u => u.BMFORMID == json.SYSID)
                          select new CUST_BM_CHECKLIST_GROUP()
                          {
                              SYSID = c.SYSID,
                              BMFORMID = c.BMFORMID,
                              GROUPINDEX = c.GROUPINDEX,
                              GROUPNAME = c.GROUPNAME,
                              CHECKLIST = c.CHECKLIST,
                              CREATEUSER = c.CREATEUSER,
                              MODIFYTIME = c.MODIFYTIME,
                          }
                         ).OrderBy("GROUPINDEX").ToList();
            Dictionary<string, object> result = new Dictionary<string, object>();
            result.Add("checklist", query);
            result.Add("group", query2);
            return result;
        }

        public static object addBMForm(SpcContext db, SaveBMFormReq json)
        {
            var query = db.CUST_BM_FORM
                         .Where(u => u.EQPTYPE == json.EQPTYPE && u.BMTYPE == json.BMTYPE)
                         .OrderBy(x => x.SYSID)
                         .Select(c => new CUST_BM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             EQPTYPE = c.EQPTYPE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             BMTYPE = c.BMTYPE,
                         })
                         .ToList();
            if (query.Count > 0)
            {
                return "设备当前Checklist已存在,不可重复创建！";
            }
            var query2 = (from c in db.CUST_BM_FORM
                          select new CUST_BM_FORM()
                          {
                              SYSID = c.SYSID,
                              FORMNAME = c.FORMNAME,
                              EQPTYPE = c.EQPTYPE,
                              CREATEUSER = c.CREATEUSER,
                              MODIFYTIME = c.MODIFYTIME,
                              BMTYPE = c.BMTYPE,
                          })
                          .OrderBy("SYSID").ToList();
            CUST_BM_FORM bmForm = new CUST_BM_FORM();
            string guid = RandomUUID.GenUUIDString().Replace("-", "");
            bmForm.SYSID = guid;
            if (!string.IsNullOrEmpty(json.FORMNAME))
            {
                bmForm.FORMNAME = json.FORMNAME;
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                bmForm.EQPTYPE = json.EQPTYPE;
            }
            if (!string.IsNullOrEmpty(json.BMTYPE))
            {
                bmForm.BMTYPE = json.BMTYPE;
            }
            bmForm.CREATEUSER = json.USERID;
            bmForm.MODIFYTIME = DateTime.Now.ToString("yyyyMMdd");
            List<CUST_BM_CHECKLIST> checkList = new List<CUST_BM_CHECKLIST>();
            for (int i = 0; i < json.checkList.Count; i++)
            {
                string guid2 = RandomUUID.GenUUIDString().Replace("-", "");
                var check = json.checkList[i];
                checkList.Add(new CUST_BM_CHECKLIST
                {
                    SYSID = guid2,
                    BMFORMID = bmForm.SYSID,
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
            List<CUST_BM_CHECKLIST_GROUP> checkListGroup = new List<CUST_BM_CHECKLIST_GROUP>();
            for (int i = 0; i < json.groupList.Count; i++)
            {
                string guid3 = RandomUUID.GenUUIDString().Replace("-", "");
                var check = json.groupList[i];
                checkListGroup.Add(new CUST_BM_CHECKLIST_GROUP
                {
                    SYSID = guid3,
                    BMFORMID = bmForm.SYSID,
                    GROUPINDEX = int.Parse(check.GROUPINDEX),
                    GROUPNAME = check.GROUPNAME,
                    CHECKLIST = check.CHECKLIST,
                    CREATEUSER = json.USERID,
                    MODIFYTIME = DateTime.Now.ToString("yyyyMMdd"),
                });
            }
            foreach (var group in checkListGroup)
            {
                db.Add(group);
            }
            db.Add(bmForm);
            db.SaveChanges();
            return "add";
        }

        public static object updateBMForm(SpcContext db, SaveBMFormReq json)
        {
            var errorQuery = db.CUST_BM_FORM
             .Where(u => u.EQPTYPE == json.EQPTYPE && u.BMTYPE == json.BMTYPE && u.SYSID != json.SYSID)
             .OrderBy(x => x.SYSID)
             .Select(c => new CUST_BM_FORM()
             {
                 SYSID = c.SYSID,
                 FORMNAME = c.FORMNAME,
                 EQPTYPE = c.EQPTYPE,
                 CREATEUSER = c.CREATEUSER,
                 MODIFYTIME = c.MODIFYTIME,
                 BMTYPE = c.BMTYPE,
             })
             .ToList();
            if (errorQuery.Count > 0)
            {
                return "设备当前Checklist已存在,更新失败！";
            }
            var query = (from c in db.CUST_BM_FORM
                          .Where(u => u.SYSID == json.SYSID)
                         select new CUST_BM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             EQPTYPE = c.EQPTYPE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             BMTYPE = c.BMTYPE,
                         })
                          .OrderBy("SYSID").ToList();
            CUST_BM_FORM bmForm = query[0];
            if (!string.IsNullOrEmpty(json.FORMNAME))
            {
                bmForm.FORMNAME = json.FORMNAME;
            }
            if (!string.IsNullOrEmpty(json.EQPTYPE))
            {
                bmForm.EQPTYPE = json.EQPTYPE;
            }
            if (!string.IsNullOrEmpty(json.BMTYPE))
            {
                bmForm.BMTYPE = json.BMTYPE;
            }
            bmForm.MODIFYTIME = DateTime.Now.ToString("yyyyMMdd");
            var query2 = (from c in db.CUST_BM_CHECKLIST
                          .Where(u => u.BMFORMID == json.SYSID)
                          select new CUST_BM_CHECKLIST()
                          {
                              SYSID = c.SYSID,
                              BMFORMID = c.BMFORMID,
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
            List<CUST_BM_CHECKLIST> checkList = new List<CUST_BM_CHECKLIST>();
            for (int i = 0; i < json.checkList.Count; i++)
            {
                string guid2 = RandomUUID.GenUUIDString().Replace("-", "");
                var check = json.checkList[i];
                checkList.Add(new CUST_BM_CHECKLIST
                {
                    SYSID = guid2,
                    BMFORMID = bmForm.SYSID,
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
            var query3 = (from c in db.CUST_BM_CHECKLIST_GROUP
              .Where(u => u.BMFORMID == json.SYSID)
                          select new CUST_BM_CHECKLIST_GROUP()
                          {
                              SYSID = c.SYSID,
                              BMFORMID = c.BMFORMID,
                              GROUPINDEX = c.GROUPINDEX,
                              GROUPNAME = c.GROUPNAME,
                              CHECKLIST = c.CHECKLIST,
                              CREATEUSER = c.CREATEUSER,
                              MODIFYTIME = c.MODIFYTIME,
                          })
              .OrderBy("SYSID").ToList();
            foreach (var group in query3)
            {
                db.Remove(group);
            }
            List<CUST_BM_CHECKLIST_GROUP> checkListGroup = new List<CUST_BM_CHECKLIST_GROUP>();
            for (int i = 0; i < json.groupList.Count; i++)
            {
                string guid3 = RandomUUID.GenUUIDString().Replace("-", "");
                var check = json.groupList[i];
                checkListGroup.Add(new CUST_BM_CHECKLIST_GROUP
                {
                    SYSID = guid3,
                    BMFORMID = bmForm.SYSID,
                    GROUPINDEX = int.Parse(check.GROUPINDEX),
                    GROUPNAME = check.GROUPNAME,
                    CHECKLIST = check.CHECKLIST,
                    CREATEUSER = json.USERID,
                    MODIFYTIME = DateTime.Now.ToString("yyyyMMdd"),
                });
            }
            foreach (var group in checkListGroup)
            {
                db.Add(group);
            }
            db.Update(bmForm);
            db.SaveChanges();
            return "update";
        }

        public static object deleteBMForm(SpcContext db, SaveBMFormReq json)
        {
            var query = (from c in db.CUST_BM_FORM
                          .Where(u => u.SYSID == json.SYSID)
                         select new CUST_BM_FORM()
                         {
                             SYSID = c.SYSID,
                             FORMNAME = c.FORMNAME,
                             EQPTYPE = c.EQPTYPE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                             BMTYPE = c.BMTYPE,
                         })
                          .OrderBy("SYSID").ToList();
            CUST_BM_FORM bmForm = query[0];
            db.Remove(bmForm);
            var query2 = (from c in db.CUST_BM_CHECKLIST
                          .Where(u => u.BMFORMID == json.SYSID)
                          select new CUST_BM_CHECKLIST()
                          {
                              SYSID = c.SYSID,
                              BMFORMID = c.BMFORMID,
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
            var query3 = (from c in db.CUST_BM_CHECKLIST_GROUP
                          .Where(u => u.BMFORMID == json.SYSID)
                          select new CUST_BM_CHECKLIST_GROUP()
                          {
                              SYSID = c.SYSID,
                              BMFORMID = c.BMFORMID,
                              GROUPINDEX = c.GROUPINDEX,
                              GROUPNAME = c.GROUPNAME,
                              CHECKLIST = c.CHECKLIST,
                              CREATEUSER = c.CREATEUSER,
                              MODIFYTIME = c.MODIFYTIME,
                          })
                          .OrderBy("SYSID").ToList();
            foreach (var group in query3)
            {
                db.Remove(group);
            }
            db.SaveChanges();
            return "delete";
        }

        public static object getPMBMHis(SpcContext db, QueryPMBMHisReq json)
        {
            var query = (from c in db.CUST_PM_BM_DATA
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
            if (!string.IsNullOrEmpty(json.TYPE))
            {
                if (json.TYPE == "PM")
                    query = query.Where(u => u.BMFORMID == null).ToList();
                else query = query.Where(u => u.BMFORMID != null).ToList();
            }
            return query;
        }

        public static object getPMBMHisCheckList(SpcContext db, QueryBMFormReq json)
        {
            var query = (from c in db.CUST_PM_BM_DATA_CHECKLIST
                         .Where(u => u.DATAID == json.SYSID)
                         select new CUST_PM_BM_DATA_CHECKLIST()
                         {
                             SYSID = c.SYSID,
                             DATAID = c.DATAID,
                             CHKINDEX = c.CHKINDEX,
                             ITEMNAME = c.ITEMNAME,
                             ITEMTYPE = c.ITEMTYPE,
                             ITEMVALUE = c.ITEMVALUE,
                             CHECKVALUE = c.CHECKVALUE,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                         }
                         ).OrderBy("CHKINDEX").ToList();
            return query;
        }

        public static object getBMHis(SpcContext db, QueryBMHisReq json)
        {
            var query = (from c in db.CUST_PM_BM_DATA
                         .Where(u => u.BMFORMID != null)
                         .Where(u => u.BMTYPE != null)
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
                             BMTYPE = c.BMTYPE,
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
            if (!string.IsNullOrEmpty(json.BMTYPE))
            {
                query = query.Where(u => u.BMTYPE == json.BMTYPE).ToList();
            }
            return query;
        }

        public static object getBMGroupHis(SpcContext db, QueryBMFormReq json)
        {
            List<Dictionary<string, string>> groups = new List<Dictionary<string, string>>();
            var query = (from c in db.CUST_PM_BM_DATA
                         .Where(u => u.SYSID == json.SYSID)
                         select new CUST_PM_BM_DATA()
                         {
                             SYSID = c.SYSID,
                             BMFORMID = c.BMFORMID,
                             SELECTED_GROUPS = c.SELECTED_GROUPS,
                             CREATEUSER = c.CREATEUSER,
                             MODIFYTIME = c.MODIFYTIME,
                         }
                         ).ToList();
            if (query.Count > 0)
            {
                if (query[0].SELECTED_GROUPS != null)
                {
                    foreach (string temp in query[0].SELECTED_GROUPS.Split(";"))
                    {
                        Dictionary<string, string> group = new Dictionary<string, string>();
                        var query2 = (from c in db.CUST_BM_CHECKLIST_GROUP
                         .Where(u => u.BMFORMID == query[0].BMFORMID && u.GROUPINDEX == System.Convert.ToInt32(temp))
                                      select new CUST_BM_CHECKLIST_GROUP()
                                      {
                                          SYSID = c.SYSID,
                                          GROUPNAME = c.GROUPNAME,
                                          CREATEUSER = c.CREATEUSER,
                                          MODIFYTIME = c.MODIFYTIME,
                                      }
                         ).ToList();
                        if(query2.Count > 0)
                        {
                            group.Add("index", temp);
                            group.Add("name", query2[0].GROUPNAME);
                            groups.Add(group);
                        }
                    }
                }
            }
            return groups;
        }

        public static object getBMHisChartCheckList(SpcContext db, QueryBMFormReq json)
        {
            var query = (from c in db.CUST_BM_CHECKLIST
                         join b in db.CUST_BM_FORM on c.BMFORMID equals b.SYSID
                         where c.ITEMTYPE == "4" && b.EQPTYPE == json.EQPTYPE && b.BMTYPE == json.BMTYPE
                         select new CUST_BM_CHECKLIST()
                         {
                             SYSID = c.SYSID,
                             BMFORMID = c.BMFORMID,
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

        public static object getBMChartPoint(SpcContext db, QueryBMChartPointReq json)
        {
            var query = (from a in db.CUST_PM_BM_DATA_CHECKLIST
                         join b in db.CUST_PM_BM_DATA on a.DATAID equals b.SYSID
                         where a.ITEMTYPE == "4" && b.EQPTYPE == json.EQPTYPE && a.CHKINDEX == System.Convert.ToInt64(json.CHKINDEX)
                         && b.BMFORMID != null && b.BMTYPE == json.BMTYPE
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

