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
import { getBRepstage, addBRepstage, delBRepstage } from './BRepstageApi';

type TableListItem = {
  REPSTAGE: string,
  SORTNUM: string,
  DESCRIPTION: string,
  STAGE_LABEL: string,
  CLASS1: string,
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const BRepstage = () => {
  let updateForm = useRef();
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const [showDeleteDia, setShowDeleteDia] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 200,
      title: 'REPSTAGE',
      dataIndex: 'REPSTAGE',
    },
    {
      width: 200,
      title: 'SORTNUM',
      dataIndex: 'SORTNUM',
    },
    {
      width: 200,
      title: 'DESCRIPTION',
      dataIndex: 'DESCRIPTION',
    },
    {
      width: 200,
      title: 'STAGE_LABEL',
      dataIndex: 'STAGE_LABEL',
    },
    {
      width: 200,
      title: 'CLASS1',
      dataIndex: 'CLASS1',
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
      let resp = await getBRepstage();
      setTableListData(
        resp.data
      );
    })();
  }, [getBRepstage]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onsubmit = () => {
    let data = updateForm.current.getFieldsValue();
    (async () => {
      let resp = await addBRepstage(data);
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
      let resp = await delBRepstage({
        REPSTAGE: currentRow?.REPSTAGE,
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
      let resp = await getBRepstage();
      setTableListData(
        resp.data
      );
    })();
  };

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="B_REPSTAGE列表"
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
                <Form.Item label="REPSTAGE" name="REPSTAGE">
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
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="DESCRIPTION" name="DESCRIPTION">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="STAGE_LABEL" name="STAGE_LABEL">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="CLASS1" name="CLASS1">
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

export default BRepstage;
