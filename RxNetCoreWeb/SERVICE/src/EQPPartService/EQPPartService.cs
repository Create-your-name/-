using Microsoft.EntityFrameworkCore;
using SPCService.Database;
using SPCService.DbModel;
using SPCService.src.Database.Entity.SCFZ;
using System;
using Arch;
using System.Collections;
using System.Collections.Generic;
using SPCService.src.Framework.Utils;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading;
using Microsoft.Win32;

namespace SPCService.src.EQPPartService
{
    public class EQPPartService
    {

        public   void TimeFor() {
            //System.Timers.Timer t = new System.Timers.Timer(86400000);
            System.Timers.Timer t = new System.Timers.Timer(60000);
            t.Elapsed += new System.Timers.ElapsedEventHandler(ShowRecv);
            t.AutoReset = true;//设置是执行一次（false）还是一直执行(true)；
            t.Enabled = true;//是否执行System.Timers.Timer.Elapsed事件；
        }

        private static void ShowRecv(object source, System.Timers.ElapsedEventArgs e)
        {
            System.DateTime DT = System.DateTime.Now;

            if (DT.Hour == 7 &&DT.Minute == 30)
            {
                SpcContext db = new SpcContext();
                var result = db.SCFZ_EQP_PARTS
                            .FromSqlInterpolated($@" SELECT * FROM SCFZ_EQP_PARTS@RXREPT ").ToList();
                List<SCFZ_EQP_SHOW> list = new List<SCFZ_EQP_SHOW>();
                foreach (var i in result)
                {
                    list.Add(AutoCopy(i));
                }

                String sBody, sTitle, emailBody="";

                foreach (var i in list)
                {

                    i.TIME = (Convert.ToDateTime(i.STARTTIME).AddDays(Double.Parse(i.LIFE))).ToString();
                    if ((Convert.ToDateTime(i.TIME) - Convert.ToDateTime(i.STARTTIME)).TotalDays < 30  || int.Parse(i.DATA) >  int.Parse(i.WARN_SPEC) )
                    {
                        i.STATUS = "处理";
                        emailBody  += "请尽快处理处于" + i.DEPARTMENT + i.LOCATION + "处，料号：" + i.PARTNO + "处于设备" + i.EQPID + "备件告急！请尽快处理！！\n";
                    }
                }


                List<String> fsTo = new List<string>();
                List<String> fs = new List<string>();
                sBody = " 关键备件报警！";
                sTitle = "生产辅助系统关键备件报表报警";
                fsTo.Add("huangf448@csmc.crmicro.com");
                fsTo.Add("liuhai82@rxgz.crmicro.com");
                fsTo.Add("jiangmeiyuan@rxgz.crmicro.com");
                fsTo.Add("zhangzhenglu1@crmicro.com");
                Console.WriteLine("发送邮件");
                var robj = EmailHelper.SendEmail(fsTo, fs, ServerConfig.GetString("emailUsername"), ServerConfig.GetString("emailPassword"), sBody, sTitle, emailBody);
            }
            else {
                Console.WriteLine("将案件结案");
            }
        }
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

    }
}
