import { Box, BoxConfig, Line, LineConfig } from '@ant-design/charts';
import { Annotation } from '@antv/g2plot';
import { ChartMath } from '../ChartMath';

const BoxChart = ({ collection, size }: {
  collection:CEdcDataCollection[], 
  size:{width:number, height:number}
}) => {

  let boxData = collection?.map(collection=> ({
    x: ChartMath.datapoints(collection)[0].unitId,
    ...ChartMath.box(collection)
  }));

  let upperScreenLimit = 150;
  let upperSpecLimit = 140;
  let target = 130;
  let lowerSpecLimit = 120;
  let lowerScreenLimit = 110;

  const config : BoxConfig = {
    data: boxData,
    xField: "x",
    yField: ['low', 'q1', 'median', 'q3', 'high'],
    boxStyle: {
        stroke: '#545454',
        fill: '#1890FF',
        fillOpacity: 0.3,
    },
    yAxis: {
        title: {
            text: "箱型图",
            style: {
                fill:"blue"
            }
        },
        minLimit: 100,
        maxLimit: 160,
        tickCount:7,
    },
    };

  return <Box style={{...size}} {...config} />;
};

export default BoxChart;
