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

namespace SPCService.BusinessModel;

public class TspcManager
{
    private static Dictionary<string, Type> modelDict = new Dictionary<string, Type>();

    public static void CollectModels()
    {
        try
        {
            var modelTypes = typeof(Program).Assembly.GetTypes()
                  .Where(t => t.IsDefined(typeof(SpcDbTableNameAttribute), false))
                  .ToList();

            foreach (var modelType in modelTypes)
            {
                modelDict[modelType.Name.ToLower()] = modelType;
            }
        }
        catch (Exception e)
        {
            Log.Error(e);
        }
    }

    public static Type GetModelType(string name)
    {
        return modelDict.GetValueOrDefault(name.ToLower());
    }
}
