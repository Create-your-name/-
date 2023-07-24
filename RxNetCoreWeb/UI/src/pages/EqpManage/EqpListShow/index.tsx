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
import './设备图.files/stylesheet.css';
import { history, Link } from 'umi';

const EqpListShow = () => {
  const [photoComs, setPhotoComs] = useState<any>([]);
  const [thinfComs, setThinfComs] = useState<any>([]);
  const [etchComs, setEtchComs] = useState<any>([]);
  const [diffComs, setDiffComs] = useState<any>([]);
  const [rawmComs, setRawmComs] = useState<any>([]);
  const [pcmComs, setPcmComs] = useState<any>([]);
  const [qaComs, setQaComs] = useState<any>([]);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentEqp, setCurrentEqp] = useState<any>();
  const [lastUpdateTime, setLastUpdateTime] = useState<string>();
  const [test, setTest] = useState<any>();
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
      // eqpList = resp.data;
      setEqpListTotal(eqpList);
      // let photoEqpsTemp: any[] = [];
      // let thinfEqpsTemp: any[] = [];
      // let etchEqpsTemp: any[] = [];
      // let diffEqpsTemp: any[] = [];
      // let rawmEqpsTemp: any[] = [];
      // let pcmEqpsTemp: any[] = [];
      // let qaEqpsTemp: any[] = [];
      // for (let i = 0; i < resp.data.length; i++) {
      //   if (resp.data[i].AREA == 'PHOTO') {
      //     photoEqpsTemp.push(resp.data[i]);
      //   } else if (resp.data[i].AREA == 'THINF') {
      //     thinfEqpsTemp.push(resp.data[i]);
      //   } else if (resp.data[i].AREA == 'ETCH') {
      //     etchEqpsTemp.push(resp.data[i]);
      //   } else if (resp.data[i].AREA == 'DIFF') {
      //     diffEqpsTemp.push(resp.data[i]);
      //   } else if (resp.data[i].AREA == 'RAWM') {
      //     rawmEqpsTemp.push(resp.data[i]);
      //   } else if (resp.data[i].AREA == 'PCM') {
      //     pcmEqpsTemp.push(resp.data[i]);
      //   } else if (resp.data[i].AREA == 'QA') {
      //     qaEqpsTemp.push(resp.data[i]);
      //   }
      // }
      // let photoComsTemp = [];
      // let thinfComsTemp = [];
      // let etchComsTemp = [];
      // let diffComsTemp = [];
      // let rawmComsTemp = [];
      // let pcmComsTemp = [];
      // let qaComsTemp = [];
      // for (let i = 0; i < photoEqpsTemp.length; i++) {
      //   let backColor = getEqpStatuscolor(photoEqpsTemp[i].STATE);
      //   photoComsTemp.push(<Button id={photoEqpsTemp[i].EQP} onClick={(id) => onClickButton(photoEqpsTemp[i].EQP)} style={{ width: 80, backgroundColor: backColor, alignContent: 'center', marginLeft: 2, paddingLeft: 0, paddingRight: 0, float: 'left', fontSize: 8 }}>{photoEqpsTemp[i].EQP}</Button>)
      // }
      // for (let i = 0; i < thinfEqpsTemp.length; i++) {
      //   let backColor = getEqpStatuscolor(thinfEqpsTemp[i].STATE);
      //   thinfComsTemp.push(<Button id={thinfEqpsTemp[i].EQP} onClick={(id) => onClickButton(thinfEqpsTemp[i].EQP)} style={{ width: 80, backgroundColor: backColor, alignContent: 'center', marginLeft: 2, paddingLeft: 0, paddingRight: 0, float: 'left', fontSize: 8 }}>{thinfEqpsTemp[i].EQP}</Button>)
      // }
      // for (let i = 0; i < etchEqpsTemp.length; i++) {
      //   let backColor = getEqpStatuscolor(etchEqpsTemp[i].STATE);
      //   etchComsTemp.push(<Button id={etchEqpsTemp[i].EQP} onClick={(id) => onClickButton(etchEqpsTemp[i].EQP)} style={{ width: 80, backgroundColor: backColor, alignContent: 'center', marginLeft: 3, paddingLeft: 0, paddingRight: 0, float: 'left', fontSize: 8 }}>{etchEqpsTemp[i].EQP}</Button>)
      // }
      // for (let i = 0; i < diffEqpsTemp.length; i++) {
      //   let backColor = getEqpStatuscolor(diffEqpsTemp[i].STATE);
      //   diffComsTemp.push(<Button id={diffEqpsTemp[i].EQP} onClick={(id) => onClickButton(diffEqpsTemp[i].EQP)} style={{ width: 80, backgroundColor: backColor, alignContent: 'center', marginLeft: 2, paddingLeft: 0, paddingRight: 0, float: 'left', fontSize: 8 }}>{diffEqpsTemp[i].EQP}</Button>)
      // }
      // for (let i = 0; i < rawmEqpsTemp.length; i++) {
      //   let backColor = getEqpStatuscolor(rawmEqpsTemp[i].STATE);
      //   rawmComsTemp.push(<Button id={rawmEqpsTemp[i].EQP} onClick={(id) => onClickButton(rawmEqpsTemp[i].EQP)} style={{ width: 80, backgroundColor: backColor, alignContent: 'center', marginLeft: 2, paddingLeft: 0, paddingRight: 0, float: 'left', fontSize: 8 }}>{rawmEqpsTemp[i].EQP}</Button>)
      // }
      // for (let i = 0; i < pcmEqpsTemp.length; i++) {
      //   let backColor = getEqpStatuscolor(pcmEqpsTemp[i].STATE);
      //   pcmComsTemp.push(<Button id={pcmEqpsTemp[i].EQP} onClick={(id) => onClickButton(pcmEqpsTemp[i].EQP)} style={{ width: 80, backgroundColor: backColor, alignContent: 'center', marginLeft: 2, paddingLeft: 0, paddingRight: 0, float: 'left', fontSize: 8 }}>{pcmEqpsTemp[i].EQP}</Button>)
      // }
      // for (let i = 0; i < qaEqpsTemp.length; i++) {
      //   let backColor = getEqpStatuscolor(qaEqpsTemp[i].STATE);
      //   qaComsTemp.push(<Button id={qaEqpsTemp[i].EQP} onClick={(id) => onClickButton(qaEqpsTemp[i].EQP)} style={{ width: 80, backgroundColor: backColor, alignContent: 'center', marginLeft: 2, paddingLeft: 0, paddingRight: 0, float: 'left', fontSize: 8 }}>{qaEqpsTemp[i].EQP}</Button>)
      // }
      // setPhotoComs(photoComsTemp)
      // setThinfComs(thinfComsTemp)
      // setEtchComs(etchComsTemp)
      // setDiffComs(diffComsTemp)
      // setRawmComs(rawmComsTemp)
      // setPcmComs(pcmComsTemp)
      // setQaComs(qaComsTemp)
      setLastUpdateTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    })();
  }, [getAreaEqpList]);

  const onClose = () => {
    setCurrentEqp(undefined);
    setShowDetail(false);
  };

  const onClickButton = (id: any) => {
    // window.open('about:blank').location.href="http://localhost:8000/welcome?to=EqpQuery";
    // history.push({
    //   pathname: '/EqpQuery',
    //   state: {
    //     eqpid: "asdasdasdasd",
    //   }
    // });
    // window.open("/welcome?EqpQuery=" + id, "_blank");
    for (let i = 0; i < eqpListTotal.length; i++) {
      if (eqpListTotal[i].EQP == id) {
        setCurrentEqp(eqpListTotal[i])
        setShowDetail(true);
        break;
      }
    }
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
      {/* <div style={{ width: 1350 }}>
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
        <div style={{ width: 1345, height: 280, border: '1px solid black', marginLeft: 5, marginBottom: 5, float: 'left' }}>
          <Row>
            <h2>&nbsp;ETCH</h2>
          </Row>
          <Row>
            {etchComs}
          </Row>
        </div>
        <div style={{ width: 590, height: 305, border: '1px solid black', marginLeft: 5, marginBottom: 5, float: 'left' }}>
          <Row>
            <h2>&nbsp;PCM</h2>
          </Row>
          <Row>
            {pcmComs}
          </Row>
        </div>
        <div style={{ width: 750, height: 305, border: '1px solid black', marginLeft: 5, marginBottom: 5, float: 'left' }}>
          <Row>
            <h2>&nbsp;PHOTO</h2>
          </Row>
          <Row>
            {photoComs}
          </Row>
        </div>
        <div style={{ width: 620, height: 300, border: '1px solid black', marginLeft: 5, marginBottom: 5, float: 'left' }}>
          <Row>
            <h2>&nbsp;THINF</h2>
          </Row>
          <Row>
            {thinfComs}
          </Row>
        </div>
        <div style={{ width: 415, height: 300, border: '1px solid black', marginLeft: 5, marginBottom: 5, float: 'left' }}>
          <Row>
            <h2>&nbsp;DIFF</h2>
          </Row>
          <Row>
            {diffComs}
          </Row>
        </div>
        <div style={{ width: 300, height: 170, border: '1px solid black', marginLeft: 5, marginBottom: 5, float: 'left' }}>
          <Row>
            <h2>&nbsp;QA</h2>
          </Row>
          <Row>
            {qaComs}
          </Row>
        </div>
        <div style={{ width: 300, height: 125, border: '1px solid black', marginLeft: 5, marginBottom: 5, float: 'left' }}>
          <Row>
            <h2>&nbsp;RAWM</h2>
          </Row>
          <Row>
            {rawmComs}
          </Row>
        </div>
      </div> */}

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
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td width="23" style={{ height: 15.0, width: 17, maxHeight: 20 }}></td>
              <td className="xl69" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl71" width="72" style={{ width: 54 }}>　</td>
              <td className="xl69" width="27" style={{ borderLeft: 0, width: 20 }}>　</td>
              <td className="xl71" width="27" style={{ width: 20 }}>　</td>
              <td className="xl69" width="72" style={{ borderLeft: 0, width: 54 }}>　</td>
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
              <td className="xl77" width="27" style={{ width: 20 }}>　</td>
              <td width="27" style={{ width: 20 }}></td>
              <td className="xl69" width="71" style={{ width: 53 }}>　</td>
              <td className="xl70" width="71" style={{ width: 53 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl70" width="72" style={{ width: 54 }}>　</td>
              <td className="xl71" width="72" style={{ width: 54 }}>　</td>
              <td width="72" style={{ width: 54 }}></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td className="xl65">
                <Button id={'CSZS01'} onClick={() => onClickButton('CSZS01')} style={{ width: 80, alignContent: 'center' }}>CSZS01</Button></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'SPTO01'} onClick={() => onClickButton('SPTO01')} style={{ width: 80, alignContent: 'center' }}>SPTO01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'NC1C01'} onClick={() => onClickButton('NC1C01')} style={{ width: 80, alignContent: 'center' }}>NC1C01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KC04'} onClick={() => onClickButton('P5KC04')} style={{ width: 80, alignContent: 'center' }}>P5KC04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KC05'} onClick={() => onClickButton('P5KC05')} style={{ width: 80, alignContent: 'center' }}>P5KC05</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DFVT01'} onClick={() => onClickButton('DFVT01')} style={{ width: 80, alignContent: 'center' }}>DFVT01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DFVT02'} onClick={() => onClickButton('DFVT02')} style={{ width: 80, alignContent: 'center' }}>DFVT02</Button></td>
              <td></td>
              <td className="xl65">
                <Button id={'DFURA1'} onClick={() => onClickButton('DFURA1')} style={{ width: 80, alignContent: 'center' }}>DFURA1</Button></td>
              <td></td>
              <td className="xl65">
                <Button id={'DFURB1'} onClick={() => onClickButton('DFURB1')} style={{ width: 80, alignContent: 'center' }}>DFURB1</Button></td>
              <td></td>
              <td className="xl77">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">投料2</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl78" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DFURA2'} onClick={() => onClickButton('DFURA2')} style={{ width: 80, alignContent: 'center' }}>DFURA2</Button></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DFURB2'} onClick={() => onClickButton('DFURB2')} style={{ width: 80, alignContent: 'center' }}>DFURB2</Button></td>
              <td></td>
              <td className="xl77">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl65">
                <Button id={'KDFS02'} onClick={() => onClickButton('KDFS02')} style={{ width: 80, alignContent: 'center' }}>KDFS02</Button></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65">
                <Button id={'KDFS04'} onClick={() => onClickButton('KDFS04')} style={{ width: 80, alignContent: 'center' }}>KDFS04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KDFS03'} onClick={() => onClickButton('KDFS03')} style={{ width: 80, alignContent: 'center' }}>KDFS03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KDFS01'} onClick={() => onClickButton('KDFS01')} style={{ width: 80, alignContent: 'center' }}>KDFS01</Button></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td className="xl65">
                <Button id={'DFURC1'} onClick={() => onClickButton('DFURC1')} style={{ width: 80, alignContent: 'center' }}>DFURC1</Button></td>
              <td></td>
              <td></td>
              <td className="xl65">
                <Button id={'LSMK02'} onClick={() => onClickButton('LSMK02')} style={{ width: 80, alignContent: 'center' }}>LSMK02</Button></td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'SPTI03'} onClick={() => onClickButton('SPTI03')} style={{ width: 80, alignContent: 'center' }}>SPTI03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'WRCA01'} onClick={() => onClickButton('WRCA01')} style={{ width: 80, alignContent: 'center' }}>WRCA01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DRYE05'} onClick={() => onClickButton('DRYE05')} style={{ width: 80, alignContent: 'center' }}>DRYE05</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DNSS01'} onClick={() => onClickButton('DNSS01')} style={{ width: 80, alignContent: 'center' }}>DNSS01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'WSCP01'} onClick={() => onClickButton('WSCP01')} style={{ width: 80, alignContent: 'center' }}>WSCP01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DRYD01'} onClick={() => onClickButton('DRYD01')} style={{ width: 80, alignContent: 'center' }}>DRYD01</Button></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DFURA3'} onClick={() => onClickButton('DFURA3')} style={{ width: 80, alignContent: 'center' }}>DFURA3</Button></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DFURB3'} onClick={() => onClickButton('DFURB3')} style={{ width: 80, alignContent: 'center' }}>DFURB3</Button></td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DFURC2'} onClick={() => onClickButton('DFURC2')} style={{ width: 80, alignContent: 'center' }}>DFURC2</Button></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DRYE06'} onClick={() => onClickButton('DRYE06')} style={{ width: 80, alignContent: 'center' }}>DRYE06</Button></td>
              <td></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DRYD02'} onClick={() => onClickButton('DRYD02')} style={{ width: 80, alignContent: 'center' }}>DRYD02</Button></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DFURA4'} onClick={() => onClickButton('DFURA4')} style={{ width: 80, alignContent: 'center' }}>DFURA4</Button></td>
              <td></td>
              <td style={{ borderTop: 0 }} className="xl65">
                <Button id={'DFURB4'} onClick={() => onClickButton('DFURB4')} style={{ width: 80, alignContent: 'center' }}>DFURB4</Button></td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'DFURC3'} onClick={() => onClickButton('DFURC3')} style={{ width: 80, alignContent: 'center' }}>DFURC3</Button></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl77">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65">
                <Button id={'REFT01'} onClick={() => onClickButton('REFT01')} style={{ width: 80, alignContent: 'center' }}>REFT01</Button></td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>P231MEI隔离区1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl77">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl77">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>薄膜1</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65">
                <Button id={'CSOV01'} onClick={() => onClickButton('CSOV01')} style={{ width: 80, alignContent: 'center' }}>CSOV01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl79">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'CSOV02'} onClick={() => onClickButton('CSOV02')} style={{ width: 80, alignContent: 'center' }}>CSOV02</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td colSpan={2}>MEI隔离区2</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'GASP02'} onClick={() => onClickButton('GASP02')} style={{ width: 80, alignContent: 'center' }}>GASP02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'GASP01'} onClick={() => onClickButton('GASP01')} style={{ width: 80, alignContent: 'center' }}>GASP01</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'AURA05'} onClick={() => onClickButton('AURA05')} style={{ width: 80, alignContent: 'center' }}>AURA05</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'AURA04'} onClick={() => onClickButton('AURA04')} style={{ width: 80, alignContent: 'center' }}>AURA04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'AURA03'} onClick={() => onClickButton('AURA03')} style={{ width: 80, alignContent: 'center' }}>AURA03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'AURA02'} onClick={() => onClickButton('AURA02')} style={{ width: 80, alignContent: 'center' }}>AURA02</Button></td>
              <td className="xl66" style={{ borderLeft: 0 }}>
                <Button id={'AURA01'} onClick={() => onClickButton('AURA01')} style={{ width: 80, alignContent: 'center' }}>AURA01</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'EBXM01'} onClick={() => onClickButton('EBXM01')} style={{ width: 80, alignContent: 'center' }}>EBXM01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EBXM02'} onClick={() => onClickButton('EBXM02')} style={{ width: 80, alignContent: 'center' }}>EBXM02</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'CSOV03'} onClick={() => onClickButton('CSOV03')} style={{ width: 80, alignContent: 'center' }}>CSOV03</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>干法刻蚀3</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>干法刻蚀1</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl69" style={{ borderLeft: 0 }}>　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'P5KA02'} onClick={() => onClickButton('P5KA02')} style={{ width: 80, alignContent: 'center' }}>P5KA02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KA01'} onClick={() => onClickButton('P5KA01')} style={{ width: 80, alignContent: 'center' }}>P5KA01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KM02'} onClick={() => onClickButton('P5KM02')} style={{ width: 80, alignContent: 'center' }}>P5KM02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KM01'} onClick={() => onClickButton('P5KM01')} style={{ width: 80, alignContent: 'center' }}>P5KM01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KO02'} onClick={() => onClickButton('P5KO02')} style={{ width: 80, alignContent: 'center' }}>P5KO02</Button></td>
              <td className="xl66" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'P5KO01'} onClick={() => onClickButton('P5KO01')} style={{ width: 80, alignContent: 'center' }}>P5KO01</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl69" style={{ borderTop: 0 }}>　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'SPTI02'} onClick={() => onClickButton('SPTI02')} style={{ width: 80, alignContent: 'center' }}>SPTI02</Button></td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'SPTI01'} onClick={() => onClickButton('SPTI01')} style={{ width: 80, alignContent: 'center' }}>SPTI01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>干刻1灰区</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>薄膜2灰区</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl71" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl74" style={{ borderLeft: 0 }}>　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'P5KC03'} onClick={() => onClickButton('P5KC03')} style={{ width: 80, alignContent: 'center' }}>P5KC03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KC02'} onClick={() => onClickButton('P5KC02')} style={{ width: 80, alignContent: 'center' }}>P5KC02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'P5KC01'} onClick={() => onClickButton('P5KC01')} style={{ width: 80, alignContent: 'center' }}>P5KC01</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'SPTS05'} onClick={() => onClickButton('SPTS05')} style={{ width: 80, alignContent: 'center' }}>SPTS05</Button></td>
              <td className="xl75">　</td>
              <td className="xl66">
                <Button id={'SPTS04'} onClick={() => onClickButton('SPTS04')} style={{ width: 80, alignContent: 'center' }}>SPTS04</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'SPTS03'} onClick={() => onClickButton('SPTS03')} style={{ width: 80, alignContent: 'center' }}>SPTS03</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'SPTS02'} onClick={() => onClickButton('SPTS02')} style={{ width: 80, alignContent: 'center' }}>SPTS02</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'SPTS01'} onClick={() => onClickButton('SPTS01')} style={{ width: 80, alignContent: 'center' }}>SPTS01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>薄膜2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>溅射</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'KLAS02'} onClick={() => onClickButton('KLAS02')} style={{ width: 80, alignContent: 'center' }}>KLAS02</Button></td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'KLAS01'} onClick={() => onClickButton('KLAS01')} style={{ width: 80, alignContent: 'center' }}>KLAS01</Button></td>
              <td className="xl69" style={{ borderLeft: 0 }}>　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'PRTC02'} onClick={() => onClickButton('PRTC02')} style={{ width: 80, alignContent: 'center' }}>PRTC02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'FLIM02'} onClick={() => onClickButton('FLIM02')} style={{ width: 80, alignContent: 'center' }}>FLIM02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'FLIM01'} onClick={() => onClickButton('FLIM01')} style={{ width: 80, alignContent: 'center' }}>FLIM01</Button></td>
              <td className="xl66" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'FTIR01'} onClick={() => onClickButton('FTIR01')} style={{ width: 80, alignContent: 'center' }}>FTIR01</Button></td>
              <td className="xl72">　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'CSOV04'} onClick={() => onClickButton('CSOV04')} style={{ width: 80, alignContent: 'center' }}>CSOV04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DPUV04'} onClick={() => onClickButton('DPUV04')} style={{ width: 80, alignContent: 'center' }}>DPUV04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DPUV03'} onClick={() => onClickButton('DPUV03')} style={{ width: 80, alignContent: 'center' }}>DPUV03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DPUV02'} onClick={() => onClickButton('DPUV02')} style={{ width: 80, alignContent: 'center' }}>DPUV02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'DPUV01'} onClick={() => onClickButton('DPUV01')} style={{ width: 80, alignContent: 'center' }}>DPUV01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'HMDS04'} onClick={() => onClickButton('HMDS04')} style={{ width: 80, alignContent: 'center' }}>HMDS04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'HMDS02'} onClick={() => onClickButton('HMDS02')} style={{ width: 80, alignContent: 'center' }}>HMDS02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KSSC03'} onClick={() => onClickButton('KSSC03')} style={{ width: 80, alignContent: 'center' }}>KSSC03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KSSC02'} onClick={() => onClickButton('KSSC02')} style={{ width: 80, alignContent: 'center' }}>KSSC02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KSSC01'} onClick={() => onClickButton('KSSC01')} style={{ width: 80, alignContent: 'center' }}>KSSC01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl69">　</td>
              <td className="xl70">　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70">　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'KLAS04'} onClick={() => onClickButton('KLAS04')} style={{ width: 80, alignContent: 'center' }}>KLAS04</Button></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'KLAS03'} onClick={() => onClickButton('KLAS03')} style={{ width: 80, alignContent: 'center' }}>KLAS03</Button></td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'HMDS03'} onClick={() => onClickButton('HMDS03')} style={{ width: 80, alignContent: 'center' }}>HMDS03</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'HMDS01'} onClick={() => onClickButton('HMDS01')} style={{ width: 80, alignContent: 'center' }}>HMDS01</Button></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td>测量区</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'AOIC01'} onClick={() => onClickButton('AOIC01')} style={{ width: 80, alignContent: 'center' }}>AOIC01</Button></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65">
                <Button id={'NKSL03'} onClick={() => onClickButton('NKSL03')} style={{ width: 80, alignContent: 'center' }}>NKSL03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'NKSL01'} onClick={() => onClickButton('NKSL01')} style={{ width: 80, alignContent: 'center' }}>NKSL01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EGAL04'} onClick={() => onClickButton('EGAL04')} style={{ width: 80, alignContent: 'center' }}>EGAL04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EGAL03'} onClick={() => onClickButton('EGAL03')} style={{ width: 80, alignContent: 'center' }}>EGAL03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EGAL02'} onClick={() => onClickButton('EGAL02')} style={{ width: 80, alignContent: 'center' }}>EGAL02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EGAL01'} onClick={() => onClickButton('EGAL01')} style={{ width: 80, alignContent: 'center' }}>EGAL01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl74" style={{ borderLeft: 0 }}>　</td>
              <td className="xl65">
                <Button id={'PRBM41'} onClick={() => onClickButton('PRBM41')} style={{ width: 80, alignContent: 'center' }}>PRBM41</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'MIAE01'} onClick={() => onClickButton('MIAE01')} style={{ width: 80, alignContent: 'center' }}>MIAE01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EDBC01'} onClick={() => onClickButton('EDBC01')} style={{ width: 80, alignContent: 'center' }}>EDBC01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'MIMQ04'} onClick={() => onClickButton('MIMQ04')} style={{ width: 80, alignContent: 'center' }}>MIMQ04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'MIMQ03'} onClick={() => onClickButton('MIMQ03')} style={{ width: 80, alignContent: 'center' }}>MIMQ03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'CLIM01'} onClick={() => onClickButton('CLIM01')} style={{ width: 80, alignContent: 'center' }}>CLIM01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'MIMQ02'} onClick={() => onClickButton('MIMQ02')} style={{ width: 80, alignContent: 'center' }}>MIMQ02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'MIMQ01'} onClick={() => onClickButton('MIMQ01')} style={{ width: 80, alignContent: 'center' }}>MIMQ01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'RULE01'} onClick={() => onClickButton('RULE01')} style={{ width: 80, alignContent: 'center' }}>RULE01</Button></td>
              <td className="xl75">　</td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'EGML02'} onClick={() => onClickButton('EGML02')} style={{ width: 80, alignContent: 'center' }}>EGML02</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'EGML01'} onClick={() => onClickButton('EGML01')} style={{ width: 80, alignContent: 'center' }}>EGML01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>湿法1</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td colSpan={2}>FAB备件间</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }}>　</td>
              <td className="xl65">
                <Button id={'WETK01'} onClick={() => onClickButton('WETK01')} style={{ width: 80, alignContent: 'center' }}>WETK01</Button></td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'WNMP02'} onClick={() => onClickButton('WNMP02')} style={{ width: 80, alignContent: 'center' }}>WNMP02</Button></td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'WNMP01'} onClick={() => onClickButton('WNMP01')} style={{ width: 80, alignContent: 'center' }}>WNMP01</Button></td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl66" style={{ borderTop: 0 }}>
                <Button id={'WETO02'} onClick={() => onClickButton('WETO02')} style={{ width: 80, alignContent: 'center' }}>WETO02</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65">
                <Button id={'NKSL02'} onClick={() => onClickButton('NKSL02')} style={{ width: 80, alignContent: 'center' }}>NKSL02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'HICD01'} onClick={() => onClickButton('HICD01')} style={{ width: 80, alignContent: 'center' }}>HICD01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KSSD04'} onClick={() => onClickButton('KSSD04')} style={{ width: 80, alignContent: 'center' }}>KSSD04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KSSD03'} onClick={() => onClickButton('KSSD03')} style={{ width: 80, alignContent: 'center' }}>KSSD03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KSSD02'} onClick={() => onClickButton('KSSD02')} style={{ width: 80, alignContent: 'center' }}>KSSD02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'KSSD01'} onClick={() => onClickButton('KSSD01')} style={{ width: 80, alignContent: 'center' }}>KSSD01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>湿法1灰区</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>光刻区</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl74" style={{ borderLeft: 0 }}>　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'WBOX01'} onClick={() => onClickButton('WBOX01')} style={{ width: 80, alignContent: 'center' }}>WBOX01</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'WETO01'} onClick={() => onClickButton('WETO01')} style={{ width: 80, alignContent: 'center' }}>WETO01</Button></td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'WETM01'} onClick={() => onClickButton('WETM01')} style={{ width: 80, alignContent: 'center' }}>WETM01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'WETR02'} onClick={() => onClickButton('WETR02')} style={{ width: 80, alignContent: 'center' }}>WETR02</Button></td>
              <td className="xl75">　</td>
              <td className="xl66">
                <Button id={'WETR01'} onClick={() => onClickButton('WETR01')} style={{ width: 80, alignContent: 'center' }}>WETR01</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>湿法2</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }}>　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'WNMP03'} onClick={() => onClickButton('WNMP03')} style={{ width: 80, alignContent: 'center' }}>WNMP03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'WETL02'} onClick={() => onClickButton('WETL02')} style={{ width: 80, alignContent: 'center' }}>WETL02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'WETL01'} onClick={() => onClickButton('WETL01')} style={{ width: 80, alignContent: 'center' }}>WETL01</Button></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65">
                <Button id={'EVGB05'} onClick={() => onClickButton('EVGB05')} style={{ width: 80, alignContent: 'center' }}>EVGB05</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB04'} onClick={() => onClickButton('EVGB04')} style={{ width: 80, alignContent: 'center' }}>EVGB04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGA01'} onClick={() => onClickButton('EVGA01')} style={{ width: 80, alignContent: 'center' }}>EVGA01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB03'} onClick={() => onClickButton('EVGB03')} style={{ width: 80, alignContent: 'center' }}>EVGB03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB02'} onClick={() => onClickButton('EVGB02')} style={{ width: 80, alignContent: 'center' }}>EVGB02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB01'} onClick={() => onClickButton('EVGB01')} style={{ width: 80, alignContent: 'center' }}>EVGB01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'EVGB09'} onClick={() => onClickButton('EVGB09')} style={{ width: 80, alignContent: 'center' }}>EVGB09</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'EVGA02'} onClick={() => onClickButton('EVGA02')} style={{ width: 80, alignContent: 'center' }}>EVGA02</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'EVGB08'} onClick={() => onClickButton('EVGB08')} style={{ width: 80, alignContent: 'center' }}>EVGB08</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'EVGB07'} onClick={() => onClickButton('EVGB07')} style={{ width: 80, alignContent: 'center' }}>EVGB07</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'EVGB06'} onClick={() => onClickButton('EVGB06')} style={{ width: 80, alignContent: 'center' }}>EVGB06</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl69">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>湿法2灰区</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl69">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl74" style={{ borderLeft: 0 }}>　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl66">
                <Button id={'WETP01'} onClick={() => onClickButton('WETP01')} style={{ width: 80, alignContent: 'center' }}>WETP01</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'EVGB14'} onClick={() => onClickButton('EVGB14')} style={{ width: 80, alignContent: 'center' }}>EVGB14</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB13'} onClick={() => onClickButton('EVGB13')} style={{ width: 80, alignContent: 'center' }}>EVGB13</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGA03'} onClick={() => onClickButton('EVGA03')} style={{ width: 80, alignContent: 'center' }}>EVGA03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB12'} onClick={() => onClickButton('EVGB12')} style={{ width: 80, alignContent: 'center' }}>EVGB12</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB11'} onClick={() => onClickButton('EVGB11')} style={{ width: 80, alignContent: 'center' }}>EVGB11</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'EVGB10'} onClick={() => onClickButton('EVGB10')} style={{ width: 80, alignContent: 'center' }}>EVGB10</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>湿法3</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl71" style={{ borderTop: 0 }}>　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl69" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>干法刻蚀2</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl69" style={{ borderLeft: 0 }}>　</td>
              <td className="xl65">
                <Button id={'WSC101'} onClick={() => onClickButton('WSC101')} style={{ width: 80, alignContent: 'center' }}>WSC101</Button></td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl65">
                <Button id={'SRUB03'} onClick={() => onClickButton('SRUB03')} style={{ width: 80, alignContent: 'center' }}>SRUB03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'SRUB02'} onClick={() => onClickButton('SRUB02')} style={{ width: 80, alignContent: 'center' }}>SRUB02</Button></td>
              <td className="xl66" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'SRUB01'} onClick={() => onClickButton('SRUB01')} style={{ width: 80, alignContent: 'center' }}>SRUB01</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl69" style={{ borderTop: 0 }}>　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl71">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>干法刻蚀2灰区</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl74">　</td>
              <td></td>
              <td></td>
              <td className="xl70">　</td>
              <td className="xl70">薄膜3-1</td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td>薄膜3</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl74" style={{ borderLeft: 0 }}>　</td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'EDGE01'} onClick={() => onClickButton('EDGE01')} style={{ width: 80, alignContent: 'center' }}>EDGE01</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'DFGB02'} onClick={() => onClickButton('DFGB02')} style={{ width: 80, alignContent: 'center' }}>DFGB02</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'DFGB01'} onClick={() => onClickButton('DFGB01')} style={{ width: 80, alignContent: 'center' }}>DFGB01</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'CMPI03'} onClick={() => onClickButton('CMPI03')} style={{ width: 80, alignContent: 'center' }}>CMPI03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'CMPI02'} onClick={() => onClickButton('CMPI02')} style={{ width: 80, alignContent: 'center' }}>CMPI02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'CMPI01'} onClick={() => onClickButton('CMPI01')} style={{ width: 80, alignContent: 'center' }}>CMPI01</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl65">
                <Button id={'SCIT02'} onClick={() => onClickButton('SCIT02')} style={{ width: 80, alignContent: 'center' }}>SCIT02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'SCIT01'} onClick={() => onClickButton('SCIT01')} style={{ width: 80, alignContent: 'center' }}>SCIT01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'SCIT03'} onClick={() => onClickButton('SCIT03')} style={{ width: 80, alignContent: 'center' }}>SCIT03</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl71" style={{ borderTop: 0 }}>　</td>
              <td className="xl67" style={{ borderTop: 0 }}>
                <Button id={'EXPD01'} onClick={() => onClickButton('EXPD01')} style={{ width: 80, alignContent: 'center' }}>EXPD01</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'NELT01'} onClick={() => onClickButton('NELT01')} style={{ width: 80, alignContent: 'center' }}>NELT01</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PACK01'} onClick={() => onClickButton('PACK01')} style={{ width: 80, alignContent: 'center' }}>PACK01</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'MIME04'} onClick={() => onClickButton('MIME04')} style={{ width: 80, alignContent: 'center' }}>MIME04</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'MIME03'} onClick={() => onClickButton('MIME03')} style={{ width: 80, alignContent: 'center' }}>MIME03</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'MIME02'} onClick={() => onClickButton('MIME02')} style={{ width: 80, alignContent: 'center' }}>MIME02</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'MIME01'} onClick={() => onClickButton('MIME01')} style={{ width: 80, alignContent: 'center' }}>MIME01</Button></td>
              <td className="xl66" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'MIAE02'} onClick={() => onClickButton('MIAE02')} style={{ width: 80, alignContent: 'center' }}>MIAE02</Button></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl69" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl71" style={{ borderTop: 0 }}>　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl75">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>包装区</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl78" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>干法刻蚀2-1</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl69" style={{ borderTop: 0, borderLeft: 0 }}>　</td>
              <td className="xl70">　</td>
              <td className="xl71">　</td>
              <td className="xl67">
                <Button id={'DICI01'} onClick={() => onClickButton('DICI01')} style={{ width: 80, alignContent: 'center' }}>DICI01</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'SPLT01'} onClick={() => onClickButton('SPLT01')} style={{ width: 80, alignContent: 'center' }}>SPLT01</Button></td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70">　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td>测试区</td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM08'} onClick={() => onClickButton('PRBM08')} style={{ width: 80, alignContent: 'center' }}>PRBM08</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM07'} onClick={() => onClickButton('PRBM07')} style={{ width: 80, alignContent: 'center' }}>PRBM07</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM06'} onClick={() => onClickButton('PRBM06')} style={{ width: 80, alignContent: 'center' }}>PRBM06</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM05'} onClick={() => onClickButton('PRBM05')} style={{ width: 80, alignContent: 'center' }}>PRBM05</Button></td>
              <td></td>
              <td className="xl65">
                <Button id={'PRBM04'} onClick={() => onClickButton('PRBM04')} style={{ width: 80, alignContent: 'center' }}>PRBM04</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM03'} onClick={() => onClickButton('PRBM03')} style={{ width: 80, alignContent: 'center' }}>PRBM03</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM02'} onClick={() => onClickButton('PRBM02')} style={{ width: 80, alignContent: 'center' }}>PRBM02</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM01'} onClick={() => onClickButton('PRBM01')} style={{ width: 80, alignContent: 'center' }}>PRBM01</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td colSpan={8}></td>
              <td className="xl72">　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM16'} onClick={() => onClickButton('PRBM16')} style={{ width: 80, alignContent: 'center' }}>PRBM16</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM15'} onClick={() => onClickButton('PRBM15')} style={{ width: 80, alignContent: 'center' }}>PRBM15</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM14'} onClick={() => onClickButton('PRBM14')} style={{ width: 80, alignContent: 'center' }}>PRBM14</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM13'} onClick={() => onClickButton('PRBM13')} style={{ width: 80, alignContent: 'center' }}>PRBM13</Button></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'PRBM12'} onClick={() => onClickButton('PRBM12')} style={{ width: 80, alignContent: 'center' }}>PRBM12</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM11'} onClick={() => onClickButton('PRBM11')} style={{ width: 80, alignContent: 'center' }}>PRBM11</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM10'} onClick={() => onClickButton('PRBM10')} style={{ width: 80, alignContent: 'center' }}>PRBM10</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM09'} onClick={() => onClickButton('PRBM09')} style={{ width: 80, alignContent: 'center' }}>PRBM09</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td></td>
              <td>预留区</td>
              <td></td>
              <td></td>
              <td></td>
              <td>划片区</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM24'} onClick={() => onClickButton('PRBM24')} style={{ width: 80, alignContent: 'center' }}>PRBM24</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM23'} onClick={() => onClickButton('PRBM23')} style={{ width: 80, alignContent: 'center' }}>PRBM23</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM22'} onClick={() => onClickButton('PRBM22')} style={{ width: 80, alignContent: 'center' }}>PRBM22</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM21'} onClick={() => onClickButton('PRBM21')} style={{ width: 80, alignContent: 'center' }}>PRBM21</Button></td>
              <td></td>
              <td className="xl65">
                <Button id={'PRBM20'} onClick={() => onClickButton('PRBM20')} style={{ width: 80, alignContent: 'center' }}>PRBM20</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM19'} onClick={() => onClickButton('PRBM19')} style={{ width: 80, alignContent: 'center' }}>PRBM19</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM18'} onClick={() => onClickButton('PRBM18')} style={{ width: 80, alignContent: 'center' }}>PRBM18</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM17'} onClick={() => onClickButton('PRBM17')} style={{ width: 80, alignContent: 'center' }}>PRBM17</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td className="xl73">　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM32'} onClick={() => onClickButton('PRBM32')} style={{ width: 80, alignContent: 'center' }}>PRBM32</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>　</td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM31'} onClick={() => onClickButton('PRBM31')} style={{ width: 80, alignContent: 'center' }}>PRBM31</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM30'} onClick={() => onClickButton('PRBM30')} style={{ width: 80, alignContent: 'center' }}>PRBM30</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM29'} onClick={() => onClickButton('PRBM29')} style={{ width: 80, alignContent: 'center' }}>PRBM29</Button></td>
              <td></td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'PRBM28'} onClick={() => onClickButton('PRBM28')} style={{ width: 80, alignContent: 'center' }}>PRBM28</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM27'} onClick={() => onClickButton('PRBM27')} style={{ width: 80, alignContent: 'center' }}>PRBM27</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM26'} onClick={() => onClickButton('PRBM26')} style={{ width: 80, alignContent: 'center' }}>PRBM26</Button></td>
              <td className="xl65" style={{ borderTop: 0, borderLeft: 0 }}>
                <Button id={'PRBM25'} onClick={() => onClickButton('PRBM25')} style={{ width: 80, alignContent: 'center' }}>PRBM25</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td colSpan={2}>芯片测试区</td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl72" style={{ borderLeft: 0 }}>　</td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td className="xl74" style={{ borderLeft: 0 }}>　</td>
              <td className="xl73">　</td>
              <td className="xl74" style={{ borderLeft: 0 }}>　</td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td className="xl67">
                <Button id={'DICI02'} onClick={() => onClickButton('DICI02')} style={{ width: 80, alignContent: 'center' }}>DICI02</Button></td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl72">　</td>
              <td className="xl73">　</td>
              <td className="xl68" style={{ borderLeft: 0 }}>
                <Button id={'PRBM40'} onClick={() => onClickButton('PRBM40')} style={{ width: 80, alignContent: 'center' }}>PRBM40</Button></td>
              <td className="xl68" style={{ borderLeft: 0 }}>　</td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM39'} onClick={() => onClickButton('PRBM39')} style={{ width: 80, alignContent: 'center' }}>PRBM39</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM38'} onClick={() => onClickButton('PRBM38')} style={{ width: 80, alignContent: 'center' }}>PRBM38</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM37'} onClick={() => onClickButton('PRBM37')} style={{ width: 80, alignContent: 'center' }}>PRBM37</Button></td>
              <td></td>
              <td className="xl65">
                <Button id={'PRBM36'} onClick={() => onClickButton('PRBM36')} style={{ width: 80, alignContent: 'center' }}>PRBM36</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM35'} onClick={() => onClickButton('PRBM35')} style={{ width: 80, alignContent: 'center' }}>PRBM35</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM34'} onClick={() => onClickButton('PRBM34')} style={{ width: 80, alignContent: 'center' }}>PRBM34</Button></td>
              <td className="xl65" style={{ borderLeft: 0 }}>
                <Button id={'PRBM33'} onClick={() => onClickButton('PRBM33')} style={{ width: 80, alignContent: 'center' }}>PRBM33</Button></td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl69" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl71" style={{ borderTop: 0 }}>　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td className="xl69">　</td>
              <td className="xl70">　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl65" style={{ borderTop: 0 }}>
                <Button id={'LSMK01'} onClick={() => onClickButton('LSMK01')} style={{ width: 80, alignContent: 'center' }}>LSMK01</Button></td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70">　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl70" style={{ borderTop: 0 }}>　</td>
              <td className="xl71" style={{ borderTop: 0 }}>　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>洗衣房</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td>成品间</td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>投料1</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 19 }}>
              <td height="19" style={{ height: 14.25 }}></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
              <td></td>
              <td className="xl72">　</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="xl73">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 15.0, maxHeight: 20 }}>
              <td style={{ height: 15.0, maxHeight: 20 }}></td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td></td>
              <td className="xl76">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl74">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl75">　</td>
              <td className="xl76">　</td>
              <td></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 20 }}>
              <td style={{ height: 14.25, maxHeight: 20 }}></td>
              <td></td>
              <td   ></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 20 }}>
              <td style={{ height: 14.25, maxHeight: 20 }}></td>
              <td></td>
              <td   ></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 20 }}>
              <td style={{ height: 14.25, maxHeight: 20 }}></td>
              <td></td>
              <td   ></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 20 }}>
              <td style={{ height: 14.25, maxHeight: 20 }}></td>
              <td></td>
              <td   ></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 20 }}>
              <td style={{ height: 14.25, maxHeight: 20 }}></td>
              <td></td>
              <td   ></td>
            </tr>
            <tr style={{ height: 14.25, maxHeight: 20 }}>
              <td style={{ height: 14.25, maxHeight: 20 }}></td>
              <td></td>
              <td   ></td>
            </tr>
          </tbody>
        </table>
      </div >
      {showDetail ? (
        <Drawer
          title={'设备信息'}
          width={600}
          visible={true}
          onClose={onClose}
          closable={false}
          extra={
            <Space>
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
        </Drawer>
      ) : (
        <div />
      )}
    </PageContainer >
  );
};

export default EqpListShow;
