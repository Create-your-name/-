import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {Typography, Popconfirm, Form, Input, Button, Row, Col, Card, Spin, Table, Select, message, Tabs, Divider, Space } from 'antd';
import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { create, queryUser, remove } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { appendOption } from '@/utils/dateUtils';
import { Line, LineConfig, Scatter, ScatterConfig, Box, BoxConfig } from '@ant-design/charts';
import { apiGetExampleData, apiGetExampleData2 } from './service';
import XBarRChart from '../../ChartComponents/XBarRChart';
import XBarChart from '../../ChartComponents/XBarChart';
import ScatterChart from '../../ChartComponents/ScatterChart';
import { ChartDP } from '@/pages/ChartComponents/ChartDatapoint';
import YbyxtChart from '@/pages/ChartComponents/YbyxtChart';
import CompareChart from '@/pages/ChartComponents/CompareChart';
import BoxChart from '@/pages/ChartComponents/BoxChart';
//import { Violin } from '@antv/g2plot';

const XBar = () => {
    const [sampleData2, setSampleData2] = useState<CEdcDataCollection[]>([]);

    const getSample = async ()=> {
      let resp2:HResponse = await apiGetExampleData2();
      setSampleData2(resp2.data.interchanges);
    }
  
    useEffect(()=> {
      getSample();
    }, []);

    return (
    <PageContainer>
        <Space direction="vertical" align="center">
        <XBarChart size={{width:1000, height:250}} collection={sampleData2} />
        <Divider type="horizontal"></Divider>
        <XBarRChart size={{width:1000, height:250}} collection={sampleData2} />
        </Space>
        <Divider type="horizontal"></Divider>
        <Space>
            <YbyxtChart size={{width:500, height:250}} collection={sampleData2} />
            <CompareChart size={{width:500, height:250}} collection={sampleData2} />
        </Space>
        <Divider type="horizontal"></Divider>
        <Space>
            <ScatterChart size={{width:500, height:250}} collection={sampleData2}/>
            <BoxChart size={{width:500, height:250}} collection={sampleData2}/>
        </Space>
    </PageContainer>);
  }
  
  export default XBar;