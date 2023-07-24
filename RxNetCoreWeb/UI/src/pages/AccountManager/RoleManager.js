import React, { Component, useRef, useState, useEffect } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {DeleteOutlined, EditTwoTone} from '@ant-design/icons';
import { Popconfirm, Form, Input, Radio, Button, Row, Col, Card, Spin, Table, Switch, Space, Select, message, Tabs, Modal, TreeSelect, Tree } from 'antd';

import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../utils/formLayout';
import { apiQueryRole, apiRemoveRole, apiCreateRole, apiAlertRole, apiQueryMenu, apiCreateRoleMenu, apiSelectRoleMenuByRole_ID } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';

const { TabPane } = Tabs;

const RoleManager = () => {
  const [loading, setLoading] = useState(false);
  const [allRole, setAllRole] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertId, setAlertId] = useState();
  const [alertInfo, setAlertInfo] = useState({});
  const [tabKey, setTabKey] = useState(1);
  const [allMenu, setAllMenu] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [treeCheckedData, setTreeCheckedData] = useState([]);

  let createForm = useRef();
  let alertForm = useRef();

  const treeGenerator = (x, data) => {
    const children = data
      .filter(child => child.PARENT_ID === x.MENU_ID)
      .map(child => treeGenerator(child, data));
    return {
      ...x,
      title: x.MENU_NAME,
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
    })()
  }, [apiQueryMenu])

  const queryRoleReq = async () => {
    setLoading(true);
    let resp = await apiQueryRole({})
    setLoading(false);

    if (resp.result != 0) {
      netNotify(resp);
      return;
    }
    let allRole = resp.data.map(rol => { return { ...rol, key: rol.ROLE_ID } });
    if (resp.result == 0)
      setAllRole(allRole);
    netNotify(resp);
  }

  const removeRol = async (ROLE_ID) => {
    setLoading(true);
    let resp = await apiRemoveRole({ ROLE_ID });
    setLoading(false);
    netNotify(resp);

    //刷新
    queryRoleReq();
  }

  const createRol = async (values) => {
    setLoading(true);
    let resp = await apiCreateRole(values);
    setLoading(false);
    netNotify(resp);

    if (resp.result == 0)
      createForm.current.resetFields();
  }

  const showModal = async (value) => {
    setLoading(true);
    let resp = await apiSelectRoleMenuByRole_ID({
      ROLE_ID: value.ROLE_ID
    })
    setLoading(false);

    let roleMenus = resp.data.singleRoleMenus.map(rol => { return { ...rol, key: rol.ROLE_ID } });

    var tempList = [];
    roleMenus.forEach(element => {
      tempList.push(element.MENU_ID)
    });
    setTreeCheckedData(tempList);

    setAlertInfo(value);
    setAlertId(value.ROLE_ID);
    setIsModalVisible(true);
  };

  const handleOk = async (roleId, tabKeyFlag, checkedNodes) => {
    if (tabKeyFlag == 1) {
      console.log("1", alertForm.current.getFieldsValue());
      if (alertForm.current.getFieldValue("ROLE_NAME") == null ||
        alertForm.current.getFieldValue("ROLE_KEY") == null ||
        alertForm.current.getFieldValue("ROLE_SORT") == null ||
        alertForm.current.getFieldValue("STATUS") == null) {
        message.error("信息不可为空!");
        return;
      }

      setLoading(true);
      let resp = await apiAlertRole({ ...alertForm.current.getFieldsValue(), ROLE_ID: alertId });
      setLoading(false);
      netNotify(resp);

      handleCancel();
      //刷新
      queryRoleReq();
    } else if (tabKeyFlag == 2) {
      handleCancel();
      var json = {
        ROLE_ID: roleId,
        MENU_ID: checkedNodes
      }
      setLoading(true);
      let resp = await apiCreateRoleMenu(json);
      setLoading(false);
      netNotify(resp);

      if (resp.result == 0)
        handleCancel();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const roleListColumns = [
    {
      title: '角色编号',
      dataIndex: 'ROLE_ID',
      key: 'ROLE_ID',
    },
    {
      title: '角色名称',
      dataIndex: 'ROLE_NAME',
      key: 'ROLE_NAME',
    },
    {
      title: '权限字符',
      dataIndex: 'ROLE_KEY',
      key: 'ROLE_KEY',
    },
    {
      title: '显示顺序',
      dataIndex: 'ROLE_SORT',
      key: 'ROLE_SORT',
    },
    {
      title: '角色状态',
      dataIndex: 'STATUS',
      key: 'STATUS',
    },
    {
      title: '创建时间',
      dataIndex: 'CREATE_TIME',
      key: 'CREATE_TIME',
    },
    {
      title: '操作',
      align: "center",
      width: '10%',
      render: (text, record) => {
        return (
          <Space>
            <Popconfirm title="确认删除?" onConfirm={() => removeRol(record.ROLE_ID)}>
              <Button size="small" ><DeleteOutlined style={{color:"red"}}/></Button>
            </Popconfirm>
            <Button size="small" onClick={() => showModal(record)}><EditTwoTone/></Button>
          </Space>
        );
      }
    }
  ];

  const ModifyModal = ({ role, close }) => {
    var checkedNodes = [];
    var tabKeyFlag = 1;

    const callback = (key) => {
      tabKeyFlag = key;
    }

    const onCheck = (checkedKeysValue) => {
      checkedNodes = checkedKeysValue;
    };

    return (
      <Modal title="修改角色信息" visible={true}
        onCancel={close}
        footer={[
          <Button key="submit" htmlType="submit" type="primary" onClick={() => handleOk(role.ROLE_ID, tabKeyFlag, checkedNodes)}>
            修改
          </Button>,
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]} >
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="角色信息" key="1">
            <Form initialValues={role}
              style={{ marginTop: 40 }}
              ref={alertForm}>
              <Form.Item {...CurrencyFormLayout}
                label="角色名称"
                name="ROLE_NAME"
                rules={[{ required: true, message: '请输入角色名称!' }]}>
                <Input />
              </Form.Item>

              <Form.Item {...CurrencyFormLayout}
                label="权限字符"
                name="ROLE_KEY"
                rules={[{ required: true, message: '请输入权限字符!' }]}>
                <Input />
              </Form.Item>

              <Form.Item {...CurrencyFormLayout}
                label="显示顺序"
                name="ROLE_SORT"
                rules={[{ required: true, message: '请输入显示顺序!' }]}>
                <Input />
              </Form.Item>

              <Form.Item {...CurrencyFormLayout}
                label="角色状态"
                name="STATUS"
                rules={[{ required: true, message: '请输入角色状态!' }]}>
                <Radio.Group>
                  <Radio value="0">正常</Radio>
                  <Radio value="1">停用</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item {...CurrencyFormLayout}
                label="备注"
                name="REMARK"
                rules={[{ required: false }]}>
                <Input />
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="菜单权限" key="2">
            <Tree
              defaultCheckedKeys={treeCheckedData}
              defaultExpandAll
              checkable
              onCheck={onCheck}
              treeData={treeData}
            />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }

  return (
    <PageContainer breadcrumb={false}>
      <Spin spinning={loading}>
        <Card>
          <Tabs type="card">
            <Tabs.TabPane tab="查看角色" key="1">
              <Card title={<Button type="primary" onClick={queryRoleReq}>查询</Button>}>
                <Table columns={roleListColumns} dataSource={allRole} bordered />
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="添加角色" key="2">
              <Form
              onFinish={createRol}
              style={{ marginTop: 40 }}
              ref={createForm}
            >
                <Form.Item
                  {...CurrencyFormLayout}
                  label="角色名称"
                  name="ROLE_NAME"
                  rules={[{ required: true, message: '请输入角色名称!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  {...CurrencyFormLayout}
                  label="权限字符"
                  name="ROLE_KEY"
                  rules={[{ required: true, message: '请输入权限字符!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  {...CurrencyFormLayout}
                  label="显示顺序"
                  name="ROLE_SORT"
                  rules={[{ required: true, message: '请输入显示顺序!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  {...CurrencyFormLayout}
                  label="角色状态"
                  name="STATUS"
                  rules={[{ required: true, message: '请输入角色状态!' }]}
                >
                  <Radio.Group>
                    <Radio value="0">正常</Radio>
                    <Radio value="1">停用</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  {...CurrencyFormLayout}
                  label="备注"
                  name="REMARK"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item {...CurrencySubmitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit">确认创建</Button>
                </Form.Item>
              </Form>
        
            </Tabs.TabPane>
          </Tabs>
        </Card>
        {isModalVisible ? <ModifyModal role={alertInfo} close={() => setIsModalVisible(false)} /> : <div />}
      </Spin>
    </PageContainer>
  );
}

export default RoleManager;