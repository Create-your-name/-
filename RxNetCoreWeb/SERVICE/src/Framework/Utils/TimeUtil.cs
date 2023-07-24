using System;
using System.Globalization;

namespace Arch
{
    public static class TimeUtil
    {
        public const long TicksPerMS = TimeSpan.TicksPerMillisecond;

        private static readonly DateTime Jan1st1970 = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public static long NowTimeStamp => GetTimeStamp();

        public static DateTime Today => DateTime.Today;
        public static DateTime Yesterday => DateTime.Today.AddDays(-1);

        public static long GetTimeStamp()
        {
            return Convert.ToInt64((DateTime.UtcNow - Jan1st1970).TotalMilliseconds);
        }
        public static string  GetDateString()
        {
            return DateTime.Now.ToString("yyyyMMdd HHmmss")  ;
        }
        public static long GetSecondTimeStamp()
        {
            return Convert.ToInt64((DateTime.UtcNow - Jan1st1970).TotalSeconds);
        }

        public static long ToTimeStamp(this DateTime date)
        {
            return Convert.ToInt64((date.ToUniversalTime() - Jan1st1970).TotalMilliseconds);
        }

        public static DateTime FromTimeStamp(long time)
        {
            return new DateTime((time * TicksPerMS) + Jan1st1970.Ticks, DateTimeKind.Utc).ToLocalTime();
        }

        public static string ToDateString(long ts) => FromTimeStamp(ts).ToString("yyyy-MM-dd");

        public static string ToDatetimeString(long ts) => FromTimeStamp(ts).ToString("yyyy-MM-dd HH:mm:ss");

        public static int SubtractDate(long milliseconds)
        {
            return SubtractDate(FromTimeStamp(milliseconds));
        }

        public static int SubtractDate(long ms1, long ms2)
        {
            return SubtractDate(new DateTime(ms1 * TicksPerMS), new DateTime(ms2 * TicksPerMS));
        }

        public static int SubtractDate(DateTime d1)
        {
            return SubtractDate(d1, DateTime.Now);
        }

        public static int SubtractDate(DateTime d1, DateTime d2)
        {
            TimeSpan d3 = d2.Subtract(d1);
            return d3.Days;
        }

        public static DateTime ParseString(string dateStr)
        {
            return DateTime.ParseExact(dateStr, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
        }

        public static DateTime ParseSimpleString(string dateStr)
        {
            return DateTime.ParseExact(dateStr, "yyyy-MM-dd", CultureInfo.InvariantCulture);
        }
        public static DateTime? ParseCommon(string dateTxt)
        {
            if (DateTime.TryParseExact(dateTxt, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out var date))
                return date;

            return null;
        }
        public static DateTime? ParseSPC(string dateTxt)
        {
            if (DateTime.TryParseExact(dateTxt, "yyyyMMdd HHmmssfff", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out var date))
                return date;

            return null;
        }
        public static string GetSPCTime(DateTime date)
        {
            return date.ToString("yyyyMMdd HHmmss");
        }
        public static string GetSPCTimeNoSpace(DateTime date)
        {
            return date.ToString("yyyyMMdd_HHmmss");
        }
        //20051227 133838000
        public static DateTime? ParseDay(string dateTxt)
        {
            if (DateTime.TryParseExact(dateTxt, "yyyy-MM-dd", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out var date))
                return date;

            return null;
        }

        public static string NowString()
        {
            return DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        }

        public static int DayDiff(long d1, long d2)
        {
            var day1 = FromTimeStamp(d1).Date;
            var day2 = FromTimeStamp(d2).Date;
            return (day1 - day2).Days;
        }

        public static DateTime ToDateBegin(this DateTime date)
        {
            return date.Date;
        }

        public static DateTime ToDateEnd(this DateTime date)
        {
            return date.Date.AddTicks(-1).AddDays(1);
        }
    }
}
