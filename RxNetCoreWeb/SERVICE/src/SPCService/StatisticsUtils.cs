using System;
using System.Collections.Generic;

namespace SPCService
{
    public class BoxplotData
    {
        public decimal low { get; set; }
        public decimal high { get; set; }
        public decimal median { get; set; }
        public decimal q1 { get; set; }
        public decimal q3 { get; set; }
    }
    public class StatisticsUtils
    {
        public static BoxplotData BoxPlot(List<decimal> numbers)
        {
            numbers.Sort();

            decimal GetNumberByPos(decimal pos)
            {
                var index = (int)pos;
                var result = numbers[index - 1] * (1 + index - pos) + numbers[index] * (pos - index);
                return result;
            }
            var q1pos = (numbers.Count + 1M) / 4M;
            var q1 = GetNumberByPos(q1pos);

            var q2pos = 2 * (numbers.Count + 1M) / 4M;
            var q2 = GetNumberByPos(q2pos);

            var q3pos = 3 * (numbers.Count + 1M) / 4M;
            var q3 = GetNumberByPos(q3pos);

            var IQR = q3 - q1;
            var hight = q3 + 1.5M * IQR;
            var low = q1 - 1.5M * IQR;

            return new BoxplotData
            {
                high = hight,
                low = low,
                median = q2,
                q3 = q3,
                q1 = q1
            };
        }
    }
}
