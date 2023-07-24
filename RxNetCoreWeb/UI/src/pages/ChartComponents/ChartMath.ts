
export class ChartMath {
    public static toFixed(number:number, fix:number) {
        return Number(number.toFixed(fix));
    }

    public static mathAvg(numbers : number[]) {
        let result = (numbers.reduce((a,b)=>a+b, 0) / numbers.length);
        return this.toFixed(result, 4);
    }

    public static datapoints(dc: CEdcDataCollection) {
        return dc.measurements![0].datapoints || [];
    }

    public static dataValues(dp: CEdcDataPoint[]) {
        return dp.map(d => Number(d.value));
    }

    public static avg(dc: CEdcDataCollection) {
        let dp = this.datapoints(dc);

        return ChartMath.mathAvg(this.dataValues(dp))
    }

    public static maxValue(dc: CEdcDataCollection) {
        let dp = this.datapoints(dc);
        let values = this.dataValues(dp);
        return Math.max(...values);
    }

    public static minValue(dc: CEdcDataCollection) {
        let dp = this.datapoints(dc);
        let values = this.dataValues(dp);
        return Math.min(...values);
    }

    public static range(dc: CEdcDataCollection) {
        return this.maxValue(dc) - this.minValue(dc);
    }

    public static box(dc: CEdcDataCollection) {
        let dp = this.datapoints(dc);

        return ChartMath.mathBox(this.dataValues(dp))
    }

    public static mathBox(allNumber : number[]) {
        let numbers = allNumber.sort();
        
        function GetNumberByPos( pos: number)
        {
            let index = Math.trunc(pos);
            var result = numbers[index - 1] * (1 + index - pos) + numbers[index] * (pos - index);
            return result;
        }
            var q1pos = (numbers.length + 1) / 4;
            var q1 = GetNumberByPos(q1pos);

            var q2pos = 2 * (numbers.length + 1) / 4;
            var q2 = GetNumberByPos(q2pos);

            var q3pos = 3 * (numbers.length + 1) / 4;
            var q3 = GetNumberByPos(q3pos);

            var IQR = q3 - q1;
            var high = q3 + 1.5 * IQR;
            var low = q1 - 1.5 * IQR;

            let result: BoxplotData = {
                high: this.toFixed(high, 4),
                low: this.toFixed(low, 4),
                median: this.toFixed(q2, 4),
                q3: this.toFixed(q3, 4),
                q1: this.toFixed(q1, 4)
            }
            return result
    }
}

export interface BoxplotData
{
    low: number,
    high: number,
    median: number,
    q1: number,
    q3: number
}