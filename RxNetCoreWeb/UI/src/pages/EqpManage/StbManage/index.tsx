import { PageContainer } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import { CurrencySubmitFormLayout } from '../../../utils/formLayout';
import type { ProColumns } from '@ant-design/pro-table';
import styles from  './stb.css';
import {
  Button,
  Card,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Space,
  Row,
  Select,
  Modal
} from 'antd';
import { useEffect, useState , useRef } from 'react';

import { getEqpParts, addEqpParts, updateEqpParts, deleteEqpParts, ConfirmData } from './stbManageApi';

type TableListItem = {
  EQPID: string,
  PARTNO: string,
  MOUDLE: string,
  LOCATION: string,
  TYPES: string,
  DATA: string,
  ERROR_SPEC: number,
  WARN_SPEC: number,
  PARTS_NAME:string,
  DEPARTMENT: string,
  DESCRIPTION: string,
  STATUS:string
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const StbManage = () => {

  const [currentRow, setCurrentRow] = useState<TableListItem>();
  let updateForm = useRef();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [Record, setRecord] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const [searchForm] = Form.useForm();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [allModule, setAllModule] = useState<any>([]);
  const [allTYPE, setTYPE] = useState<any>([]);
  const [showDeleteDia, setShowDeleteDia] = useState<boolean>(false);
  const [showreset, setreset] = useState<boolean>(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 80,
      title: '设备ID',
      dataIndex: 'EQPID',
    },
    {
      width: 80,
      title: '有效值截至',
      dataIndex: 'TIME',
    },
    {
      width: 80,
      title: '   数据',
      dataIndex: 'DATA',
    },
    {
      width: 80,
      title: '备件料号',
      dataIndex: 'PARTNO',
    },
    {
      width: 80,
      title: 'PARTS_NAME',
      dataIndex: 'PARTS_NAME',
    },
    {
      width: 80,
      title: '模组',
      dataIndex: 'MOUDLE',
    },
    {
      width: 50,
      title: 'Location',
      dataIndex: 'LOCATION',
    },
    {
      width: 80,
      title: '类型',
      dataIndex: 'TYPES',
    },
    {
      width: 80,
      title: '所属部门',
      dataIndex: 'DEPARTMENT',
    },
    {
      width: 80,
      title: '备件描述',
      dataIndex: 'DESCRIPTION',
    },
    {
      width: 80,
      title: 'ERROR_SPEC',
      dataIndex: 'ERROR_SPEC',
    },
    {
      width: 80,
      title: 'WARN_SPEC',
      dataIndex: 'WARN_SPEC',
    },
    {
      width: 50,
      title: '状态',
      dataIndex: 'STATUS',
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
            setRecord(true);
            setDrawerTitle('输入数据');
          }}
        >
          记录
        </a>,
        <a
          onClick={() => {
            setCurrentRow(record);
            setreset(true)
          }}
        >
          复位
        </a>,
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
        value: '扩散部',
        label: '扩散部',
      },
      {
        value: '光刻部',
        label: '光刻部',
      },
      {
        value: '腐蚀部',
        label: '腐蚀部',
      },
      {
        value: '设施部',
        label: '设施部',
      },
    ]);
    setTYPE([
      {
        value: 'TIME(天)',
        label: 'TIME(天)',
      },
      {
        value: 'WAFER_COUNT(整数)',
        label: 'WAFER_COUNT(整数)',
      },
      {
        value: 'RF TIME (小时)',
        label: 'RF TIME (小时)',
      },
      {
        value: 'THK_COUNT(um)',
        label: 'THK_COUNT(um)',
      },
    ]);
  }, [getEqpParts]);


  const reset = () => {
    (async () => {
      let resp = await ConfirmData({
        nDATA: 0,
        nERROR_SPEC: currentRow?.ERROR_SPEC,
        nWARN_SPEC: currentRow?.WARN_SPEC,
        nPARTS_NAME: currentRow?.PARTS_NAME,
        nPARTNO: currentRow?.PARTNO,
        nMOUDLE: currentRow?.MOUDLE
      });
      if (resp.data == "sucess") {
        message.success("更新成功!");
        setreset(false)
        onClose();
        onReset();
      } else {
        message.error(resp.data);
        setreset(false)
        onClose();
        onReset();
        return;
      }
    })();
  };

  const onSearch = (values: any) => {
    (async () => {
      let resp = await getEqpParts(values);
      setTableListData(resp.data);
    })();
  };

  const deleteDiaOK = () => {
    (async () => {
      let resp = await deleteEqpParts({
        PARTNO: currentRow?.PARTNO,
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

  const onsubmit = () => {
    if (drawerTitle == "新增备件") {
      let data = updateForm.current.getFieldsValue();
      if (data.MOUDLE == null || data.MOUDLE == undefined || data.MOUDLE.trim() == "") {
        message.error("请选择模组!");
        return;
      }
      if (data.EQPID == null || data.EQPID == undefined || data.EQPID.trim() == "") {
        message.error("请输入设备!");
        return;
      }
      if (data.TYPES == null || data.TYPES == undefined || data.TYPES.trim() == "") {
        message.error("请输入设备类型!");
        return;
      }
      if (data.LOCATION == null || data.LOCATION == undefined || data.LOCATION.trim() == "") {
        message.error("请选择所处区域!");
        return;
      }
      if (data.PARTNO == null || data.PARTNO == undefined || data.PARTNO.trim() == "") {
        message.error("请选择料号!");
        return;
      }
      if (data.LIFE == null || data.LIFE == undefined || data.LIFE.trim() == "") {
        message.error("请输入生命时长!");
        return;
      }
      if (data.DEPARTMENT == null || data.DEPARTMENT == undefined || data.DEPARTMENT.trim() == "") {
        message.error("请选择部门!");
        return;
      }
      if (data.DESCRIPTION == null || data.DESCRIPTION == undefined || data.DESCRIPTION.trim() == "") {
        message.error("请描述!");
        return;
      }
      if (data.ERROR_SPEC == null || data.ERROR_SPEC == undefined || data.ERROR_SPEC.trim() == "") {
        message.error("请输入ERROR_SPEC!");
        return;
      }
      if (data.WARN_SPEC == null || data.WARN_SPEC == undefined || data.WARN_SPEC.trim() == "") {
        message.error("请输入WARN_SPEC!");
        return;
      }
      if (data.PARTS_NAME == null || data.PARTS_NAME == undefined || data.PARTS_NAME.trim() == "") {
        message.error("请输入PARTS_NAME!");
        return;
      }
      (async () => {
        let resp = await addEqpParts(data);
        if (resp.data == "success") {
          onClose();
          onReset();
        } else {
          onClose();
          onReset();
          return;
        }
      })();
    }
    else if (drawerTitle == "修改设备部件") {
      let nData = updateForm.current.getFieldsValue();
      if (nData.MOUDLE == null || nData.MOUDLE == undefined || nData.MOUDLE.trim() == "") {
        message.error("请选择模组!");
        return;
      }
      if (nData.EQPID == null || nData.EQPID == undefined || nData.EQPID.trim() == "") {
        message.error("请输入设备!");
        return;
      }
      if (nData.TYPES == null || nData.TYPES == undefined || nData.TYPES.trim() == "") {
        message.error("请输入设备类型!");
        return;
      }
      if (nData.LOCATION == null || nData.LOCATION == undefined || nData.LOCATION.trim() == "") {
        message.error("请选择所处区域!");
        return;
      }
      if (nData.PARTNO == null || nData.PARTNO == undefined || nData.PARTNO.trim() == "") {
        message.error("请选择料号!");
        return;
      }
      if (nData.LIFE == null || nData.LIFE == undefined || nData.LIFE.trim() == "") {
        message.error("请输入生命时长!");
        return;
      }
      if (nData.DEPARTMENT == null || nData.DEPARTMENT == undefined || nData.DEPARTMENT.trim() == "") {
        message.error("请选择部门!");
        return;
      }
      if (nData.DESCRIPTION == null || nData.DESCRIPTION == undefined || nData.DESCRIPTION.trim() == "") {
        message.error("请描述!");
        return;
      }
      let data = {
        nMOUDLE: nData.MOUDLE,
        nEQPID: nData.EQPID,
        nTYPES: nData.TYPES,
        nLOCATION: nData.LOCATION,
        nPARTNO: nData.PARTNO,
        nLIFE: nData.LIFE,
        nDEPARTMENT: nData.DEPARTMENT,
        nDESCRIPTION: nData.DESCRIPTION,

        nERROR_SPEC: nData.ERROR_SPEC,
        nWARN_SPEC: nData.WARN_SPEC,
        nPARTS_NAME: nData.PARTS_NAME
      };
      (async () => {
        let resp = await updateEqpParts(data);
        if (resp.data == "sucess") {
          message.success("更新成功!");
          onClose();
          onReset();
        } else {
          onClose();
          onReset();
          return;
        }
      })();
    }
    else  {
      let DAta = updateForm.current.getFieldsValue();
      if (DAta.SetDATA == null || DAta.SetDATA == undefined || DAta.SetDATA.trim() == "") {
        message.error("请输入数据!");
        return;
      }
      let data = {
        nDATA: DAta.SetDATA,
        nERROR_SPEC: DAta.ERROR_SPEC,
        nWARN_SPEC: DAta.WARN_SPEC,
        nPARTS_NAME: DAta.PARTS_NAME,
        nPARTNO: DAta.PARTNO,
        nMOUDLE: DAta.MOUDLE,
        nTYPES: DAta.TYPES
      };
      (async () => {
        console.log( "SET" +DAta.SetDATA  , "ERROR"+ DAta.ERROR_SPEC , "WARN" + DAta.WARN_SPEC, DAta.PARTS_NAME, DAta.PARTNO, DAta.MOUDLE, DAta.TYPES)
        if (DAta.SetDATA > DAta.ERROR_SPEC) {
          message.error("此数据严重不符！！！请您于工程师确认");
        }
        else if (DAta.SetDATA >= DAta.WARN_SPEC && DAta.SetDATA < DAta.ERROR_SPEC) {
          message.error("数据高于警戒线！！！ 请确认数据是否异常, 正在执行插入操作");

          if (DAta.SetDATA < DAta.DATA) {

            message.error("数据低于原数据！请确认输入无误");

          } else {

            let resp = await ConfirmData(data);
            if (resp.data == "sucess") {
              message.success("更新成功!");
              onClose();
              onReset();
            } else {
              message.error(resp.data);
              onClose();
              onReset();
              return;
            }
          }


        }
        else if (DAta.SetDATA < DAta.DATA) {
          message.error("数据低于原数据！请确认输入无误");
          let resp = await ConfirmData(data);
          if (resp.data == "sucess") {
            message.success("更新成功!");
            onClose();
            onReset();
          } else {
            message.error(resp.data);
            onClose();
            onReset();
            return;
          }
        } else {
          message.error("正常");
          let resp = await ConfirmData(data);
          if (resp.data == "sucess") {
            message.success("更新成功!");
            onClose();
            onReset();
          } else {
            message.error(resp.data);
            onClose();
            onReset();
            return;
          }
        }
          
      }

      )();
    } 
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


  const deleteDiaCancle = () => {
    setShowDeleteDia(false);
    setreset(false);
  };

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
    setRecord(false);
  };



  return (
    <PageContainer>


      <Card style={{ marginBottom: 20 }}>
        <Form style={{ marginTop: 20 }} form={searchForm} onFinish={onSearch}  >
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="模组" name="MOUDLE">
                <Select placeholder="请选择" showSearch>
                  {allModule.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="设备ID" name="EQPID" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Location" name="LOCATION" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="料号" name="PARTNO" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="部门" name="DEPARTMENT" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="状态" name="STATUS" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item {...CurrencySubmitFormLayout} >
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
        headerTitle="备件库备件管理"
        rowKey="Partno"
        search={false}
        dataSource={tableListData}
        rowClassName={e => ( e.STATUS === '健康' ? styles.blue : styles.red )}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setShowDetail(true);
              setDrawerTitle('新增备件');
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        columns={columns}
        scroll={{ x: 3000 }}
      />

      {Record ? (
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
          <Form initialValues={currentRow} style={{ marginTop: 0 }} ref={updateForm} >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="数据" name="SetDATA" style={{ marginLeft: 0 }}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="模组" name="MOUDLE" style={{ marginLeft: 0 }}>
              <Select placeholder="请选择" showSearch>
                {allModule.map((element: { value: any; label: any; }) => (
                  <Select.Option value={element.value} key={element.value}>
                    {element.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="ERROR_SPEC" name="ERROR_SPEC">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="类型" name="TYPES">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="原数据" name="DATA">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="WARN_SPEC" name="WARN_SPEC">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PARTS_NAME" name="PARTS_NAME">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PARTNO" name="PARTNO">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      ) : (
        <div />
      )}


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
          <Form initialValues={currentRow}  style={{ marginTop: 0 }} ref={updateForm} >
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
                <Form.Item label="设备ID" name="EQPID">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="备件类型" name="TYPES">
                  <Select placeholder="请选择" showSearch>
                    {allTYPE.map((element: { value: any; label: any; }) => (
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
                <Form.Item label="LOCATION" name="LOCATION">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PARTNO" name="PARTNO">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="生命周期" name="LIFE">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="备件描述" name="DESCRIPTION">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="所属部门" name="DEPARTMENT">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="ERROR_SPEC" name="ERROR_SPEC">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="WARN_SPEC" name="WARN_SPEC">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PARTS_NAME" name="PARTS_NAME">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      ) : (
        <div />
      )}
      {showreset ? (
        <div>
          <Modal title="提示" visible={true} onOk={reset} onCancel={deleteDiaCancle}>
            <p>确认复位数据归零?</p>
          </Modal>
        </div>) : (
        null
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

export default StbManage;
