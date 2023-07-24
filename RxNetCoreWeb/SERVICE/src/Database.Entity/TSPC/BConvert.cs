using Arch;
using SPCService.Database;
using System;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace SPCService.BusinessModel
{
    [AttributeUsage(AttributeTargets.Field | AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public sealed class SpcDbFieldAttribute : Attribute
    {
        public string Name { get; }
        public bool IsDeep { get; }
        public bool IsArray { get; }
        public string DestColumn { get; }
        public SpcDbFieldAttribute(string sValue, bool isdeep = false, bool isArray = false, string destColumn = "")
        {
            Name = sValue;
            IsDeep = isdeep;
            IsArray = isArray;
            DestColumn = destColumn;
        }
    }

    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public sealed class SpcDeepDbFieldAttribute : Attribute
    {
        public string ObjectSysid { get; }
        public SpcDeepDbFieldAttribute(string sValue)
        {
            ObjectSysid = sValue;
        }
    }
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public sealed class SpcN2MListAttribute : Attribute
    {
        public string LinkName { get; }
        public string N2mTable { get; }
        public Type DestType { get; }
        public SpcN2MListAttribute(string linkName, string n2mTable, Type destType)
        {
            LinkName = linkName;
            N2mTable = n2mTable;
            DestType = destType;
        }
    }
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = false)]
    public sealed class SpcIsDeepFieldAttribute : Attribute
    {
        public bool IsDeep { get; }
        public SpcIsDeepFieldAttribute(bool sValue)
        {
            IsDeep = sValue;
        }
    }
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = false)]
    public sealed class SpcDbTableNameAttribute : Attribute
    {
        public string TableName { get; }
        public SpcDbTableNameAttribute(string sValue)
        {
            TableName = sValue;
        }
    }

    public class BConvert
    {
        /// <summary>
        /// 数据库实体转 BusinessModel
        /// </summary>
        /// <typeparam name="T">BusinessModel类星星</typeparam>
        /// <param name="entity">数据库实体</param>
        /// <returns></returns>

        public static T EntityToTedc<T>(object entity, bool pfFlag)
        {
            //动态实例化对象
            T tedcObj = Activator.CreateInstance<T>();
            foreach (PropertyInfo tedcProperty in typeof(T).GetProperties())
            {
                if (TryGetAttribute<SpcDbFieldAttribute>(tedcProperty, out var dbFieldAttr))
                {
                    string entityField = string.IsNullOrEmpty(dbFieldAttr.Name) ? tedcProperty.Name : dbFieldAttr.Name;

                    PropertyInfo entityProperty = entity.GetType().GetProperty(entityField);

                    if (entityProperty == null)
                        continue;

                    //浅拷贝
                    if (!dbFieldAttr.IsDeep)
                    {
                        CopyValueEntityToTedc(entity, entityProperty, tedcObj, tedcProperty);
                    }
                    else
                    {
                        if (pfFlag)
                        {
                            //深拷贝
                            string colName = "";
                            if (StringUtil.NullString(dbFieldAttr.DestColumn))
                            {
                                colName = "SYSID";
                            }
                            else
                            {
                                colName = dbFieldAttr.DestColumn;
                            }
                            var sysId = entityProperty.GetValue(entity);
                            if (sysId !=null  &&  sysId.ToString() != "00000000.00000000.00000000.00000000.0")
                            {

                                string whereClause = $"{colName} ='{sysId}'";
                                //SpcDBObject.fetchWhere<>

                                IList objList = SpcDBObject.fetchWhereWithType(whereClause,pfFlag, tedcProperty.PropertyType);
                                if (objList != null && objList.Count > 0)
                                {
                                    if (dbFieldAttr.IsArray)
                                        tedcProperty.SetValue(tedcObj, objList); //LIST
                                    else
                                        tedcProperty.SetValue(tedcObj, objList[0]);
                                }
                            }
                        }

                    }
                }
                else if (TryGetAttribute<SpcN2MListAttribute>(tedcProperty, out var n2mAttr))
                {
                    if (pfFlag)
                    {
                        var sysIdProperty = entity.GetType().GetProperty("SYSID");
                        var sysId = (string)sysIdProperty.GetValue(entity);

                        var whereClause = $"SYSID in (select TOID from {n2mAttr.N2mTable} where FROMID = '{sysId}' and LINKNAME = '{n2mAttr.LinkName}')";

                        IList objList = SpcDBObject.fetchWhereWithType(whereClause,
                           pfFlag, n2mAttr.DestType);

                        if (objList != null && objList.Count > 0)
                            tedcProperty.SetValue(tedcObj, objList);
                    }
                }


                //判断是否是相同属性

            }
            return tedcObj;
        }

        public static E TedcToEntity<E>(object tedcModel)
        {
            E entity = Activator.CreateInstance<E>();

            foreach (PropertyInfo tedcProperty in tedcModel.GetType().GetProperties())
            {
                if (TryGetAttribute<SpcDbFieldAttribute>(tedcProperty, out var dbFieldAttr))
                {
                    string fieldName = string.IsNullOrEmpty(dbFieldAttr.Name) ? tedcProperty.Name : dbFieldAttr.Name;
                    var entityProperty = entity.GetType().GetProperty(fieldName);

                    if (!dbFieldAttr.IsDeep)
                    {
                        CopyValueTedcToEntity(tedcModel, tedcProperty, entity, entityProperty);
                    }
                    else
                    {
                        var tedcValue = tedcProperty.GetValue(tedcModel);

                        if (tedcValue == null)
                            continue;

                        var helper = new SpcDBObject();
                        if (dbFieldAttr.IsArray)
                        {
                            IList tedcList = (IList)tedcValue;
                            foreach (var tedcObj in tedcList)
                            {
                                //转dynamic强制满足 函数的where约束
                                helper.TrySaveObject((dynamic)tedcObj);
                            }
                        }
                        else
                        {
                            //转dynamic强制满足 函数的where约束
                            helper.TrySaveObject((dynamic)tedcValue);
                        }
                    }
                }
            }

            return entity;
        }

        public static void CopyValueEntityToTedc(object entity, PropertyInfo entityProperty, object tedcObj, PropertyInfo tedcProperty)
        {
            if (tedcProperty.PropertyType.Name == "Boolean")
            {
                var value = entityProperty.GetValue(entity);
                bool bValue = ((value.Equals("T") ? true : false));
                tedcProperty.SetValue(tedcObj, bValue);

            }
            else if (tedcProperty.PropertyType.Name == "DateTime")
            {
                var value = entityProperty.GetValue(entity);
                tedcProperty.SetValue(tedcObj, TimeUtil.ParseSPC(value.ToString()));
            }
            else
            {
                //赋值
                var value = entityProperty.GetValue(entity);
                tedcProperty.SetValue(tedcObj, value);
            }
        }

        public static void CopyValueTedcToEntity(object tedcModel, PropertyInfo tedcProperty, object entity, PropertyInfo entityProperty)
        {
            var tedcValue = tedcProperty.GetValue(tedcModel);

            if (tedcProperty.PropertyType.Name == "Boolean")
            {
                var boolValue = tedcValue as bool?;
                entityProperty.SetValue(entity, boolValue == true ? "T" : "F");

            }
            else if (tedcProperty.PropertyType.Name == "DateTime")
            {
                var value = tedcValue as DateTime?;
                var str = TimeUtil.GetSPCTime(value.Value);
                entityProperty.SetValue(entity, str);
            }
            else
            {
                //赋值
                entityProperty.SetValue(entity, tedcValue);
            }
        }

        public static object TedcToEntityType(Type entityType, object tedcModel)
        {
            return ReflectUtils.MakeStaticGenericMethod(typeof(BConvert),
                nameof(BConvert.TedcToEntity),
                entityType,
                new object[] { tedcModel });
        }

        public static bool TryGetAttribute<T>(PropertyInfo property, out T pp) where T : Attribute
        {
            if (!property.IsDefined(typeof(T), false))
            {
                pp = null;
                return false;
            }

            T destAttr = (T)property.GetCustomAttribute(typeof(T), false);
            pp = destAttr;
            return true;
        }
    }

    //public class ExpressionGenericMapper<TIn, TOut>//Mapper`2 //正对于每两个不同类型的组合都会生成副本
    //{
    //    private static Func<TIn, TOut> _FUNC = null;// 在每个副本中都有一个委托
    //    static ExpressionGenericMapper() //静态构造函数 生成表达式目录树 
    //    {
    //        ParameterExpression parameterExpression = Expression.Parameter(typeof(TIn), "p");
    //        List<MemberBinding> memberBindingList = new List<MemberBinding>();
    //        foreach (var item in typeof(TOut).GetProperties())
    //        {
    //            MemberExpression property = Expression.Property(parameterExpression, typeof(TIn).GetProperty(item.Name));
    //            MemberBinding memberBinding = Expression.Bind(item, property);
    //            memberBindingList.Add(memberBinding);
    //        }
    //        foreach (var item in typeof(TOut).GetFields())
    //        {
    //            MemberExpression property = Expression.Field(parameterExpression, typeof(TIn).GetField(item.Name));
    //            MemberBinding memberBinding = Expression.Bind(item, property);
    //            memberBindingList.Add(memberBinding);
    //        }
    //        MemberInitExpression memberInitExpression = Expression.MemberInit(Expression.New(typeof(TOut)), memberBindingList.ToArray());
    //        Expression<Func<TIn, TOut>> lambda = Expression.Lambda<Func<TIn, TOut>>(memberInitExpression, new ParameterExpression[]
    //        {
    //                parameterExpression
    //        });
    //        _FUNC = lambda.Compile();//拼装是一次性的   转换成委托以后放入副本的静态变量中去
    //    }
    //    public static TOut Trans(TIn t) // 直接获取副本的静态变量（委托）
    //    {
    //        return _FUNC(t);
    //    }
    //} 
}
