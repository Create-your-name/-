using System;
using System.Collections.Generic;
using Arch;
using System.IO;
using System.Globalization;
using System.Text.RegularExpressions;

using Serilog;
using Serilog.Core;

public class Log
{
    private static HashSet<string> openTags = new HashSet<string>();
    private static Logger logger;

    public static void Init()
    {

        string set = ServerConfig.GetString("log");
        if (set == "console")
            SetLogToConsole();
        else
            SetLogToFile("logs/spc.log");

        var tags = ServerConfig.GetStringArray("logtag");
        foreach (var tag in tags)
        {
            OpenTag(tag);
        }
    }

    private static void SetLogToFile(string filePath)
    {
        logger = new LoggerConfiguration()
            .WriteTo.File("logs/spc-.log", rollingInterval: RollingInterval.Day, outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
            .CreateLogger();
    }

    private static void SetLogToConsole()
    {
        logger = new LoggerConfiguration()
            .CreateLogger();
    }

    public static void Trace(object message)
    {
        if (null == logger)
        {
            return;
        }

        logger.Information(message.ToString());
        //logger.Info(message);
    }

    public static void Trace(string tag, object message)
    {
        if (null == logger)
        {
            return;
        }
        if (!openTags.Contains(tag))
            return;

        logger.Information(message.ToString());
    }

    public static void OpenTag(string tag)
    {
        if (!openTags.Contains(tag))
            openTags.Add(tag);
    }

    public static void CloseTag(string tag)
    {
        if (openTags.Contains(tag))
            openTags.Remove(tag);
    }

    public static void Error(object message)
    {
        if (null == logger)
        {
            return;
        }

        logger.Error(message.ToString());
    }

    public static void Error(Exception e)
    {
        if (null == logger)
        {
            return;
        }

        logger.Error(e, "Exception->");
    }

    public static void Error(string tag, object message)
    {
        if (null == logger)
        {
            return;
        }

        logger.Error(message.ToString());
    }

    public static void DeleteOldLog()
    {
        try
        {
            if (!Directory.Exists("./logs"))
                return;

            //删除日志目录
            string[] allSubFolders = Directory.GetDirectories("./logs", "", SearchOption.TopDirectoryOnly);
            foreach (string folder in allSubFolders)
            {
                try
                {
                    string regex = "(\\d{8})";
                    var m = Regex.Match(folder, regex);
                    if (m.Success)
                    {
                        var t1 = m.Groups[0].Value;
                        var t2 = m.Groups[1].Value;

                        if (DateTime.TryParseExact(t2, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out var date))
                        {
                            if ((DateTime.Now - date).TotalDays > 3)
                            {
                                Directory.Delete(folder, true);
                            }
                        }
                        else
                        {
                            continue;
                        }
                    }
                }
                catch { }
            }


            //删除日志文件
            string[] allLogs = Directory.GetFiles("./logs", "", SearchOption.TopDirectoryOnly);

            foreach (string log in allLogs)
            {
                try
                {
                    string regex = "(\\d{8})";
                    var m = Regex.Match(log, regex);
                    if (m.Success)
                    {
                        var t1 = m.Groups[0].Value;
                        var t2 = m.Groups[1].Value;

                        if (DateTime.TryParseExact(t2, "yyyyMMdd", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out var date))
                        {
                            if ((DateTime.Now - date).TotalDays > 3)
                            {
                                File.Delete(log);
                            }
                        }
                        else
                        {
                            continue;
                        }
                    }
                }
                catch { }
            }
        }
        catch
        {

        }
    }
}
