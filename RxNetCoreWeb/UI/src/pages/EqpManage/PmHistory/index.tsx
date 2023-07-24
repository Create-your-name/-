import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  Button,
  Card,
  Col,
  DatePicker,
  TimeRangePickerProps,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getPMHis, getPMBMHisCheckList } from './pmBmHistory';
import { getEqp } from '@/pages/EqpManage/QcManage/qcManageApi';
import { getPMForm } from '@/pages/EqpManage/PmCheckList/pmCheckListApi';
import { getEqpType } from '@/pages/EqpManage/PmManage/pmManageApi';
import { ColumnsType } from 'antd/lib/table';
import ExportJsonExcel from 'js-export-excel';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

interface checkListDataType {
  CHKINDEX: string;
  ITEMNAME: string;
  ITEMTYPE: string;
}

type TableListItem = {
  SYSID: string,
  PMID: string;
  PMNAME: string,
  PMFORMID: string;
  BMFORMID: string,
  FORMNAME: string;
  EQPID: string,
  EQPTYPE: string;
  CREATEUSER: string,
  MODIFYTIME: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const PmHistory = () => {
  var headers = ['PM类型', '设备类型', '设备名称', 'PM表单名称', '创建人', '创建时间'];
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const [checkListData, setCheckList] = useState<any>([]);
  const [startDate, setStartDate] = useState<string>(moment().startOf('day').subtract(30, 'd').format(dateFormat).replaceAll('/', ''));
  const [endDate, setEndDate] = useState<string>(moment().format(dateFormat).replaceAll('/', ''));
  const [allEqpType, setAllEqpType] = useState<any>([]);
  const [allEqpId, setAllEqpId] = useState<any>([]);
  const [allPmForm, setAllPmForm] = useState<any>([]);
  const [currentEqp, setCurrentEqp] = useState<any>([]);
  const [currentPMForm, setCurrentPMForm] = useState<any>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 120,
      title: 'PM类型',
      dataIndex: 'PMNAME',
    },
    {
      width: 120,
      title: '设备类型',
      dataIndex: 'EQPTYPE',
    },
    {
      width: 120,
      title: '设备名称',
      dataIndex: 'EQPID',
    },
    {
      width: 120,
      title: 'PM表单名称',
      dataIndex: 'FORMNAME',
    },
    {
      width: 120,
      title: '创建人',
      dataIndex: 'CREATEUSER',
    },
    {
      width: 120,
      title: '创建时间',
      dataIndex: 'MODIFYTIME',
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
              let resp = await getPMBMHisCheckList({ SYSID: record.SYSID });
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
      width: 150,
    },
    {
      title: '输入类型',
      dataIndex: 'ITEMTYPE',
      width: 100,
    },
    {
      title: '检验内容',
      dataIndex: 'ITEMVALUE',
      width: 100,
    },
    {
      title: '检验结果',
      dataIndex: 'CHECKVALUE',
      width: 100,
    },
  ];

  useEffect(() => {
    let data: any = {};
    data.STARTDATE = startDate;
    data.ENDDATE = endDate;
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
      let resp4 = await getEqp({});
      setAllEqpId(resp4.data);
      let resp = await getPMHis(data);
      setTableListData(
        resp.data
      );
    })();
  }, [getPMHis]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
    setCheckList([]);
  };

  const onSearch = (values: any) => {
    values.STARTDATE = startDate;
    values.ENDDATE = endDate;
    (async () => {
      let resp = await getPMHis(values);
      setTableListData(resp.data);
    })();
  };

  const onReset = () => {
    setStartDate(moment().startOf('day').subtract(30, 'd').format(dateFormat).replaceAll('/', ''));
    setEndDate(moment().format(dateFormat).replaceAll('/', ''));
    let data: any = {};
    data.STARTDATE = moment().startOf('day').subtract(30, 'd').format(dateFormat).replaceAll('/', '');
    data.ENDDATE = moment().format(dateFormat).replaceAll('/', '');
    (async () => {
      let resp = await getPMHis(data);
      setTableListData(resp.data);
      searchForm.resetFields();
    })();
  };

  async function exportHisExcel() {
    const datas: any = tableListData ? tableListData : '';//表格数据
    var option: any = {};
    let dataTable: any[] = [];
    if (datas) {
      for (let i = 0; i < datas.length; i++) {
        dataTable.push(headers);
        dataTable.push({ 'PM类型': datas[i].PMNAME, '设备类型': datas[i].EQPTYPE, '设备名称': datas[i].EQPID, 'PM表单名称': datas[i].FORMNAME, '创建人': datas[i].CREATEUSER, '创建时间': datas[i].MODIFYTIME });
        let resp = await getPMBMHisCheckList({ SYSID: datas[i].SYSID });
        if (resp.data.length > 0) {
          dataTable.push(['序号', '检验项目名', '检验内容', '检验结果', '创建人', '创建时间']);
          resp.data.map((item: any) => {
            dataTable.push([item.CHKINDEX, item.ITEMNAME, item.ITEMVALUE, item.CHECKVALUE, item.CREATEUSER, item.MODIFYTIME]);
          })
        }
        dataTable.push({});
        dataTable.push({});
      }
    }
    option.fileName = "History" + moment().format('YYYYMMDD')
    option.datas = [
      {
        sheetData: dataTable,
        sheetName: 'sheet1',
        // sheetFilter: headers,
        // sheetHeader: headers,
      }
    ];
    var toExcel = new ExportJsonExcel(option);
    toExcel.saveExcel();
  }

  const dataPickerOnChange: TimeRangePickerProps['onChange'] = (date, dateString) => {
    setStartDate(dateString[0].replaceAll('/', ''));
    setEndDate(dateString[1].replaceAll('/', ''));
  };

  const handleEqpTypeChange = (value: string) => {
    searchForm.setFieldsValue({ [(() => "EQPID")()]: null, [(() => "PMFORMID")()]: null });
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

  return (
    <PageContainer>
      <Card style={{ marginBottom: 20 }}>
        <Form style={{ marginTop: 20 }} form={searchForm} onFinish={onSearch}>
          <Row gutter={20}>

            <Col span={8}>
              <Form.Item label="设备类型名称" name="EQPTYPE" style={{ marginLeft: 0 }}>
                <Select onChange={handleEqpTypeChange} placeholder="请选择" showSearch>
                  {allEqpType.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="设备名称" name="EQPID" style={{ marginLeft: 0 }}>
                <Select placeholder="请选择" showSearch>
                  {currentEqp.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="PM表单" name="PMFORMID">
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

          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="开始结束日期" name="RANGEDATE">
                {/* <Space direction="vertical"> */}
                <RangePicker onChange={dataPickerOnChange} defaultValue={[moment().startOf('day').subtract(30, 'd'), moment()]} format={dateFormat} style={{ width: '100%' }} allowClear={false} />
                {/* </Space> */}
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={onReset}>
                  重置
                </Button>
                <Button style={{ marginLeft: 20 }} onClick={() => exportHisExcel()}>
                  导出Excel
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
            </Space>
          }
        >
          <Form initialValues={currentRow} style={{ marginTop: 0 }}>
            <Form.Item hidden={true} label="SYSID" name="SYSID">
              <Input />
            </Form.Item>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="PM表单名称" name="FORMNAME">
                  <Input disabled={isUpdate ? false : true} />
                </Form.Item>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
              </Col>
            </Row>
          </Form>
          <Table columns={checkListCols} dataSource={checkListData} pagination={false} scroll={{ x: 300, y: 500 }} />
        </Drawer>
      ) : (
        <div />
      )}
    </PageContainer>
  );
};

export default PmHistory;
