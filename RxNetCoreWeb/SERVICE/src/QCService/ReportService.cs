using Microsoft.AspNetCore.JsonPatch.Operations;
using Protocol;
using SPCService.Database;
using SPCService.Helper;
using SPCService.src.Database.Entity.EQP;
using SPCService.src.Database.Entity.REPORT;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;

namespace SPCService.src.QCService
{
    public class ReportService
    {
        public static object eqpQuery1(SpcContext db, EqpQueryReq json)
        {
            string sql = "select equipmentname, state, to_char(to_date(substr(time,1,15),'YYYYMMDD HH24MISS'),'YYYY/MM/DD HH24:MI:SS') " +
"statustime, round((sysdate - to_date(substr(time, 1, 15), 'YYYYMMDD HH24MISS')) * 24, 2) ptime, eqptype, reasoncode " +
"from fweqpcurrentstate where equipmentname = '" + json.EQPID + "'";
            var robj = DapperHelper.Query<EqpQuery1>(sql);
            return robj;
        }

        public static object eqpQuery2(SpcContext db, EqpQueryReq json)
        {
            string sql = "select lotid,'RUN' ptype,runtime,spt,null waittime,qty, queuetime,priority,productname,planname,stage,step,stepdesc,processtype,lotowner,planinvdate,planoutdate " +
" ,null avaeqpid from v_eqp_eqpquery0@RXREPT where avaeqpid = '" + json.EQPID + "'" +
" union all select lotid,'WAIT' ptype,null runtime,null spt,waittime,qty,queuetime,priority," +
" productname,planname,stage,step,stepdesc,processtype,lotowner,planinvdate,planoutdate, avaeqpid from v_eqp_eqpquery1@RXREPT where avaeqpid like '%" + json.EQPID + "%'";
            var robj = DapperHelper.Query<EqpQuery2>(sql);
            return robj;
        }

        public static object eqpQcQuery(SpcContext db)
        {
            string sql = "select t.eqpid ,max(t.flag) as result from  (select  eqpid, decode(( cstatus || HASF),'ActiveN',1,'QCN',2,'QCY',3) as flag  from cust_qc_list  ) t  group by eqpid";
            var robj = DapperHelper.Query<EqpQcQuery>(sql);
            return robj;
        }

        public static object getBStageMap(SpcContext db)
        {
            string sql = "select * from B_STAGE_MAP@rxrep2";
            var robj = DapperHelper.Query<BStageMap>(sql);
            return robj;
        }

