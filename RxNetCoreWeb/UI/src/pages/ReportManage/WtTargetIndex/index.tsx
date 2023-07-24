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
import { getWtTargetIndex, addWtTargetIndex, delWtTargetIndex } from './WtTargetIndexApi';

type TableListItem = {
  NY: string,
  PMOBJECT: string,
  PMITEM: string,
  TARGET: number,
  PMDESC: string,
  TARGET2: number,
  TARGET3: number,
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const WtTargetIndex = () => {
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
      title: 'NY',
      dataIndex: 'NY',
    },
    {
      width: 100,
      title: 'PMOBJECT',
      dataIndex: 'PMOBJECT',
    },
    {
      width: 100,
      title: 'PMITEM',
      dataIndex: 'PMITEM',
    },
    {
      width: 100,
      title: 'TARGET',
      dataIndex: 'TARGET',
    },
    {
      width: 100,
      title: 'PMDESC',
      dataIndex: 'PMDESC',
    },
    {
      width: 100,
      title: 'TARGET2',
      dataIndex: 'TARGET2',
    },
    {
      width: 100,
      title: 'TARGET3',
      dataIndex: 'TARGET3',
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
      let resp = await getWtTargetIndex();
      setTableListData(
        resp.data
      );
    })();
  }, [getWtTargetIndex]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onsubmit = () => {
    let data = updateForm.current.getFieldsValue();
    (async () => {
      let resp = await addWtTargetIndex(data);
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
      let resp = await delWtTargetIndex({
        NY: currentRow?.NY,
        PMOBJECT: currentRow?.PMOBJECT,
        PMITEM: currentRow?.PMITEM,
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
      let resp = await getWtTargetIndex();
      setTableListData(
        resp.data
      );
    })();
  };

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="WT_TARGET_INDEX列表"
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
                <Form.Item label="NY" name="NY">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PMOBJECT" name="PMOBJECT">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PMITEM" name="PMITEM">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="TARGET" name="TARGET">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PMDESC" name="PMDESC">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="TARGET2" name="TARGET2">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="TARGET3" name="TARGET3">
                  <Input type='number' />
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

export default WtTargetIndex;
