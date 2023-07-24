import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Table,
  Col,
  Row,
} from 'antd';
import { useEffect, useState } from 'react';
import { eqpQuery1, eqpQuery2 } from '@/pages/EqpManage/EqpQuery/EqpQuery';
import { ColumnsType } from 'antd/lib/table';
import { history } from 'umi';

interface DataType1 {
  equipmentname: string;
  state: string;
  statustime: string;
  ptime: string;
  eqptype: string;
  reasoncode: string;
}

const columns1: ColumnsType<DataType1> = [
  {
    title: '设备',
    dataIndex: 'equipmentname',
    key: 'equipmentname',
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    key: 'state',
  },
  {
    title: '状态切换时间',
    dataIndex: 'statustime',
    key: 'statustime',
  },
  {
    title: '状态持续时间',
    dataIndex: 'ptime',
    key: 'ptime',
  },
  {
    title: '设备类',
    dataIndex: 'eqptype',
    key: 'eqptype',
  },
  {
    title: '原因',
    dataIndex: 'reasoncode',
    key: 'reasoncode',
  },
];

interface DataType2 {
  lotid: string;
  ptype: string;
  runtime: string;
  spt: string;
  waittime: string;
  qty: string;
  queuetime: string;
  productname: string;
  planname: string;
  stage: string;
  step: string;
  stepdesc: string;
  processtype: string;
  lotowner: string;
  planinvdate: string;
  priority: string;
  avaeqpid: string;
}

const columns2: ColumnsType<DataType2> = [
  {
    title: '批号',
    dataIndex: 'lotid',
    key: 'lotid',
  },
  {
    title: '状态',
    dataIndex: 'ptype',
    key: 'ptype',
  },
  {
    title: 'RunTime',
    dataIndex: 'runtime',
    key: 'runtime',
  },
  {
    title: 'SPT',
    dataIndex: 'spt',
    key: 'spt',
  },
  {
    title: 'WaitTime',
    dataIndex: 'waittime',
    key: 'waittime',
  },
  {
    title: '片数',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: '批次送达时间',
    dataIndex: 'queuetime',
    key: 'queuetime',
  },
  {
    title: '产品',
    dataIndex: 'productname',
    key: 'productname',
  },
  {
    title: '工艺',
    dataIndex: 'planname',
    key: 'planname',
  },
  {
    title: 'Stage',
    dataIndex: 'stage',
    key: 'stage',
  },
  {
    title: 'StepName',
    dataIndex: 'step',
    key: 'step',
  },
  {
    title: 'StepDesc',
    dataIndex: 'stepdesc',
    key: 'stepdesc',
  },
  {
    title: '工艺大类',
    dataIndex: 'processtype',
    key: 'processtype',
  },
  {
    title: 'LotOwner',
    dataIndex: 'lotowner',
    key: 'lotowner',
  },
  {
    title: '计划入库',
    dataIndex: 'planinvdate',
    key: 'planinvdate',
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
  },
  {
    title: '可用机台',
    dataIndex: 'avaeqpid',
    key: 'avaeqpid',
  },
];

const EqpQuery = () => {
  const [eqpID, setEqpID] = useState<any>(history.location?.search?.substring(1));
  const [eqpQuery1Res, setEqpQuery1Res] = useState<any>([]);
  const [eqpQuery2Res, setEqpQuery2Res] = useState<any>([]);

  useEffect(() => {
    (async () => {
      let resp = await eqpQuery1({ EQPID: eqpID })
      setEqpQuery1Res(resp.data);
      let resp2 = await eqpQuery2({ EQPID: eqpID })
      setEqpQuery2Res(resp2.data);
    })();
  }, [eqpQuery2]);

  return (
    <PageContainer>
      <Card style={{ marginBottom: 20 }}>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <div style={{ width: 1200, backgroundColor: 'rgb(255,218,185)', margin: 'auto' }}>
              <p style={{ fontSize: 20, fontWeight: 'bold', fontFamily: '宋体' }}>
                设备LOT Buffer & 设备历史状态
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 16, fontFamily: '宋体', textAlign: 'center' }}>
              设备ID:&nbsp;<span style={{ fontSize: 16, fontWeight: 'bold', fontFamily: '宋体' }}>{eqpID}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <div style={{ width: 500, backgroundColor: 'rgb(255,228,181)', margin: 'auto' }}>
              <p style={{ fontSize: 18, fontWeight: 'bold', fontFamily: '宋体', textAlign: 'center' }}>
                设备当前状态:
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columns1} dataSource={eqpQuery1Res} bordered />
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <div style={{ width: 500, backgroundColor: 'rgb(0,255,255)', margin: 'auto' }}>
              <p style={{ fontSize: 18, fontWeight: 'bold', fontFamily: '宋体', textAlign: 'center' }}>
                当前Run产品/Wait产品:
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columns2} dataSource={eqpQuery2Res} bordered />
          </Col>
        </Row>
      </Card>
    </PageContainer >
  );
};

export default EqpQuery;
