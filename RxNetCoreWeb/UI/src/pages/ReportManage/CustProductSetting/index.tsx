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
import { getCustProductSetting, addCustProductSetting, delCustProductSetting } from './CustProductSettingApi';

type TableListItem = {
  PRODUCT: string,
  WAFERTYPE: string,
  ISBE: string,
  BEPRODUCTNAME: string,
  SREMARK: string,
  PROCESSCODE: string,
  PROCESSTYPE: string,
  PROCESSGROUP: string,
  MOTHERPART: string,
  WBFLAG: string,
  DIENUM: number,
  OWNER: string,
  MODULE: string,
  QACONTROL: string,
  PRODSTATUS: string,
  COMMENTS: string,
  CUSCODE: string,
  CUSPROD: string,
  THICKFILM: number,
  PHOTOS: number,
  STATUS: string,
  DATETIME: string,
  CUSNO: string,
  QUENAME: string,
  PROCESSTECH: number,
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const CustProductSetting = () => {
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
      title: 'PRODUCT',
      dataIndex: 'PRODUCT',
    },
    {
      width: 100,
      title: 'WAFERTYPE',
      dataIndex: 'WAFERTYPE',
    },
    {
      width: 100,
      title: 'ISBE',
      dataIndex: 'ISBE',
    },
    {
      width: 100,
      title: 'BEPRODUCTNAME',
      dataIndex: 'BEPRODUCTNAME',
    },
    {
      width: 100,
      title: 'SREMARK',
      dataIndex: 'SREMARK',
    },
    {
      width: 100,
      title: 'PROCESSCODE',
      dataIndex: 'PROCESSCODE',
    },
    {
      width: 100,
      title: 'PROCESSTYPE',
      dataIndex: 'PROCESSTYPE',
    },
    {
      width: 100,
      title: 'PROCESSGROUP',
      dataIndex: 'PROCESSGROUP',
    },
    {
      width: 100,
      title: 'MOTHERPART',
      dataIndex: 'MOTHERPART',
    },
    {
      width: 100,
      title: 'WBFLAG',
      dataIndex: 'WBFLAG',
    },
    {
      width: 100,
      title: 'DIENUM',
      dataIndex: 'DIENUM',
    },
    {
      width: 100,
      title: 'OWNER',
      dataIndex: 'OWNER',
    },
    {
      width: 100,
      title: 'MODULE',
      dataIndex: 'MODULE',
    },
    {
      width: 100,
      title: 'QACONTROL',
      dataIndex: 'QACONTROL',
    },
    {
      width: 100,
      title: 'PRODSTATUS',
      dataIndex: 'PRODSTATUS',
    },
    {
      width: 100,
      title: 'COMMENTS',
      dataIndex: 'COMMENTS',
    },
    {
      width: 100,
      title: 'CUSCODE',
      dataIndex: 'CUSCODE',
    },
    {
      width: 100,
      title: 'CUSPROD',
      dataIndex: 'CUSPROD',
    },
    {
      width: 100,
      title: 'THICKFILM',
      dataIndex: 'THICKFILM',
    },
    {
      width: 100,
      title: 'PHOTOS',
      dataIndex: 'PHOTOS',
    },
    {
      width: 100,
      title: 'STATUS',
      dataIndex: 'STATUS',
    },
    {
      width: 100,
      title: 'DATETIME',
      dataIndex: 'DATETIME',
    },
    {
      width: 100,
      title: 'CUSNO',
      dataIndex: 'CUSNO',
    },
    {
      width: 100,
      title: 'QUENAME',
      dataIndex: 'QUENAME',
    },
    {
      width: 100,
      title: 'PROCESSTECH',
      dataIndex: 'PROCESSTECH',
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
      let resp = await getCustProductSetting();
      setTableListData(
        resp.data
      );
    })();
  }, [getCustProductSetting]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
  };

  const onsubmit = () => {
    let data = updateForm.current.getFieldsValue();
    (async () => {
      let resp = await addCustProductSetting(data);
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
      let resp = await delCustProductSetting({
        PRODUCT: currentRow?.PRODUCT,
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
      let resp = await getCustProductSetting();
      setTableListData(
        resp.data
      );
    })();
  };

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="CUST_PRODUCT_SETTING列表"
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
                <Form.Item label="PRODUCT" name="PRODUCT">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="WAFERTYPE" name="WAFERTYPE">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="ISBE" name="ISBE">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="BEPRODUCTNAME" name="BEPRODUCTNAME">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="SREMARK" name="SREMARK">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PROCESSCODE" name="PROCESSCODE">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PROCESSTYPE" name="PROCESSTYPE">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PROCESSGROUP" name="PROCESSGROUP">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="MOTHERPART" name="MOTHERPART">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="WBFLAG" name="WBFLAG">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="DIENUM" name="DIENUM">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="OWNER" name="OWNER">
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
                <Form.Item label="QACONTROL" name="QACONTROL">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PRODSTATUS" name="PRODSTATUS">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="COMMENTS" name="COMMENTS">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="CUSCODE" name="CUSCODE">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CUSPROD" name="CUSPROD">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="THICKFILM" name="THICKFILM">
                  <Input type='number' />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PHOTOS" name="PHOTOS">
                  <Input type='number' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="STATUS" name="STATUS">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="CUSNO" name="CUSNO">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="QUENAME" name="QUENAME">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PROCESSTECH" name="PROCESSTECH">
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

export default CustProductSetting;
