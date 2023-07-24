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
import { getBCapagroup, addBCapagroup, delBCapagroup } from './BCapagroupApi';

type TableListItem = {
  CAPA_GROUP: string,
  DESCRIPTION: string,
  SORTNUM: number,
  CLASS1: string,
  KEYCAPA: string,
  FORE_KEY: string,
  MODULE: string,
  SORTNUM1: string,
  CLASS2: string,
  CLASS3: string,
  CLASS4: number,
  XIANSHI_NUMBER: number,
  CONTINUUM: number,
  TARGET: number,
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const BCapagroup = () => {
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
      title: 'CAPA_GROUP',
      dataIndex: 'CAPA_GROUP',
    },
    {
      width: 100,
      title: 'DESCRIPTION',
      dataIndex: 'DESCRIPTION',
    },
    {
      width: 100,
      title: 'SORTNUM',
      dataIndex: 'SORTNUM',
    },
    {
      width: 100,
      title: 'CLASS1',
      dataIndex: 'CLASS1',
    },
    {
      width: 100,
      title: 'KEYCAPA',
      dataIndex: 'KEYCAPA',
    },
    {
      width: 100,
      title: 'FORE_KEY',
      dataIndex: 'FORE_KEY',
    },
    {
      width: 100,
      title: 'MODULE',
      dataIndex: 'MODULE',
    },
    {
      width: 100,
      title: 'SORTNUM1',
      dataIndex: 'SORTNUM1',
    },
    {
      width: 100,
      title: 'CLASS2',
      dataIndex: 'CLASS2',
    },
    {
      width: 100,
      title: 'CLASS3',
      dataIndex: 'CLASS3',
    },
    {
      width: 100,
      title: 'CLASS4',
      dataIndex: 'CLASS4',
    },
    {
      width: 100,
      title: 'XIANSHI_NUMBER',
      dataIndex: 'XIANSHI_NUMBER',
    },
    {
      width: 100,
      title: 'CONTINUUM',
      dataIndex: 'CONTINUUM',
    },
    {
      width: 100,
      title: 'TARGET',
      dataIndex: 'TARGET',
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
      let resp = await getBCapagroup();
      setTableListData(
        resp.data
      );
    })();
  }, [getBCapagroup]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onsubmit = () => {
    let data = updateForm.current.getFieldsValue();
    (async () => {
      let resp = await addBCapagroup(data);
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
      let resp = await delBCapagroup({
        CAPA_GROUP: currentRow?.CAPA_GROUP,
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
      let resp = await getBCapagroup();
      setTableListData(
        resp.data
      );
    })();
  };

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="B_CAPAGROUP列表"
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
                <Form.Item label="CAPA_GROUP" name="CAPA_GROUP">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="DESCRIPTION" name="DESCRIPTION">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="SORTNUM" name="SORTNUM">
                  <Input type='number'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CLASS1" name="CLASS1">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="KEYCAPA" name="KEYCAPA">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="FORE_KEY" name="FORE_KEY">
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
                <Form.Item label="SORTNUM1" name="SORTNUM1">
                  <Input type='number'/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="CLASS2" name="CLASS2">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CLASS3" name="CLASS3">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="CLASS4" name="CLASS4">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="XIANSHI_NUMBER" name="XIANSHI_NUMBER">
                  <Input type='number'/>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="CONTINUUM" name="CONTINUUM">
                  <Input type='number'/>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="TARGET" name="TARGET">
                  <Input type='number'/>
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

export default BCapagroup;
