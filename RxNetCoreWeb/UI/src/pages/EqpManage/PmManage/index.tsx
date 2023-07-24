import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  DatePickerProps,
  Divider,
  Drawer,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  message
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { getPMForm } from '@/pages/EqpManage/PmCheckList/pmCheckListApi';
import { getEqpType, getPMList, addPM, deletePM, updatePM, deletePMDirect } from '@/pages/EqpManage/PmManage/pmManageApi';
import { getEqp } from '@/pages/EqpManage/QcManage/qcManageApi';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import moment from 'moment';
import { useModel } from 'umi';

const dateFormat = 'YYYY/MM/DD';

type TableListItem = {
  SYSID: string;
  MOUDLE: string;
  EQPTYPE: string;
  PMNAME: string;
  PMFORMID: string;
  QHOUR: string;
  TYPE: string;
  W1: string;
  W2: string;
  W3: string;
  W4: string;
  W5: string;
  W6: string;
  W7: string;
  M1: string;
  M2: string;
  M3: string;
  PMSTATUS: string;
  LASTCOMPLETEDATE: string;
  PLANDATE: string;
  FORCETRACKIN: string;
  HASF: string;
  CHOUR: string;
  CYCLE: string;
  COMMENTS: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const PmManage = () => {
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const [allModule, setAllModule] = useState<any>([]);
  const [allEqpType, setAllEqpType] = useState<any>([]);
  const [allPmForm, setAllPmForm] = useState<any>([]);
  const [pmFormID, setPmFormID] = useState<any>([]);
  const [pmType, setPmType] = useState<any>();
  const [showDeleteDia, setShowDeleteDia] = useState<boolean>(false);
  const [showDeleteDia2, setShowDeleteDia2] = useState<boolean>(false);
  const [checkBoxValue, setCheckBoxValue] = useState<string[]>();
  let updateForm = useRef();
  // let dateStr = "";
  const [dateStr, setDateStr] = useState<string>();
  const [deleteId, setDeleteId] = useState<string>();
  const [allEqpId, setAllEqpId] = useState<any>([]);
  const [allEqp, setAllEqp] = useState<any>([]);
  const [currentEqp, setCurrentEqp] = useState<any>([]);
  const [currentPMForm, setCurrentPMForm] = useState<any>([]);
  const { initialState, setInitialState } = useModel('@@initialState');
  const { currentUser } = initialState;

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 80,
      title: '模组',
      dataIndex: 'MOUDLE',
    },
    {
      width: 120,
      title: 'PM类型',
      dataIndex: 'PMNAME',
    },
    {
      width: 100,
      title: '设备类型名称',
      dataIndex: 'EQPTYPE',
    },
    {
      width: 120,
      title: 'PM表单',
      dataIndex: 'PMFORMNAME',
    },
    {
      width: 100,
      title: '设备名称',
      dataIndex: 'EQPID',
    },
    {
      width: 100,
      title: '可延迟小时',
      dataIndex: 'QHOUR',
    },
    {
      width: 50,
      title: '类型',
      dataIndex: 'TYPE',
    },
    {
      width: 50,
      title: '周一',
      dataIndex: 'W1',
    },
    {
      width: 50,
      title: '周二',
      dataIndex: 'W2',
    },
    {
      width: 50,
      title: '周三',
      dataIndex: 'W3',
    },
    {
      width: 50,
      title: '周四',
      dataIndex: 'W4',
    },
    {
      width: 50,
      title: '周五',
      dataIndex: 'W5',
    },
    {
      width: 50,
      title: '周六',
      dataIndex: 'W6',
    },
    {
      width: 50,
      title: '周日',
      dataIndex: 'W7',
    },
    {
      width: 50,
      title: '月份（天）',
      dataIndex: 'M1',
    },
    {
      width: 50,
      title: '月份（天）',
      dataIndex: 'M2',
    },
    {
      width: 50,
      title: '月份（天）',
      dataIndex: 'M3',
    },
    {
      width: 80,
      title: '状态',
      dataIndex: 'PMSTATUS',
    },
    {
      width: 120,
      title: '上次完成时间',
      dataIndex: 'LASTCOMPLETEDATE',
    },
    {
      width: 120,
      title: '计划日期',
      dataIndex: 'PLANDATE',
    },
    {
      width: 50,
      title: '限制Trackin',
      dataIndex: 'FORCETRACKIN',
    },
    {
      width: 50,
      title: 'HASF',
      dataIndex: 'HASF',
    },
    {
      width: 50,
      title: 'CHOUR',
      dataIndex: 'CHOUR',
    },
    {
      width: 120,
      title: '循环开始日期',
      dataIndex: 'CYCLESTARTDATE',
    },
    {
      width: 80,
      title: '循环周期',
      dataIndex: 'CYCLE',
    },
    {
      width: 180,
      title: '备注',
      dataIndex: 'COMMENTS',
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
            setIsUpdate(false);
            setDrawerTitle('修改PM');
            setPmType(record.TYPE);
            setCheckBoxValue([]);
            let temp = [];
            if (record.W1 != null) {
              temp.push("W1")
              // setCheckBoxValue(checkBoxValue)
            }
            if (record.W2 != null) {
              temp.push("W2")
              // setCheckBoxValue(checkBoxValue)
            }
            if (record.W3 != null) {
              temp.push("W3")
              // setCheckBoxValue(checkBoxValue)
            }
            if (record.W4 != null) {
              temp.push("W4")
              // setCheckBoxValue(checkBoxValue)
            }
            if (record.W5 != null) {
              temp.push("W5")
              // setCheckBoxValue(checkBoxValue)
            }
            if (record.W6 != null) {
              temp.push("W6")
              // setCheckBoxValue(checkBoxValue)
            }
            if (record.W7 != null) {
              temp.push("W7")
              // setCheckBoxValue(checkBoxValue)
            }
            setCheckBoxValue(temp);
            setCurrentPMForm(allPmForm.filter((e: any) => {
              return e.EQPTYPE == record.EQPTYPE;
            }).map((e2: any) => {
              return {
                value: e2.SYSID,
                label: e2.FORMNAME,
              }
            }))
            setCurrentEqp(allEqpId.filter((e: any) => {
              return e.EQPTYPE == record.EQPTYPE;
            }).map((e2: any) => {
              return {
                value: e2.NAME,
                label: e2.NAME,
              }
            }))
          }}
        >
          修改
        </a>,
        <a
          onClick={() => {
            setShowDeleteDia(true)
            setDeleteId(record.SYSID);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      let resp2 = await getEqpType({});
      setAllEqpType(resp2.data.map((e: { NAME: any; }) => {
        return {
          value: e.NAME,
          label: e.NAME,
        }
      }));
      let resp3 = await getPMForm({});
      setAllPmForm(resp3.data);
      setPmFormID([...resp3.data.map((e: { SYSID: any; FORMNAME: any; }) => {
        return {
          value: e.SYSID,
          label: e.FORMNAME,
        }
      })])
      let resp4 = await getEqp({});
      setAllEqpId(resp4.data);
      setAllEqp(resp4.data.map((e: { NAME: any; }) => {
        return {
          value: e.NAME,
          label: e.NAME,
        }
      }));
      let resp = await getPMList({});
      setTableListData(
        resp.data.map((e: any) => {
          return { ...e, PMFORMNAME: resp3.data.filter((e2: any) => e2.SYSID == e.PMFORMID).length > 0 ? resp3.data.filter((e2: any) => e2.SYSID == e.PMFORMID)[0].FORMNAME : "" }
        })
      );
    })();
    setAllModule([
      {
        value: '薄膜',
        label: '薄膜',
      },
      {
        value: '腐蚀',
        label: '腐蚀',
      },
      {
        value: '光刻',
        label: '光刻',
      },
      {
        value: '扩散',
        label: '扩散',
      },
      {
        value: '外延',
        label: '外延',
      },
    ]);
  }, [getPMList]);

  const onClose = () => {
    setCurrentEqp([]);
    setCurrentPMForm([]);
    setCurrentRow(undefined);
    setShowDetail(false);
    setCheckBoxValue([]);
    // updateForm.current.resetFields();
  };

  const onsubmit = () => {
    if (drawerTitle == "新增PM") {
      let data = updateForm.current.getFieldsValue();
      if (data.MOUDLE == null || data.MOUDLE == undefined || data.MOUDLE == "") {
        message.error("请选择模组!");
        return;
      }
      if (data.PMNAME == null || data.PMNAME == undefined || data.PMNAME == "") {
        message.error("请输入PM类型!");
        return;
      }
      if (data.EQPTYPE == null || data.EQPTYPE == undefined || data.EQPTYPE == "") {
        message.error("请选择设备类型!");
        return;
      }
      if (data.PMFORMID == null || data.PMFORMID == undefined || data.PMFORMID == "") {
        message.error("请选择PM表单!");
        return;
      }
      if (data.EQPID == null || data.EQPID == undefined || data.EQPID == "") {
        message.error("请选择设备!");
        return;
      }
      if (data.QHOUR == null || data.QHOUR == undefined || data.QHOUR == "") {
        message.error("请输入可延迟小时!");
        return;
      }
      if (data.TYPE == null || data.TYPE == undefined || data.TYPE == "") {
        message.error("请选择PM类型!");
        return;
      }
      if (data.TYPE == "2") {
        if (checkBoxValue?.length == 0) {
          message.error("请选择星期几!");
          return;
        } else {
          checkBoxValue?.forEach((e) => {
            if (e == "W1") data.W1 = "Y"
            if (e == "W2") data.W2 = "Y"
            if (e == "W3") data.W3 = "Y"
            if (e == "W4") data.W4 = "Y"
            if (e == "W5") data.W5 = "Y"
            if (e == "W6") data.W6 = "Y"
            if (e == "W7") data.W7 = "Y"
          })
          data.M1 = null
          data.M2 = null
          data.M3 = null
          data.CYCLESTARTDATE = null
          data.CYCLE = null
        }
      } else if (data.TYPE == "3") {
        if ((data.M1 == null || data.M1 == "") && (data.M2 == null || data.M2 == "") && (data.M3 == null || data.M3 == "")) {
          message.error("请输入月份的第几日!");
          return;
        }
        data.W1 = null
        data.W2 = null
        data.W3 = null
        data.W4 = null
        data.W5 = null
        data.W6 = null
        data.W7 = null
        data.CYCLESTARTDATE = null
        data.CYCLE = null
      } else if (data.TYPE == "4") {
        if ((dateStr == null || dateStr == "") && (data.CYCLESTARTDATE == null || data.CYCLESTARTDATE == "")) {
          message.error("请选择开始日期!");
          return;
        }
        if (data.CYCLE == null || data.CYCLE == "") {
          message.error("请输入循环周期!");
          return;
        }
        if (dateStr == null || dateStr == "") {

        } else {
          data.CYCLESTARTDATE = dateStr;
        }
        data.M1 = null
        data.M2 = null
        data.M3 = null
        data.W1 = null
        data.W2 = null
        data.W3 = null
        data.W4 = null
        data.W5 = null
        data.W6 = null
        data.W7 = null
      }
      data.USERID = currentUser.name;
      (async () => {
        let resp = await addPM(data);
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
      let data = updateForm.current.getFieldsValue();
      if (data.MOUDLE == null || data.MOUDLE == undefined || data.MOUDLE == "") {
        message.error("请选择模组!");
        return;
      }
      if (data.PMNAME == null || data.PMNAME == undefined || data.PMNAME == "") {
        message.error("请输入PM类型!");
        return;
      }
      if (data.EQPTYPE == null || data.EQPTYPE == undefined || data.EQPTYPE == "") {
        message.error("请选择设备类型!");
        return;
      }
      if (data.PMFORMID == null || data.PMFORMID == undefined || data.PMFORMID == "") {
        message.error("请选择PM表单!");
        return;
      }
      if (data.EQPID == null || data.EQPID == undefined || data.EQPID == "") {
        message.error("请选择设备!");
        return;
      }
      if (data.QHOUR == null || data.QHOUR == undefined || data.QHOUR == "") {
        message.error("请输入可延迟小时!");
        return;
      }
      if (data.TYPE == "2") {
        if (checkBoxValue?.length == 0) {
          message.error("请选择星期几!");
          return;
        } else {
          checkBoxValue?.forEach((e) => {
            if (e == "W1") data.W1 = "Y"
            if (e == "W2") data.W2 = "Y"
            if (e == "W3") data.W3 = "Y"
            if (e == "W4") data.W4 = "Y"
            if (e == "W5") data.W5 = "Y"
            if (e == "W6") data.W6 = "Y"
            if (e == "W7") data.W7 = "Y"
          })
        }
      } else if (data.TYPE == "3") {
        if ((data.M1 == null || data.M1 == "") && (data.M2 == null || data.M2 == "") && (data.M3 == null || data.M3 == "")) {
          message.error("请输入月份的第几日!");
          return;
        }
      } else if (data.TYPE == "4") {
        if ((dateStr == null || dateStr == "") && (data.CYCLESTARTDATE == null || data.CYCLESTARTDATE == "")) {
          message.error("请选择开始日期!");
          return;
        }
        if (data.CYCLE == null || data.CYCLE == "") {
          message.error("请输入循环周期!");
          return;
        }
        if (dateStr == null || dateStr == "") {

        } else {
          data.CYCLESTARTDATE = dateStr;
        }
      }
      data.USERID = currentUser.name;
      (async () => {
        let resp = await updatePM(data);
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
      let resp = await getPMList(values);
      setTableListData(resp.data.map((e: any) => {
        return { ...e, PMFORMNAME: pmFormID.filter((e2: any) => e2.value == e.PMFORMID).length > 0 ? pmFormID.filter((e2: any) => e2.value == e.PMFORMID)[0].label : "" }
      }));
    })();
  };

  const onReset = () => {
    (async () => {
      let resp = await getPMList({});
      setTableListData(resp.data.map((e: any) => {
        return { ...e, PMFORMNAME: pmFormID.filter((e2: any) => e2.value == e.PMFORMID).length > 0 ? pmFormID.filter((e2: any) => e2.value == e.PMFORMID)[0].label : "" }
      }));
      searchForm.resetFields();
    })();
  };

  const handleEqpChange = (value: string) => {
  };

  const handleEqpTypeChange = (value: string) => {
    updateForm.current.setFieldsValue({ [(() => "EQPID")()]: null, [(() => "PMFORMID")()]: null });
    setCurrentPMForm(allPmForm.filter((e: any) => {
      return e.EQPTYPE == value;
    }).map((e2: any) => {
      return {
        value: e2.SYSID,
        label: e2.FORMNAME,
      }
    }))
    setCurrentEqp(allEqpId.filter((e: any) => {
      return e.EQPTYPE == value;
    }).map((e2: any) => {
      return {
        value: e2.NAME,
        label: e2.NAME,
      }
    }))
  };

  const checkOptions1 = [
    { label: '周一', value: 'W1' },
    { label: '周二', value: 'W2' },
    { label: '周三', value: 'W3' },
    { label: '周四', value: 'W4' },
    { label: '周五', value: 'W5' },
    { label: '周六', value: 'W6' },
    { label: '周日', value: 'W7' },];

  const check1OnChange = (checkedValues: CheckboxValueType[]) => {
    setCheckBoxValue(checkedValues);
  };

  const radioOnChange = ({ target: { value } }: RadioChangeEvent) => {
    setPmType(value)
  };

  const dataPickerOnChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDateStr(dateString);
  };

  const deleteDiaOK = () => {
    (async () => {
      let resp = await deletePM({
        SYSID: deleteId,
        USERID: currentUser.name,
      });
      if (resp.data == "success") {
        message.success("删除成功!");
        setShowDeleteDia(false);
        onReset();
      } else if (resp.data == "fail501") {
        setShowDeleteDia(false);
        setShowDeleteDia2(true);
      } else {
        message.error(resp.data);
        return;
      }
    })();
  };

  const deleteDiaCancle = () => {
    setShowDeleteDia(false);
  };

  const deleteDiaOK2 = () => {
    (async () => {
      let resp = await deletePMDirect({
        SYSID: deleteId,
        USERID: currentUser.name,
      });
      if (resp.data == "success") {
        message.success("强制删除成功!");
        setShowDeleteDia2(false);
        onReset();
      } else {
        message.error(resp.data);
        return;
      }
    })();
  };

  const deleteDiaCancle2 = () => {
    setShowDeleteDia2(false);
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
              <Form.Item label="PM类型" name="PMNAME" style={{ marginLeft: 0 }}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="设备类型名称" name="EQPTYPE" style={{ marginLeft: 0 }}>
                <Select placeholder="请选择" allowClear showSearch>
                  {allEqpType.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

          </Row>

          <Row gutter={20}>

            <Col span={8}>
              <Form.Item label="PM表单" name="PMFORMID">
                <Select placeholder="请选择" allowClear showSearch>
                  {pmFormID.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="设备名称" name="EQPID" style={{ marginLeft: 0 }}>
                <Select placeholder="请选择" onChange={handleEqpChange} allowClear showSearch>
                  {allEqp.map((element: { value: any; label: any; }) => (
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
              setIsUpdate(false);
              setShowDetail(true);
              setDrawerTitle('新增PM');
              setPmType('2');
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
            <Form.Item hidden={true} label="SYSID" name="SYSID">
              <Input />
            </Form.Item>
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
              <Col span={12}>
                <Form.Item label="PM类型" name="PMNAME">
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="设备类型名称" name="EQPTYPE" style={{ marginLeft: 0 }}>
                  <Select placeholder="请选择" onChange={handleEqpTypeChange} showSearch>
                    {allEqpType.map((element: { value: any; label: any; }) => (
                      <Select.Option value={element.value} key={element.value}>
                        {element.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="PM表单" name="PMFORMID" style={{ marginLeft: 0 }}>
                  <Select placeholder="请选择" showSearch>
                    {currentPMForm.map((element: { value: any; label: any; }) => (
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
                <Form.Item label="设备名称" name="EQPID" style={{ marginLeft: 0 }}>
                  <Select placeholder="请选择" onChange={handleEqpChange} showSearch>
                    {currentEqp.map((element: { value: any; label: any; }) => (
                      <Select.Option value={element.value} key={element.value}>
                        {element.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="可延迟小时" name="QHOUR" style={{ marginLeft: 0 }}>
                  <Input disabled={isUpdate} type="number" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={24}>
                <Form.Item label="备注" name="COMMENTS" style={{ marginLeft: 0 }}>
                  <Input disabled={isUpdate} />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={24}>
                <Form.Item label="PM类型" name="TYPE" style={{ marginLeft: 0 }}>
                  <Radio.Group onChange={radioOnChange}>
                    <Radio value="2">周</Radio>
                    <Radio value="3">月</Radio>
                    <Radio value="4">循环周期（天）</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            {pmType == '2' ? (
              <Row gutter={8}>
                <Col span={24}>
                  {/* <Form.Item name="checkBoxValue"> */}
                  <Checkbox.Group options={checkOptions1} onChange={check1OnChange} defaultValue={checkBoxValue} />
                  {/* </Form.Item> */}
                </Col>
              </Row>) : (
              null
            )}
            {pmType == '3' ? (
              <div>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item label="First" name="M1">
                      <Input disabled={isUpdate} type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item label="Second" name="M2">
                      <Input disabled={isUpdate} type="number" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item label="Third" name="M3" style={{ marginLeft: 0 }}>
                      <Input disabled={isUpdate} type="number" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>) : (
              null
            )}
            {pmType == '4' ? (
              <div>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item label="开始日期" name="CYCLESTARTDATE">
                      <Space direction="vertical">
                        <DatePicker onChange={dataPickerOnChange} defaultValue={currentRow?.CYCLESTARTDATE == undefined ? "" : moment(currentRow?.CYCLESTARTDATE, dateFormat)} />
                      </Space>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item label="循环周期（天）" name="CYCLE">
                      <Input disabled={isUpdate} type="number" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>) : (
              null
            )}
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
      {showDeleteDia2 ? (
        <div>
          <Modal title="提示" visible={true} onOk={deleteDiaOK2} onCancel={deleteDiaCancle2}>
            <p>该PM计划已生成,是否强制删除?</p>
          </Modal>
        </div>) : (
        null
      )}
    </PageContainer>
  );
};

export default PmManage;
