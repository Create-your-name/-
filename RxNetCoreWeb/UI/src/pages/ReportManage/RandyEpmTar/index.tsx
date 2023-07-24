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
import { getRandyEpmTar, addRandyEpmTar, updateRandyEpmTar, delRandyEpmTar } from './RandyEpmTarApi';

type TableListItem = {
  PTYPE: string,
  MP: number,
  DAY1: number,
  DAY2: number,
  DAY3: number,
  DAY4: number,
  DAY5: number,
  DAY6: number,
  DAY7: number,
  DAY8: number,
  DAY9: number,
  DAY10: number,
  DAY11: number,
  DAY12: number,
  DAY13: number,
  DAY14: number,
  DAY15: number,
  DAY16: number,
  DAY17: number,
  DAY18: number,
  DAY19: number,
  DAY20: number,
  DAY21: number,
  DAY22: number,
  DAY23: number,
  DAY24: number,
  DAY25: number,
  DAY26: number,
  DAY27: number,
  DAY28: number,
  DAY29: number,
  DAY30: number,
  DAY31: number,
  REPDATE: string,
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const RandyEpmTar = () => {
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
      title: 'PTYPE',
      dataIndex: 'PTYPE',
    },
    {
      width: 50,
      title: 'MP',
      dataIndex: 'MP',
    },
    {
      width: 50,
      title: 'DAY1',
      dataIndex: 'DAY1',
    },
    {
      width: 50,
      title: 'DAY2',
      dataIndex: 'DAY2',
    },
    {
      width: 50,
      title: 'DAY3',
      dataIndex: 'DAY3',
    },
    {
      width: 50,
      title: 'DAY4',
      dataIndex: 'DAY4',
    },
    {
      width: 50,
      title: 'DAY5',
      dataIndex: 'DAY5',
    },
    {
      width: 50,
      title: 'DAY6',
      dataIndex: 'DAY6',
    },
    {
      width: 50,
      title: 'DAY7',
      dataIndex: 'DAY7',
    },
    {
      width: 50,
      title: 'DAY8',
      dataIndex: 'DAY8',
    },
    {
      width: 50,
      title: 'DAY9',
      dataIndex: 'DAY9',
    },
    {
      width: 50,
      title: 'DAY10',
      dataIndex: 'DAY10',
    },
    {
      width: 50,
      title: 'DAY11',
      dataIndex: 'DAY11',
    },
    {
      width: 50,
      title: 'DAY12',
      dataIndex: 'DAY12',
    },
    {
      width: 50,
      title: 'DAY13',
      dataIndex: 'DAY13',
    },
    {
      width: 50,
      title: 'DAY14',
      dataIndex: 'DAY14',
    },
    {
      width: 50,
      title: 'DAY15',
      dataIndex: 'DAY15',
    },
    {
      width: 50,
      title: 'DAY16',
      dataIndex: 'DAY16',
    },
    {
      width: 50,
      title: 'DAY17',
      dataIndex: 'DAY17',
    },
    {
      width: 50,
      title: 'DAY18',
      dataIndex: 'DAY18',
    },
    {
      width: 50,
      title: 'DAY19',
      dataIndex: 'DAY19',
    },
    {
      width: 50,
      title: 'DAY20',
      dataIndex: 'DAY20',
    },
    {
      width: 50,
      title: 'DAY21',
      dataIndex: 'DAY21',
    },
    {
      width: 50,
      title: 'DAY22',
      dataIndex: 'DAY22',
    },
    {
      width: 50,
      title: 'DAY23',
      dataIndex: 'DAY23',
    },
    {
      width: 50,
      title: 'DAY24',
      dataIndex: 'DAY24',
    },
    {
      width: 50,
      title: 'DAY25',
      dataIndex: 'DAY25',
    },
    {
      width: 50,
      title: 'DAY26',
      dataIndex: 'DAY26',
    },
    {
      width: 50,
      title: 'DAY27',
      dataIndex: 'DAY27',
    },
    {
      width: 50,
      title: 'DAY28',
      dataIndex: 'DAY28',
    },
    {
      width: 50,
      title: 'DAY29',
      dataIndex: 'DAY29',
    },
    {
      width: 50,
      title: 'DAY30',
      dataIndex: 'DAY30',
    },
    {
      width: 50,
      title: 'DAY31',
      dataIndex: 'DAY31',
    },
    {
      width: 100,
      title: 'REPDATE',
      dataIndex: 'REPDATE',
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
            setDrawerTitle('修改');
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
      let resp = await getRandyEpmTar();
      setTableListData(
        resp.data
      );
    })();
  }, [getRandyEpmTar]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onsubmit = () => {
    if (drawerTitle == "新增") {
      let data = updateForm.current.getFieldsValue();
      (async () => {
        let resp = await addRandyEpmTar(data);
        if (resp.data == 1) {
          message.success("新增成功!");
          onClose();
          onReset();
        } else {
          message.error(resp.data);
          return;
        }
      })();
    } else {
      let data = updateForm.current.getFieldsValue();
      (async () => {
        let resp = await updateRandyEpmTar(data);
        if (resp.data == 1) {
          message.success("修改成功!");
          onClose();
          onReset();
        } else {
          message.error(resp.data);
          return;
        }
      })();
    }
  };

  const deleteDiaOK = () => {
    (async () => {
      let resp = await delRandyEpmTar({
        PTYPE: currentRow?.PTYPE,
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
      let resp = await getRandyEpmTar();
      setTableListData(
        resp.data
      );
    })();
  };

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="RANDY_EPM_TAR列表"
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
              <Col span={24}>
                <Form.Item label="PTYPE" name="PTYPE">
                  <Input disabled={drawerTitle == "新增" ? false : true} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="MP" name="MP">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY1" name="DAY1">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY2" name="DAY2">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY3" name="DAY3">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY4" name="DAY4">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY5" name="DAY5">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY6" name="DAY6">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY7" name="DAY7">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY8" name="DAY8">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY9" name="DAY9">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY10" name="DAY10">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY11" name="DAY11">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY12" name="DAY12">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY13" name="DAY13">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY14" name="DAY14">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY15" name="DAY15">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY16" name="DAY16">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY17" name="DAY17">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY18" name="DAY18">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY19" name="DAY19">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY20" name="DAY20">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY21" name="DAY21">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY22" name="DAY22">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY23" name="DAY23">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY24" name="DAY24">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY25" name="DAY25">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY26" name="DAY26">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY27" name="DAY27">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY28" name="DAY28">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY29" name="DAY29">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="DAY30" name="DAY30">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="DAY31" name="DAY31">
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

export default RandyEpmTar;
