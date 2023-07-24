using System;
using System.Reflection;

namespace Arch;

public class ReflectUtils
{
    public static object MakeStaticGenericMethod(Type helper, string methodName, Type genType, object[] parameters)
    {
        MethodInfo method = helper.GetMethod(methodName);
        MethodInfo generic = method.MakeGenericMethod(genType);
        return generic.Invoke(null, parameters);
    }
}
