using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.EntityFrameworkCore;
using Protocol;
using SPCService.Database;
using SPCService.DbModel;
using SPCService.Helper;
using SPCService.src.Database.Entity.SCFZ;
using System;
using System.Collections.Generic;
using System.Linq;
using SPCService.src.Framework.Utils;
using Arch;

namespace SPCService.src.EQPPartService
{
    public class BackParService
    {
        public static object ConfirmData(SpcContext db, ConfirmDATA json) {



            if ( json.nTYPES != "TIME(天)" &&  int.Parse(json.nDATA) < json.nERROR_SPEC )
            {
                string sql = "update  SCFZ_EQP_PARTS@Rxrept t set " +
                   "t.DATA ='" + json.nDATA +
                   "'where  t.PARTNO ='" + json.nPARTNO + "' and  t.MOUDLE ='" + json.nMOUDLE
                   + "' and  t.PARTS_NAME ='" + json.nPARTS_NAME + "'";


                var robj = DapperHelper.Execute(sql);
            }
            else {
                Console.WriteLine("对错误类型的处理");
            }

            return "sucess";
        }
        public static object GetBPFormList(SpcContext db, QueryBankFormReq json)
        {
            var result = db.SCFZ_EQP_PARTS
                            .FromSqlInterpolated($@" SELECT * FROM SCFZ_EQP_PARTS@Rxrept ")
                            .ToList();
            if (!string.IsNullOrEmpty(json.MOUDLE))
            {
                result = result.Where(e => e.MOUDLE.IndexOf(json.MOUDLE) >= 0).ToList();
            }

            if (!string.IsNullOrEmpty(json.EQPID))
            {
                result = result.Where(e => e.EQPID.IndexOf(json.EQPID) >= 0).ToList();
            }
            if (!string.IsNullOrEmpty(json.LOCATION))
            {
                result = result.Where(e => e.LOCATION.IndexOf(json.LOCATION) >= 0).ToList();
            }

            if (!string.IsNullOrEmpty(json.PARTNO))
            {
                result = result.Where(e => e.PARTNO.IndexOf(json.PARTNO) >= 0).ToList();
            }

            if (!string.IsNullOrEmpty(json.STATUS))
            {
                result = result.Where(e => e.STATUS.IndexOf(json.STATUS) >= 0).ToList();
            }
            if (!string.IsNullOrEmpty(json.DEPARTMENT)) {
                result = result.Where(e => e.DEPARTMENT.IndexOf(json.DEPARTMENT) >= 0).ToList();
            }

            List<SCFZ_EQP_SHOW> list = new List<SCFZ_EQP_SHOW>();


            foreach (var i in result)
            {
                list.Add(AutoCopy(i));
            }


            foreach (var i in list)
            {
                if(i.TYPES=="TIME(天)")
                {
                    i.TIME = Convert.ToDateTime(i.STARTTIME).AddDays(double.Parse(i.LIFE)).ToString();
                    if ((Convert.ToDateTime(i.TIME) - Convert.ToDateTime(i.STARTTIME)).TotalDays < 30)
                    {
                        i.STATUS = "处理";


                    }
                    else
                    {
                        i.STATUS = "健康";
                    }
                }

            }


            return list.OrderBy(e => e.STATUS).ToList();
        }

        /*        private static void Time() {

                    String sBody, sTitle, emailBody;
                    List<String> fsTo = new List<string>();
                    List<String> fs = new List<string>();
                    sBody = " 关键备件报警！";
                    sTitle = "关键备件" + i.PARTNO + "报警";
                    emailBody = "请尽快处理处于" + i.DEPARTMENT + i.LOCATION + "处，料号：" + i.PARTNO + "处于设备" + i.EQPID + "备件告急！请尽快处理！！";
                    fsTo.Add("liuhai82@rxgz.crmicro.com");

                    var robj = EmailHelper.SendEmail(fsTo, fs, ServerConfig.GetString("emailUsername"), ServerConfig.GetString("emailPassword"), sBody, sTitle, emailBody);

                }*/
        private static SCFZ_EQP_SHOW AutoCopy(SCFZ_EQP_PARTS parent)
        {
            SCFZ_EQP_SHOW child = new SCFZ_EQP_SHOW();


            var ParentType = typeof(SCFZ_EQP_PARTS);


            var Properties = ParentType.GetProperties();


            foreach (var Propertie in Properties)
            {
                if (Propertie.CanRead && Propertie.CanWrite)
                {
                    Propertie.SetValue(child, Propertie.GetValue(parent, null), null);
                }
            }


            return child;
        }

        public static object addEqpPart(SpcContext db, SaveEqpParts json)
        {
            string sql = "insert into SCFZ_EQP_PARTS@Rxrept(MOUDLE,EQPID,TYPES,LOCATION,PARTNO,STARTTIME,LIFE,DESCRIPTION,DEPARTMENT,ERROR_SPEC,WARN_SPEC,PARTS_NAME,STATUS) VALUES      " +
                 "       ('" + json.MOUDLE + "','" + json.EQPID + "','" + json.TYPES + "','" + json.LOCATION + "','" + json.PARTNO + "','" + DateTime.Now + "','" + json.LIFE + "','" + json.DESCRIPTION + "','" + json.DEPARTMENT + "','" + json.ERROR_SPEC + "','" + json.WARN_SPEC + "','" + json.PARTS_NAME + "','健康' )";
            var robj = DapperHelper.Execute(sql);
            return "success";
        }

        public static object upEqpParts(SpcContext db, UpdateEqpParts json)
        {
            string sql = "update  SCFZ_EQP_PARTS@Rxrept t set " +
                "PARTNO ='" + json.nPARTNO + "'," +
                "MOUDLE ='" + json.nMOUDLE + "',EQPID ='" + json.nEQPID + "',TYPES='" + json.nTYPES +
                "',LOCATION = '" + json.nLOCATION + "',LIFE = '" + json.nLIFE +
                "',DEPARTMENT = '" + json.nDEPARTMENT + "',DESCRIPTION ='" + json.nDESCRIPTION +
                "',ERROR_SPEC = '" + json.nERROR_SPEC + "',WARN_SPEC ='" + json.nWARN_SPEC +
                 "',PARTS_NAME = '" + json.nPARTS_NAME +
                "'where  t.PARTNO ='" + json.nPARTNO + "' and  t.MOUDLE ='" + json.nMOUDLE
                + "' and  t.PARTS_NAME ='" + json.nPARTS_NAME + "'";


            var robj = DapperHelper.Execute(sql);
            return "success";

        }

        public static object deleteEqp(SpcContext db, delete json)
        {
            string sql = "delete  SCFZ_EQP_PARTS@Rxrept t  where  t.PARTNO='" + json.PARTNO + "'";
            var robj = DapperHelper.Execute(sql);
            return "success";
        }
    }
}
