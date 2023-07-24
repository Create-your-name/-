import { apiGetCatagory } from '@/pages/edcspc/SpcCatagory/service';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  TreeSelect,
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { queryMeasurementSpec } from './measurementSpecApi';

type TableListItem = {
  name: string;
  description: string;
  measurementType: string;
  dataType: string;
  unit: string;
  isDerived: boolean;
  autoExclude: boolean;
  allowLimitOverride: boolean;
  upperScreeningLimit: string;
  upperSpecLimit: string;
  target: string;
  lowerSpecLimit: string;
  lowerScreeningLimit: string;
  prompt: string;
  collectionType: string;
  numberOfUnits: string;
  numberOfSites: string;
  numberOfSamples: string;
  Sysid: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const MeasureSpec = () => {
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const [tempTreeValue, setTempTreeValue] = useState<any>();
  const [menuBelong, setMenuBelong] = useState<any>([]);
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const [allDataType, setAllDataType] = useState<any>([]);
  const [allMeasurementType, setAllMeasurementType] = useState<any>([]);
  const [allCollectionType, setAllCollectionType] = useState<any>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: '参数描述',
      dataIndex: 'description',
    },
    {
      title: '参数类型',
      dataIndex: 'measurementType',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
    },
    {
      title: '单位',
      dataIndex: 'unit',
    },
    {
      title: '显示上限',
      dataIndex: 'upperScreeningLimit',
    },
    {
      title: '规范上限',
      dataIndex: 'upperSpecLimit',
    },
    {
      title: '目标值',
      dataIndex: 'target',
    },
    {
      title: '规范下限',
      dataIndex: 'lowerSpecLimit',
    },
    {
      title: '显示下限',
      dataIndex: 'lowerScreeningLimit',
    },
    {
      title: 'NumberOfUnits',
      dataIndex: 'numberOfUnits',
    },
    {
      title: 'NumberOfSites',
      dataIndex: 'numberOfSites',
    },
    {
      title: 'NumberOfSamples',
      dataIndex: 'numberOfSamples',
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
            setDrawerTitle('更新MeasurementSpec');
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
            setDrawerTitle('更新MeasurementSpec');
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      let resp = await queryMeasurementSpec({});
      setTableListData(
        resp.data.map((e) => {
          return { ...e, isDerived: e.isDerived.toString() };
        }),
      );
    })();
    getCatagoryNodes();

    setAllDataType([
      {
        value: 0,
        label: 'STRING',
      },
      {
        value: 1,
        label: 'INTEGER',
      },
      {
        value: 2,
        label: 'FLOAT',
      },
    ]);

    setAllCollectionType([
      {
        value: 0,
        label: 'REQUIRED',
      },
      {
        value: 1,
        label: 'OPTIONAL',
      },
      {
        value: 2,
        label: 'DEFERABLE',
      },
    ]);
    setAllMeasurementType([
      {
        value: 0,
        label: 'ENVIRONMENT',
      },
      {
        value: 1,
        label: 'EQUIPMENT',
      },
      {
        value: 2,
        label: 'LOT',
      },
      {
        value: 3,
        label: 'SITE',
      },
      {
        value: 4,
        label: 'LWAFEROT',
      },
    ]);
  }, [queryMeasurementSpec]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onSearch = (values: any) => {
    (async () => {
      let resp = await queryMeasurementSpec(values);
      setTableListData(resp.data);
    })();
  };

  const onReset = () => {
    (async () => {
      let resp = await queryMeasurementSpec({});
      setTableListData(resp.data);
      searchForm.resetFields();
    })();
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
              <Form.Item label="名称" name="Name" style={{ marginLeft: 20 }}>
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
        headerTitle="MeasurementSpec列表"
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
              setDrawerTitle('新增MeasurementSpec');
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
              <Col span={12}>
                <Form.Item label="参数名称" name="name" style={{ marginLeft: 0 }}>
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="描述" name="description" style={{ marginLeft: 30 }}>
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="参数类型" name="measurementType">
                  <Select placeholder="请选择">
                    {allMeasurementType.map((element) => (
                      <Select.Option value={element.value} key={element.value}>
                        {element.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="数据类型" name="dataType" style={{ marginLeft: 20 }}>
                  {/* <Input disabled={isUpdate} /> */}
                  <Select placeholder="请选择">
                    {allDataType.map((element) => (
                      <Select.Option value={element.value} key={element.value}>
                        {element.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="Unit" name="unit" style={{ marginLeft: 30 }}>
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="IsDerived" name="isDerived" style={{ marginLeft: 20 }}>
                  {/* <Input disabled={isUpdate} /> */}
                  <Radio.Group>
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="AutoExclude" name="autoExclude">
                  <Radio.Group>
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="允许覆盖" name="allowLimitOverride" style={{ marginLeft: 20 }}>
                  <Radio.Group>
                    <Radio value="true">是</Radio>
                    <Radio value="false">否</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="显示上限" name="upperScreeningLimit">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="规格上限" name="upperSpecLimit">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="目标值" name="target" style={{ marginLeft: 15 }}>
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="规格下限" name="lowerSpecLimit">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="显示下限" name="lowerScreeningLimit">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="提示信息" name="prompt">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="CollectionType" name="collectionType">
                  <Select placeholder="请选择">
                    {allCollectionType.map((element) => (
                      <Select.Option value={element.value} key={element.value}>
                        {element.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="NumberOfUnits" name="numberOfUnits">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="NumberOfSites" name="numberOfSites">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="样本数量" name="numberOfSamples">
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

export default MeasureSpec;
