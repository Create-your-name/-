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
import { getBMForm, addBMForm, getBMFormCheckList, updateBMForm, deleteBMForm } from '@/pages/EqpManage/BmCheckList/bmCheckListApi';
import { getEqpType } from '@/pages/EqpManage/PmManage/pmManageApi';
import { ColumnsType } from 'antd/lib/table';
import { useModel } from 'umi';

interface checkListDataType {
  CHKINDEX: string;
  ITEMNAME: string;
  ITEMTYPE: string;
}

interface checkListGroupDataType {
  GROUPINDEX: string;
  GROUPNAME: string;
  CHECKLIST: string;
}

type TableListItem = {
  SYSID: string,
  FORMNAME: string;
  EQPTYPE: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const BmCheckList = () => {
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [currentAlter, setCurrentAlter] = useState<string>("add");
  const [currentAlterType, setCurrentAlterType] = useState<string>("CHECK");
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const [showDeleteDia, setShowDeleteDia] = useState<boolean>(false);
  const [showActModifyModal, setShowActModifyModal] = useState<boolean>(false);
  const [showActModifyModal2, setShowActModifyModal2] = useState<boolean>(false);
  const [currentActRow, setCurrentActRow] = useState<checkListDataType | checkListGroupDataType | null>();
  const [checkListData, setCheckList] = useState<any>([]);
  const [checkListGroupData, setCheckListGroup] = useState<any>([]);
  let updateFormRef = useRef();
  const [formDelete, setFormDelete] = useState<boolean>(false);
  const [allEqpType, setAllEqpType] = useState<any>([]);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 120,
      title: 'Checklist名称',
      dataIndex: 'FORMNAME',
    },
    {
      width: 120,
      title: '设备类型',
      dataIndex: 'EQPTYPE',
    },
    {
      width: 120,
      title: 'Checklist类型',
      dataIndex: 'BMTYPE',
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
              let resp = await getBMFormCheckList({ SYSID: record.SYSID });
              setCheckList(
                resp.data.checklist
              );
              setCheckListGroup(resp.data.group);
              setCurrentRow(record);
              setShowDetail(true);
              setIsUpdate(false);
              setDrawerTitle('查看Checklist');
            })();
          }}
        >
          查看
        </a>,
        <a
          onClick={() => {
            (async () => {
              let resp = await getBMFormCheckList({ SYSID: record.SYSID });
              setCheckList(
                resp.data.checklist
              );
              setCheckListGroup(resp.data.group);
              setCurrentRow(record);
              setShowDetail(true);
              setIsUpdate(true);
              setDrawerTitle('修改Checklist');
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

  const checkListGroupCols: ColumnsType<checkListGroupDataType> = [
    {
      title: '序号',
      dataIndex: 'GROUPINDEX',
      width: 60,
    },
    {
      title: '检验项目组名',
      dataIndex: 'GROUPNAME',
      width: 150,
    },
    {
      title: '检验项目',
      dataIndex: 'CHECKLIST',
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
            let checklistValue: string[] = [];
            if (record.CHECKLIST?.length > 0) {
              checklistValue = record.CHECKLIST?.split(',');
            }
            setCurrentActRow({ ...record, CHECKLIST: checklistValue })
            setCurrentAlter("update")
            setShowActModifyModal2(true)
          }}
        >
          {isUpdate ? '修改' : null}
        </a>,
        <a style={{ marginLeft: 10 }}
          onClick={() => {
            setCurrentActRow(record)
            setCurrentAlterType("GROUP")
            setShowDeleteDia(true)
          }}
        >
          {isUpdate ? '删除' : null}
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
            setCurrentActRow(record)
            setCurrentAlter("update")
            setShowActModifyModal(true)
          }}
        >
          {isUpdate ? '修改' : null}
        </a>,
        <a style={{ marginLeft: 10 }}
          onClick={() => {
            for (let i = 0; i < checkListGroupData.length; i++) {
              let checklistValue: string[] = [];
              if (checkListGroupData[i].CHECKLIST.length > 0) {
                checklistValue = checkListGroupData[i].CHECKLIST?.split(',');
                if (checklistValue.includes(record.CHKINDEX.toString())) {
                  message.error("该检验项被项目组所使用,请删除项目组后再进行此删除操作!");
                  return;
                }
              }
            }
            setCurrentActRow(record)
            setCurrentAlterType("CHECK")
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
      let resp = await getBMForm({});
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
  }, [getBMForm]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
    setCheckList([]);
    setCheckListGroup([]);
  };

  const onAddForm = () => {
    if (drawerTitle == "新增Checklist") {
      let data = updateFormRef.current.getFieldsValue();
      if (data.FORMNAME == null || data.FORMNAME == undefined || data.FORMNAME == "") {
        message.error("请输入Checklist名称!");
        return;
      }
      if (data.EQPTYPE == null || data.EQPTYPE == undefined || data.EQPTYPE == "") {
        message.error("请选择设备类型!");
        return;
      }
      if (data.BMTYPE == null || data.BMTYPE == undefined || data.BMTYPE == "") {
        message.error("请选择Checklist类型!");
        return;
      }
      if (checkListData == null || checkListData == undefined || checkListData.length == 0) {
        message.error("请设置检验项目!");
        return;
      }
      if (checkListGroupData == null || checkListGroupData == undefined || checkListGroupData.length == 0) {
        message.error("请设置检验项目组!");
        return;
      }
      data.checkList = checkListData;
      data.groupList = checkListGroupData;
      data.USERID = currentUser.name;
      (async () => {
        let resp = await addBMForm(data);
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
        message.error("请输入Checklist名称!");
        return;
      }
      if (data.EQPTYPE == null || data.EQPTYPE == undefined || data.EQPTYPE == "") {
        message.error("请选择设备类型!");
        return;
      }
      if (data.BMTYPE == null || data.BMTYPE == undefined || data.BMTYPE == "") {
        message.error("请选择Checklist类型!");
        return;
      }
      if (checkListData == null || checkListData == undefined || checkListData.length == 0) {
        message.error("请设置检验项目!");
        return;
      }
      if (checkListGroupData == null || checkListGroupData == undefined || checkListGroupData.length == 0) {
        message.error("请设置检验项目组!");
        return;
      }
      data.checkList = checkListData;
      data.groupList = checkListGroupData;
      data.USERID = currentUser.name;
      (async () => {
        let resp = await updateBMForm(data);
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
      let resp = await getBMForm(values);
      setTableListData(resp.data);
    })();
  };

  const onReset = () => {
    (async () => {
      let resp = await getBMForm({});
      setTableListData(resp.data);
      searchForm.resetFields();
    })();
  };

  const deleteDiaOK = (type: string) => {
    if (formDelete) {
      (async () => {
        let resp = await deleteBMForm({ SYSID: currentRow?.SYSID, USERID: currentUser.name, });
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
      if (type == "CHECK") {
        let i = 0;
        setCheckList(checkListData.filter((e) => e.CHKINDEX != currentActRow?.CHKINDEX).map((e2: any) => { i++; return { ...e2, CHKINDEX: i } }));
        setShowDeleteDia(false);
      }
      else {
        let i = 0;
        setCheckListGroup(checkListGroupData.filter((e) => e.GROUPINDEX != currentActRow?.GROUPINDEX).map((e2: any) => { i++; return { ...e2, GROUPINDEX: i } }));
        setShowDeleteDia(false);
      }
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

  const ActModifyModal2 = ({ info, close, type }: { info: any, close: any, type: string }) => {
    const [groupChecklist, setGroupChecklist] = useState<any>(info);
    const children: React.ReactNode[] = [];
    for (let i = 0; i < checkListData.length; i++) {
      children.push(<Select.Option key={checkListData[i].CHKINDEX} value={checkListData[i].CHKINDEX.toString()}>{(i + 1) + "." + checkListData[i].ITEMNAME}</Select.Option>);
    }
    let updateForm = useRef();
    const selectChange = (value: string[]) => {
      setGroupChecklist({ ...groupChecklist, CHECKLIST: value })
    };
    const onSubmitAdd = () => {
      if (type == "update" || (info.SYSID != null && info.SYSID != undefined && info.SYSID != "")) {
        let data = updateForm.current.getFieldsValue();
        if (data.GROUPINDEX == null || data.GROUPINDEX == undefined || data.GROUPINDEX == "") {
          data.GROUPINDEX = checkListData.length + 1;
        }
        if (data.GROUPNAME == null || data.GROUPNAME == undefined || data.GROUPNAME == "") {
          message.error("请输入检验项目组名!");
          return;
        }
        if (data.CHECKLIST == null || data.CHECKLIST == undefined || data.CHECKLIST == "") {
          message.error("请选择检验项目!");
          return;
        }
        let valueTemp: string[] = groupChecklist.CHECKLIST;
        valueTemp = valueTemp.sort();
        let str: string = "";
        for (let i = 0; i < valueTemp.length; i++) {
          str += valueTemp[i] + ",";
        }
        data.CHECKLIST = str.substring(0, str.length - 1)
        setCheckListGroup(checkListGroupData.map((e: { GROUPINDEX: any; }) => {
          if (e.GROUPINDEX == data.GROUPINDEX)
            return data;
          else return e;
        }));
        close();
      } else {
        let data = updateForm.current.getFieldsValue();
        if (data.GROUPINDEX == null || data.GROUPINDEX == undefined || data.GROUPINDEX == "") {
          data.GROUPINDEX = checkListData.length + 1;
        }
        if (data.GROUPNAME == null || data.GROUPNAME == undefined || data.GROUPNAME == "") {
          message.error("请输入检验项目组名!");
          return;
        }
        if (data.CHECKLIST == null || data.CHECKLIST == undefined || data.CHECKLIST == "") {
          message.error("请选择检验项目!");
          return;
        }
        let valueTemp: string[] = groupChecklist.CHECKLIST;
        valueTemp = valueTemp.sort();
        let str: string = "";
        for (let i = 0; i < valueTemp.length; i++) {
          str += valueTemp[i] + ",";
        }
        data.CHECKLIST = str.substring(0, str.length - 1)
        setCheckListGroup([...checkListGroupData, data]);
        close();
      }
    };

    return (
      <Modal title="检验项目组" visible={true}
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
          initialValues={groupChecklist}
        >
          <Form.Item label="序号" name="GROUPINDEX" style={{ marginLeft: 0 }}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="检验项目组名" name="GROUPNAME" style={{ marginLeft: 0 }}>
            <Input />
          </Form.Item>
          <Form.Item label="检验项目" name="CHECKLIST" style={{ marginLeft: 0 }}>
            <Select placeholder="请选择" onChange={selectChange} mode="multiple" allowClear>
              {children}
            </Select>
          </Form.Item>
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
              <Form.Item label="Checklist名称" name="FORMNAME" style={{ marginLeft: 0 }}>
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
        headerTitle="Checklist列表"
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
              setDrawerTitle('新增Checklist');
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
                <Form.Item label="Checklist名称" name="FORMNAME">
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
                <Form.Item label="Checklist类型" name="BMTYPE" style={{ marginLeft: 0 }}>
                  <Select placeholder="请选择" disabled={isUpdate ? false : true} showSearch>
                    <Select.Option value={'设备Checklist'} key={'设备Checklist'}>
                      设备Checklist
                    </Select.Option>
                    <Select.Option value={'工艺Checklist'} key={'工艺Checklist'}>
                      工艺Checklist
                    </Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                {isUpdate ?
                  <Button key="addCheck" type="primary" onClick={() => { setCurrentActRow({ CHKINDEX: checkListData.length + 1 }); setShowActModifyModal(true); setCurrentAlter("add"); }} style={{ marginBottom: 10 }}>
                    新增检验项目
                  </Button> : <Button disabled style={{ marginBottom: 10 }}>
                    检验项目
                  </Button>}
              </Col>
            </Row>
          </Form>
          <Table columns={checkListCols} dataSource={checkListData} pagination={false} scroll={{ x: 300, y: 300 }} bordered style={{ marginBottom: 10 }} />
          <Row gutter={8}>
            <Col span={12}>
              {isUpdate ?
                <Button key="addGroup" type="primary" onClick={() => { setCurrentActRow({ GROUPINDEX: checkListGroupData.length + 1 }); setShowActModifyModal2(true); setCurrentAlter("add"); }} style={{ marginBottom: 10 }}>
                  新增检验项目组
                </Button> : <Button disabled style={{ marginBottom: 10 }}>
                  检验项目组
                </Button>}
            </Col>
          </Row>
          <Table columns={checkListGroupCols} dataSource={checkListGroupData} pagination={false} scroll={{ x: 300, y: 300 }} bordered />
          {showActModifyModal ? (
            <ActModifyModal info={currentActRow} close={() => { setShowActModifyModal(false) }} type={currentAlter} />
          ) : (
            null
          )}
          {showActModifyModal2 ? (
            <ActModifyModal2 info={currentActRow} close={() => { setShowActModifyModal2(false) }} type={currentAlter} />
          ) : (
            null
          )}
        </Drawer>
      ) : (
        <div />
      )}
      {showDeleteDia ? (
        <div>
          <Modal title="提示" visible={true} onOk={() => deleteDiaOK(currentAlterType)} onCancel={deleteDiaCancle}>
            <p>确认删除?</p>
          </Modal>
        </div>) : (
        null
      )}
    </PageContainer>
  );
};

export default BmCheckList;
