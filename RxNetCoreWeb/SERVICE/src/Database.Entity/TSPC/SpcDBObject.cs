using Oracle.ManagedDataAccess.Client;
using SPCService.Database;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;
using System.ComponentModel.DataAnnotations.Schema;
using SPCService.Helper;
using System.Collections;
using Arch;
using Microsoft.EntityFrameworkCore;

namespace SPCService.BusinessModel
{
    public class SpcDBObject
    {

        public bool deleted { get; set; }
        public bool dirty { get; set; }


        public void markDirty()
        {
            dirty = true;
        }

        public void markDeleted()
        {
            deleted = true;
        }
        public void AssignValue<T>(T dest, T source) where T : SpcDBObject
        {
            foreach (PropertyInfo info in typeof(T).GetProperties())
            {

                info.SetValue(dest, info.GetValue(source));
            }
        }
        public static List<TN2M> fetchN2Mwhere<T>(string n2mWhereClause, string linkname, List<OracleParameter> n2mDataSet)
        {
            return new List<TN2M>();
        }
        public static List<T> fetchWhere<T>(string whereClause,
        Dictionary<string, string> joinSet, List<OracleParameter> dataSet, bool pfFlag, bool flag, string ftype) where T : SpcDBObject
        {
            var whereSql = whereClause;
            foreach (var p in dataSet)
            {
                if (p.Value is string)
                {
                    whereSql = whereSql.Replace(p.ParameterName, $"'{p.Value.ToString()}'");
                }
                else
                {
                    whereSql = whereSql.Replace(p.ParameterName, p.Value.ToString());
                }

            }
            return fetchWhereBase<T>(whereSql, pfFlag);
        }


        public static List<string> fetchRefsWithAppId<T>(string whereClause,
        List<OracleParameter> dataSet) where T : SpcDBObject
        {
            var whereSql = whereClause;
            foreach (var p in dataSet)
            {
                if (p.Value is string)
                {
                    whereSql = whereSql.Replace(p.ParameterName, $"'{p.Value.ToString()}'");
                }
                else
                {
                    whereSql = whereSql.Replace(p.ParameterName, p.Value.ToString());
                }

            }
            return fetchRefsWithAppId<T>(whereSql);



        }
        public static List<string> fetchRefsWithAppId<T>(string whereClause) where T : SpcDBObject
        {
            List<T> result = fetchWhereBase<T>(whereClause, true);

            List<string> lsysid = new List<string>();
            foreach (T t in result)
            {

                foreach (PropertyInfo info in typeof(T).GetProperties())
                {
                    if (info.Name.ToUpper() == "NAME")
                    {
                        PropertyInfo pro = t.GetType().GetProperty(info.Name);

                        lsysid.Add(pro.GetValue(t).ToString());
                    }
                }
            }
            return lsysid;
        }

        public static List<T> fetchWhere<T>(string whereClause, List<OracleParameter> dataSet, bool pfFlag) where T : SpcDBObject
        {
            var whereSql = whereClause;
            foreach (var p in dataSet)
            {
                if (p.Value is string)
                {
                    whereSql = whereSql.Replace(p.ParameterName, $"'{p.Value.ToString()}'");
                }
                else
                {
                    whereSql = whereSql.Replace(p.ParameterName, p.Value.ToString());
                }

            }
            return fetchWhereBase<T>(whereSql, pfFlag);
        }
        public static List<T> fetchWhere<T>(string whereClause, List<OracleParameter> dataSet, bool pfFlag, bool sFlag) where T : SpcDBObject
        {
            var whereSql = whereClause;
            foreach (var p in dataSet)
            {
                if (sFlag)
                {
                    if (p.Value is string)
                    {
                        whereSql = whereSql.Replace(p.ParameterName, $"'{p.Value.ToString()}'");
                    }
                    else
                    {
                        whereSql = whereSql.Replace(p.ParameterName, p.Value.ToString());
                    }
                }
                else
                {
                    whereSql = whereSql.Replace(p.ParameterName, p.Value.ToString());
                }

            }
            return fetchWhereBase<T>(whereSql, pfFlag);
        }
        //public static List<T> fetchWhere<T>(string whereClause, List<OracleParameter> dataSet, bool pfFlag) where T : SpcDBObject
        //{
        //    List<T> result = new List<T>();
        //    var whereSql = whereClause;
        //    foreach (var p in dataSet)
        //    {
        //        if (p.Value is string)
        //        {
        //            whereSql = whereSql.Replace(p.ParameterName, $"'{p.Value.ToString()}'");
        //        }
        //        else
        //        {
        //            whereSql = whereSql.Replace(p.ParameterName, p.Value.ToString());
        //        }

        //    }
        //    return fetchWhereBase<T>(whereSql, pfFlag);

        //}
        private void SaveObject<T>(T obj, bool bModify) where T : SpcDBObject
        {
            //增加save 方法 
            //SpcDbField  isdeep =false 中的字段  反射到 SPC_的object
            //  bModify =true  执行save
            //  bModify =false   执行 Insert
            //  deleted =true 执行删除

            string tableName = GetTedcTableName<T>();
            var entityType = GetEntityByTableName(tableName);

            dynamic entity = BConvert.TedcToEntityType(entityType, obj);

            using var db = new SpcContext();
            //var type = typeof(DbSet<>).MakeGenericType(entityType);
            dynamic dbset = db.GetSetByType(entityType);

            if (bModify)
            {
                dbset.Update(entity);

                //delete
                //dbset.Remove(entity)
            }
            else
            {
                if (StringUtil.NullString(entity.SYSID))
                {
                    entity.SYSID = SPCUtils.GetSysID(typeof(T));
                }
                dbset.Add(entity);
            }

            db.SaveChanges();
        }

