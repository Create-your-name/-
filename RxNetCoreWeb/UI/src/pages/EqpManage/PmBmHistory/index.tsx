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
  Row,
  Select,
  Space,
  Table
} from 'antd';
import { useEffect, useRef, useState } from 'react';
import { CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { getPMBMHis, getPMBMHisCheckList } from '@/pages/EqpManage/PmBmHistory/pmBmHistory';
import { ColumnsType } from 'antd/lib/table';
import ExportJsonExcel from 'js-export-excel';
import moment from 'moment';

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

const PmBmHistory = () => {
  var headers = ['TYPE', 'PMNAME', 'FORMNAME', 'EQPID', 'EQPTYPE', 'CREATEUSER', 'MODIFYTIME'];
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [drawerTitle, setDrawerTitle] = useState<string>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();
  const [searchForm] = Form.useForm();
  const [checkListData, setCheckList] = useState<any>([]);
  let updateFormRef = useRef();

  const columns: ProColumns<TableListItem>[] = [
    {
      width: 120,
      title: 'PM/BM',
      dataIndex: 'PMBM',
    },
    {
      width: 120,
      title: 'PM类型',
      dataIndex: 'PMNAME',
    },
    {
      width: 120,
      title: 'PM/BM表单名称',
      dataIndex: 'FORMNAME',
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
              setDrawerTitle('查看CheckList');
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
      title: '说明',
      dataIndex: 'ITEMNAME',
      width: 150,
    },
    {
      title: '方式',
      dataIndex: 'ITEMTYPE',
      width: 100,
    },
    {
      title: '项目内容',
      dataIndex: 'ITEMVALUE',
      width: 100,
    },
    {
      title: '检测结果',
      dataIndex: 'CHECKVALUE',
      width: 100,
    },
  ];

  useEffect(() => {
    (async () => {
      let resp = await getPMBMHis({});
      setTableListData(
        resp.data.map((e: { BMFORMID: string | null; }) => {
          if (e.BMFORMID != null && e.BMFORMID != "") return { ...e, PMBM: "BM" }
          else return { ...e, PMBM: "PM" }
        })
      );
    })();
  }, [getPMBMHis]);

  const onClose = () => {
    setCurrentRow(undefined);
    setShowDetail(false);
    setCheckList([]);
  };

  const onSearch = (values: any) => {
    (async () => {
      let resp = await getPMBMHis(values);
      setTableListData(resp.data.map((e: { BMFORMID: string | null; }) => {
        if (e.BMFORMID != null && e.BMFORMID != "") return { ...e, PMBM: "BM" }
        else return { ...e, PMBM: "PM" }
      }));
    })();
  };

  const onReset = () => {
    (async () => {
      let resp = await getPMBMHis({});
      setTableListData(resp.data.map((e: { BMFORMID: string | null; }) => {
        if (e.BMFORMID != null && e.BMFORMID != "") return { ...e, PMBM: "BM" }
        else return { ...e, PMBM: "PM" }
      }));
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
        dataTable.push({ TYPE: datas[i].PMBM, PMNAME: datas[i].PMNAME, FORMNAME: datas[i].FORMNAME, EQPID: datas[i].EQPID, EQPTYPE: datas[i].EQPTYPE, CREATEUSER: datas[i].CREATEUSER, MODIFYTIME: datas[i].MODIFYTIME });
        let resp = await getPMBMHisCheckList({ SYSID: datas[i].SYSID });
        if (resp.data.length > 0) {
          dataTable.push(['CHKINDEX', 'ITEMNAME', 'ITEMVALUE', 'CHECKVALUE', 'CREATEUSER', 'MODIFYTIME']);
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

  return (
    <PageContainer>
      <Card style={{ marginBottom: 20 }}>
        <Form style={{ marginTop: 20 }} form={searchForm} onFinish={onSearch}>
          <Row gutter={20}>

            <Col span={8}>
              <Form.Item label="PM/BM" name="TYPE" style={{ marginLeft: 0 }}>
                <Select placeholder="请选择">
                  <Select.Option value={'PM'} key={'PM'}>
                    PM
                  </Select.Option>
                  <Select.Option value={'BM'} key={'BM'}>
                    BM
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item {...CurrencySubmitFormLayout}>
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
        headerTitle="PM/BM列表"
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

export default PmBmHistory;
