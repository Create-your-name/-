import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Form, Input, Button, Row, Col, Card, Spin, Table, Select, message, Tabs, Divider, Space } from 'antd';
import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { create, queryUser, remove } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { appendOption } from '@/utils/dateUtils';
import { Line, LineConfig, Violin, ViolinConfig, Box, BoxConfig } from '@ant-design/charts';
import { apiGetExampleData } from './service';

const SpcLine = () => {
  const [sampleData, setSampleData] = useState([]);

  const getSample = async ()=> {
    let resp = await apiGetExampleData();
    setSampleData(resp.data);
  }

  useEffect(()=> {
    getSample();
  }, []);
    const data = [
        { date: '1', avg: 8.5 },
        { date: '2', avg: 8.75 },
        { date: '3', avg: 8.52 },
        { date: '4', avg: 8.69 },
        { date: '5', avg: 8.72 },
        { date: '6', avg: 8.43 },
        { date: '7', avg: 8.7 },
        { date: '8', avg: 8.6 },
      ];

      const data2 = [
        { date: '1', avg: 8.5, l:"1" },
        { date: '2', avg: 8.75, l:"1" },
        { date: '3', avg: 8.52, l:"1" },
        { date: '4', avg: 8.69, l:"1" },
        { date: '5', avg: 8.72, l:"1" },
        { date: '6', avg: 8.43, l:"1" },
        { date: '7', avg: 8.7, l:"1" },
        { date: '8', avg: 8.6, l:"1" },
        { date: '1', avg: 8.4, l:"2" },
        { date: '2', avg: 8.65, l:"2" },
        { date: '3', avg: 8.32, l:"2" },
        { date: '4', avg: 8.469, l:"2" },
        { date: '5', avg: 8.62, l:"2" },
        { date: '6', avg: 8.43, l:"2" },
        { date: '7', avg: 8.8, l:"2" },
        { date: '8', avg: 8.3, l:"2" },
      ];
    
      const config : LineConfig = {
        data:data2,
        width: 100,
        height: 400,
        xField: 'date',
        yField: 'avg',
        seriesField:"l",
        yAxis: {
            //ticks:[ 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0],
            minLimit: 8.1,
            maxLimit: 9.0,
            tickCount:10,
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
        annotations: [
            // 平均值
            {
              type: 'line',
              start: ['min', 8.9],
              end: ['max', 8.9],
              text: {
                content: 'Max',
                offsetY: -2,
                style: {
                  textAlign: 'left',
                  fontSize: 10,
                  fill: 'blue',
                  textBaseline: 'bottom',
                },
              },
              style: {
                stroke: 'red',
                lineWidth:2
              },
            },
            {
                type: 'line',
                start: ['min', 8.3],
                end: ['max', 8.3],
                text: {
                  content: 'Min',
                  offsetY: -2,
                  style: {
                    textAlign: 'left',
                    fontSize: 10,
                    fill: 'blue',
                    textBaseline: 'bottom',
                  },
                },
                style: {
                  stroke: 'red',
                  lineWidth:2
                },
            },
            {
                type: 'line',
                start: ['min', 8.6],
                end: ['max', 8.6],
                text: {
                  content: 'AVG',
                  offsetY: -2,
                  style: {
                    textAlign: 'left',
                    fontSize: 10,
                    fill: 'blue',
                    textBaseline: 'bottom',
                  },
                },
                style: {
                  stroke: 'orange',
                  lineWidth:2
                },
            }
          ],
        point: {
          size: 10,
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

      const configZX : LineConfig = {
        data,
        width: 100,
        height: 400,
        xField: 'date',
        yField: 'avg',
        stepType: "vh",
        yAxis: {
            //ticks:[ 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0],
            minLimit: 8.1,
            maxLimit: 9.0,
            tickCount:10,

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
        },
      };

      const vdata = [
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.5
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.9
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.3
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.7
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.6
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.6
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.4
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.7
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.9
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.3
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.6
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.1
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.9
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.7
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.6
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.8
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.1
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.8
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.1
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.1
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.3
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.2
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.8
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.4
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 4.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.4
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.3
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.9
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.3
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.5
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.3
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.7
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.8
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.3
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.8
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.7
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.4
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.7
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.6
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.6
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.5
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.7
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.9
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.8
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.6
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.4
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.6
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.5
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.2
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.2
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.6
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.7
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.6
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.8
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.4
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.1
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 4.1
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.2
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 4.2
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.9
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.2
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.3
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.5
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.1
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.6
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.9
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.3
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.3
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.3
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.5
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.3
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.3
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 2.3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.3
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.4
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.6
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.6
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.5
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.4
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.9
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.8
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.3
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.8
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.6
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.8
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 4.6
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.5
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.7
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5.3
        },
        {
          "species": "I. setosa",
          "x": "PetalWidth",
          "y": 0.2
        },
        {
          "species": "I. setosa",
          "x": "PetalLength",
          "y": 1.4
        },
        {
          "species": "I. setosa",
          "x": "SepalWidth",
          "y": 3.3
        },
        {
          "species": "I. setosa",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.9
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.6
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 4.9
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.6
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.9
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.6
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.1
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.8
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.9
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.8
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.6
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.8
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.1
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.6
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.6
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.6
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.8
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.6
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.2
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.3
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 6.2
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 3
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.1
        },
        {
          "species": "I. versicolor",
          "x": "PetalWidth",
          "y": 1.3
        },
        {
          "species": "I. versicolor",
          "x": "PetalLength",
          "y": 4.1
        },
        {
          "species": "I. versicolor",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. versicolor",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.5
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.9
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 5.8
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.1
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.9
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.1
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.8
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.5
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.1
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.6
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.7
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 4.5
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 4.9
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.3
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.9
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.3
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.8
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.5
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.6
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.2
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.5
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.9
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.3
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.4
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.1
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.5
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.8
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 5.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.4
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 5.8
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.3
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.4
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.5
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.5
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.7
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.9
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.6
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.2
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.7
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.9
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 4.9
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 5.6
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.7
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 4.9
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.1
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.7
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.2
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 4.8
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.2
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 4.9
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.1
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.1
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.4
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.6
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.8
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.2
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.9
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.4
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.4
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.9
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.4
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.5
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.8
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.4
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.6
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.1
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 6.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 7.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.4
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.5
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.4
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 4.8
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.1
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.4
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.9
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.4
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.6
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.1
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.9
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.9
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.7
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 5.8
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.9
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.2
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.8
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.5
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.7
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.2
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.7
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.9
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 2.5
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.3
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.2
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.5
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 2.3
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.4
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3.4
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 6.2
        },
        {
          "species": "I. virginica",
          "x": "PetalWidth",
          "y": 1.8
        },
        {
          "species": "I. virginica",
          "x": "PetalLength",
          "y": 5.1
        },
        {
          "species": "I. virginica",
          "x": "SepalWidth",
          "y": 3
        },
        {
          "species": "I. virginica",
          "x": "SepalLength",
          "y": 5.9
        }
      ]
      const vconfig : ViolinConfig = {
        data: vdata,
        xField: "x",
        yField: "y",
        shape: 'hollow-smooth'
      }

      const boxdata = [
        { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24 },
        { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16 },
        { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
        { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28 },
        { x: 'North Africa', low: 1, q1: 8, median: 14, q3: 18, high: 24 },
        { x: 'North America', low: 3, q1: 10, median: 17, q3: 28, high: 30 },
        { x: 'West Europe', low: 1, q1: 7, median: 10, q3: 17, high: 22 },
        { x: 'West Africa', low: 1, q1: 6, median: 8, q3: 13, high: 16 },
      ];
      
      const boxconfig : BoxConfig = {
        data: boxdata,
        xField: "x",
        yField: ['low', 'q1', 'median', 'q3', 'high'],
        boxStyle: {
          stroke: '#545454',
          fill: '#1890FF',
          fillOpacity: 0.3,
        }
      }
    return (
    <PageContainer>
        <Space>
        <div style={{width:500, height:250}}><Line {...config} /></div>
        <div style={{width:500, height:250}}><Line {...configZX} /></div>
        </Space>
        <div style={{width:1000, height:250}}><Violin {...vconfig} /></div>
        <div style={{width:1000, height:250}}><Box {...boxconfig} /></div>
    </PageContainer>);
}

export default SpcLine;