        public static object addBStageMap(SpcContext db, BStageMap json)
        {
            string sql = "insert into B_STAGE_MAP@rxrep2 values ('" + json.STAGE + "','" + json.REPSTAGE + "','" + json.PRODSTAGE + "','" + json.REPSTAGE_SORT + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delBStageMap(SpcContext db, BStageMap json)
        {
            string sql = "insert into B_STAGE_MAP_HIS@rxrep2 select A.*,sysdate as TIMESTAMP from B_STAGE_MAP@rxrep2 A where A.STAGE =  '" + json.STAGE + "'";
            DapperHelper.Execute(sql);
            sql = "delete from B_STAGE_MAP@rxrep2 where STAGE = '" + json.STAGE + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getBRepstage(SpcContext db)
        {
            string sql = "select * from B_REPSTAGE@rxrep2";
            var robj = DapperHelper.Query<BRepstage>(sql);
            return robj;
        }

        public static object addBRepstage(SpcContext db, BRepstage json)
        {
            string sql = "insert into B_REPSTAGE@rxrep2 values ('" + json.REPSTAGE + "','" + json.SORTNUM + "','" + json.DESCRIPTION + "','" + json.STAGE_LABEL + "','" + json.CLASS1 + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delBRepstage(SpcContext db, BRepstage json)
        {
            string sql = "insert into B_REPSTAGE_HIS@rxrep2 select A.*,sysdate as TIMESTAMP from B_REPSTAGE@rxrep2 A where A.REPSTAGE =  '" + json.REPSTAGE + "'";
            DapperHelper.Execute(sql);
            sql = "delete from B_REPSTAGE@rxrep2 where REPSTAGE = '" + json.REPSTAGE + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getRandyEpmTar(SpcContext db)
        {
            string sql = "select * from RANDY_EPM_TAR@rxrept";
            var robj = DapperHelper.Query<RandyEpmTar>(sql);
            return robj;
        }

        public static object addRandyEpmTar(SpcContext db, RandyEpmTar json)
        {
            string sql = "insert into RANDY_EPM_TAR@rxrept values ('" + json.PTYPE + "','" + json.MP + "','" + json.DAY1 + "','" + json.DAY2 + "','" + json.DAY3 + "','" + json.DAY4 + "','" + json.DAY5 + "','" + json.DAY6
                + "','" + json.DAY7 + "','" + json.DAY8 + "','" + json.DAY9 + "','" + json.DAY10 + "','" + json.DAY11 + "','" + json.DAY12 + "','" + json.DAY13 + "','" + json.DAY14 + "','" + json.DAY15 + "','" + json.DAY16
                + "','" + json.DAY17 + "','" + json.DAY18 + "','" + json.DAY19 + "','" + json.DAY20 + "','" + json.DAY21 + "','" + json.DAY22 + "','" + json.DAY23 + "','" + json.DAY24 + "','" + json.DAY25 + "','" + json.DAY26
                + "','" + json.DAY27 + "','" + json.DAY28 + "','" + json.DAY29 + "','" + json.DAY30 + "','" + json.DAY31 + "',sysdate)";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object updateRandyEpmTar(SpcContext db, RandyEpmTar json)
        {
            string sql = "insert into RANDY_EPM_TAR_HIS@rxrept select A.*,'UPDATE' as TYPE,sysdate as TIMESTAMP from RANDY_EPM_TAR@rxrept A where A.PTYPE =  '" + json.PTYPE + "'";
            DapperHelper.Execute(sql);
            sql = "update RANDY_EPM_TAR@rxrept set MP ='" + json.MP + "',DAY1='" + json.DAY1 + "',DAY2='" + json.DAY2 + "',DAY3='" + json.DAY3 + "',DAY4='" + json.DAY4 + "',DAY5='" + json.DAY5 + "',DAY6='" + json.DAY6
                + "',DAY7='" + json.DAY7 + "',DAY8='" + json.DAY8 + "',DAY9='" + json.DAY9 + "',DAY10='" + json.DAY10 + "',DAY11='" + json.DAY11 + "',DAY12='" + json.DAY12 + "',DAY13='" + json.DAY13 + "',DAY14='" + json.DAY14 + "',DAY15='" + json.DAY15 + "',DAY16='" + json.DAY16
                + "',DAY17='" + json.DAY17 + "',DAY18='" + json.DAY18 + "',DAY19='" + json.DAY19 + "',DAY20='" + json.DAY20 + "',DAY21='" + json.DAY21 + "',DAY22='" + json.DAY22 + "',DAY23='" + json.DAY23 + "',DAY24='" + json.DAY24 + "',DAY25='" + json.DAY25 + "',DAY26='" + json.DAY26
                + "',DAY27='" + json.DAY27 + "',DAY28='" + json.DAY28 + "',DAY29='" + json.DAY29 + "',DAY30='" + json.DAY30 + "',DAY31='" + json.DAY31 + "' where PTYPE='" + json.PTYPE + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delRandyEpmTar(SpcContext db, RandyEpmTar json)
        {
            string sql = "insert into RANDY_EPM_TAR_HIS@rxrept select A.*,'DELETE' as TYPE,sysdate as TIMESTAMP from RANDY_EPM_TAR@rxrept A where A.PTYPE =  '" + json.PTYPE + "'";
            DapperHelper.Execute(sql);
            sql = "delete from RANDY_EPM_TAR@rxrept where PTYPE = '" + json.PTYPE + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getWtTargetIndex(SpcContext db)
        {
            string sql = "select * from WT_TARGET_INDEX@rxrept";
            var robj = DapperHelper.Query<WtTargetIndex>(sql);
            return robj;
        }

        public static object addWtTargetIndex(SpcContext db, WtTargetIndex json)
        {
            string sql = "insert into WT_TARGET_INDEX@rxrept values ('" + json.NY + "','" + json.PMOBJECT + "','" + json.PMITEM + "','" + json.TARGET + "','" + json.PMDESC + "','" + json.TARGET2 + "','" + json.TARGET3 + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delWtTargetIndex(SpcContext db, WtTargetIndex json)
        {
            string sql = "insert into WT_TARGET_INDEX_HIS@rxrept select A.*,sysdate as TIMESTAMP from WT_TARGET_INDEX@rxrept A where A.NY||A.PMOBJECT||A.PMITEM =  '" + json.NY + json.PMOBJECT + json.PMITEM + "'";
            DapperHelper.Execute(sql);
            sql = "delete from WT_TARGET_INDEX@rxrept where NY||PMOBJECT||PMITEM =  '" + json.NY + json.PMOBJECT + json.PMITEM + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getCustProductSetting(SpcContext db)
        {
            string sql = "select * from CUST_PRODUCT_SETTING";
            var robj = DapperHelper.Query<CustProductSetting>(sql);
            return robj;
        }

        public static object addCustProductSetting(SpcContext db, CustProductSetting json)
        {
            string sql = "insert into CUST_PRODUCT_SETTING values ('" + json.PRODUCT + "','" + json.WAFERTYPE + "','" + json.ISBE + "','" + json.BEPRODUCTNAME + "','" + json.SREMARK + "','"
                + json.PROCESSCODE + "','" + json.PROCESSTYPE + "','" + json.PROCESSGROUP + "','" + json.MOTHERPART + "','" + json.WBFLAG + "','" + json.DIENUM + "','" + json.OWNER +
                "','" + json.MODULE + "','" + json.QACONTROL + "','" + json.PRODSTATUS + "','" + json.COMMENTS + "','" + json.CUSCODE + "','" + json.CUSPROD +
                "','" + json.THICKFILM + "','" + json.PHOTOS + "','" + json.STATUS + "',sysdate,'" + json.CUSNO + "','" + json.QUENAME +
                "','" + json.PROCESSTECH + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delCustProductSetting(SpcContext db, CustProductSetting json)
        {
            string sql = "insert into CUST_PRODUCT_SETTING_HIS select A.*,sysdate as TIMESTAMP from CUST_PRODUCT_SETTING A where A.PRODUCT =  '" + json.PRODUCT + "'";
            DapperHelper.Execute(sql);
            sql = "delete from CUST_PRODUCT_SETTING where PRODUCT =  '" + json.PRODUCT + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getBCapagroup(SpcContext db)
        {
            string sql = "select * from B_CAPAGROUP@rxrep2";
            var robj = DapperHelper.Query<BCapagroup>(sql);
            return robj;
        }

        public static object addBCapagroup(SpcContext db, BCapagroup json)
        {
            string sql = "insert into B_CAPAGROUP@rxrep2 values ('" + json.CAPA_GROUP + "','" + json.DESCRIPTION + "','" + json.SORTNUM + "','" + json.CLASS1 + "','" + json.KEYCAPA + "','"
                + json.FORE_KEY + "','" + json.MODULE + "','" + json.SORTNUM1 + "','" + json.CLASS2 + "','" + json.CLASS3 + "','" + json.CLASS4 + "','" + json.XIANSHI_NUMBER +
                "','" + json.CONTINUUM + "','" + json.TARGET + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delBCapagroup(SpcContext db, BCapagroup json)
        {
            string sql = "insert into B_CAPAGROUP_HIS@rxrep2 select A.*,sysdate as TIMESTAMP from B_CAPAGROUP@rxrep2 A where A.CAPA_GROUP =  '" + json.CAPA_GROUP + "'";
            DapperHelper.Execute(sql);
            sql = "delete from B_CAPAGROUP@rxrep2 where CAPA_GROUP =  '" + json.CAPA_GROUP + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getBCapagroupMap(SpcContext db)
        {
            string sql = "select * from B_CAPAGROUP_MAP@rxrep2";
            var robj = DapperHelper.Query<BCapagroupMap>(sql);
            return robj;
        }

        public static object addBCapagroupMap(SpcContext db, BCapagroupMap json)
        {
            string sql = "insert into B_CAPAGROUP_MAP@rxrep2 values ('" + json.RECPNAME + "','" + json.RECPDESC + "','" + json.MODULE + "','" + json.CAPABILITY + "','" + json.CAPA_GROUP + "','"
                + json.EQPID + "','" + json.SORTNUM + "','" + json.CAPA_TYPE + "','" + json.UPDATED_DATE + "','" + json.SCT + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delBCapagroupMap(SpcContext db, BCapagroupMap json)
        {
            string sql = "insert into B_CAPAGROUP_MAP_HIS@rxrep2 select A.*,sysdate as TIMESTAMP from B_CAPAGROUP_MAP@rxrep2 A where A.RECPNAME =  '" + json.RECPNAME + "'";
            DapperHelper.Execute(sql);
            sql = "delete from B_CAPAGROUP_MAP@rxrep2 where RECPNAME =  '" + json.RECPNAME + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getBCapagroupType(SpcContext db)
        {
            string sql = "select * from B_CAPAGROUP_TYPE@rxrep2";
            var robj = DapperHelper.Query<BCapagroupType>(sql);
            return robj;
        }

        public static object addBCapagroupType(SpcContext db, BCapagroupType json)
        {
            string sql = "insert into B_CAPAGROUP_TYPE@rxrep2 values ('" + json.CAPA_GROUP + "','" + json.CAPAGROUPTYPE + "','" + json.MODULE + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delBCapagroupType(SpcContext db, BCapagroupType json)
        {
            string sql = "insert into B_CAPAGROUP_TYPE_HIS@rxrep2 select A.*,sysdate as TIMESTAMP from B_CAPAGROUP_TYPE@rxrep2 A where A.CAPA_GROUP||A.CAPAGROUPTYPE =  '" + json.CAPA_GROUP + json.CAPAGROUPTYPE + "'";
            DapperHelper.Execute(sql);
            sql = "delete from B_CAPAGROUP_TYPE@rxrep2 where CAPA_GROUP||CAPAGROUPTYPE =  '" + json.CAPA_GROUP + json.CAPAGROUPTYPE + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object getBCapagroupMove(SpcContext db)
        {
            string sql = "select * from B_CAPAGROUP_MOVE@rxrep2";
            var robj = DapperHelper.Query<BCapagroupMove>(sql);
            return robj;
        }

        public static object addBCapagroupMove(SpcContext db, BCapagroupMove json)
        {
            string sql = "insert into B_CAPAGROUP_MOVE@rxrep2 values ('" + json.CAPAGROUP + "','" + json.EQUIPID + "','" + json.ISKEY + "')";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }

        public static object delBCapagroupMove(SpcContext db, BCapagroupMove json)
        {
            string sql = "insert into B_CAPAGROUP_MOVE_HIS@rxrep2 select A.*,sysdate as TIMESTAMP from B_CAPAGROUP_MOVE@rxrep2 A where A.CAPAGROUP||A.EQUIPID =  '" + json.CAPAGROUP + json.EQUIPID + "'";
            DapperHelper.Execute(sql);
            sql = "delete from B_CAPAGROUP_MOVE@rxrep2 where CAPAGROUP||EQUIPID =  '" + json.CAPAGROUP + json.EQUIPID + "'";
            var robj = DapperHelper.Execute(sql);
            return robj;
        }
    }
}
