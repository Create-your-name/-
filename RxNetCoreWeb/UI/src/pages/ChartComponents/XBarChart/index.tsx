import { G2, Line, LineConfig } from '@ant-design/charts';
import { Annotation } from '@antv/g2plot';
import { Space, Typography } from 'antd';
import { ChartDP, ChartDPState } from '../ChartDatapoint';
import { chartPoint } from '../ChartMarker';
import { ChartMath } from '../ChartMath';
import { makeLineAnnotations, pointAnnotation } from '../ChartUtils';

const XBarChart = ({ collection, size }:
  {
    collection: CEdcDataCollection[],
    size: { width: number, height: number }
  }) => {

  let avgData = collection.map(collectionAVG);

  if (avgData.length >= 2) {
    avgData[1].annotated = "这是一个标记"
    avgData[2].state = ChartDPState.Flagged;
  }

  let first = collection[0];
  let planId = first?.edcPlanId;
  let mspec = first?.initialStepId;
  let dateTime = first?.datetime;
  let title = planId + " " + mspec + " " + dateTime;

  let allAvg = ChartMath.mathAvg(avgData.map(d => d.value));

  let upperScreenLimit = 155;
  let upperSpecLimit = 145;
  let target = 135;
  let lowerSpecLimit = 125;
  let lowerScreenLimit = 115;

  G2.registerShape('point', 'xbar-point', {
    draw(cfg, container) {
      const data: any = cfg.data;
      const point = {
        x: cfg.x,
        y: cfg.y,
      };
      const group: any = container.addGroup();

      let attr = chartPoint(data);
      group.addShape('marker', {
        attrs: {
          ...attr,
          ...point,
        },
      });

      return group;
    },
  });

  let annotations: Annotation[] = [
  ];

  for (let data of avgData) {
    if (data.annotated) {
      annotations.push(pointAnnotation(data));
    }

    if (data.value > upperScreenLimit || data.value < lowerScreenLimit) {
      data.state = ChartDPState.Excluded;
    }
  }

  annotations.push(makeLineAnnotations(upperScreenLimit, "", '#F4664A'));
  annotations.push(makeLineAnnotations(upperSpecLimit, "", "orange"));
  annotations.push(makeLineAnnotations(target, "目标值", "green"));
  annotations.push(makeLineAnnotations(lowerSpecLimit, "", "orange"));
  annotations.push(makeLineAnnotations(lowerScreenLimit, "", '#F4664A'));

  const config: LineConfig = {
    data: avgData,
    width: 100,
    height: 400,
    xField: 'key',
    yField: 'value',

    yAxis: {
      title: {
        text: "xbar avg",
        style: {
          fill: "blue"
        }
      },
      minLimit: 100,
      maxLimit: 160,
      tickCount: 7,
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
    annotations: annotations,
    point: {
      size: 5,
      shape: "xbar-point",
    },
    legend: {
      layout: 'horizontal',
      position: 'bottom'
    },
    //点上显示文字
    label: {
      style: {
        fill: 'black',
        opacity: 0.6,
        fontSize: 12
      }
    },
  };

  return (
    <Space direction="vertical" align="center" >
      <div>
        <Typography.Text>{title}</Typography.Text><br />
        <Typography.Text style={{ fontSize: 10, color: "blue" }}>{`Avg=${allAvg} Std=128.94352 Count=${collection.length}`}</Typography.Text>
      </div>

      <Line style={{ ...size }} {...config} />
    </Space>
  )
};

export default XBarChart;

const collectionAVG = (dp: CEdcDataCollection) => {
  let dataPoints = ChartMath.datapoints(dp);

  let xField = dataPoints[0].unitId!;
  let avg = ChartMath.avg(dp);

  let result: ChartDP = {
    key: xField, value: avg
  }
  return result;
}
