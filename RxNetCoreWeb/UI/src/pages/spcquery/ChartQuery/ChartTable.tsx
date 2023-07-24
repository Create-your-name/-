import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {Layout, Tree, Transfer, Typography, Popconfirm, Radio, Form, Input, Button, List, Card, Spin, Table, Select, message, Modal} from 'antd';
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
import {BarChartOutlined  } from '@ant-design/icons';
import type { TransferDirection } from 'antd/es/transfer';
import { DrawerForm, ModalForm, ProFormCheckbox, ProFormDateRangePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { ProCard } from '@ant-design/pro-card';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Route, Router, history } from 'umi';
import { apiEdcQueryData } from './service';

export const ChartTable = (props:{
    setUpdater: (fun:any)=>void;
})=> {;
  const [loading, setLoading] = useState(false)
  const [chartList, setChartList] = useState<CEdcChart[]>([]);
  const [chartView, setChartView] = useState<{chart:CEdcChart, data: CEdcDataCollection[]}|undefined>(undefined);
  const [v, setV] = useState(1);
  const setChartListWarp = (dp: CEdcChart[]) => {
    dp.forEach(c=> Object.assign(c, {key: c.Sysid}));
    setChartList(dp);
  }

  props.setUpdater(setChartListWarp);

  const viewChart = async (chart: CEdcChart) => {
    let chartData = encodeURIComponent(JSON.stringify(chart));
    
    let url = `/spccharts/singleview?chart=${chartData}&name=${chart.name}`;
    history.push(url);
    setV(v+1);
  }

  const columns = [
      {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        }, 
        {
          title: 'Chart',
          render: (text:any, record:CEdcChart) => {
            return (
              <Button type="link" onClick={()=>viewChart(record)}>
                    <BarChartOutlined/>
              </Button>
            );
          },
        },
        {
          title: 'ChartTemplate',
          dataIndex: 'spcTemplate',
          key: 'spcTemplate',
        },
        {
          title: 'measurementSpec',
          dataIndex: 'measurementSpec',
          key: 'measurementSpec',
        },
        {
          title: 'edcPlan',
          dataIndex: 'edcPlan',
          key: 'edcPlan',
        },
        {
          title: 'planId',
          dataIndex: 'planId',
          key: 'planId',
        },
        {
          title: 'productName',
          dataIndex: 'productName',
          key: 'productName',
        },
        {
          title: 'stepId',
          dataIndex: 'stepId',
          key: 'stepId',
        },
        {
          title: 'lotId',
          dataIndex: 'lotId',
          key: 'lotId',
        },
        {
          title: 'equipment',
          dataIndex: 'equipment',
          key: 'equipment',
        },
        {
          title: 'historicalPoints',
          dataIndex: 'historicalPoints',
          key: 'historicalPoints',
        },
  ]

  const rowSelection = {
      defaultSelectedRowKeys: [], // filesState.waferList.map(c=>c.key),
      onChange: (selectedRowKeys: React.Key[], selectedRows: CEdcChart[]) => {
        console.log(selectedRows);
      },
    };

  return (
    <Spin spinning={loading}>
      <Table rowSelection={{type:"checkbox", ...rowSelection}} 
        columns={columns} 
        dataSource={chartList}
        scroll={{x:100}}></Table>
        {
          chartView? 
          <Modal width={800} visible={true} onCancel={()=>setChartView(undefined)}>
            <XBarChart size={{width:700, height:250}} avg={chartView.data} />
          </Modal> : <div/>
        }
    </Spin>
      
    )
}