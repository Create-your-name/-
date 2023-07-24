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
import { titleStyle } from './style';
import { apiGetMeasurespecDatas } from './service';

interface RecordType {
    key: string;
    title: string;
    description: string;
}

export const ChartSideMenu = (props: {
    onChartData: (data:any[])=>void
})=> {
    const [catagoryNodes, setCatagoryNodes] = useState<DataNode[]>([]);
    const [mspecData, setMSpecData] = useState<RecordType[]>([]);
    const [selectCataNode, setSelectCataNode] = useState<any>(undefined);
    //MeasurementSpec 多选列表
    const [selectSpecs, setSelectedSpecs] = useState<any[]>([]);

    const getCatagoryNodes = async ()=> {
      let resp: HResponse = await apiGetCatagory();

      if (!resp) return;

      if (resp.result == 0) {
        let data : GetSpcCatagoryNodesResp = resp.data;
        setCatagoryNodes(data.nodes as DataNode[]);
      }
    }

    useEffect(()=> {
      getCatagoryNodes();
    }, []);

    const onCatagorySelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        setSelectCataNode(info.node);
    };
  
    const queryMeasureSpec = async ()=> {
        if (!selectCataNode || selectCataNode.cataLevel != 3) {
            message.warn("先选择参数大类");
            return;
        }
        
        let req: QueryCatagoryMSpecReq = {
        catagoryId : selectCataNode.key
        }

        let resp: HResponse = await apiQueryCatagoryMSpec(req);
        netNotify(resp);
        if (resp.result == 0) {
            let data : QueryCatagoryMSpecResp = resp.data;
            let allSpec: RecordType[] = data.cataList?.map(ms => ({
                key : ms.Sysid!,
                title : ms.name!,
                description : ms.description!
            })) ?? [];

            setMSpecData(allSpec);
        }
    }

    const onSpecSelect = (values:any[])=> {
        setSelectedSpecs(values);
    }

    const getChartList = async() => {
        if (selectSpecs.length == 0) {
            message.warn("请选择参数");
            return;
        }

        let resp: HResponse = await apiGetMeasurespecDatas({
            measurementSpecs:selectSpecs
        });
        netNotify(resp);
        if (resp.result == 0) {
            props.onChartData(resp.data);
        }
    }

      return (
        <ProCard split="horizontal" >
            <ProCard headStyle={{...titleStyle}}  title="模型列表" headerBordered >
                <Tree
                    showLine={true}
                    defaultExpandAll
                    onSelect={onCatagorySelect}
                    // onExpand={onExpand}
                    treeData={catagoryNodes}
                    height={250}
                />
            </ProCard>
            <ProCard headStyle={{...titleStyle}} title="参数列表" headerBordered
                actions={[
                    <Button onClick={queryMeasureSpec} type="primary">加载参数</Button>,
                    <Button type="primary" onClick={getChartList}>查询</Button>
                ]}>
                    <div style={{minHeight:200}}>
                        <Checkbox.Group onChange={onSpecSelect} >
                            {
                                mspecData?.map(m => (
                                    <Row key={m.key}>
                                        <Checkbox value={m.title}>{m.title}</Checkbox>
                                    </Row>
                                ))
                            }
                        </Checkbox.Group>
                    </div>
                    
                </ProCard>
        </ProCard>
        
      )
}
