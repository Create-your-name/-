using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Builder;
using Arch;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Microsoft.Extensions.Hosting;
using SPCService.Database;
using System.Text;
using SPCService.BusinessModel;
using FluentScheduler;
using SPCService.src.Framework.Schedule;
using Quartz;
using SPCService.src.EQPPartService;

namespace SPCService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            if (args.Length >= 1)
            {
                StartWithCommand(args);
                return;
            }

            if (!ServerConfig.LoadLocalServerConfig())
            {

                Console.WriteLine("ServerConfig Load Fail! Application Exit!");
                return;
            }

       /*     //
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddQuartzUI();
            //添加本地调度任务访问
            builder.Services.AddQuartzClassJobs();

            var app = builder.Build();

            app.UseQuartz();
            //*/

            InitServerModules();
            InitLogicModules();

      

            AppDomain.CurrentDomain.ProcessExit += (_, __) =>
            {
                Shutdown();
            };

            Log.Trace("-------------------SPCService Start!!!!!-------------------");

            Console.WriteLine("-------------------" + ServerConfig.GetString("serverId") + " begin running-------------------");
            Console.WriteLine("Startup > " + DateTime.Now);

            EQPPartService p = new EQPPartService();
            p.TimeFor();

            //JobManager.Initialize(new QcPmSchedule());
            //Console.WriteLine("QcPmSchedule start!");

            int port = ServerConfig.GetInt("sport");
            Console.WriteLine("WebService start at " + "http://0.0.0.0:" + port);
            Host.CreateDefaultBuilder(args)
            //关闭asp.net core的日志，提高http性能
            .ConfigureLogging((context, logging) => { logging.ClearProviders(); })
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>()
                .UseUrls("http://0.0.0.0:" + port)
                .ConfigureKestrel((context, options) =>
                {
                    options.AllowSynchronousIO = true;
                });
            })
            .Build()
            .Run();
        }

        public static void InitServerModules()
        {
            Log.Init();
            ScheduleManager.GetInstance().Init();
            //InitDataBase();

            Log.DeleteOldLog();
            ScheduleManager.RepeatDailyAct(0, 10, 0, Log.DeleteOldLog);
            //注册支持GB2312等编码
            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
        }

        public static void InitLogicModules()
        {
            //JwtService.DemoInit();
            //JwtService.InitSecret();
            AppSettings.LoadAll();
            TspcManager.CollectModels();
        }

        private static void InitDataBase()
        {
            using var db = new AdminContext();
            db.Database.EnsureCreated();
        }

        private static void Shutdown()
        {

        }

        private static void StartWithCommand(string[] args)
        {
            string command = args[0];

            switch (command)
            {
                case "CreateAdmin":
                    {
                        try
                        {
                            string account = args[1];
                            string pwd = args[2];
                            ServerConfig.LoadLocalServerConfig();
                            Log.Init();
                            InitDataBase();
                            SystemUserService.CreateRootUser(account, pwd);
                            Console.WriteLine($"Create Admin User: {account} Success!");
                        }
                        catch (Exception e)
                        {
                            Log.Error(e);
                            Console.WriteLine(e.Message);
                        }
                    }
                    break;
                default:
                    Console.WriteLine("不识别的指令");
                    break;
            }
        }
    }
}
