import { Line, LineConfig } from '@ant-design/charts';
import { Annotation } from '@antv/g2plot';
import { ChartDP } from '../ChartDatapoint';

const YbyxtChart = ({ collection, size }: {
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
    data: raw,
    width: 100,
    height: 400,
    xField: 'key',
    yField: 'value',
    //seriesField:"l",
    yAxis: {
    title: {
        text: "样本运行图",
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
    size: 4,
    shape: 'diamond',
    },
    legend: {
        layout: 'horizontal',
        position: 'bottom'
    }
};
  return <Line style={{...size}} {...config} />;
};

export default YbyxtChart;
