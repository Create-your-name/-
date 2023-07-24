import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {Layout, Tree, Transfer, Typography, Popconfirm, Radio, Form, Input, Button, List, Card, Spin, Table, Select, message, Tabs, Divider, Space, Checkbox, Row } from 'antd';
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
import {PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { TransferDirection } from 'antd/es/transfer';
import { DrawerForm, ModalForm, ProFormCheckbox, ProFormDateRangePicker, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { ProCard } from '@ant-design/pro-card';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ChartSideMenu } from './ChartSideMenu';
import { titleStyle } from './style';
import { ChartTable } from './ChartTable';

const { Header, Footer, Sider, Content } = Layout;
const ChartQuery = () => {
    const [loading, setLoading] = useState(false);
    //const [chartList, setChartList] = useState<CEdcChart[]>([]);

    let setChartList:(data:any)=>void = ()=>{};
    const onGetChartData = (data:any[]) => {
        setChartList(data);
        //simpleChartList = data;
    }

    return (
    <div >
        <Layout>
            <Sider style={{height:"100%"}}>
            <ChartSideMenu onChartData={onGetChartData}/>
            </Sider>
            <Layout style={{marginLeft:8}}>
                <ChartQueryConsole/>
                {/* <Header > */}

                    
                {/* </Header> */}
                <Content><ChartTable setUpdater = {(fun)=> {setChartList=fun}}/></Content>
            </Layout>

        </Layout>

      </div>
    );
}

export default ChartQuery;

const QueryCondition = ()=> {

    return (
    <DrawerForm
        title="查询条件"
        trigger={ <Button type="default" size="small">查询条件</Button> }
        drawerProps={{ destroyOnClose: true, width:"70%"}}
        >
        <ProFormDateRangePicker name="dateRange" label="日期" />
        <ProFormRadio.Group
            name="checkbox"
            layout="horizontal"
            label="查询类型"
            options={[
                { label: 'Normal', value: 'normal' },
                { label: 'Chart ID', value: 'chartid' },
                { label: 'Subject', value: 'subject' },
              ]}
            />
    </DrawerForm>
    );
    
}

const ChartQueryConsole = ()=> {

    return (
        <Space style={{...titleStyle, paddingLeft:10}}>
            <QueryCondition/>
            <Button type="default" size="small">过滤</Button>
            <Button type="default" size="small" >排序</Button>
            <Divider type="vertical" />
            <Button type="default" size="small" >查看比较</Button>
            <Button type="default" size="small" >合并查看</Button>
            <Button type="default" size="small" >参数对比图</Button>
            <Button type="default" size="small" >实时监控</Button>
        </Space>
        
    )
}