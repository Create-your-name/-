import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {Layout, Tree, Transfer, Typography, Popconfirm, Radio, Form, Input, Button, Row, Col, Card, Spin, Table, Select, message, Tabs, Divider, Space } from 'antd';
import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { create, queryUser, remove } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { appendOption } from '@/utils/dateUtils';
import { Line, LineConfig, Scatter, ScatterConfig, Box, BoxConfig } from '@ant-design/charts';
import { apiGetCatagory, apiAddNode, apiQueryCatagoryMSpec, apiUpdateCatagoryMSpec } from './service';
import XBarRChart from '../../ChartComponents/XBarRChart';
import XBarChart from '../../ChartComponents/XBarChart';
import ScatterChart from '../../ChartComponents/ScatterChart';
import { DataNode, DirectoryTreeProps } from 'antd/lib/tree';
import {PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { TransferDirection } from 'antd/es/transfer';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';

const { Header, Content, Footer, Sider } = Layout;
const { DirectoryTree } = Tree;

const SpcCatagory = () => {
    const [loading, setLoading] = useState(false);
    const [catagoryNodes, setCatagoryNodes] = useState<DataNode[]>([]);
    //const [selectNode, setSelectNode] = useState<any>(undefined);

    const getCatagoryNodes = async ()=> {
      let resp: HResponse = await apiGetCatagory();
      if (resp.result == 0) {
        let data : GetSpcCatagoryNodesResp = resp.data;
        setCatagoryNodes(data.nodes as DataNode[]);
      }
    }

    useEffect(()=> {
      getCatagoryNodes();
    }, []);


    const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
      console.log('Trigger Select', info.node);
      //setSelectNode(info.node);
      selectNode = info.node as SpcCatagoryNode;
      editorSelect(info.node);
    };

    //左右侧通信用变量
    let selectNode:SpcCatagoryNode | undefined = undefined;
    let editorSelect = (node:any) => {}

    const CatagoryTree = (props:{
      treeData: DataNode[], 
      onSelect: (keys:any, info:any)=>any
    }) => {
      const [selectNode, setSelectNode] = useState<any>(undefined);

      console.log(props.treeData);
      const innerSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
        console.log('Trigger Select', info.node);
        //setSelectNode(info.node);
        setSelectNode(info.node);
        props.onSelect(keys, info);
      };
        // const treeData: DataNode[] = [
        //     {
        //       title: '部门一',
        //       key: '0-0',
        //       cataLevel:1,
        //       children: [
        //         { title: '区域一', cataLevel:2, key: '0-0-0', isLeaf: true },
        //         { 
        //             title: '区域二', key: '0-0-1', 
        //             children: [
        //                 { title: '参数分类一', key: '0-0-0-0', isLeaf: true },
        //             ]
        //         },
        //       ],
        //     },
        //     {
        //       title: '部门二',
        //       key: '0-1',
        //       children: [
        //         { title: '区域三', key: '0-1-0', isLeaf: true },
        //         { title: '区域四', key: '0-1-1', isLeaf: true },
        //       ],
        //     },
        //   ];

        const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
          // console.log('Trigger Expand', keys, info);
        };

        const calcSubnode: (node:any)=>any = (node: any) => {
          let option = [
            {
              key:"top",
              label: '新建产线',
              value: {parent:null, level:1},
            }
          ];

          if (node && node.cataLevel) {
            if (node.cataLevel == 1) {
              option.push({
                key: node.key,
                label: `新建区域 (父节点 ${node.title})`,
                value: {parent:node.key, level:2},
              })
            }
            else if (node.cataLevel == 2) {
              option.push({
                key: node.key,
                label: `新建参数大类 (父节点 ${node.title})`,
                value: {parent:node.key, level:3},
              })
            }
          }
          return option;
        }

        const submitAddNode = async (values: any) => {
          let input: AddSpcCatagoryNodeReq = {
            title : values.title,
            cataLevel: values.type.level,
            parent: values.type.parent
          };
          let resp = await apiAddNode(input);
          getCatagoryNodes();
          return true;
        }
        return (
            <Card title={"类别列表"} extra={
              <ModalForm title={selectNode?.title ?? "XX"} trigger={
                <Button size='small' type="primary">
                <PlusOutlined />
              </Button>
              }
              onFinish={submitAddNode}
              
              >
                <ProFormText
                  width="md"
                  name="title"
                  label="名称"
                  placeholder="请输入名称"
                  required={true}
                />
                <ProFormRadio.Group
                  name="type"
                  label="节点类型"
                  options={calcSubnode(selectNode)}
                />
              </ModalForm>
            }>
                <Tree
                    showLine={true}
                    defaultExpandAll
                    onSelect={innerSelect}
                    onExpand={onExpand}
                    treeData={props.treeData}
                />
                
            </Card>
            
        );
    }

    const EditorConsole = (props: {
      node: SpcCatagoryNode | undefined,
      query: () => any
    }) => {
      const [snode, setSnode] = useState<any>(undefined);
      editorSelect = setSnode;
        return (
            <Space>
                <Typography.Text>{snode?.title}</Typography.Text>
                <Divider type="vertical" />
                {
                  snode?.cataLevel == 3 ? <Button size="small" type="primary" onClick={props.query}><SearchOutlined/>查询</Button>:<div/>
                }
                
            </Space>
        )
    }

    interface RecordType {
        key: string;
        title: string;
        description: string;
      }

    const MeasureEditor = () => {
        const [targetKeys, setTargetKeys] = useState<string[]>([]);
        const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
        const [mspecData, setMSpecData] = useState<RecordType[]>([]);

        const queryMeasureSpec = async ()=> {
          if (!selectNode || selectNode.cataLevel != 3)
            return;
          let req: QueryCatagoryMSpecReq = {
            catagoryId : selectNode.key
          }

          let resp: HResponse = await apiQueryCatagoryMSpec(req);
          if (resp.result == 0) {
            let data : QueryCatagoryMSpecResp = resp.data;
            let allSpec: RecordType[] = data.globalList?.map(ms => ({
              key : ms.Sysid!,
              title : ms.name!,
              description : ms.description!
            })) ?? [];

            setMSpecData(allSpec);
            setSelectedKeys([]);

            let cataList = data.cataList?.map(ms => ms.Sysid!) ?? [];
            setTargetKeys(cataList);
          }
        }

        const submitMeasureSpec = async ()=> {
          if (!selectNode || selectNode.cataLevel != 3)
            return;
          let req: UpdateCatagoryMSpecReq = {
            catagoryId : selectNode?.key,
            mspecList : targetKeys
          };

          let resp: HResponse = await apiUpdateCatagoryMSpec(req);
          netNotify(resp);
          if (resp.result == 0) {
            queryMeasureSpec();
          }
        }

        const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
          console.log('targetKeys:', nextTargetKeys);
          console.log('direction:', direction);
          console.log('moveKeys:', moveKeys);
          setTargetKeys(nextTargetKeys);
        };
      
        const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
          console.log('sourceSelectedKeys:', sourceSelectedKeys);
          console.log('targetSelectedKeys:', targetSelectedKeys);
          setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
        };
      
        // const onScroll = (direction: TransferDirection, e: React.SyntheticEvent<HTMLUListElement>) => {
        //   console.log('direction:', direction);
        //   console.log('target:', e.target);
        // };
        return (
            <Card title ={<EditorConsole node={selectNode} query={queryMeasureSpec}/>} extra= {
                <Space>
                    <Button size="small" type="primary" onClick={submitMeasureSpec}>提交</Button>
                </Space>
            }>
            <Transfer
                dataSource={mspecData}
                showSearch
                listStyle={{
                    width: 250,
                    height: 300,
                  }}
                titles={['待添加', '已添加']}
                targetKeys={targetKeys}
                selectedKeys={selectedKeys}
                onChange={onChange}
                onSelectChange={onSelectChange}
                // onScroll={onScroll}
                render={item => item.title}
                />
            </Card>
        )
    }

    return (
    <PageContainer title={false}>
        <Layout style={{backgroundColor:"#fff"}}>
          <Sider  style={{background:"#fff"}} width={"20%"} >
            {/* 菜单部分 */}
            <CatagoryTree treeData={catagoryNodes} onSelect={onSelect}  />
          </Sider>
          <Content style={{ padding: '0 0px', minHeight: 500 }}>
            {/* 菜单对应内容  */}
            <Spin spinning={loading}>
                <MeasureEditor/>
            </Spin>
          </Content>
        </Layout>
      </PageContainer>
    );
}

export default SpcCatagory;