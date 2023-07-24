using Arch;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
namespace SPCService.BusinessModel
{
    public static class SPCUtils
    {
        public static Type classIdOf(string sysid)
        {
            string clsid = sysid.Substring(0, sysid.IndexOf("."));
            string clsstype = "";
            foreach (var item in DicType)
            {
                if (item.Value == clsid)
                {
                    clsstype = item.Key;
                    break;
                }
            }
            if (clsstype != "")
            {
                return AppDomain.CurrentDomain
      .GetAssemblies()
      .SelectMany(x => x.GetTypes())
      .FirstOrDefault(t => t.Name == clsstype);



            }
            else
            {
                return null;
            }
        }
        private static int iObjId = 1;
        public static Dictionary<string, string> DicType = new Dictionary<string, string>()
        {
            ["FwIDELog"] = "00001001",
            //PRP  
            ["TEdcAnnotation"] = "00001c28",

            ["TEdcChart"] = "00001c0d",

            ["TEdcChartParameter"] = "00001c10",

            ["TEdcCharttemplate"] = "00001c0a",
            ["TEdcDataCollection"] = "00001c1f",
            ["TEdcDataPoint"] = "00001c25",
            ["TEdcDataPointHistory"] = "00001c1c",
            ["TEdcDerivation"] = "00001c16",

            ["TEdcMeasurement"] = "00001c22",

            ["TEdcMeasurementSpec"] = "00001c07",
            ["TEdcPlan"] = "00001c01",

            ["TEdcPlanVersion"] = "00001c04",
            ["TEdcSamplingPlan"] = "00001c13",
             
            ["TEdcSpcCustomRule"] = "00001c6c",
            ["TEdcSpcSystemRule"] = "00001c6d",

            ["SPC_LOG"] = "00001c7d",

            ["SPC_CATAGORY"] = "00001c80",
        };
        public static string GetSysID(Type type)
        {
            string myObjClassId = GetObjID(type).ToLower();
            string myObjHostId = GetLocalIPHex().ToLower();
            string myObjTime = GetObjTime().ToLower();
            string myObjPid = GetProcessID();
            string myObjId = iObjId.ToString();
            iObjId = iObjId + 1;
            return myObjClassId + "." + myObjHostId + "." + myObjTime + "." + myObjPid + "." + myObjId;
        }

        public static string GetObjID(Type type)
        {
            string val = "";
            bool b = DicType.TryGetValue(type.Name.ToString(), out val);
            return val;
        }
        public static string GetObjTime()
        {
            return TimeUtil.GetSecondTimeStamp().ToString("X").ToLower();
        }
        public static IPAddress GetLocalIp()
        {
            IPAddress AddressIP = IPAddress.None;
            foreach (IPAddress _IPAddress in Dns.GetHostEntry(Dns.GetHostName()).AddressList)
            {
                if (_IPAddress.AddressFamily.ToString() == "InterNetwork")
                {
                    AddressIP = _IPAddress;
                }
            }
            return AddressIP;
        }
        public static string GetProcessID()
        {
            return Process.GetCurrentProcess().Id.ToString("X8").ToLower();
        }
        public static string GetLocalIPHex()
        {
            return Bytes.ToHexString(GetLocalIPByte());
        }


        public static string GetLocalIPString()
        {
            return GetLocalIp().ToString();
        }
        public static byte[] GetLocalIPByte()
        {
            return GetLocalIp().GetAddressBytes();
        }
    }
}
