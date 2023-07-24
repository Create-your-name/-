import React, { Component, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {DeleteOutlined, EditTwoTone} from '@ant-design/icons';
import { Popconfirm, Form, Input,Radio, Button, Row, Col, Card, Spin, Table, Switch, Space, Select, message, Tabs, Modal,TreeSelect } from 'antd';

import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../utils/formLayout';
import { apiQueryDept,apiCreateDept,apiRemoveDept,apiAlertDept } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import {DepartmentSelect} from '../../utils/deptSelect';

const DepartmentManager = ()=>{
    const [loading, setLoading] = useState(false);
    const [allDept, setAllDept] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertId, setAlertId] = useState();
    const [alertInfo, setAlertInfo] = useState({});

    let createForm = useRef();
    let alertForm = useRef();

    const queryDeptReq = async () =>{
        setLoading(true);
        let resp = await apiQueryDept({})
        setLoading(false);

        if (resp.result != 0) {
            netNotify(resp);
            return;
        }
        let allDept = resp.data.map(dep => { return { ...dep, key: dep.DEPT_ID } });
        if (resp.result == 0)
            setAllDept(allDept);
        netNotify(resp);
    }

    const removeDept = async (DEPT_ID) => {
        setLoading(true);
        let resp = await apiRemoveDept({ DEPT_ID });
        setLoading(false);
        netNotify(resp);

        //刷新
        queryDeptReq();
    }

    const createDept = async (values) => {
        setLoading(true);
        let resp = await apiCreateDept(values);
        setLoading(false);
        netNotify(resp);

        if (resp.result == 0)
            createForm.current.resetFields();
    }

    const showModal = (value) => {
        setAlertInfo(value);
        setAlertId(value.DEPT_ID);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        console.log("1", alertForm.current.getFieldsValue());
        if (alertForm.current.getFieldValue("PARENT_ID") == null ||
            alertForm.current.getFieldValue("DEPT_NAME") == null ||
            alertForm.current.getFieldValue("ORDER_NUM") == null ||
            alertForm.current.getFieldValue("LEADER") == null ||
            alertForm.current.getFieldValue("PHONE") ||
            alertForm.current.getFieldValue("EMAIL") ||
            alertForm.current.getFieldValue("STATUS")) {
            message.error("信息不可为空!");
            return;
        }

        setLoading(true);
        let resp = await apiAlertDept({ ...alertForm.current.getFieldsValue(), DEPT_ID: alertId });
        setLoading(false);
        netNotify(resp);

        handleCancel();
        //刷新
        queryDeptReq();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    
    const deptListColumns = [
      {
        title: '部门名称',
        dataIndex: 'DEPT_NAME',
        key: 'DEPT_NAME',
      }, 
      {
        title: '显示顺序',
        dataIndex: 'ORDER_NUM',
        key: 'ORDER_NUM',
      },
      {
        title: '部门状态',
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
        width: "10%",
        render:(text,record)=>{
          return (
            <Space>
                <Popconfirm title="确认删除?" onConfirm={() => removeDept(record.DEPT_ID)}>
                    <Button size="small"  ><DeleteOutlined style={{color:"red"}}/></Button>
                </Popconfirm>
                <Button size="small" onClick={() => showModal(record)}><EditTwoTone/></Button>
            </Space>
          );
        }
      }
    ];

    const ModifyModal = ({dept, close})=> {
      return (
      <Modal title="修改部门信息" visible={true}
          onCancel={close}
          footer={[
              <Button key="submit" htmlType="submit" type="primary" onClick={handleOk}>
                  修改
          </Button>,
              <Button key="back" onClick={handleCancel}>
                  取消
          </Button>,
          ]} >
          <Form initialValues={dept}
              style={{ marginTop: 40 }}
              ref={alertForm}>
                <Form.Item {...CurrencyFormLayout} 
                label="上级部门"
                name="PARENT_ID"
                rules={[{ required: true, message: '请输入上级部门!' }]}>
                  <DepartmentSelect/>
                            </Form.Item>
                <Form.Item {...CurrencyFormLayout} 
                label="部门名称"
                name="DEPT_NAME"
                rules={[{ required: true, message: '请输入部门名称!' }]}>
                            <Input/>
                            </Form.Item>
                            
                <Form.Item {...CurrencyFormLayout}
                label="显示顺序" 
                name="ORDER_NUM"
                rules={[{ required: true, message: '请输入显示顺序!' }]}>
                            <Input/>
                            </Form.Item>
                            
                <Form.Item {...CurrencyFormLayout}
                label="负责人"
                name="LEADER"
                rules={[{ required: true, message: '请输入负责人!' }]}>
                    <Input/>
                                </Form.Item>
                                
                <Form.Item {...CurrencyFormLayout}
                label="联系电话"
                name="PHONE"
                rules={[{ required: true, message: '请输入联系电话!' }]}>
                            <Input/>
                        </Form.Item>
                <Form.Item {...CurrencyFormLayout}
                label="邮箱"
                name="EMAIL"
                rules={[{ required: true, message: '请输入邮箱!' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item {...CurrencyFormLayout}
                label="部门状态"
                name="STATUS"
                rules={[{ required: true, message: '请输入部门状态!' }]}>
                  <Radio.Group>
                    <Radio value="0">正常</Radio>
                    <Radio value="1">停用</Radio>
                    </Radio.Group>
                        </Form.Item>
            </Form>
      </Modal>
      );
  }
  
    return (
    <PageContainer breadcrumb={false}>
      <Spin spinning={loading}>
        <Card title={'添加部门'}>
          <Form 
          onFinish={createDept}
          style={{ marginTop: 40 }}
          ref={createForm}  
          >
            <Form.Item {...CurrencyFormLayout} 
                label="上级部门"
                name="PARENT_ID"
                rules={[{ required: true, message: '请输入上级部门!' }]}>
                  <DepartmentSelect/>
                            </Form.Item>
                            <Form.Item {...CurrencyFormLayout} 
                label="部门名称"
                name="DEPT_NAME"
                rules={[{ required: true, message: '请输入部门名称!' }]}>
                            <Input/>
                            </Form.Item>
                            
                <Form.Item {...CurrencyFormLayout}
                label="显示顺序" 
                name="ORDER_NUM"
                rules={[{ required: true, message: '请输入显示顺序!' }]}>
                            <Input/>
                            </Form.Item>
                            
                <Form.Item {...CurrencyFormLayout}
                label="负责人"
                name="LEADER"
                rules={[{ required: true, message: '请输入负责人!' }]}>
                    <Input/>
                                </Form.Item>
                                
                <Form.Item {...CurrencyFormLayout}
                label="联系电话"
                name="PHONE"
                rules={[{ required: true, message: '请输入联系电话!' }]}>
                            <Input/>
                        </Form.Item>
                <Form.Item {...CurrencyFormLayout}
                label="邮箱"
                name="EMAIL"
                rules={[{ required: true, message: '请输入邮箱!' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item {...CurrencyFormLayout}
                label="部门状态"
                name="STATUS"
                rules={[{ required: true, message: '请输入部门状态!' }]}>
                  <Radio.Group>
                    <Radio value="0">正常</Radio>
                    <Radio value="1">停用</Radio>
                    </Radio.Group>
                        </Form.Item>
              <Form.Item {...CurrencySubmitFormLayout} style={{ marginTop: 32 }}>
                  <Button type="primary" htmlType="submit">确认创建</Button>
                  </Form.Item>
          </Form>
        </Card>
        <Card style={{ marginTop: 10 }} title={<Button type="primary" onClick={queryDeptReq}>查询</Button>}>
        <Table columns={deptListColumns} dataSource={allDept} bordered />
        </Card>
        {isModalVisible? <ModifyModal dept={alertInfo} close={()=>setIsModalVisible(false)} />:<div/>}
      </Spin>
    </PageContainer>
    );
}

export default DepartmentManager;