import React, { Component, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import { Icon } from '@ant-design/icons';
import {
  Popconfirm,
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Spin,
  Table,
  Select,
  message,
  Tabs,
} from 'antd';

import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../utils/formLayout';
import { create, queryUser, remove } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { appendOption } from '@/utils/dateUtils';

//账号权限
export const AuthLevelName = {
  Admin: 'Admin(管理员)',
};

const AuthLevelNameEl = appendOption(AuthLevelName);

const AccountManager = () => {
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);

  let createForm = useRef();

  const createAccount = async (values) => {
    setLoading(true);
    let resp = await create(values);
    setLoading(false);
    netNotify(resp);

    if (resp.result == 0) createForm.current.resetFields();
  };

  const queryUserReq = async () => {
    setLoading(true);
    let resp = await queryUser({});
    setLoading(false);

    if (resp.result != 0) {
      netNotify(resp);
      return;
    }

    let allUser = resp.data.map((user) => {
      return { ...user, key: user.account };
    });
    if (resp.result == 0) setAllUser(allUser);
    netNotify(resp);
  };

  const removeAcc = async (account) => {
    setLoading(true);
    let resp = await remove({ account });
    setLoading(false);
    netNotify(resp);

    //刷新
    queryUserReq();
  };

  const accListColumns = [
    {
      title: '用户名',
      dataIndex: 'USER_NAME',
      key: 'account',
    },
    {
      title: '角色',
      dataIndex: 'USER_TYPE',
      key: 'role',
    },
    {
      title: '操作',
      align: 'center',
      // dataIndex: 'del',
      // key: 'del',
      width: '10%',
      render: (text, record) => {
        return (
          <div>
            <Popconfirm title="确认删除?" onConfirm={() => removeAcc(record.account)}>
              <Button type="danger">删除</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <PageContainer breadcrumb={false}>
      <Spin spinning={loading}>
        <Card title={'创建账户'}>
          <Form onFinish={createAccount} style={{ marginTop: 40 }} ref={createForm}>
            <Form.Item
              {...CurrencyFormLayout}
              label="账号"
              name="account"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...CurrencyFormLayout}
              label="密码"
              name="pwd"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...CurrencyFormLayout}
              label="类型"
              name="role"
              rules={[{ required: true, message: '请选择权限!' }]}
            >
              <Select placeholder="账号权限">{AuthLevelNameEl}</Select>
            </Form.Item>

            <Form.Item {...CurrencySubmitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit">
                确认创建
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card
          style={{ marginTop: 10 }}
          title={
            <Button type="primary" onClick={queryUserReq}>
              查询
            </Button>
          }
        >
          <Table columns={accListColumns} dataSource={allUser} bordered />
        </Card>
      </Spin>
    </PageContainer>
  );
};

export default AccountManager;
