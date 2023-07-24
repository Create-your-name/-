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
  Modal,
  Row,
  Select,
  Space,
  Table,
  message
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { getPMForm, addPMForm, getPMFormCheckList, updatePMForm, deletePMForm } from '@/pages/EqpManage/PmCheckList/pmCheckListApi';
import { getEqpType } from '@/pages/EqpManage/PmManage/pmManageApi';
import { ColumnsType } from 'antd/lib/table';
import { useModel } from 'umi';

interface checkListDataType {
  CHKINDEX: string;
  ITEMNAME: string;
  ITEMTYPE: string;
}

type TableListItem = {
  SYSID: string,
  FORMNAME: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const PmCheckList = () => {
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [currentAlter, setCurrentAlter] = useState<string>("add");
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const [showDeleteDia, setShowDeleteDia] = useState<boolean>(false);
  const [showActModifyModal, setShowActModifyModal] = useState<boolean>(false);
  const [currentActRow, setCurrentActRow] = useState<checkListDataType | null>();
  const [checkListData, setCheckList] = useState<any>([]);
  let updateFormRef = useRef();
  const [formDelete, setFormDelete] = useState<boolean>(false);
  const [allEqpType, setAllEqpType] = useState<any>([]);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 120,
      title: 'PM表单名称',
      dataIndex: 'FORMNAME',
    },
    {
      width: 120,
      title: '设备类型',
      dataIndex: 'EQPTYPE',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      render: (_, record) => [
        <a
          onClick={() => {
            (async () => {
              let resp = await getPMFormCheckList({ SYSID: record.SYSID });
              setCheckList(
                resp.data
              );
              setCurrentRow(record);
              setShowDetail(true);
              setIsUpdate(false);
              setDrawerTitle('查看PM表单');
            })();
          }}
        >
          查看
        </a>,
        <a
          onClick={() => {
            (async () => {
              let resp = await getPMFormCheckList({ SYSID: record.SYSID });
              setCheckList(
                resp.data
              );
              setCurrentRow(record);
              setShowDetail(true);
              setIsUpdate(true);
              setDrawerTitle('修改PM表单');
            })();
          }}
        >
          修改
        </a>,
        <a
          onClick={() => {
            setCurrentRow(record);
            setShowDeleteDia(true);
            setFormDelete(true);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  const checkListCols: ColumnsType<checkListDataType> = [
    {
      title: '序号',
      dataIndex: 'CHKINDEX',
      width: 60,
    },
    {
      title: '检验项目名',
      dataIndex: 'ITEMNAME',
      width: 120,
    },
    {
      title: '检验方式',
      dataIndex: 'ITEMTYPE',
      width: 100,
    },
    {
      title: '检验内容',
      dataIndex: 'ITEMVALUE',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => [
        <a
          onClick={() => {
            setCurrentAlter("update")
            setCurrentActRow(record)
            setShowActModifyModal(true)
          }}
        >
          {isUpdate ? '修改' : null}
        </a>,
        <a style={{ marginLeft: 10 }}
          onClick={() => {
            setCurrentActRow(record)
            setShowDeleteDia(true)
          }}
        >
          {isUpdate ? '删除' : null}
        </a>,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      let resp = await getPMForm({});
      setTableListData(
        resp.data
      );
      let resp2 = await getEqpType({});
      setAllEqpType(resp2.data.map((e: { NAME: any; }) => {
        return {
          value: e.NAME,
          label: e.NAME,
        }
      }));
    })();
  }, [getPMForm]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
    setCheckList([]);
  };

  const onAddForm = () => {
    if (drawerTitle == "新增PM表单") {
      let data = updateFormRef.current.getFieldsValue();
      if (data.FORMNAME == null || data.FORMNAME == undefined || data.FORMNAME == "") {
        message.error("请输入PM表单名称!");
        return;
      }
      if (data.EQPTYPE == null || data.EQPTYPE == undefined || data.EQPTYPE == "") {
        message.error("请选择设备类型!");
        return;
      }
      if (checkListData == null || checkListData == undefined || checkListData.length == 0) {
        message.error("请设置检验项目!");
        return;
      }
      data.checkList = checkListData;
      data.USERID = currentUser.name;
      (async () => {
        let resp = await addPMForm(data);
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
      let data = updateFormRef.current.getFieldsValue();
      if (data.FORMNAME == null || data.FORMNAME == undefined || data.FORMNAME == "") {
        message.error("请输入PM表单名称!");
        return;
      }
      if (data.EQPTYPE == null || data.EQPTYPE == undefined || data.EQPTYPE == "") {
        message.error("请选择设备类型!");
        return;
      }
      if (checkListData == null || checkListData == undefined || checkListData.length == 0) {
        message.error("请设置检验项目!");
        return;
      }
      data.checkList = checkListData;
      data.USERID = currentUser.name;
      (async () => {
        let resp = await updatePMForm(data);
        if (resp.data == "success") {
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

  const onSearch = (values: any) => {
    (async () => {
      let resp = await getPMForm(values);
      setTableListData(resp.data);
    })();
  };

  const onReset = () => {
    (async () => {
      let resp = await getPMForm({});
      setTableListData(resp.data);
      searchForm.resetFields();
    })();
  };

  const deleteDiaOK = () => {
    if (formDelete) {
      (async () => {
        let resp = await deletePMForm({ SYSID: currentRow?.SYSID, USERID: currentUser.name, });
        if (resp.data == "success") {
          message.success("删除成功!");
          setShowDeleteDia(false);
          onReset();
        } else {
          message.error(resp.data);
          return;
        }
      })();
    } else {
      let i = 0;
      setCheckList(checkListData.filter((e) => e.CHKINDEX != currentActRow?.CHKINDEX).map((e2: any) => { i++; return { ...e2, CHKINDEX: i } }));
      setShowDeleteDia(false);
    }
  };

  const deleteDiaCancle = () => {
    setShowDeleteDia(false);
  };

  const ActModifyModal = ({ info, close, type }: { info: any, close: any, type: string }) => {
    if (info.ITEMTYPE == "4") {
      let temp = info.ITEMVALUE?.split(';');
      info.MAXVALUE = temp[0];
      // info.TARGETVALUE = temp[1];
      info.MINVALUE = temp[2];
    }
    const [checkValue, setCheckValue] = useState<any>(info);
    let updateForm = useRef();
    const selectChange = (value: string) => {
      setCheckValue({ ...checkValue, ITEMTYPE: value })
    };
    const onSubmitAdd = () => {
      if (type == "update" || (info.SYSID != null && info.SYSID != undefined && info.SYSID != "")) {
        let data = updateForm.current.getFieldsValue();
        if (data.CHKINDEX == null || data.CHKINDEX == undefined || data.CHKINDEX == "") {
          data.CHKINDEX = checkListData.length + 1;
        }
        if (data.ITEMNAME == null || data.ITEMNAME == undefined || data.ITEMNAME == "") {
          message.error("请输入检验项目名!");
          return;
        }
        if (data.ITEMTYPE == null || data.ITEMTYPE == undefined || data.ITEMTYPE == "") {
          message.error("请选择检验方式!");
          return;
        }
        if ((data.ITEMTYPE == "1" || data.ITEMTYPE == "3") && (data.ITEMVALUE == null || data.ITEMVALUE == undefined || data.ITEMVALUE == "")) {
          message.error("请输入方式显示的内容!");
          return;
        }
        if (data.ITEMTYPE == "4") {
          if (data.MAXVALUE == null || data.MINVALUE == null ||
            data.MAXVALUE == "" || data.MINVALUE == "") {
            message.error("请输入最大值、最小值!");
            return;
          } else {
            // data.ITEMVALUE = data.MAXVALUE + ";" + data.TARGETVALUE + ";" + data.MINVALUE
            data.ITEMVALUE = data.MAXVALUE + "; ;" + data.MINVALUE
          }
        }
        setCheckList(checkListData.map((e: { CHKINDEX: any; }) => {
          if (e.CHKINDEX == data.CHKINDEX)
            return data;
          else return e;
        }));
        close();
      } else {
        let data = updateForm.current.getFieldsValue();
        if (data.CHKINDEX == null || data.CHKINDEX == undefined || data.CHKINDEX == "") {
          data.CHKINDEX = checkListData.length + 1;
        }
        if (data.ITEMNAME == null || data.ITEMNAME == undefined || data.ITEMNAME == "") {
          message.error("请输入检验项目名!");
          return;
        }
        if (data.ITEMTYPE == null || data.ITEMTYPE == undefined || data.ITEMTYPE == "") {
          message.error("请选择检验方式!");
          return;
        }
        if ((data.ITEMTYPE == "1" || data.ITEMTYPE == "3") && (data.ITEMVALUE == null || data.ITEMVALUE == undefined || data.ITEMVALUE == "")) {
          message.error("请输入方式显示的内容!");
          return;
        }
        if (data.ITEMTYPE == "4") {
          if (data.MAXVALUE == null || data.MINVALUE == null ||
            data.MAXVALUE == "" || data.MINVALUE == "") {
            message.error("请输入最大值、最小值!");
            return;
          } else {
            // data.ITEMVALUE = data.MAXVALUE + ";" + data.TARGETVALUE + ";" + data.MINVALUE
            data.ITEMVALUE = data.MAXVALUE + "; ;" + data.MINVALUE
          }
        }
        setCheckList([...checkListData, data]);
        close();
      }
    };

    return (
      <Modal title="检验项目" visible={true}
        width={700}
        onCancel={close}
        footer={[
          <Button key="submit" htmlType="submit" type="primary" onClick={onSubmitAdd}>
            确认
          </Button>,
          <Button key="back" onClick={close}>
            取消
          </Button>,
        ]}>
        <Form
          ref={updateForm}
          style={{ marginTop: 0 }}
          initialValues={checkValue}
        >
          <Form.Item label="序号" name="CHKINDEX" style={{ marginLeft: 0 }}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="检验项目名" name="ITEMNAME" style={{ marginLeft: 0 }}>
            <Input />
          </Form.Item>
          <Form.Item label="检验方式" name="ITEMTYPE" style={{ marginLeft: 0 }}>
            <Select placeholder="请选择" onChange={selectChange}>
              <Select.Option value={'1'} key={'1'}>
                下拉单选
              </Select.Option>
              <Select.Option value={'2'} key={'2'}>
                输入
              </Select.Option>
              <Select.Option value={'3'} key={'3'}>
                选是否
              </Select.Option>
              <Select.Option value={'4'} key={'4'}>
                数值输入
              </Select.Option>
            </Select>
          </Form.Item>
          {checkValue.ITEMTYPE == '1' ? <Form.Item label="单选内容(英文分号隔开)" name="ITEMVALUE" style={{ marginLeft: 0 }}>
            <Input />
          </Form.Item> : null}
          {checkValue.ITEMTYPE == '3' ? <Form.Item label="内容" name="ITEMVALUE" style={{ marginLeft: 0 }}>
            <Input />
          </Form.Item> : null}
          {checkValue.ITEMTYPE == '4' ?
            <>
              <Form.Item label="最大值" name="MAXVALUE" style={{ marginLeft: 0 }}>
                <Input type='number' />
              </Form.Item>
              {/* <Form.Item label="目标值" name="TARGETVALUE" style={{ marginLeft: 0 }}>
                <Input type='number' />
              </Form.Item> */}
              <Form.Item label="最小值" name="MINVALUE" style={{ marginLeft: 0 }}>
                <Input type='number' />
              </Form.Item>
            </>
            : null}
        </Form>
      </Modal >
    );
  };

  const handleEqpChange = (value: string) => {
  };

  return (
    <PageContainer>
      <Card style={{ marginBottom: 20 }}>
        <Form style={{ marginTop: 20 }} form={searchForm} onFinish={onSearch}>
          <Row gutter={20}>

            <Col span={8}>
              <Form.Item label="PM表单名称" name="FORMNAME" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="设备类型名称" name="EQPTYPE" style={{ marginLeft: 0 }}>
                <Select placeholder="请选择" onChange={handleEqpChange} allowClear showSearch>
                  {allEqpType.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
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
        headerTitle="PM列表"
        actionRef={actionRef}
        rowKey="SYSID"
        search={false}
        dataSource={tableListData}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setIsUpdate(true);
              setShowDetail(true);
              setDrawerTitle('新增PM表单');
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
              <Button onClick={onClose}>{isUpdate ? '取消' : '关闭'}</Button>
              {isUpdate ? <Button onClick={onAddForm} type="primary">
                提交
              </Button> : null}
            </Space>
          }
        >
          <Form initialValues={currentRow} style={{ marginTop: 0 }} ref={updateFormRef}>
            <Form.Item hidden={true} label="SYSID" name="SYSID">
              <Input />
            </Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PM表单名称" name="FORMNAME">
                  <Input disabled={isUpdate ? false : true} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="设备类型名称" name="EQPTYPE" style={{ marginLeft: 0 }}>
                  <Select placeholder="请选择" onChange={handleEqpChange} disabled={isUpdate ? false : true} showSearch>
                    {allEqpType.map((element: { value: any; label: any; }) => (
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
                {isUpdate ?
                  <Button key="Add" type="primary" onClick={() => { setCurrentActRow({ CHKINDEX: checkListData.length + 1 }); setShowActModifyModal(true); setCurrentAlter("add") }} style={{ marginBottom: 10 }} >
                    新增检验项目
                  </Button> : <Button style={{ marginBottom: 10 }} disabled >
                    检验项目
                  </Button>}
              </Col>
            </Row>
          </Form>
          <Table columns={checkListCols} dataSource={checkListData} pagination={false} scroll={{ x: 300, y: 500 }} bordered />
          {showActModifyModal ? (
            <ActModifyModal info={currentActRow} close={() => { setShowActModifyModal(false) }} type={currentAlter} />
          ) : (
            null
          )}
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

export default PmCheckList;
