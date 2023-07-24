import { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { queryCustomRule } from './customRuleApi';

type TableListItem = {
  name: string;
  reason: string;
  testCount: string;
  outOf: string;
  comparison: string;
  withRespectTo: string;
  value: string;
  stdDevs: string;
  datasetName: string;
  intervalFrom: string;
  intervalTo: string;
  Sysid: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const CustomRule = () => {
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'reason',
      dataIndex: 'reason',
    },
    {
      title: 'testCount',
      dataIndex: 'testCount',
    },
    {
      title: 'outOf',
      dataIndex: 'outOf',
    },
    {
      title: 'comparison',
      dataIndex: 'comparison',
    },
    {
      title: 'withRespectTo',
      dataIndex: 'withRespectTo',
    },
    {
      title: 'value',
      dataIndex: 'value',
    },
    {
      title: 'stdDevs',
      dataIndex: 'stdDevs',
    },
    {
      title: 'datasetName',
      dataIndex: 'datasetName',
    },
    {
      title: 'intervalFrom',
      dataIndex: 'intervalFrom',
    },
    {
      title: 'intervalTo',
      dataIndex: 'intervalTo',
    },
    // {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   width: 120,
    //   render: (_, record) => [
    //     <a
    //       key="Sysid"
    //       onClick={() => {
    //         setParametersData(record.defaultParameters);
    //       }}
    //     >
    //       查看
    //     </a>,
    //   ],
    // },
  ];

  useEffect(() => {
    (async () => {
      let resp = await queryCustomRule({})
      setTableListData(resp.data);
    })();
  }, [queryCustomRule]);

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="CustomRule列表"
        actionRef={actionRef}
        rowKey="Sysid"
        search={
          false
        }
        dataSource={tableListData}
        toolBarRender={() => [
          // <Button
          //   type="primary"
          //   key="primary"
          //   onClick={() => {
          //     setShowDetail(true);
          //   }}
          // >
          //   <PlusOutlined /> 新增
          // </Button>,
        ]}
        columns={columns}
        scroll={{ x: '100%' }}
      />
    </PageContainer>
  );
}

export default CustomRule;