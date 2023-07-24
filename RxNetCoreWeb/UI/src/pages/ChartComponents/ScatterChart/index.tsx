import { G2, Scatter, ScatterConfig } from '@ant-design/charts';
import { Annotation } from '@antv/g2plot';
import { Space, Typography } from 'antd';
import { ChartDP, ChartDPState } from '../ChartDatapoint';
import { chartPoint, GMarker } from '../ChartMarker';
import { makeLineAnnotations } from '../ChartUtils';

const ScatterChart = ({ collection, size }: 
  {
    collection:CEdcDataCollection[], 
    size:{width:number, height:number}
  }) => {

    let raw:ChartDP[] = collection?.flatMap(c=>c.measurements ?? [])
    .flatMap(m => m.datapoints ?? [])
    .map(d => ({
        key: (d.unitId || "") + "-" + (d.sequence||0), 
        ...d,
        value: Number(d.value!)
    }));
    
    let upperScreenLimit = 155;
    let upperSpecLimit = 145;
    let target = 135;
    let lowerSpecLimit = 125;
    let lowerScreenLimit = 115;

    for (let data of raw) {
      if (data.value > upperScreenLimit || data.value < lowerScreenLimit) {
        data.state = ChartDPState.Excluded;
      }
    }
    
  const annotations: Annotation[] = 
   [
    // 平均值
    makeLineAnnotations(upperScreenLimit, "", 'red'),
    makeLineAnnotations(upperSpecLimit, "", "orange"),
    makeLineAnnotations(target, "", "blue"),
    makeLineAnnotations(lowerSpecLimit, "", "orange"),
    makeLineAnnotations(lowerScreenLimit, "", 'red'),

    // {
    //     type: 'regionFilter',
    //     start: ['min', upperScreenLimit],
    //     end: ['max', 'max'],
    //     color: '#F4664A',
    // },
    // {
    //     type: 'regionFilter',
    //     start: ['min', lowerScreenLimit],
    //     end: ['max', '0'],
    //     color: '#F4664A',
    // },
  ];

  G2.registerShape('point', 'xbar-point', {
    draw(cfg, container) {
      const data:any = cfg.data;
      const point = {
        x: cfg.x,
        y: cfg.y,
      };
      const group:any = container.addGroup();

      let attr = chartPoint(data);
      group.addShape('marker', {
        attrs: {
          ...attr,
          ...GMarker.Circle,
          r:1,
          ...point,
        },
      });

      return group;
    },
  });
  const config: ScatterConfig = {
      data:raw,
      xField: 'unitId',
      yField: 'value',
      size: 2,
      shape:"xbar-point",

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
      yAxis: {
          title: {
              text: "样本散点图",
              style: {
                  fill:"blue"
              }
          },
          minLimit: 100,
              maxLimit: 160,
              tickCount:7,
          },
          annotations
  }

  return (
    <Space direction="vertical" align="center" >
        {/* <div> */}
        {/* <Typography.Text>DDI2006RNR3 DIHR01400053 20100919-201839</Typography.Text>
        <Typography.Text style={{fontSize:10, color:"blue"}}>Avg=128.485832 Std=128.94352 Count=10</Typography.Text> */}
        {/* </div> */}
        
        <Scatter style={{...size}} {...config} />
    </Space>
  )
};

export default ScatterChart;