        private string TryGetTedcSysId<T>(T obj)
        {
            foreach (var fieldPP in obj.GetType().GetProperties())
            {
                if (fieldPP.IsDefined(typeof(SpcDbFieldAttribute), false))
                {
                    SpcDbFieldAttribute destAttr = (SpcDbFieldAttribute)fieldPP.GetCustomAttribute(typeof(SpcDbFieldAttribute), false);
                    if (!destAttr.IsDeep && destAttr.Name == "SYSID")
                    {
                        return (string)fieldPP.GetValue(obj);
                    }
                }
            }

            return null;
        }

        public void TrySaveObject<T>(T obj) where T : SpcDBObject
        {
            var sysId = TryGetTedcSysId(obj);


            if (string.IsNullOrEmpty(sysId))
            {
                SaveObject(obj, false);
            }
            else
            {
                //sysid查询判断 sysid是否存在
                string tableName = GetTedcTableName<T>();
                var entityType = GetEntityByTableName(tableName);
                var result = DapperHelper.QueryFirstOrDefaultType(entityType,
                    $"select * from {tableName} where SYSID = '{sysId}'");

                SaveObject(obj, result != null);
            }

        }

        public static List<T> fetchWhereBase<T>(string whereClause, bool pfFlag) where T : SpcDBObject
        {

            if (StringUtil.NullString(whereClause))
            {
                whereClause = " 1=1 ";
            }
            var whereSql = whereClause;


            string tableName = GetTedcTableName<T>();
            var sql = $"select * from {tableName} where {whereSql}";
            Log.Trace("net", $"fetchWhere sql -> {sql}");

            //以对应的Entity为参数调用 DapperHelper.Query<T>(sql);
            var entityType = GetEntityByTableName(tableName);
            IList entityList = DapperHelper.QueryType(entityType, sql);

            var resultList = new List<T>();
            foreach (var entity in entityList)
            {
                var tedcObj = BConvert.EntityToTedc<T>(entity, pfFlag);
                resultList.Add(tedcObj);
            }
            //result = List<EntityClass>
            //进行map转换到 List<T>

            return resultList;
        }

        public static IList fetchWhereWithType(string whereClause, bool pfFlag, Type type)
        {
            Type iType = type;

            if (type.IsGenericType)
            {
                iType = type.GetGenericArguments()[0];
            }
            var rlist = ReflectUtils.MakeStaticGenericMethod(typeof(SpcDBObject),
                            nameof(SpcDBObject.fetchWhereBase),
                            iType,
                            new object[] { whereClause, pfFlag });

            return (IList)rlist;
        }

        public static List<T> fetchWhere<T>(string whereClause,
        List<OracleParameter> dataSet, bool pfFlag, bool flag, string ftype) where T : SpcDBObject
        {
            var whereSql = whereClause;
            foreach (var p in dataSet)
            {
                if (p.Value is string)
                {
                    whereSql = whereSql.Replace(p.ParameterName, $"'{p.Value.ToString()}'");
                }
                else
                {
                    whereSql = whereSql.Replace(p.ParameterName, p.Value.ToString());
                }

            }
            return fetchWhereBase<T>(whereSql, pfFlag);

            //T: EDCMeasuerement
            // select* from  SPC_EDCMeasuerement wehre    measurementSpec =:measurementSpec and measurementStep =:measurementStep and datacollection in (select sysId from spc_edcdatacollection where edcPlan =:edcPlan and done = 'T' )
            //dataSet     :measurementSpec DINT07000703         :measurementStep  xxxxx
        }
        public static bool deepFetchMembersOf<T>(ref List<T> col, bool bflag) where T : SpcDBObject
        {
            List<T> result = new List<T>();
            return true;
        }

        public static List<T> fetchMembersOf<T>(bool bflag) where T : SpcDBObject
        {
            List<T> result = new List<T>();
            return result;
        }
        public bool deepFetchObject<T>(bool bflag) where T : SpcDBObject
        {
            
             BConvert.EntityToTedc<T>(this, true );
            
            return true;
        }


        public static string GetTedcTableName<T>()
        {
            try
            {
                var attr = typeof(T).GetCustomAttributes(typeof(SpcDbTableNameAttribute), false)[0] as SpcDbTableNameAttribute;

                return attr.TableName;
            }
            catch (Exception e)
            {
                Log.Error(e);
            }

            return null;
        }

        public static string GetTableName(Type type)
        {
            try
            {
                var attr = type.GetCustomAttributes(typeof(SpcDbTableNameAttribute), false)[0] as SpcDbTableNameAttribute;

                return attr.TableName;
            }
            catch (Exception e)
            {
                Log.Error(e);
            }

            return null;
        }

        public static Type GetEntityByTableName(string tableName)
        {
            try
            {
                var entityType = typeof(Program).Assembly.GetTypes()
                      .Where(t => t.GetCustomAttributes(typeof(TableAttribute), false).Length > 0)
                      .Where(t =>
                      {
                          var attr = t.GetCustomAttributes(typeof(TableAttribute), false)[0] as TableAttribute;
                          return attr.Name == tableName;
                      })
                      .FirstOrDefault();

                return entityType;
            }
            catch (Exception e)
            {
                Log.Error(e);
            }

            return null;
        }

    }
}
