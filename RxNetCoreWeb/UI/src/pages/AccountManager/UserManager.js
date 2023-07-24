import React, { Component, useRef, useState, useEffect } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {DeleteOutlined, EditTwoTone, EyeInvisibleTwoTone} from '@ant-design/icons';
import { Popconfirm, Form, Input, Radio, Button, Row, Col, Card, Spin, Table, Switch, 
  Space, Select, message, Tabs, Modal, TreeSelect, Typography, Checkbox } from 'antd';

import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../utils/formLayout';
import { apiQueryUser, apiRemoveUser, apiCreateUser, apiAlertUser, apiAlertUserPassword, apiQueryRole, apiQueryDept } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { DepartmentSelect } from '../../utils/deptSelect';

const { TreeNode } = TreeSelect;

const UserManager = () => {
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resetPwdModal, setResetPwdModal] = useState(false);
  const [alertInfo, setAlertInfo] = useState({});
  const [alertId, setAlertId] = useState();
  const [alertPassword, setAlertPassword] = useState({});
  const [allRole, setAllRole] = useState([]);

  let createForm = useRef();
  let alertForm = useRef();
  let alertPasswordForm = useRef();

  const [treeValue, setTreeValue] = useState();

  const onChange = (value) => {
    setTreeValue(value);
  };

  useEffect(() => {
    (async () => {
      let resp = await apiQueryRole({})
      let allRole = resp.data.map(rol => { return { ...rol, key: rol.ROLE_ID } });
      setAllRole(allRole);
    })()
  }, [])


  const queryUserReq = async () => {
    setLoading(true);
    let resp = await apiQueryUser({})
    setLoading(false);

    if (resp.result != 0) {
      netNotify(resp);
      return;
    }
    let allUser = resp.data.map(user => { return { ...user, key: user.USER_ID, LDAP: user.USER_TYPE == "DA" } });
    if (resp.result == 0)
      setAllUser(allUser);
    netNotify(resp);
  }

  const deleteUser = async (USER_ID) => {
    setLoading(true);
    let resp = await apiRemoveUser({ USER_ID });
    setLoading(false);
    netNotify(resp);

    //刷新
    queryUserReq();
  }

  const createUser = async (values) => {
    console.log(values);
    setLoading(true);

    if (values.LDAP) {
      values.USER_TYPE = "DA";
    }
    let resp = await apiCreateUser(values);
    setLoading(false);
    netNotify(resp);

    if (resp.result == 0)
      createForm.current.resetFields();
  }

  const showModal = (value) => {
    setAlertInfo(value);
    setAlertId(value.USER_ID);
    setIsModalVisible(true);
  };

  const showPasswordModal = (value) => {
    setAlertInfo(value);
    setAlertId(value.USER_ID);
    setResetPwdModal(true);
  }

  const handleOk = async () => {
    handleCancel();
    console.log("1", alertForm.current.getFieldsValue());
    if (alertForm.current.getFieldValue("LOGIN_NAME") == null ||
      alertForm.current.getFieldValue("USER_NAME") == null ||
      alertForm.current.getFieldValue("DEPT_ID") == null ||
      alertForm.current.getFieldValue("USER_TYPE") == null ||
      alertForm.current.getFieldValue("PHONENUMBER") == null ||
      alertForm.current.getFieldValue("STATUS") == null) {
      message.error("信息不可为空!");
      return;
    }

    setLoading(true);
    let resp = await apiAlertUser({ ...alertForm.current.getFieldsValue(), USER_ID: alertId });
    setLoading(false);
    netNotify(resp);

    handleCancel();
    //刷新
    queryUserReq();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setResetPwdModal(false);
  };

  const userListColumns = [
    {
      title: 'ID',
      dataIndex: 'USER_ID',
      key: 'USER_ID',
    },
    {
      title: '账号',
      dataIndex: 'LOGIN_NAME',
      key: 'LOGIN_NAME',
    },
    {
      title: '用户类型',
      dataIndex: 'USER_TYPE',
      key: 'USER_TYPE',
    },
    {
      title: '角色',
      render: (text, record) => {
        let roleKey = record.ROLE_KEY;

        if (allRole) {
          let role = allRole.find(role => role.ROLE_KEY == roleKey);
          if (role)
            roleKey = role.ROLE_NAME;
        }
        return <Typography.Text>{roleKey}</Typography.Text>;
      }
    },
    {
      title: '昵称',
      dataIndex: 'USER_NAME',
      key: 'USER_NAME',
    },
    {
      title: '手机号码',
      dataIndex: 'PHONENUMBER',
      key: 'PHONENUMBER',
    },
    {
      title: '状态',
      dataIndex: 'STATUS',
      key: 'STATUS',
      render: (text, record) => {
        return <Typography.Text>{record.STATUS == 0? "正常":"停用"}</Typography.Text>;
      }
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
            <Popconfirm title="确认删除?" onConfirm={() => deleteUser(record.USER_ID)}>
              <Button size="small" ><DeleteOutlined style={{color:"red"}}/></Button>
            </Popconfirm>
            <Button size="small" onClick={() => showModal(record)}><EditTwoTone/></Button>
            <Button size="small" onClick={() => showPasswordModal(record)}><EyeInvisibleTwoTone/></Button>
          </Space>
        );
      }
    }
  ];

  const ModifyPasswordModal = ({ user, close }) => {
    const [resetLoading, setResetLoading] = useState(false);

    const resetPassWord = async (values) => {
      setResetLoading(true);
      let resp = await apiAlertUserPassword({ ...values, USER_ID: parseInt(alertId) });
      setResetLoading(false);
      netNotify(resp);

      if (resp.result == 0)
        handleCancel();
    };

    return (<Modal title="修改用户密码" visible={true} onCancel={close}
      footer={[<Button key="submit" htmlType="submit" type="primary" onClick={()=>alertPasswordForm.current.submit()}>修改</Button>,
      <Button loading={resetLoading}  key="back" onClick={handleCancel}>取消</Button>]} >
      <Form initialValues={user} style={{ marginTop: 40 }} onFinish={resetPassWord} ref={alertPasswordForm}>
        <Form.Item {...CurrencyFormLayout} label="旧密码" name="OLD_PASSWORD" rules={[{ required: true, message: '请输入旧密码!' }]}><Input.Password /></Form.Item>
        <Form.Item {...CurrencyFormLayout} label="新密码" name="NEW_PASSWORD" rules={[{ required: true, message: '请输入新密码!' }]}><Input.Password /></Form.Item>
      </Form>
    </Modal>);
  };

  const ModifyModal = ({ user, close }) => {
    var tempTreeValue = treeValue;

    const onChangeTemp = (value) => {
      tempTreeValue = value;
    };

    return (
      <Modal title="修改用户信息" visible={true}
        onCancel={close}
        footer={[
          <Button key="submit" htmlType="submit" type="primary" onClick={handleOk}>
            修改
          </Button>,
          <Button key="back" onClick={handleCancel}>
            取消
          </Button>,
        ]} >
        <Form initialValues={user}
          style={{ marginTop: 40 }}
          ref={alertForm}>
          <Form.Item {...CurrencyFormLayout}
            hidden="true"
            label="ID"
            name="USER_ID"
            rules={[{ required: true, message: '请输入登录账号!' }]}>
            <Input />
          </Form.Item>

          <Form.Item {...CurrencyFormLayout}
            label="登录账号"
            name="LOGIN_NAME"
            rules={[{ required: true, message: '请输入登录账号!' }]}>
            <Input />
          </Form.Item>

          <Form.Item {...CurrencyFormLayout}
            label="用户昵称"
            name="USER_NAME"
            rules={[{ required: true, message: '请输入用户昵称!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            {...CurrencyFormLayout}
            label="用户角色"
            name="ROLE_KEY"
            rules={[{ required: true, message: '请选择用户角色!' }]}
          >
            <Select placeholder="请选择" >
              {
              allRole.map(element=>
              <Select.Option value={element.ROLE_KEY} key={element.ROLE_ID}>{element.ROLE_NAME}</Select.Option>)
              }
            </Select>
          </Form.Item>

          <Form.Item {...CurrencyFormLayout}
            label="手机号码"
            name="PHONENUMBER" >
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
            label="LDAP用户"
            name="LDAP" valuePropName="checked">
            <Checkbox/>
          </Form.Item>
          <Form.Item {...CurrencyFormLayout}
            label="备注"
            name="REMARK"
            rules={[{ required: false }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  return (
    <PageContainer breadcrumb={false} >
      <Spin spinning={loading}>
        <Card>
        <Tabs type="card">
          <Tabs.TabPane tab="查看用户" key="1">
            <Card title={<Button type="primary" onClick={queryUserReq}>查询</Button>}>
              <Table columns={userListColumns} dataSource={allUser} bordered />
            </Card>
          </Tabs.TabPane>

          <Tabs.TabPane tab="添加用户" key="2">

              <Form
                onFinish={createUser}
                style={{ marginTop: 40 }}
                ref={createForm}
              >
                <Form.Item
                  {...CurrencyFormLayout}
                  label="登录账号"
                  name="LOGIN_NAME"
                  rules={[{ required: true, message: '请输入登录账号!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  {...CurrencyFormLayout}
                  label="用户昵称"
                  name="USER_NAME"
                  rules={[{ required: true, message: '请输入用户昵称!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  {...CurrencyFormLayout}
                  label="用户角色"
                  name="ROLE_KEY"
                  rules={[{ required: true, message: '请选择用户角色!' }]}
                >
                  <Select placeholder="请选择" >
                    {allRole
                      .map(element=>
                        <Select.Option value={element.ROLE_KEY} key={element.ROLE_ID}>{element.ROLE_NAME}</Select.Option>)
                    }
                  </Select>
                </Form.Item>

                <Form.Item
                  {...CurrencyFormLayout}
                  label="手机号码"
                  name="PHONENUMBER"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  {...CurrencyFormLayout}
                  label="密码"
                  name="PASSWORD"
                  rules={[{ required: true, message: '请输入密码!' }]}
                >
                  <Input placeholder="LDAP用户任意输入"/>
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
                <Form.Item {...CurrencyFormLayout}
                  label="LDAP用户"
                  name="LDAP" valuePropName="checked">
                  <Checkbox/>
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
        

        {isModalVisible ? <ModifyModal user={alertInfo} close={() => setIsModalVisible(false)} /> : <div />}
        {resetPwdModal ? <ModifyPasswordModal user={alertInfo} close={() => setResetPwdModal(false)} /> : <div />}
      </Spin>
    </PageContainer>
  );
}

export default UserManager;