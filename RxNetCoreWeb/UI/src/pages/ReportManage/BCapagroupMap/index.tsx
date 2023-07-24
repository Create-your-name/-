import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  message,
  Modal
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getBCapagroupMap, addBCapagroupMap, delBCapagroupMap } from './BCapagroupMapApi';

type TableListItem = {
  RECPNAME: string,
  RECPDESC: string,
  MODULE: string,
  CAPABILITY: string,
  CAPA_GROUP: string,
  EQPID: string,
  SORTNUM: number,
  CAPA_TYPE: string,
  UPDATED_DATE: string,
  SCT: number,
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const BCapagroupMap = () => {
  let updateForm = useRef();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const [showDeleteDia, setShowDeleteDia] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 100,
      title: 'RECPNAME',
      dataIndex: 'RECPNAME',
    },
    {
      width: 100,
      title: 'RECPDESC',
      dataIndex: 'RECPDESC',
    },
    {
      width: 100,
      title: 'MODULE',
      dataIndex: 'MODULE',
    },
    {
      width: 100,
      title: 'CAPABILITY',
      dataIndex: 'CAPABILITY',
    },
    {
      width: 100,
      title: 'CAPA_GROUP',
      dataIndex: 'CAPA_GROUP',
    },
    {
      width: 100,
      title: 'EQPID',
      dataIndex: 'EQPID',
    },
    {
      width: 100,
      title: 'SORTNUM',
      dataIndex: 'SORTNUM',
    },
    {
      width: 100,
      title: 'CAPA_TYPE',
      dataIndex: 'CAPA_TYPE',
    },
    {
      width: 100,
      title: 'UPDATED_DATE',
      dataIndex: 'UPDATED_DATE',
    },
    {
      width: 100,
      title: 'SCT',
      dataIndex: 'SCT',
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
      let resp = await getBCapagroupMap();
      setTableListData(
        resp.data
      );
    })();
  }, [getBCapagroupMap]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onsubmit = () => {
    let data = updateForm.current.getFieldsValue();
    (async () => {
      let resp = await addBCapagroupMap(data);
      if (resp.data == 1) {
        message.success("新增成功!");
        onClose();
        onReset();
      } else {
        message.error(resp.data);
        return;
      }
    })();
  };

  const deleteDiaOK = () => {
    (async () => {
      let resp = await delBCapagroupMap({
        RECPNAME: currentRow?.RECPNAME,
      });
      if (resp.data == 1) {
        message.success("删除成功!");
        setShowDeleteDia(false);
        onClose();
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

  const onReset = () => {
    (async () => {
      let resp = await getBCapagroupMap();
      setTableListData(
        resp.data
      );
    })();
  };

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="B_CAPAGROUP_MAP列表"
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
              setDrawerTitle('新增');
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
              <Button onClick={onsubmit} type="primary">
                提交
              </Button>
            </Space>
          }
        >
          <Form initialValues={currentRow} style={{ marginTop: 0 }} ref={updateForm}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="RECPNAME" name="RECPNAME">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="RECPDESC" name="RECPDESC">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="MODULE" name="MODULE">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CAPABILITY" name="CAPABILITY">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="CAPA_GROUP" name="CAPA_GROUP">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="EQPID" name="EQPID">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="SORTNUM" name="SORTNUM">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CAPA_TYPE" name="CAPA_TYPE">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="SCT" name="SCT">
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

export default BCapagroupMap;
