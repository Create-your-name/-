import { PageContainer } from '@ant-design/pro-layout';
import {
  Button,
  Col,
  Drawer,
  Input,
  Row,
  Form,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { getAreaEqpList } from '@/pages/EqpManage/EqpListShow/EqpListShow';
import ReactDOM from 'react-dom';
import moment from 'moment';
// import './设备图.files/stylesheet.css';
import './stylesheet.css';
import { history, Link } from 'umi';

const EqpListShow = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentEqp, setCurrentEqp] = useState<any>();
  const [lastUpdateTime, setLastUpdateTime] = useState<string>();
  const [eqpListTotal, setEqpListTotal] = useState<any>([]);

  var eqpList: any[] = [];

  const statusProd = ['01_RUN', '01_S_RUN', '01_E_RUN', '01_REWORK', '01_PROD_TEST'];
  const statusStan = ['02_IDLE', '02_NO_WIP', '02_IMPLICATE', '02_WAIT'];
  const statusEng = ['06_TEST', '06_TEST_CW', '06_PROCESS_LIMIT'];
  const statusSchDwon = ['04_PM', '04_MON_PM', '04_FAC', '04_MON_FAC', '04_CHGLIQUID', '04_MON_R', '04_SETUP', '04_CHANGOVER'];
  const statusUnschDown = ['03_DOWN', '03_REPAIR', '03_REP_COMP', '03_MON_DOWN', '03_FAC_DOWN', '03_MON_FACDOWN', '03_SPCHOLD'];
  // const statusNonSch = ['05_FAC_PM', '05_MON_FACPM', '05_OFFLINE', '05_UPGRADE', '05_NO_COMM']

  useEffect(() => {
    setInterval(async () => {
      let resp = await getAreaEqpList({});
      eqpList = resp.data.map((e: { STATE: string; }) => {
        let color = getEqpStatuscolor(e.STATE);
        return { ...e, color: color };
      });
      eqpList.map((e) => {
        if (document.getElementById(e.EQP) != null) {
          if (e.color != document.getElementById(e.EQP)?.style.backgroundColor) {
            let do1 = document.getElementById(e.EQP);
            ReactDOM.findDOMNode(do1).style.backgroundColor = e.color;
          }
        }
      })
      setEqpListTotal(eqpList)
      setLastUpdateTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    }, 60000)
  }, [0])

  useEffect(() => {
    (async () => {
      let resp = await getAreaEqpList({});
      eqpList = resp.data.map((e: { STATE: string; }) => {
        let color = getEqpStatuscolor(e.STATE);
        return { ...e, color: color };
      });
      eqpList.map((e) => {
        if (document.getElementById(e.EQP) != null) {
          if (e.color != document.getElementById(e.EQP)?.style.backgroundColor) {
            let do1 = document.getElementById(e.EQP);
            ReactDOM.findDOMNode(do1).style.backgroundColor = e.color;
          }
        }
      })
      setEqpListTotal(eqpList);
      setLastUpdateTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    })();
  }, [getAreaEqpList]);

  const onClose = () => {
    setCurrentEqp(undefined);
    setShowDetail(false);
  };

  const onClickButton = (id: any) => {
    window.open("/welcome?EqpQuery=" + id, "_blank");
  };

  const getEqpStatuscolor = (status: string) => {
    if (statusProd.indexOf(status) > -1) {
      return "rgb(0,255,0)";
    } else if (statusStan.indexOf(status) > -1) {
      return "rgb(255,255,0)";
    } else if (statusEng.indexOf(status) > -1) {
      return "rgb(204,156,204)";
    } else if (statusSchDwon.indexOf(status) > -1) {
      return "rgb(51,102,255)";
    } else if (statusUnschDown.indexOf(status) > -1) {
      return "rgb(255,0,0)";
    } else {
      return "rgb(192,192,192)";
    }
  };

  return (
    <PageContainer>

      <div style={{ width: 1345, height: 50, border: '1px solid black', marginLeft: 5, marginBottom: 5 }}>
        <Row>
          <Col span={4}>
            <h2>&nbsp;设备状态</h2>
          </Col>
          <Col span={16} style={{ paddingLeft: 50 }}>
            <Button style={{ marginLeft: 10, marginTop: 5, backgroundColor: 'rgb(0,255,0)', width: 100 }}>
              PROD
            </Button>
            <Button style={{ marginLeft: 10, marginTop: 5, backgroundColor: 'rgb(255,255,0)', width: 100 }}>
              IDLE
            </Button>
            <Button style={{ marginLeft: 10, marginTop: 5, backgroundColor: 'rgb(255,0,0)', width: 100 }}>
              DOWN
            </Button>
            <Button style={{ marginLeft: 10, marginTop: 5, backgroundColor: 'rgb(51,102,255)', width: 100 }}>
              SCH_DOWN
            </Button>
            <Button style={{ marginLeft: 10, marginTop: 5, backgroundColor: 'rgb(192,192,192)', width: 100 }}>
              OFFLINE
            </Button>
            <Button style={{ marginLeft: 10, marginTop: 5, backgroundColor: 'rgb(204,156,204)', width: 100 }}>
              ENG
            </Button>
          </Col>
          <Col span={4}>
            <h3>最后更新时间:<br />{lastUpdateTime}</h3>
          </Col>
        </Row>
      </div>
      <div>
        <table>
          <tbody>
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }} ></td>
              <td style={{ width: 23 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 25 }} ></td>
              <td style={{ width: 23 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 20 }} ></td>
              <td style={{ width: 20 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 81 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 73 }} ></td>
              <td style={{ width: 81 }} ></td>
              <td style={{ width: 81 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 81 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 74 }} ></td>
              <td style={{ width: 20 }} ></td>
              <td style={{ width: 20 }} ></td>
              <td style={{ width: 20 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 61 }} ></td>
              <td style={{ width: 61 }} ></td>
              <td style={{ width: 61 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 54 }} ></td>
              <td style={{ width: 54 }} ></td>
            </tr>
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl69">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl69">  </td>
              <td className="xl70">投料2</td>
              <td className="xl71">  </td>
              <td className="xl69" style={{ borderLeft: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl69">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl71">  </td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl74"><Button id={'CSZS01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CSZS01</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC05-D'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC05-D</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td rowspan={3} className="xl81" style={{ borderBottom: '1px solid black' }} ><Button id={'LSMK02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', height: 98, alignContent: 'center' }}>LSMK02</Button></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC04-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC04-C</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'P5KC05-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC05-C</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'DFURA1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURA1</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'DFURB1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURB1</Button></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'KDFS02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KDFS02</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'KDFS04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KDFS04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KDFS03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KDFS03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KDFS01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KDFS01</Button></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl74"><Button id={'DFURC1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURC1</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl71">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'P5KC04-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC04-B</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'P5KC05-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC05-A</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURA2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURA2</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURB2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURB2</Button></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURC2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURC2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTO01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTO01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'NC1C01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>NC1C01</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'P5KC04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC04</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'P5KC05'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC05</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DFVT01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFVT01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DFVT02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFVT02</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURA3'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURA3</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURB3'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURB3</Button></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURC3'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURC3</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl76" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURA4'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURA4</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'DFURB4'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFURB4</Button></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'SPTI03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'WRCA01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WRCA01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DRYE05'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DRYE05</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DNSS01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DNSS01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'WSCP01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WSCP01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DRYD01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DRYD01</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WRCA01-HF'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WRCA01-HF</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'DRYE06'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DRYE06</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WSCP01-HF'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WSCP01-HF</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'DRYD02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DRYD02</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WRCA01-SC1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WRCA01-SC1</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WSCP01-SC1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WSCP01-SC1</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WRCA01-SC2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WRCA01-SC2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WSCP01-SC2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WSCP01-SC2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">干净区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WRCA01-SPM'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WRCA01-SPM</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WSCP01-SPM'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WSCP01-SPM</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl67">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">薄膜1</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'CSOV01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CSOV01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td className="xl68" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'CSOV02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CSOV02</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td rowspan={3} className="xl81" style={{ borderBottom: '1px solid black' }} ><Button id={'REFT01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', height: 98, alignContent: 'center' }}>REFT01</Button></td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'GASP02-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>GASP02-B</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'GASP01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>GASP01-B</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72">重金属区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'GASP02-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>GASP02-A</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'GASP01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>GASP01-A</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl78">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'GASP02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>GASP02</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'GASP01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>GASP01</Button></td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl74"><Button id={'AURA05'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>AURA05</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'AURA04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>AURA04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'AURA03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>AURA03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'AURA02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>AURA02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'AURA01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>AURA01</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl74"><Button id={'EBXM01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EBXM01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EBXM02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EBXM02</Button></td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl74"><Button id={'CSOV03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CSOV03</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">干法刻蚀3</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">干法刻蚀1</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl69" style={{ borderLeft: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'P5KA02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'P5KA01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'P5KM02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'P5KM01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM01</Button></td>
              <td className="xl80" style={{ borderLeft: 0 }} ><Button id={'P5KO02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO02</Button></td>
              <td className="xl74"><Button id={'P5KO01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO01</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl69" style={{ borderTop: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'SPTI02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI02</Button></td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'SPTI01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KA02-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA02-A</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KA01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA01-A</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KM02-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM02-A</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KM01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM01-A</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KO02-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO02-A</Button></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'P5KO01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO01-A</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTI02-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI02-A</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTI01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI01-A</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KA02-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA02-B</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KA01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA01-B</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KM02-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM02-B</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KM01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM01-B</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KO02-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO02-B</Button></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'P5KO01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO01-B</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTI02-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI02-B</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTI01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI01-B</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KA02-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA02-C</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KA01-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KA01-C</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KM02-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM02-C</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KM01-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KM01-C</Button></td>
              <td className="xl80" style={{ borderTop: 0 }} ><Button id={'P5KO02-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO02-C</Button></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'P5KO01-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KO01-C</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTI02-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI02-C</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTI01-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTI01-C</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS04-F'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS04-F</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS03-F'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS03-F</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS02-F'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS02-F</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS01-F'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS01-F</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">薄膜2灰区</td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS05-F'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS05-F</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS04-E'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS04-E</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS03-E'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS03-E</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS02-E'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS02-E</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS01-E'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS01-E</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS05-D'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS05-D</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS04-D'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS04-D</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS03-D'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS03-D</Button></td>
              <td className="xl72"></td>
              <td className="xl72">干刻1灰区</td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS02-D'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS02-D</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS01-D'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS01-D</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC02-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC02-C</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC01-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC01-C</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS05-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS05-C</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS04-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS04-C</Button></td>
              <td className="xl72"></td>
              <td className="xl72">  </td>
              <td className="xl72"></td>
              <td className="xl72">  </td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS03-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS03-C</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS02-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS02-C</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS01-C'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS01-C</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74"><Button id={'P5KC03-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC03-B</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC02-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC02-B</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC01-B</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS05-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS05-B</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS04-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS04-B</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS03-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS03-B</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS02-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS02-B</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS01-B</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74"><Button id={'P5KC03-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC03-A</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC02-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC02-A</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'P5KC01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC01-A</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SPTS05-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS05-A</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS04-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS04-A</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS03-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS03-A</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS02-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS02-A</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS01-A</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74"><Button id={'P5KC03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC03</Button></td>
              <td className="xl77"></td>
              <td className="xl74"><Button id={'P5KC02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC02</Button></td>
              <td className="xl77"></td>
              <td className="xl74"><Button id={'P5KC01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>P5KC01</Button></td>
              <td className="xl77"></td>
              <td className="xl74"><Button id={'SPTS05'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS05</Button></td>
              <td className="xl77"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS04</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl79">  </td>
              <td className="xl77"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS03</Button></td>
              <td className="xl77"></td>
              <td className="xl77"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS02</Button></td>
              <td className="xl77"></td>
              <td className="xl77"></td>
              <td className="xl77"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SPTS01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SPTS01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl78">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">薄膜2</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">溅射</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'KLAS02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KLAS02</Button></td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'KLAS01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KLAS01</Button></td>
              <td className="xl69" style={{ borderLeft: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'PRTC01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRTC01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'FLMT02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>FLMT02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'FLMT01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>FLMT01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'FTIR01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>FTIR01</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'CSOV04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CSOV04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DPUV04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DPUV04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DPUV03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DPUV03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DPUV02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DPUV02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'DPUV01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DPUV01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'HMDS04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>HMDS04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'HMDS02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>HMDS02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KSSC03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KSSC03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KSSC02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KSSC02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KSSC01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KSSC01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl65" style={{ height: 15.0 }}>  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'KLAS04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KLAS04</Button></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'KLAS03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KLAS03</Button></td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'HMDS03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>HMDS03</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'HMDS01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>HMDS01</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72">测量区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl74"><Button id={'FLEX02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>FLEX02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'FLEX01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>FLEX01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'OMAP02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>OMAP02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'OMAP01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>OMAP01</Button></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'AOIC01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>AOIC01</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'NKSL03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>NKSL03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'NKSL01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>NKSL01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EGAL04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EGAL04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EGAL03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EGAL03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EGAL02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EGAL02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EGAL01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EGAL01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl78">  </td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM41'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM41</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'MIAE01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIAE01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'MIMQ04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIMQ04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'MIMQ03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIMQ03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'CLIM01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CLIM01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'MIMQ02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIMQ02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'MIMQ01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIMQ01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'RULE01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>RULE01</Button></td>
              <td className="xl77">  </td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'EGML02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EGML02</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'EGML01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EGML01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">湿法1</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72">FAB备件间</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }} >  </td>
              <td className="xl74"><Button id={'WETK01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETK01</Button></td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'WNMP02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02</Button></td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'WNMP01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP01</Button></td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'WETO02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO02</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'NKSL02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>NKSL02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'HICD01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>HICD01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KSSD04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KSSD04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KSSD03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KSSD03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KSSD02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KSSD02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'KSSD01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>KSSD01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74"><Button id={'WETK01-A'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETK01-A</Button></td>
              <td className="xl72">  </td>
              <td className="xl72">  </td>
              <td className="xl74"><Button id={'WNMP02-ZJ1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02-ZJ1</Button></td>
              <td className="xl72">  </td>
              <td className="xl72">  </td>
              <td className="xl74"><Button id={'WNMP01-NMP1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP01-NMP1</Button></td>
              <td className="xl72">  </td>
              <td className="xl74"><Button id={'WETO02-HF'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO02-HF</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETK01-B'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETK01-B</Button></td>
              <td className="xl72">  </td>
              <td className="xl72">  </td>
              <td className="xl74"><Button id={'WNMP02-ZJ2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02-ZJ2</Button></td>
              <td className="xl72">湿法1灰区</td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP01-NMP2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP01-NMP2</Button></td>
              <td className="xl72">  </td>
              <td className="xl74"><Button id={'WETO02-BOE'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO02-BOE</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP02-ZJ3'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02-ZJ3</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP01-IPA1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP01-IPA1</Button></td>
              <td className="xl72">  </td>
              <td className="xl74"><Button id={'WETO02-HCL'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO02-HCL</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">光刻区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP02-DB'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02-DB</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP01-IPA2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP01-IPA2</Button></td>
              <td className="xl72">  </td>
              <td className="xl74"><Button id={'WETO02-DHF'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO02-DHF</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP02-IPA'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02-IPA</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP01-QDR1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP01-QDR1</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP02-QDR1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02-QDR1</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP01-QDR2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP01-QDR2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WNMP02-QDR2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP02-QDR2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETO01-HF'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO01-HF</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WETO01-BOE'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO01-BOE</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WETO01-QDR'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO01-QDR</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETM01-MO1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETM01-MO1</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETR02-SPM'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR02-SPM</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETR01-SPM1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR01-SPM1</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WETO01-IPA'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO01-IPA</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETM01-MO2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETM01-MO2</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETR02-H2O'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR02-H2O</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETR01-SPM2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR01-SPM2</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WETO01-N2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO01-N2</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETM01-H2O2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETM01-H2O2</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETR02-SC1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR02-SC1</Button></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'WETR01-SC1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR01-SC1</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74"><Button id={'WBOX01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WBOX01</Button></td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WETO01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETO01</Button></td>
              <td className="xl77">  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WETM01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETM01</Button></td>
              <td className="xl77">  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WETR02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR02</Button></td>
              <td className="xl78">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'WETR01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETR01</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">湿法2</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'WNMP03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'WETL02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETL02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'WETL01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETL01</Button></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'EVGB05'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB05</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGA01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGA01</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WNMP03-NMP1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP03-NMP1</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td colspan={6} ></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WNMP03-NMP2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP03-NMP2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'EVGB09'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB09</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGA02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGA02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB08'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB08</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB07'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB07</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB06'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB06</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl69">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">湿法2灰区</td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WNMP03-IPA'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP03-IPA</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl78">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'WNMP03-N2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WNMP03-N2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl69">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl74"><Button id={'WETP01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WETP01</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl74"><Button id={'EVGB14'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB14</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB13'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB13</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGA03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGA03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB12'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB12</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB11'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB11</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'EVGB10'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EVGB10</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >湿法3</td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl71" style={{ borderTop: 0 }} >  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl69" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">干法刻蚀2</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }} >  </td>
              <td className="xl74"><Button id={'WSC101'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>WSC101</Button></td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'SRUB03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SRUB03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'SRUB02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SRUB02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'SRUB01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SRUB01</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl69" style={{ borderTop: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl74"><Button id={'NIDB01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>NIDB01</Button></td>
              <td className="xl71">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">干法刻蚀2-1</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl79">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl70">  </td>
              <td className="xl70">薄膜3-1</td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">薄膜3</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SCIT02-PM2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT02-PM2</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'SCIT01-PM2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT01-PM2</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'SCIT03-PM2'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT03-PM2</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'SCIT02-PM1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT02-PM1</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'SCIT01-PM1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT01-PM1</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'SCIT03-PM1'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT03-PM1</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'EDGT01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>EDGT01</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'DFGB02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFGB02</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'DFGB01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>DFGB01</Button></td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl74"><Button id={'CMPI03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CMPI03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'CMPI02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CMPI02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'CMPI01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>CMPI01</Button></td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'SCIT02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT02</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'SCIT01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT01</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'SCIT03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>SCIT03</Button></td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'MIME04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIME04</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'MIME03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIME03</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'MIME02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIME02</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'MIME01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIME01</Button></td>
              <td className="xl80" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'MIAE02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>MIAE02</Button></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl69" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl71" style={{ borderTop: 0 }} >  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">包装区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl76">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">干法蚀刻2-1</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }} >  </td>
              <td className="xl70">  </td>
              <td className="xl71">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72">测试区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM08'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM08</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM07'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM07</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM06'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM06</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM05'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM05</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'PRBM04'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM04</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM03'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM03</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM02'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM02</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM01</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM16'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM16</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM15'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM15</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM14'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM14</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM13'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM13</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'PRBM12'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM12</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM11'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM11</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM10'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM10</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM09'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM09</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">预留区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">划片区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM24'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM24</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM23'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM23</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM22'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM22</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM21'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM21</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'PRBM20'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM20</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM19'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM19</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM18'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM18</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM17'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM17</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl75">  </td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM32'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM32</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM31'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM31</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM30'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM30</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM29'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM29</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'PRBM28'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM28</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM27'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM27</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM26'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM26</Button></td>
              <td className="xl74" style={{ borderTop: 0, borderLeft: 0 }} ><Button id={'PRBM25'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM25</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">芯片测试区</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl73" style={{ borderLeft: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl75">  </td>
              <td className="xl79" style={{ borderLeft: 0 }} >  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl73">  </td>
              <td className="xl75">  </td>
              <td className="xl66" style={{ borderLeft: 0 }} ><Button id={'PRBM40'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM40</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM39'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM39</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM38'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM38</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM37'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM37</Button></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl74"><Button id={'PRBM36'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM36</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM35'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM35</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM34'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM34</Button></td>
              <td className="xl74" style={{ borderLeft: 0 }} ><Button id={'PRBM33'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>PRBM33</Button></td>
              <td></td>
            </tr >
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl69" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl71" style={{ borderTop: 0 }} >  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl69">  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl74" style={{ borderTop: 0 }} ><Button id={'LSMK01'} onClick={(e) => { onClickButton(e.currentTarget.getAttribute("id")) }} style={{ backgroundColor: 'rgb(192,192,192)', width: '100%', alignContent: 'center' }}>LSMK01</Button></td>
              <td className="xl70">  </td>
              <td className="xl70">  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl70" style={{ borderTop: 0 }} >  </td>
              <td className="xl71" style={{ borderTop: 0 }} >  </td>
              <td></td>
            </tr >
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">洗衣房</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72">成品间</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72">投料1</td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25 }} >
              <td style={{ height: 14.25 }} ></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl73">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl75">  </td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0 }}>
              <td style={{ height: 15.0 }}></td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl72"></td>
              <td className="xl72"></td>
              <td className="xl78">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl79">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl77">  </td>
              <td className="xl78">  </td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td width="23" style={{ height: 15.0, width: 17, maxHeight: 20 }}></td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="27" style={{ borderLeft: 0, width: 20 }}>　</td>
              <td className="xl70" width="27" style={{ width: 20 }}>　</td>
              <td className="xl70" width="72" style={{ borderLeft: 0, width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="27" style={{ width: 20 }}>　</td>
              <td width="27" style={{ width: 20 }}></td>
              <td className="xl70" width="71" style={{ width: 53 }}>　</td>
              <td className="xl70" width="71" style={{ width: 53 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td width="72" style={{ width: 54 }}></td>
            </tr>
          </tbody >
        </table >
      </div >
      {
        showDetail ? (
          <Drawer
            title={'设备信息'}
            width={600}
            visible={true}
            onClose={onClose}
            closable={false}
            extra={
              < Space >
                <Button onClick={onClose}>关闭</Button>
              </Space>
            }
          >
            <Form initialValues={currentEqp} style={{ marginTop: 0 }}>
              <Form.Item label="NAME" name="EQP">
                <Input disabled />
              </Form.Item>
              <Form.Item label="STATE" name="STATE">
                <Input disabled />
              </Form.Item>
              <Form.Item label="AREA" name="AREA">
                <Input disabled />
              </Form.Item>
            </Form>
          </Drawer >
        ) : (
          <div />
        )
      }
    </PageContainer >
  );
};

export default EqpListShow;
