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
  Row,
  Select,
  Space,
  message,
  Modal
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getEqpParts, addEqpParts, deleteEqpParts, updateEqpParts } from './EqpPartsManageApi';

type TableListItem = {
  MOUDLE: string,
  PARTNO: string,
  PARTNAME: string,
  LIFE: string,
  DEPT_INDEX: string,
  MATERIAL_STATUS_INDEX: string,
  STATUS: String,
  PARTNUMBER: string,
  PARTSERIES: string,
  OPERATOR: string,
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const EqpPartsManage = () => {
  const [searchForm] = Form.useForm();
  let updateForm = useRef();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();
  const [allModule, setAllModule] = useState<any>([]);
  const [showDeleteDia, setShowDeleteDia] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 80,
      title: '模组',
      dataIndex: 'MOUDLE',
    },
    {
      width: 200,
      title: '部件料号',
      dataIndex: 'PARTNO',
    },
    {
      width: 200,
      title: '部件名',
      dataIndex: 'PARTNAME',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      fixed: 'right',
      render: (_, record) => [
        <a
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
            setDrawerTitle('修改设备部件');
          }}
        >
          修改
        </a>,
        <a
          onClick={() => {
            setCurrentRow(record);
            setShowDeleteDia(true)
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      let resp = await getEqpParts({});
      setTableListData(
        resp.data
      );
    })();
    setAllModule([
      {
        value: '薄膜部',
        label: '薄膜部',
      },
      {
        value: '腐蚀部',
        label: '腐蚀部',
      },
      {
        value: '光刻部',
        label: '光刻部',
      },
      {
        value: '扩散部',
        label: '扩散部',
      },
      {
        value: '设备支持部',
        label: '设备支持部',
      },
      {
        value: '外延',
        label: '外延',
      },
      {
        value: '注入',
        label: '注入',
      },
    ]);
  }, [getEqpParts]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onsubmit = () => {
    if (drawerTitle == "新增设备部件") {
      let data = updateForm.current.getFieldsValue();
      if (data.MOUDLE == null || data.MOUDLE == undefined || data.MOUDLE.trim() == "") {
        message.error("请选择模组!");
        return;
      }
      if (data.PARTNO == null || data.PARTNO == undefined || data.PARTNO.trim() == "") {
        message.error("请输入部件料号!");
        return;
      }
      if (data.PARTNAME == null || data.PARTNAME == undefined || data.PARTNAME.trim() == 0) {
        message.error("请输入部件名!");
        return;
      }
      (async () => {
        let resp = await addEqpParts(data);
        if (resp.data == "success") {
          message.success("新增成功!");
          onClose();
          onReset();
        } else {
          message.error(resp.data);
          return;
        }
      })();
    } else {
      let nData = updateForm.current.getFieldsValue();
      if (nData.MOUDLE == null || nData.MOUDLE == undefined || nData.MOUDLE.trim() == "") {
        message.error("请选择模组!");
        return;
      }
      if (nData.PARTNO == null || nData.PARTNO == undefined || nData.PARTNO.trim() == "") {
        message.error("请输入部件料号!");
        return;
      }
      if (nData.PARTNAME == null || nData.PARTNAME == undefined || nData.PARTNAME.trim() == 0) {
        message.error("请输入部件名!");
        return;
      }
      let data = {
        oMOUDLE: currentRow?.MOUDLE,
        oPARTNO: currentRow?.PARTNO,
        oPARTNAME: currentRow?.PARTNAME,
        nMOUDLE: nData.MOUDLE,
        nPARTNO: nData.PARTNO,
        nPARTNAME: nData.PARTNAME
      };
      (async () => {
        let resp = await updateEqpParts(data);
        if (resp.data == "success") {
          message.success("更新成功!");
          onClose();
          onReset();
        } else {
          message.error(resp.data);
          return;
        }
      })();
    }
  };

  const onSearch = (values: any) => {
    (async () => {
      let resp = await getEqpParts(values);
      setTableListData(
        resp.data
      );
    })();
  };

  const onReset = () => {
    (async () => {
      let resp = await getEqpParts({});
      setTableListData(
        resp.data
      );
      searchForm.resetFields();
    })();
  };

  const deleteDiaOK = () => {
    (async () => {
      let resp = await deleteEqpParts({
        MOUDLE: currentRow?.MOUDLE,
        PARTNO: currentRow?.PARTNO,
        PARTNAME: currentRow?.PARTNAME,
      });
      if (resp.data == "success") {
        message.success("删除成功!");
        setShowDeleteDia(false);
        onReset();
      } else {
        message.error(resp.data);
        return;
      }
    })();
  };

  const deleteDiaCancle = () => {
    setShowDeleteDia(false);
  };

  return (
    <PageContainer>
      <Card style={{ marginBottom: 20 }}>
        <Form style={{ marginTop: 20 }} form={searchForm} onFinish={onSearch}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="模组" name="MOUDLE">
                <Select placeholder="请选择" allowClear showSearch>
                  {allModule.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="部件料号" name="PARTNO" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="部件名" name="PARTNAME" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item >
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
        headerTitle="设备部件列表"
        actionRef={actionRef}
        rowKey="SYSID"
        search={false}
        dataSource={tableListData}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setShowDetail(true);
              setDrawerTitle('新增设备部件');
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        columns={columns}
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
              <Button onClick={onsubmit} type="primary">
                提交
              </Button>
            </Space>
          }
        >
          <Form initialValues={currentRow} style={{ marginTop: 0 }} ref={updateForm}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="模组" name="MOUDLE" style={{ marginLeft: 0 }}>
                  <Select placeholder="请选择" showSearch>
                    {allModule.map((element: { value: any; label: any; }) => (
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
                <Form.Item label="部件料号" name="PARTNO">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="部件名" name="PARTNAME">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      ) : (
        <div />
      )}
      {showDeleteDia ? (
        <div>
          <Modal title="提示" visible={true} onOk={deleteDiaOK} onCancel={deleteDiaCancle}>
            <p>确认删除?</p>
          </Modal>
        </div>) : (
        null
      )}
    </PageContainer>
  );
};

export default EqpPartsManage;
