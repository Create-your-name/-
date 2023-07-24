import { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Col, Drawer, Form, Input, Row, Space } from 'antd';
import { queryChatTemplatec } from './charTemplateApi';

type DefaultParameters = {
  property: string;
  value: string;
  Sysid: string;
};

type TableListItem = {
  Name: string;
  Description: string;
  spcTemplate: string;
  defaultParameters: DefaultParameters[];
  Sysid: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const CharTemplate = () => {
  const [currentRow, setCurrentRow] = useState<DefaultParameters>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const [parametersData, setParametersData] = useState<DefaultParameters[]>([]);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '模板名称',
      dataIndex: 'Name',
    },
    {
      title: '模板描述',
      dataIndex: 'Description',
    },
    {
      title: 'spcTemplate',
      dataIndex: 'spcTemplate',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <a
          key="Sysid"
          onClick={() => {
            setParametersData(record.defaultParameters);
          }}
        >
          查看
        </a>,
      ],
    },
  ];

  const parametersColumns: ProColumns<DefaultParameters>[] = [
    {
      title: '参数名',
      dataIndex: 'property',
    },
    {
      title: '默认值',
      dataIndex: 'value',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <a
          key="Sysid"
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          修改
        </a>,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      let resp = await queryChatTemplatec({})
      setTableListData(resp.data);
      setParametersData(resp.data[0].defaultParameters);
    })();
  }, [queryChatTemplatec]);

  const onClose = () => {
    // setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onCloseAdd = () => {
    // setCurrentRow(undefined);
    setShowAdd(false);
  };

  return (
    <PageContainer>
      <Row>
        <Col span={12}>
          <ProTable<TableListItem, TableListPagination>
            headerTitle="CharTemplate列表"
            actionRef={actionRef}
            rowKey="Sysid"
            search={
              false
            }
            dataSource={tableListData}
            toolBarRender={() => [
              // <Button
              //   type="primary"
              //   key="primary"
              //   onClick={() => {
              //     setShowDetail(true);
              //   }}
              // >
              //   <PlusOutlined /> 新增
              // </Button>,
            ]}
            columns={columns}
            scroll={{ x: '100%' }}
          />
        </Col>
        <Col span={12}>
          <ProTable<DefaultParameters, TableListPagination>
            style={{ marginLeft: 20 }}
            headerTitle="CharTemplate参数"
            actionRef={actionRef}
            rowKey="sysid"
            search={
              false
            }
            dataSource={parametersData}
            columns={parametersColumns}
            scroll={{ x: '100%' }}
          />
        </Col>
      </Row>

      {
        showDetail ? (
          <Drawer
            width={600}
            visible={showDetail}
            onClose={onClose}
            closable={false}
            extra={
              <Space>
                {/* <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button> */}
              </Space>
            }
          >
            <Form initialValues={currentRow}
              style={{ marginTop: 40 }}

            >
              <Form.Item
                hidden={true}
                label="sysid"
                name="sysid"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="old value"
                name="value"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="new value"
                name="newValue"
              >
                <Input />
              </Form.Item>
            </Form>
          </Drawer>
        ) : <div />
      }


      <Drawer
        width={600}
        visible={showAdd}
        onClose={onCloseAdd}
        closable={false}
        extra={
          <Space>
            {/* <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button> */}
          </Space>
        }
      >
      </Drawer>
    </PageContainer>
  );
}

export default CharTemplate;