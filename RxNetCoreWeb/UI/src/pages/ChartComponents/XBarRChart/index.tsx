import { Line, LineConfig } from '@ant-design/charts';
import { Annotation } from '@antv/g2plot';

const XBarRChart = ({ collection, size }: {
  collection:CEdcDataCollection[], 
  size:{width:number, height:number}
}) => {

  let rangeData = collection.map(collectionRange);

  let upperScreenLimit = 150;
  let upperSpecLimit = 140;
  let target = 130;
  let lowerSpecLimit = 120;
  let lowerScreenLimit = 110;

  const config: LineConfig = {
    data: rangeData,
    width: 100,
    height: 400,
    xField: 'key',
    yField: 'value',
    //seriesField:"l",
    yAxis: {
      title: {
        text: 'spc_value range',
        style: {
          fill: 'blue',
        },
      },
    },
    xAxis: {
      line: { style: { stroke: '#0A122E' } },
      grid: {
        line: {
          style: {
            stroke: 'rgb(150,160,171)',
            lineDash: [4, 5],
          },
        },
      }
    },
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fillOpacity: 0.5,
        //stroke: '#5B8FF9',
        //lineWidth: 2,
      },
    },
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
  };
  return <Line style={{...size}} {...config} />;
};

export default XBarRChart;

const collectionRange = (dp: CEdcDataCollection)=> {
  let dataPoints = dp.measurements![0].datapoints!;
  let values = dataPoints.map(v=>Number(v.value));
  let max = Math.max(...values);
  let min = Math.min(...values);
  let xField = dataPoints[0].unitId!;
  let range = max - min;
  return {key: xField, value:range};
}