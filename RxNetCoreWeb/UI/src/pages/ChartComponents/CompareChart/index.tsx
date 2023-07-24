import { Line, LineConfig } from '@ant-design/charts';
import { Annotation } from '@antv/g2plot';
import { ChartDP } from '../ChartDatapoint';

const CompareChart = ({ collection, size }: {
  collection:CEdcDataCollection[], 
  size:{width:number, height:number}
}) => {

    let raw:ChartDP[] = collection?.flatMap(c=>c.measurements ?? [])
    .flatMap(m => m.datapoints ?? [])
    .sort((d1, d2)=> {
        if (d1.unitId != d2.unitId)
            return d1.unitId?.localeCompare(d2.unitId!) ?? 0;
        return d1.sequence! - d2.sequence!;
    })
    .map(d => ({
        key: (d.unitId || "") + "-" + (d.sequence||0), 
        ...d,
        value: Number(d.value!)
    }));

    let upperScreenLimit = 150;
    let upperSpecLimit = 140;
    let target = 130;
    let lowerSpecLimit = 120;
    let lowerScreenLimit = 110;

    const config : LineConfig = {
        data:raw,

        xField: 'unitId',
        yField: 'value',
        seriesField:"siteId",
        yAxis: {
        title: {
            text: "样本对比图",
            style: {
                fill:"blue"
            }
        },
            minLimit: 100,
            maxLimit: 160,
            tickCount:7,
        //   tickInterval:10
        },
        xAxis: {
            line: { style: { stroke: '#0A122E' } },
        },

        point: {
        size: 1,
        shape: 'diamond',
        style: {

            fillOpacity:0.5
            //stroke: '#5B8FF9',
            //lineWidth: 2,
        },
        },
        legend: {
            layout: 'horizontal',
            position: 'bottom'
        }
    };
  return <Line style={{...size}} {...config} />;
};

export default CompareChart;
