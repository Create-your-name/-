import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Card,
  Col,
  DatePicker,
  TimeRangePickerProps,
  Form,
  Row,
  Select,
} from 'antd';
import { useEffect, useState } from 'react';
import { getBMHisChartCheckList, getBMChartPoint } from './pmBmHistory';
import { getEqp } from '@/pages/EqpManage/QcManage/qcManageApi';
import { getEqpType } from '@/pages/EqpManage/PmManage/pmManageApi';
import moment from 'moment';
import DemoLine from './trendChart';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

const BmHistoryChart = () => {
  const [searchForm] = Form.useForm();
  const [startDate, setStartDate] = useState<string>(moment().startOf('day').subtract(30, 'd').format(dateFormat).replaceAll('/', ''));
  const [endDate, setEndDate] = useState<string>(moment().format(dateFormat).replaceAll('/', ''));
  const [allEqpType, setAllEqpType] = useState<any>([]);
  const [allEqpId, setAllEqpId] = useState<any>([]);
  const [currentEqp, setCurrentEqp] = useState<any>([]);
  const [currentChkIndex, setCurrentChkIndex] = useState<any>([]);
  const [pointList, setPointList] = useState<any>([]);
  const [searchFlag, setSearchFlag] = useState<boolean>(false);
  const [controlLine, setControlLine] = useState<any>({ max: 0, min: 0 });

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
      let resp4 = await getEqp({});
      setAllEqpId(resp4.data);
    })();
  }, [getEqp]);

  const onSearch = (values: any) => {
    values.STARTDATE = startDate;
    values.ENDDATE = endDate;
    (async () => {
      let resp = await getBMChartPoint(values);
      setPointList(resp.data.map((e: any) => {
        return { ...e, value: Number(e.CHECKVALUE), year: e.MODIFYTIME }
      }))
      setSearchFlag(true);
      if (resp.data && resp.data.length > 0) {
        let arr = [];
        arr = resp.data[0].ITEMVALUE.split(';');
        setControlLine({ max: arr[0], min: arr[2] });
      }
    })();
  };

  const onReset = () => {
    setStartDate(moment().startOf('day').subtract(30, 'd').format(dateFormat).replaceAll('/', ''));
    setEndDate(moment().format(dateFormat).replaceAll('/', ''));
    searchForm.resetFields();
    setPointList([]);
    setSearchFlag(false);
  };

  const dataPickerOnChange: TimeRangePickerProps['onChange'] = (date, dateString) => {
    setStartDate(dateString[0].replaceAll('/', ''));
    setEndDate(dateString[1].replaceAll('/', ''));
  };

  const handleEqpTypeChange = (value: string) => {
    searchForm.setFieldsValue({ [(() => "EQPID")()]: null, [(() => "BMTYPE")()]: null, [(() => "CHKINDEX")()]: null });
    setCurrentEqp(allEqpId.filter((e: any) => {
      return e.EQPTYPE == value;
    }).map((e2: any) => {
      return {
        value: e2.NAME,
        label: e2.NAME,
      }
    }))
  };

  const handleUpdateChartChecklist = (value: string) => {
    (async () => {
      searchForm.setFieldsValue({ [(() => "CHKINDEX")()]: null });
      let resp = await getBMHisChartCheckList({ EQPTYPE: searchForm.getFieldValue("EQPTYPE"), BMTYPE: searchForm.getFieldValue("BMTYPE") });
      setCurrentChkIndex(
        resp.data.map((e: any) => {
          return {
            value: e.CHKINDEX,
            label: e.CHKINDEX + "." + e.ITEMNAME,
          }
        })
      );
    })();
  };

  return (
    <PageContainer>
      <Card style={{ marginBottom: 20 }}>
        <Form style={{ marginTop: 20 }} form={searchForm} onFinish={onSearch}>
          <Row gutter={20}>

            <Col span={8}>
              <Form.Item label="设备类型名称" name="EQPTYPE" style={{ marginLeft: 0 }} rules={[{ required: true, message: '请选择设备类型!' }]}>
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
              <Form.Item label="Checklist类型" name="BMTYPE" rules={[{ required: true, message: '请选择Checklist类型!' }]}>
                <Select placeholder="请选择" onChange={handleUpdateChartChecklist} showSearch>
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

          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="检验项目" name="CHKINDEX" rules={[{ required: true, message: '请选择检查项目!' }]}>
                <Select placeholder="请选择" showSearch>
                  {currentChkIndex.map((element: { value: any; label: any; }) => (
                    <Select.Option value={element.value} key={element.value}>
                      {element.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="开始结束日期" name="RANGEDATE">
                <RangePicker onChange={dataPickerOnChange} defaultValue={[moment().startOf('day').subtract(30, 'd'), moment()]} format={dateFormat} style={{ width: '100%' }} allowClear={false} />
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
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      {pointList.length == 0 ?
        searchFlag ? <div><Row><Col span={24} style={{ textAlign: 'center' }}><h1>搜索的结果集为空!</h1></Col></Row></div> : <div><Row><Col span={24} style={{ textAlign: 'center' }}><h1>请选择好搜索项后点击搜索!</h1></Col></Row></div> :
        <DemoLine size={{ width: 1000, height: 150 }} collection={pointList} controlLine={{ max: controlLine.max, min: controlLine.min }} />
      }
    </PageContainer>
  );
};

export default BmHistoryChart;
