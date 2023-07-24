import React, { Component, useRef, useState, useEffect } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import { Icon } from '@ant-design/icons';
import { DeleteOutlined, EditTwoTone } from '@ant-design/icons';
import { Popconfirm, Form, Input, Radio, Button, Row, Col, Card, Spin, Table, Switch, Space, Select, message, Tabs, Modal, TreeSelect } from 'antd';
import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../utils/formLayout';
import { apiQueryMenu, apiCreateMenu, apiRemoveMenu, apiAlertMenu } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { DepartmentSelect } from '../../utils/deptSelect';

const MenuManager = () => {
  const [loading, setLoading] = useState(false);
  const [allMenu, setAllMenu] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [alertId, setAlertId] = useState();
  const [alertInfo, setAlertInfo] = useState({});
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [menuBelong, setMenuBelong] = useState([]);
  const [treeValue, setTreeValue] = useState();

  let createForm = useRef();
  let alertForm = useRef();
  let alertAddForm = useRef();

  const treeGenerator = (x, data) => {
    var children = data
      .filter(child => child.PARENT_ID === x.MENU_ID)
      .map(child => treeGenerator(child, data));
    if (children.length == 0) {
      children = null;
    }
    return {
      ...x,
      title: x.MENU_NAME,
      value: x.MENU_ID,
      key: x.MENU_ID,
      children,
    };
  }

  useEffect(() => {
    (async () => {
      let resp = await apiQueryMenu({})
      let allMenu = resp.data.map(men => { return { ...men, key: men.MENU_ID } });
      setAllMenu(allMenu);
      var menuTreeData = allMenu.map(x => ({
        ...x,
        title: x.MENU_NAME,
      }))
        .filter(x => x.PARENT_ID == 0)
        .map(x => treeGenerator(x, allMenu));
      setTreeData(menuTreeData);
      menuTreeData = [
        {
          key: 0,
          value: 0,
          title: "主目录",
          children: menuTreeData.length > 0 ? menuTreeData : null,
        },
      ]
      setMenuBelong(menuTreeData);
    })()
  }, [apiQueryMenu])

  const queryMenuReq = async () => {
    setLoading(true);
    let resp = await apiQueryMenu({})
    setLoading(false);

    if (resp.result != 0) {
      netNotify(resp);
      return;
    }
    let allMenu = resp.data.map(men => { return { ...men, key: men.MENU_ID } });
    if (resp.result == 0) {
      setAllMenu(allMenu);
      var menuTreeData = allMenu.map(x => ({
        ...x,
        title: x.MENU_NAME,
      }))
        .filter(x => x.PARENT_ID == 0)
        .map(x => treeGenerator(x, allMenu));
      setTreeData(menuTreeData);
      menuTreeData = [
        {
          key: 0,
          value: 0,
          title: "主目录",
          children: menuTreeData.length > 0 ? menuTreeData : null,
        },
      ]
      setMenuBelong(menuTreeData);
    }
    netNotify(resp);
  }

  const removeMenu = async (MENU_ID) => {
    setLoading(true);
    let resp = await apiRemoveMenu({ MENU_ID });
    setLoading(false);
    netNotify(resp);

    //刷新
    queryMenuReq();
  }

  const createMenu = async (values) => {
    console.log(alertAddForm.current);

    if (alertAddForm.current.getFieldValue("PARENT_ID") == null ||
      alertAddForm.current.getFieldValue("MENU_NAME") == null) {
      message.error("信息不可为空!");
      return;
    }
    handleAddCancel();
    setLoading(true);
    let resp = await apiCreateMenu(alertAddForm.current.getFieldsValue());
    setLoading(false);
    netNotify(resp);

    if (resp.result == 0)
      // alertAddForm.current.resetFields();
      alertAddForm.current = null;
    queryMenuReq();
  }

  const showModal = (value) => {
    setAlertInfo(value);
    setAlertId(value.MENU_ID);
    setIsModalVisible(true);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  }

  const handleOk = async () => {
    if (alertForm.current.getFieldValue("PARENT_ID") == null ||
      alertForm.current.getFieldValue("MENU_NAME") == null) {
      message.error("信息不可为空!");
      return;
    }
    handleCancel();

    setLoading(true);
    let resp = await apiAlertMenu({ ...alertForm.current.getFieldsValue(), MENU_ID: alertId });
    setLoading(false);
    netNotify(resp);

    handleCancel();
    //刷新
    queryMenuReq();
  };

  const handleCancel = () => {
    setAlertId(null);
    setAlertInfo(null);
    setIsModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const menuListColumns = [
    {
      title: '菜单名称',
      dataIndex: 'MENU_NAME',
      key: 'MENU_NAME',
    },
    {
      title: '权限编码',
      dataIndex: 'TARGET',
      key: 'TARGET',
    },
    {
      title: '操作',
      align: "center",
      width: '10%',
      render: (text, record) => {
        return (
          <Space>
            <Popconfirm title="确认删除?" onConfirm={() => removeMenu(record.MENU_ID)}>
              <Button size="small" ><DeleteOutlined style={{ color: "red" }} /></Button>
            </Popconfirm>
            <Button size="small" onClick={() => showModal(record)}><EditTwoTone /></Button>
          </Space>
        );
      }
    }
  ];

  const ModifyModal = ({ menu, close }) => {
    console.log(menu);

    var tempTreeValue = menu.PARENT_ID;

    const onChangeTemp = (value) => {
      tempTreeValue = value;
    };

    return (
      <Modal title="修改菜单信息" visible={true}
        onCancel={close}
        footer={[
          <Button key="submit" htmlType="submit" type="primary" onClick={handleOk}>
            修改
          </Button>,
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]} onCancel={handleCancel}>
        <Form initialValues={menu}
          style={{ marginTop: 40 }}
          ref={alertForm}>
          <Form.Item {...CurrencyFormLayout}
            label="上级菜单"
            name="PARENT_ID"
            rules={[{ required: true, message: '请输入上级菜单!' }]}>
            <TreeSelect style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择"
              treeData={menuBelong}
              value={tempTreeValue}
              onChange={onChangeTemp}
            />
          </Form.Item>
          <Form.Item {...CurrencyFormLayout}
            label="菜单名称"
            name="MENU_NAME"
            rules={[{ required: true, message: '请输入菜单名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item {...CurrencyFormLayout}
            label="权限编码"
            name="TARGET"
            rules={[{ required: true, message: '请输入权限编码!' }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item {...CurrencyFormLayout}
            label="路由地址"
            name="URL"
            rules={[{ required: true, message: '请输入路由地址!' }]}>
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }

  const AddModifyModal = ({ close }) => {

    var tempTreeValue = 0;

    const onChangeTemp = (value) => {
      tempTreeValue = value;
    };

    return (
      <Modal title="修改菜单信息" visible={true}
        onCancel={close}
        footer={[
          <Button key="submit" htmlType="submit" type="primary" onClick={createMenu}>
            添加
          </Button>,
          <Button key="back" onClick={handleAddCancel}>
            取消
          </Button>,
        ]} onCancel={handleAddCancel}>
        <Form
          style={{ marginTop: 40 }}
          ref={alertAddForm}>
          <Form.Item {...CurrencyFormLayout}
            label="上级菜单"
            name="PARENT_ID"
            rules={[{ required: true, message: '请输入上级菜单!' }]}>
            {/* <DepartmentSelect /> */}
            <TreeSelect style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择"
              treeData={menuBelong}
              value={tempTreeValue}
              onChange={onChangeTemp}
            />
          </Form.Item>
          <Form.Item {...CurrencyFormLayout}
            label="菜单名称"
            name="MENU_NAME"
            rules={[{ required: true, message: '请输入菜单名称!' }]}>
            <Input />
          </Form.Item>
          <Form.Item {...CurrencyFormLayout}
            label="权限编码"
            name="TARGET"
            rules={[{ required: true, message: '请输入权限编码!' }]}>
            <Input />
          </Form.Item>
          {/* <Form.Item {...CurrencyFormLayout}
            label="路由地址"
            name="URL"
            rules={[{ required: true, message: '请输入路由地址!' }]}>
            <Input />
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }

  return (
    <PageContainer breadcrumb={false}>
      <Spin spinning={loading}>
        <Card title={'添加菜单'} extra={<Button key="submit" htmlType="submit" type="primary" onClick={() => showAddModal()}>
          添加菜单
        </Button>}>
          <Table
            columns={menuListColumns}
            dataSource={treeData}
          />
        </Card>
        {isModalVisible ? <ModifyModal menu={alertInfo} close={() => { setIsModalVisible(false); setAlertId(null); setAlertInfo({}); }} /> : <div />}
        {isAddModalVisible ? <AddModifyModal close={() => { setIsAddModalVisible(false); }} /> : <div />}
      </Spin>
    </PageContainer>
  );
}

export default MenuManager;