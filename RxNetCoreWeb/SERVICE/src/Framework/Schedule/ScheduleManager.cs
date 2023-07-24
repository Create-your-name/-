using Quartz;
using Quartz.Impl;
using System;
using System.Threading.Tasks;

namespace Arch
{
    public class ScheduleManager
    {
        private static readonly ScheduleManager instance = new ScheduleManager();
        private IScheduler scheduler;

        public static ScheduleManager GetInstance()
        {
            return instance;
        }

        private ScheduleManager()
        {
        }

        public async void Init()
        {
            try
            {
                scheduler = await StdSchedulerFactory.GetDefaultScheduler();
                await scheduler.Start();
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
        }

        public async void Shutdown()
        {
            await scheduler.Shutdown();
        }

        public static JobKey RepeatMsJob(int delayMS, long repeatMilliSec, IJobDetail job)
        {
            var trigger = TriggerBuilder.Create()
                    .StartAt(DateTime.Now + new TimeSpan(0, 0, 0, 0, delayMS))
                    .WithSchedule(SimpleScheduleBuilder.Create()
                            .WithInterval(TimeSpan.FromMilliseconds(repeatMilliSec))
                            .RepeatForever())
                    .Build();

            try
            {
                GetInstance().scheduler.ScheduleJob(job, trigger);
                return job.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }

        public static JobKey RepeatMsAct(int delayMS, long repeatMS, Action act)
        {
            var actionJob = JobBuilder.Create<ActionJob>().Build();
            actionJob.JobDataMap["act"] = act;

            var trigger = TriggerBuilder.Create()
                    .StartAt(DateTime.Now + new TimeSpan(0, 0, 0, 0, delayMS))
                    .WithSchedule(SimpleScheduleBuilder.Create()
                            .WithInterval(TimeSpan.FromMilliseconds(repeatMS))
                            .RepeatForever())
                    .Build();

            try
            {
                GetInstance().scheduler.ScheduleJob(actionJob, trigger);
                return actionJob.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }

        public static JobKey DelayAction(int delayMS, Action action)
        {
            var actionJob = JobBuilder.Create<ActionJob>().Build();
            actionJob.JobDataMap["act"] = action;

            var trigger = TriggerBuilder.Create()
                    .StartAt(DateBuilder.FutureDate(delayMS, IntervalUnit.Millisecond))
                    .Build();

            try
            {
                GetInstance().scheduler.ScheduleJob(actionJob, trigger);
                return actionJob.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }

        public static JobKey RepeatHourAct(int sec, int min, Action action)
        {
            var actionJob = JobBuilder.Create<ActionJob>().Build();
            actionJob.JobDataMap["act"] = action;

            string schedule = $"{sec} {min} * ? * *";
            var trigger = TriggerBuilder.Create()
                    .WithSchedule(CronScheduleBuilder.CronSchedule(schedule))
                    .Build();
            try
            {
                GetInstance().scheduler.ScheduleJob(actionJob, trigger);
                return actionJob.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }

        public static JobKey RepeatDailyAct(int sec, int min, int hour, Action action)
        {
            var actionJob = JobBuilder.Create<ActionJob>().Build();
            actionJob.JobDataMap["act"] = action;

            string schedule = $"{sec} {min} {hour} * * ?";
            var trigger = TriggerBuilder.Create()
                    .WithSchedule(CronScheduleBuilder.CronSchedule(schedule))
                    .Build();
            try
            {
                GetInstance().scheduler.ScheduleJob(actionJob, trigger);
                return actionJob.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }

        /***
         * 每周统计
         */
        public static JobKey RepeatWeekDayAct(int sec, int min, int hour, int weekDay, Action action)
        {
            var actionJob = JobBuilder.Create<ActionJob>().Build();
            actionJob.JobDataMap["act"] = action;

            string schedule = $"{sec} {min} {hour} ? * {weekDay}";
            var trigger = TriggerBuilder.Create()
                    .WithSchedule(CronScheduleBuilder.CronSchedule(schedule))
                    .Build();
            try
            {
                GetInstance().scheduler.ScheduleJob(actionJob, trigger);
                return actionJob.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }

        /***
         * 每月统计
         */
        public static JobKey RepeatMonthAct(int sec, int min, int hour, int day, Action action)
        {
            var actionJob = JobBuilder.Create<ActionJob>().Build();
            actionJob.JobDataMap["act"] = action;

            String schedule = $"{sec} {min} {hour} {day} * ?";
            var trigger = TriggerBuilder.Create()
                    .WithSchedule(CronScheduleBuilder.CronSchedule(schedule))
                    .Build();
            try
            {
                GetInstance().scheduler.ScheduleJob(actionJob, trigger);
                return actionJob.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }

        public static JobKey SchedualAction(string schedule, Action action)
        {
            var actionJob = JobBuilder.Create<ActionJob>().Build();
            actionJob.JobDataMap["act"] = action;

            var trigger = TriggerBuilder.Create()
                    .WithSchedule(CronScheduleBuilder.CronSchedule(schedule))
                    .Build();
            try
            {
                GetInstance().scheduler.ScheduleJob(actionJob, trigger);
                return actionJob.Key;
            }
            catch (SchedulerException e)
            {
                Log.Error(e);
            }
            return null;
        }
    }

    public class ActionJob : IJob
    {
        public Task Execute(IJobExecutionContext context)
        {
            if (context.JobDetail.JobDataMap.Contains("act"))
            {
                (context.JobDetail.JobDataMap["act"] as Action)?.Invoke();
            }

            return Task.CompletedTask;
        }
    }
}