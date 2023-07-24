import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useEffect, useRef, useState } from 'react';
import { querySystemRule } from './systemRuleApi';

type TableListItem = {
  name: string;
  description: string;
  detaildesc_en: string;
  detaildesc_zh: string;
  Sysid: string;
};

type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

const SystemRule = () => {
  const [tableListData, setTableListData] = useState([]);
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '中文详细描述',
      dataIndex: 'detaildesc_zh',
    },
    // {
    //   title: '英文详细描述',
    //   dataIndex: 'detaildesc_en',
    // },

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
      let resp = await querySystemRule({});
      setTableListData(resp.data);
    })();
  }, [querySystemRule]);

  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        headerTitle="SystemRule列表"
        actionRef={actionRef}
        rowKey="Sysid"
        search={false}
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
};

export default SystemRule;
