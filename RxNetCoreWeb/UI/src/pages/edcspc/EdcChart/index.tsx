import { PlusOutlined } from '@ant-design/icons';

import { Button, Card, Col, Drawer, Form, Input, Radio, Row, Space, TreeSelect } from 'antd';

import { apiGetCatagory } from '@/pages/edcspc/SpcCatagory/service';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useEffect, useRef, useState } from 'react';
import { CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { queryEdcChart } from './edcChartApi';

type EdcParameters = {
  property: string;
  value: string;
  Sysid: string;
};

type TableListItem = {
  name: string;
  spcTemplate: string;
  measurementSpec: string;
  edcPlan: string;
  planId: string;
  productName: string;
  stepId: string;
  lotId: string;
  equipment: string;
  partition: string;
  publishToName: string;
  loadOnStartup: string;
  whenToDisplay: string;
  historicalHours: string;
  historicalPoints: string;
  description: string;
  rulesDatas: string[];
  spcCustomRules: string[];
  edcParameters: EdcParameters[];
  Sysid: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const EdcChart = () => {
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const [tempTreeValue, setTempTreeValue] = useState<any>();
  const [menuBelong, setMenuBelong] = useState<any>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Chart名称',
      dataIndex: 'name',
    },
    {
      title: 'Chart描述',
      dataIndex: 'description',
    },
    {
      title: 'Chart模板',
      dataIndex: 'spcTemplate',
    },
    {
      title: '参数项',
      dataIndex: 'measurementSpec',
    },
    {
      title: 'EDCPlan',
      dataIndex: 'edcPlan',
    },
    {
      title: 'ProcessPlan',
      dataIndex: 'planId',
    },
    {
      title: 'Product',
      dataIndex: 'productName',
    },
    {
      title: 'Step',
      dataIndex: 'stepId',
    },
    {
      title: 'Lot',
      dataIndex: 'lotId',
    },
    {
      title: 'Equipment',
      dataIndex: 'equipment',
    },
    {
      title: '显示小时数',
      dataIndex: 'historicalHours',
    },
    {
      title: '显示点数',
      dataIndex: 'historicalPoints',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <a
          key="detail"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
            setIsUpdate(true);
            setDrawerTitle('更新Chart');
          }}
        >
          查看
        </a>,
        <a
          key="detail"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
            setIsUpdate(false);
            setDrawerTitle('更新Chart');
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      // 全部查询数据量太大，先加一个默认值
      let resp = await queryEdcChart({
        CatagoryId: '',
        Name: 'PPASL010',
      });
      setTableListData(resp.data);
    })();
    getCatagoryNodes();
  }, [queryEdcChart]);

  const onSearch = (values: any) => {
    (async () => {
      let resp = await queryEdcChart(values);
      setTableListData(resp.data);
    })();
  };

  const onReset = () => {
    (async () => {
      let resp = await await queryEdcChart({
        CatagoryId: '',
        Name: 'PPASL010',
      });
      setTableListData(resp.data);
      searchForm.resetFields();
    })();
  };
  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };
  const onChangeTemp = (value: any) => {
    setTempTreeValue(value);
  };

  const getCatagoryNodes = async () => {
    let resp = await apiGetCatagory();
    if (resp.result == 0) {
      let nodes = alterTree(resp.data.nodes, '');
      setMenuBelong(nodes);
    }
  };

  const alterTree = (list: any[], name: any) => {
    list = list.map((e) => {
      return {
        ...e,
        value: e.key,
        label: (name ? `${name}/` : '') + e.title,
        children: Array.isArray(e.children)
          ? alterTree(e.children, (name ? `${name}/` : '') + e.title)
          : null,
      };
    });
    return list;
  };

  return (
    <PageContainer>
      <Card style={{ marginBottom: 20 }}>
        <Form style={{ marginTop: 40 }} form={searchForm} onFinish={onSearch}>
          <Row>
            <Col span={8}>
              <Form.Item label="CatagoryId" name="CatagoryId">
                <TreeSelect
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="请选择"
                  treeData={menuBelong}
                  value={tempTreeValue}
                  onChange={onChangeTemp}
                  treeNodeLabelProp="label"
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="ChartName" name="Name" style={{ marginLeft: 20 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item {...CurrencySubmitFormLayout}>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={onReset}>
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="EdcChart列表"
        actionRef={actionRef}
        rowKey="Sysid"
        search={false}
        dataSource={tableListData}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setIsUpdate(false);
              setShowDetail(true);
              setDrawerTitle('新增Chart');
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        columns={columns}
        scroll={{ x: 3000 }}
      />
      {showDetail ? (
        <Drawer
          title={drawerTitle}
          width={600}
          visible={true}
          onClose={onClose}
          closable={false}
          extra={
            <Space>
              <Button onClick={onClose}>取消</Button>
              <Button onClick={onClose} type="primary">
                提交
              </Button>
            </Space>
          }
        >
          <Form initialValues={currentRow} style={{ marginTop: 40 }}>
            <Form.Item hidden={true} label="sysid" name="Sysid">
              <Input />
            </Form.Item>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Chat名" name="name" style={{ marginTop: 40 }}>
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Chat描述" name="description">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="Chart类型" name="spcTemplate">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>{' '}
            </Row>

            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="参数项" name="measurementSpec">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="edcPlan" name="edcPlan">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="planId" name="planId">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="productName" name="productName">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="stepId" name="stepId">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="lotId" name="lotId">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="equipment" name="equipment">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="loadOnStartup" name="loadOnStartup">
                  <Radio.Group>
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="显示小时数" name="historicalHours">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="显示点数" name="historicalPoints">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      ) : (
        <div />
      )}
    </PageContainer>
  );
};

export default EdcChart;
