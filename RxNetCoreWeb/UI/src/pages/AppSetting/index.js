import React, { useState, useRef, Component } from 'react';
import { connect } from 'dva';
import { Layout, Row, Col, Card, Input, Form, Button, Menu, Divider, message, 
  Collapse, Space, Typography, Tooltip, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import {getCommonClusterSetting, setCommonClusterSetting} from '@/services/serviceAPI';
import {MenuFoldOutlined, MenuUnfoldOutlined, FolderOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

// 加入在线编辑器
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/yaml/yaml.js';
import 'codemirror/keymap/sublime.js';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/search/matchesonscrollbar.css';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/selection/active-line';
import theme from './dracula-custom.less';
import themeCustom from './dracula-custom.theme.less';
import { useForm } from 'antd/lib/form/Form';
import { netNotify } from '@/utils/err';
import settingArray from './settingArray';
import { apiGetAppSettingV, apiSetAppSettingV } from './service';
//import SettingEditor from './settingEditor';

const { Text } = Typography;

const { Header, Content, Footer, Sider } = Layout;

const settingArr = settingArray;

const options = {
    // mode: 'xml', // 编辑器语言
    theme: 'dracula-custom', // 编辑器主题
    extraKeys: { 'Ctrl-Space': 'autocomplete', 'Ctrl-F': 'find', 'Ctrl-R': 'replace' }, // ctrl可以弹出选择项
    lineNumbers: true, // 显示行号
    lineWrapping: true, // 是否代码折叠
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autofocus: true,
    scrollbarStyle: 'overlay',
    styleActiveLine: true,
    lint: true,
};

//搜索配置项
function SearchClus(value) {
    return settingArr
        .map(item => {
            let childFilter = item.children.filter(item => item.setTitle.search(value) != -1);
            return { ...item, children: childFilter };
        })
        .filter(item => item.children.length > 0);
}

//设置菜单项
function MenuItems(stateMenu, onClickItem) {
    let menusArr = stateMenu.length > 0 ? stateMenu : settingArr;
    return menusArr.map(item => 
        (<Menu.SubMenu
          title={
            <span>
              <FolderOutlined /> 
              <span>{item.levelName}</span>
            </span>
          }
          key={item.levelName}
        >
          {
            item.children.map( subItem => {
                return (<Menu.Item key={subItem.name} onClick={()=>onClickItem(subItem)}>
                    {subItem.setTitle}
                </Menu.Item>);
            })
          }
        </Menu.SubMenu>)
        );
}

const getSetting = async (file, editorRef) => {
  if (!file) {
    message.error("请选择配置项！");
    return;
  }
  


  let setting = await getCommonClusterSetting({name: file});
  netNotify(setting);
  
  if (setting.data.text != null)
    setCodeMirrorText(editorRef, file, setting.data.text);
};

const setCodeMirrorText = (editorRef, file, text)=> {
  let editor = editorRef.current.getCodeMirror();

  if (/\.json$/.test(file)) {
      // 根据请求的文件后缀名判断后台返回的是json还是xml
      editor.setOption('mode', 'application/json');
    }
    if (/\.xml$/.test(file)) {
      editor.setOption('mode', 'xml');
    }
    if (/\.yaml$/.test(file) || /\.yml$/.test(file)) {
      editor.setOption('mode', 'text/x-yaml');
    }
  editor.setValue(text);
}

const AppMenu = (props) => {
    const [newMenuArr, handleNewMenuArr] = useState([]);
    let menuList = MenuItems(newMenuArr, props.onClickItem);

    const [openKeys, setOpenKeys] = useState([]);
    //只有一个folder打开
    const onOpenChange = (opens) => {
        var rootFolders = settingArr.map(item => item.levelName);
        const latestOpenKey = opens.find(key => openKeys.indexOf(key) == -1);

        if (rootFolders) {
          if (rootFolders.indexOf(latestOpenKey) == -1) {
              setOpenKeys(opens);
          } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
          }
        }
      };

    
    return (
        <div >
            <Input.Search allowClear placeholder="配置搜索" onSearch={value => handleNewMenuArr(SearchClus(value))} />

            {props.collapsed ? <MenuUnfoldOutlined onClick={ ()=>props.setCollapsed(!props.collapsed) }/> 
            : <MenuFoldOutlined onClick={ ()=>props.setCollapsed(!props.collapsed) }/>}

            {/* </Button> */}
            <Menu
                mode="inline"
                // theme="dark"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{ maxWidth: 256 }}
                // onClick={props.onClickItem} 
                >
                {menuList}
            </Menu>
        </div>
    );
}

//修改消息提示
async function updateSetting(file, editorRef) {
    const editor = editorRef.current.getCodeMirror();
    var settingText = editor.getValue();
    let resp = await setCommonClusterSetting({name: file, data:settingText});
    netNotify(resp);
  };

const AppSetting = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState({title:"", file: ""})
  const [settingResp, setSettingResp] = useState(undefined);

  const onClickItem = (data) => {
      if (!data) return;
      if (data) {
          var { name, setTitle } = data;
          setSelectedConfig({title: setTitle, file: name});
          setSettingResp(undefined);
      }
  }

  const getSettingV = async (file, editorRef, ver) => {
    if (!file) {
      message.error("请选择配置项！");
      return;
    }
    
    let req = {
      name: file,
      version: ver
    };
    
    setLoading(true);
    let resp = await apiGetAppSettingV(req);
    setLoading(false);
    netNotify(resp);
  
    if (resp.result != 0) {
      return;
    }
    
    setSettingResp(resp.data);

    if (resp.data.data != null)
      setCodeMirrorText(editorRef, file, resp.data.data);
  };

  //修改消息提示
  const setAppSettingV = async (file, editorRef)=> {
    const editor = editorRef.current.getCodeMirror();
    var settingText = editor.getValue();
    
    let req = {
      name: file,
      data: settingText
    }
    setLoading(true);
    let resp = await apiSetAppSettingV(req);
    setLoading(false);
    netNotify(resp);

    if (resp.result != 0) {
      return;
    }

    setSettingResp(resp.data);
    setCodeMirrorText(editorRef, file, resp.data.data);
  };

  const ConfigTitle = ()=>{
    return selectedConfig.file ? (
      <Space>
        <Typography.Text>{selectedConfig.title}</Typography.Text>
        <Divider type="vertical" />
        <Typography.Text>{selectedConfig.file}</Typography.Text>
      </Space>
    ) : <Text type="secondary">左侧选择配置项</Text>
  } 



  const editorRef = useRef();

  //版本选择器
  const VerChoose = ()=> {
    return (
      <Space>
        <Tooltip title="前一版本">
          {settingResp.version>1? <Button size="small" type="primary" shape="circle" icon={<ArrowLeftOutlined />} 
          onClick={()=>getSettingV(selectedConfig.file, editorRef,settingResp.version-1)}/>: <div/> }
          <Typography.Text style={{margin:10 }}>{settingResp.version+"/"+settingResp.maxVersion}</Typography.Text>
          {settingResp.version<settingResp.maxVersion? <Button size="small" type="primary" shape="circle" icon={<ArrowRightOutlined />} 
          onClick={()=>getSettingV(selectedConfig.file, editorRef, settingResp.version+1)}/>: <div/> }
        </Tooltip>
      </Space>
    )
  }

    const SettingEditor = ()=> {
      return (
        <Card title={<ConfigTitle/>} extra={
          <Space>
            {settingResp? <VerChoose/>:<div/>}
              <Button type="primary" onClick={()=>getSettingV(selectedConfig.file, editorRef, 0)}>
                查询
              </Button>
              <Button type="primary" onClick={()=>setAppSettingV(selectedConfig.file, editorRef)} >
                提交修改
              </Button>
            </Space>
        }>
        <CodeMirror
              ref={editorRef}
              // onChange={updateCode}
              options={options}
            />
      </Card>
      );
    }

    const [collapsed, setCollapsed] = useState(false);
    return (
      <PageContainer  >
        <Layout style={{backgroundColor:"#fff"}}>
          <Sider  style={{background:"#fff"}} width={"20%"} collapsed={collapsed}>
            {/* 菜单部分 */}
            <AppMenu onClickItem={onClickItem} {...{collapsed, setCollapsed}} />
          </Sider>
          <Content style={{ padding: '0 0px', minHeight: 280 }}>
            {/* 菜单对应内容  */}
            <Spin spinning={loading}>
              <SettingEditor />
            </Spin>
          </Content>
        </Layout>
      </PageContainer>
    );
}

const formItemLayout1 = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24},
      md: { span: 24},
    },
  };
const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 0 },
    },
  };
//export default AppSetting;

export default AppSetting;