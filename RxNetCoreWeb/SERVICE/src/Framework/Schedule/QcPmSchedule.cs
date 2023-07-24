using FluentScheduler;
using Microsoft.EntityFrameworkCore;
using SPCService.Database;
using System;

namespace SPCService.src.Framework.Schedule
{
    public class QcPmSchedule : Registry
    {
        public QcPmSchedule()
        {
            Schedule<QcJob>().ToRunEvery(30).Seconds();
        }
    }

    public class QcJob : IJob
    {
        private SpcContext dbContext = new SpcContext();
        public void Execute()
        {
            int week = Convert.ToInt32(DateTime.Now.DayOfWeek.ToString("d"));
            int day = Convert.ToInt32(DateTime.Now.Day);
            //string sql = "update CUST_QC_LIST set CSTATUS =  'QC'  , PLANDATE  ='" + DateTime.Now.ToString("yyyyMMdd") +
            //      "' where chour = '1' and  (( PLANDATE  is null and  type = '2' and W" + week.ToString() + " = 'Y' ) " +
            //      " or (PLANDATE is null and   type = '3' and (M1 ='" + day.ToString() + "' or M2 ='" + day.ToString() + "' or M3 ='" + day.ToString() + "'))" +
            //      " or (PLANDATE is null )) and LASTCOMPLETEDATE IS NULL OR LASTCOMPLETEDATE <> '" + DateTime.Now.ToString("yyyyMMdd") + "'";
            //string sql3 = "  insert into CUST_trackin_check(eqp_step,info_cue,type1,sysflag,sysid) " +
            //     " select  eqpid, 'QC项目未完成，设备:'|| eqpid || '  QC项目: ' || qcname || '   EDCPlan: ' || edcplan  || '   计划日期：' || plandate ,'EQP','QC',sysid  from" +
            //     "(select * from      CUST_QC_LIST  where cstatus= 'QC' )  where cstatus= 'QC'" +
            //     " and  ((sysdate- to_date( plandate || ' 000000' , 'yyyymmdd hh24Miss') ) * 24) > （QHour+24） " +
            //     " and FORCETRACKIN ='Y' and HASF='N' and plandate is not null";
            //string sql4 = "update CUST_QC_LIST set HASF='Y' where" +
            //     " cstatus= 'QC'  and   decode( plandate , null ,  '0'   ,((sysdate- to_date( plandate || ' 000000' , 'yyyymmdd hh24Miss') ) * 24)   ) > （QHour+24） " +
            //     "  and FORCETRACKIN ='Y' and HASF='N'";
            //dbContext.Database.ExecuteSqlRaw(sql);
            //dbContext.Database.ExecuteSqlRaw(sql3);
            //dbContext.Database.ExecuteSqlRaw(sql4);
//            string sql = "update CUST_EQP_PM_LIST set PMSTATUS =  'PM'  , PLANDATE  ='" + DateTime.Now.ToString("yyyyMMdd") +
//     "' where chour = '1' and  (( PLANDATE  is null and  type = '2' and W" + week.ToString() + " = 'Y' ) " +
//     " or (PLANDATE is null and   type = '3' and (M1 ='" + day.ToString() + "' or M2 ='" + day.ToString() + "' or M3 ='" + day.ToString() + "'))" +
//     " or (PLANDATE is null )) and LASTCOMPLETEDATE IS NULL OR LASTCOMPLETEDATE <> '" + DateTime.Now.ToString("yyyyMMdd") + "'";
//            string sql2 = "update CUST_PM_LIST set PMSTATUS =  'PM'  , PLANDATE  ='" + DateTime.Now.ToString("yyyyMMdd") +
//"' where chour = '1' and  (( PLANDATE  is null and  type = '2' and W" + week.ToString() + " = 'Y' ) " +
//" or (PLANDATE is null and   type = '3' and (M1 ='" + day.ToString() + "' or M2 ='" + day.ToString() + "' or M3 ='" + day.ToString() + "'))" +
//" or (PLANDATE is null )) and LASTCOMPLETEDATE IS NULL OR LASTCOMPLETEDATE <> '" + DateTime.Now.ToString("yyyyMMdd") + "'";
//            string sql3 = "  insert into CUST_trackin_check(eqp_step,info_cue,type1,sysflag,sysid) " +
//                " select  eqpid, 'PM项目未完成，设备:'|| eqpid || '  PM项目: ' || pmname || '  计划日期：' || plandate ,'EQP','PM',sysid  from" +
//                "(select * from      CUST_EQP_PM_LIST  where pmstatus= 'PM' )  where pmstatus= 'PM'" +
//                " and  ((sysdate- to_date( plandate || ' 000000' , 'yyyymmdd hh24Miss') ) * 24) > （QHour+24） " +
//                " and FORCETRACKIN ='Y' and HASF='N' and plandate is not null";
//            string sql4 = "update CUST_EQP_PM_LIST set HASF='Y' where" +
//                " pmstatus= 'PM'  and   decode( plandate , null ,  '0'   ,((sysdate- to_date( plandate || ' 000000' , 'yyyymmdd hh24Miss') ) * 24)   ) > （QHour+24） " +
//                "  and FORCETRACKIN ='Y' and HASF='N'";
//            string sql5 = "update CUST_PM_LIST set HASF='Y' where" +
//    " pmstatus= 'PM'  and   decode( plandate , null ,  '0'   ,((sysdate- to_date( plandate || ' 000000' , 'yyyymmdd hh24Miss') ) * 24)   ) > （QHour+24） " +
//    "  and FORCETRACKIN ='Y' and HASF='N'";
            //dbContext.Database.ExecuteSqlRaw(sql);
            //dbContext.Database.ExecuteSqlRaw(sql2);
            //dbContext.Database.ExecuteSqlRaw(sql3);
            //dbContext.Database.ExecuteSqlRaw(sql4);
            //dbContext.Database.ExecuteSqlRaw(sql5);
            dbContext.SaveChanges();
        }
    }
}
