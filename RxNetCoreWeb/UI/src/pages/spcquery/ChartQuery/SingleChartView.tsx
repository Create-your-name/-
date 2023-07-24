import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {Layout, Tag, Tree, Transfer, Typography, Popconfirm, Radio, Form, Input, Button, List, Card, Spin, Table, Select, message, Tabs, Divider, Space, Checkbox, Row } from 'antd';
import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { create, queryUser, remove } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { appendOption } from '@/utils/dateUtils';
import { Line, LineConfig, Scatter, ScatterConfig, Box, BoxConfig } from '@ant-design/charts';
import { apiGetCatagory, apiQueryCatagoryMSpec } from '@/pages/edcspc/SpcCatagory/service';
import XBarRChart from '../../ChartComponents/XBarRChart';
import XBarChart from '../../ChartComponents/XBarChart';
import ScatterChart from '../../ChartComponents/ScatterChart';
import { DataNode, DirectoryTreeProps } from 'antd/lib/tree';
import {LeftOutlined } from '@ant-design/icons';
import type { TransferDirection } from 'antd/es/transfer';
import { ProCard } from '@ant-design/pro-card';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ChartSideMenu } from './ChartSideMenu';
import { titleStyle } from './style';
import { ChartTable } from './ChartTable';
import { Route, Router, history } from 'umi';
import { getQueryString } from '@/utils/tools';
import { apiEdcQueryData } from './service';
import { ColumnsType } from 'antd/lib/table';
import { ChartMath } from '@/pages/ChartComponents/ChartMath';
import YbyxtChart from '@/pages/ChartComponents/YbyxtChart';
import CompareChart from '@/pages/ChartComponents/CompareChart';
import BoxChart from '@/pages/ChartComponents/BoxChart';

const SingleChartView = ()=> {
    const [loading, setLoading] = useState(false);
    const [chartView, setChartView] = useState<{chart:CEdcChart, data: CEdcDataCollection[]}|undefined>(undefined);

    const loadParam = ()=> {
        let raw = getQueryString("chart");
        let json = decodeURIComponent(raw!);
        let chart: CEdcChart = JSON.parse(json);

        loadChart(chart);
    }

    const loadChart = async (chart:CEdcChart)=> {
        let req:SPCEdcQueryDataTxnReq = {
            edcPlan: chart.edcPlan,
            historicalPoints: 50,
            measurementSpec: chart.measurementSpec,
            productName: chart.productName,
            planId: chart.planId,
            lotId: chart.lotId,
        }

        setLoading(true);
        let resp: HResponse = await apiEdcQueryData(req);
        setLoading(false);
        if (resp.result != 0) {
            netNotify(resp);
            return;
        }

        let data: CEdcDataCollection[] = resp.data.interchanges;
        let collection = data[0];
        let measure = collection?.measurements![0];
        let datapoints = measure?.datapoints;
        console.log(collection);
        console.log(measure);
        console.log(datapoints);

        setChartView({chart, data});
    }

    useEffect(loadParam, []);
    return (
        <PageContainer title={false} 
        // content={
        //     <a onClick={()=>history.goBack()}>
        //     <LeftOutlined  />
        //     返回
        //     </a>
        //   } 
          >
            <Spin spinning={loading}>
            {
                chartView? 
                <Tabs tabPosition="bottom" type="card" size="small" >
                    <Tabs.TabPane tab="控制图" key="xbar">
                        <Space direction="vertical" align="center" style={{paddingBottom:20}}>
                            <XBarChart size={{width:1000, height:150}} collection={chartView.data} />
                            <Divider type="horizontal"></Divider>
                            <XBarRChart size={{width:1000, height:150}} collection={chartView.data} />
                        </Space>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="样本运行图" key="ybyxt">
                        <YbyxtChart size={{width:1000, height:250}} collection={chartView.data} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="箱线图" key="xxt">
                        <BoxChart size={{width:1000, height:250}} collection={chartView.data} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="样本对比图" key="ybdbt">
                        <CompareChart size={{width:1000, height:250}} collection={chartView.data} />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="样本散点图" key="sdt">
                        <ScatterChart size={{width:1000, height:250}} collection={chartView.data} />
                    </Tabs.TabPane>
                </Tabs>
                
                
                :<div/>
            }
            {
                chartView?
                <Table bordered size="small" columns={randomColumn(chartView.data)} 
                dataSource={chartView.data}
                scroll={{x:1500}}/>
                :<div/>
            }
            </Spin>
        </PageContainer>
    )
}

export default SingleChartView;

function randomColumn(data: CEdcDataCollection[]) {
    let columns: any[] = [
        {
            title: '抽检时间',
            dataIndex: 'datetime',
            key: 'datetime',
            width:"10%",
        }, 
        {
            title: 'planId',
            dataIndex: 'planId',
            key: 'planId',
        }, 
    ];

    let collection = data[0];
    let dpList = collection.measurements![0].datapoints;

    for (let i=0; i<dpList!.length; i++) {
        columns.push({
            title: "样本" + (i + 1),
            render: (text:any, record:CEdcDataCollection) => {
                let dp = record.measurements![0].datapoints![i];
                return (
                  <div>{dp.value}</div>
                );
              },
        })
    }

    let tailColumns = [
        {
            title: "状态",
            render: (text:any, record:CEdcDataCollection) => {
                return (
                    <Tag color="#87d068">正常</Tag>
                );
              },
        },
        {
            title: "平均值",
            render: (text:any, record:CEdcDataCollection) => {
                return (
                  <div>{ChartMath.avg(record)}</div>
                );
              },
        },
        {
            title: "极差值",
            render: (text:any, record:CEdcDataCollection) => {
                return (
                  <div>{ChartMath.range(record)}</div>
                );
              },
        },
        {
            title: "标准差",
            render: (text:any, record:CEdcDataCollection) => {
                return (
                  <div>{0}</div>
                );
              },
        },
        {
            title: "最大值",
            render: (text:any, record:CEdcDataCollection) => {
                return (
                  <div>{ChartMath.maxValue(record)}</div>
                );
              },
        },
        {
            title: "最小值",
            render: (text:any, record:CEdcDataCollection) => {
                return (
                  <div>{ChartMath.minValue(record)}</div>
                );
              },
        }
    ];

    columns.push(...tailColumns);

    return columns;
}