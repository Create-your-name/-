using Arch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPCService
{
    public class SettingID
    {

    }

    public class AppSettings
    {
        public bool DatetimeOverride => ServerConfig.GetBool("datetimeOverride");


        public static void LoadAll()
        {
        }

        public static void OnUpdate(string setting)
        {
            try
            {

            }
            catch(Exception e)
            {
                Log.Error(e);
            }
        }
    }
}
