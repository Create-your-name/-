

using Microsoft.EntityFrameworkCore;

using Protocol;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using SPCService.Database;
using SPCService.Database.Entity;

namespace Arch
{
    public class AppConfigItem
    {
        public string name;
        public string data;
    }

    public class AppConfigService
    {
        public static string GetConfigV(string settingId)
        {
            using var db = new AdminContext();
            var maxVersion = db.APPCONFIG_V.Where(set => set.NAME == settingId)
                    .Select(set => set.VERSION)
                    .DefaultIfEmpty()
                    .Max();

            var item = db.APPCONFIG_V.Where(s => s.NAME == settingId && s.VERSION == maxVersion).FirstOrDefault();

            if (item == null)
                return null;
            else
                return item.DATA;
        }

        public static T GetSettingV<T>(string settingId)
        {
            string content = GetConfigV(settingId);
            if (content != null)
            {
                if (settingId.EndsWith(".yaml") || settingId.EndsWith(".yml"))
                {
                    return YamlUtil.Deserialize<T>(content);
                }
                else if (settingId.EndsWith(".json"))
                {
                    return JsonUtil.Deserialize<T>(content);
                }
                else if (settingId.EndsWith(".xml"))
                {
                    return XmlUtil.Deserialize<T>(content);
                }
            }
            return default(T);
        }

        public static async Task<GetAppSettingResp> GetTextV(GetAppSettingReq req)
        {
            using var db = new AdminContext();
            var maxVersion = await db.APPCONFIG_V.Where(set => set.NAME == req.name)
                    .Select(set => set.VERSION)
                    .DefaultIfEmpty()
                    .MaxAsync();

            if (maxVersion == 0)
            {
                return new GetAppSettingResp
                {
                    maxVersion = 0,
                    version = 0,
                    data = ""
                };
            }

            int reqVersion = req.version;
            if (reqVersion == 0)
            {
                reqVersion = maxVersion;
            }

            var config = await db.APPCONFIG_V.Where(set => set.VERSION == reqVersion && set.NAME == req.name).FirstOrDefaultAsync();

            var resp = new GetAppSettingResp
            {
                maxVersion = maxVersion,
                version = config.VERSION,
                data = config.DATA
            };

            return resp;
        }

        public static async Task<(int err, SetAppSettingResp resp)> SetTextV(SetAppSettingReq req)
        {
            if (!CheckFormat(req.name, req.data))
            {
                return (ErrorCode.BadDataFormat, null);
            }

            using var db = new AdminContext();
            var maxVersion = await db.APPCONFIG_V.Where(set => set.NAME == req.name)
                    .Select(set => set.VERSION)
                    .DefaultIfEmpty()
                    .MaxAsync();

            var record = new AppConfigV
            {
                NAME = req.name,
                DATA = req.data,
                VERSION = maxVersion + 1
            };

            db.APPCONFIG_V.Add(record);
            db.SaveChanges();

            var resp = new SetAppSettingResp
            {
                maxVersion = maxVersion + 1,
                version = maxVersion + 1,
                data = req.data
            };

            return (ErrorCode.OK, resp);
        }

        public static bool CheckFormat(string settingId, string data)
        {
            if (IsJson(settingId))
            {
                var node = JsonUtil.ToToken(data);
                if (null == node)
                    return false;
                else
                    data = JsonUtil.SerializePrettyPrint(node);
            }
            else if (IsXml(settingId))
            {
                if (null == XmlUtil.ReadTree(data))
                    return false;
            }
            else if (IsYaml(settingId))
            {
                if (null == YamlUtil.ToObject(data))
                    return false;
            }
            else
            {
                return false;
            }

            return true;
        }


        private static bool IsJson(string name)
        {
            string[] tokens = name.Split(".");
            if (tokens == null || tokens.Length == 0)
                return false;

            return tokens[tokens.Length - 1].ToLower() == "json";
        }

        private static bool IsXml(string name)
        {
            string[] tokens = name.Split(".");
            if (tokens == null || tokens.Length == 0)
                return false;

            return tokens[tokens.Length - 1].ToLower() == "xml";
        }

        private static bool IsYaml(string name)
        {
            string[] tokens = name.Split(".");
            if (tokens == null || tokens.Length == 0)
                return false;

            return tokens[tokens.Length - 1].ToLower() == "yaml";
        }
    }
}