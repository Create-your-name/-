import React, { Component, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import { Popconfirm, Form, Input, Button, Row, Col, Card, Spin, Table, Select, message, Tabs, Modal, Space } from 'antd';
import {DeleteOutlined, EditTwoTone} from '@ant-design/icons';
import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../utils/formLayout';
import { apiQueryPost, apiRemovePost, apiCreatePost, apiAlertPost } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';

const SystemPost = () => {
    const [loading, setLoading] = useState(false);
    const [allPost, setAllPost] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [alertId, setAlertId] = useState();
    const [alertInfo, setAlertInfo] = useState({});

    let createForm = useRef();
    let alertForm = useRef();

    const queryPostReq = async () => {
        setLoading(true);
        let resp = await apiQueryPost({})
        setLoading(false);

        if (resp.result != 0) {
            netNotify(resp);
            return;
        }
        let allPost = resp.data.map(pos => { return { ...pos, key: pos.postId } });
        if (resp.result == 0)
            setAllPost(allPost);
        netNotify(resp);
    }

    const removePos = async (postId) => {
        setLoading(true);
        let resp = await apiRemovePost({ postId });
        setLoading(false);
        netNotify(resp);

        //刷新
        queryPostReq();
    }

    const createPos = async (values) => {
        setLoading(true);
        let resp = await apiCreatePost(values);
        setLoading(false);
        netNotify(resp);

        if (resp.result == 0)
            createForm.current.resetFields();
    }

    const showModal = (value) => {
        setAlertInfo(value);
        setAlertId(value.postId);
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        console.log("1", alertForm.current.getFieldsValue());
        if (alertForm.current.getFieldValue("postName") == null ||
            alertForm.current.getFieldValue("postCode") == null ||
            alertForm.current.getFieldValue("postSort") == null ||
            alertForm.current.getFieldValue("status") == null) {
            message.error("信息不可为空!");
            return;
        }

        setLoading(true);
        let resp = await apiAlertPost({ ...alertForm.current.getFieldsValue(), postId: alertId });
        setLoading(false);
        netNotify(resp);

        handleCancel();
        //刷新
        queryPostReq();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const accListColumns = [
        {
            title: '岗位编号',
            dataIndex: 'postId',
            key: 'postId',
        },
        {
            title: '岗位编码',
            dataIndex: 'postCode',
            key: 'postCode',
        },
        {
            title: '岗位名称',
            dataIndex: 'postName',
            key: 'postName',
        },
        {
            title: '岗位排序',
            dataIndex: 'postSort',
            key: 'postSort',
        },
        {
            title: '岗位状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '操作',
            align: "center",
            width: '10%',
            render: (text, record) => {
                return (
                    <Space>
                        <Popconfirm title="确认删除?" onConfirm={() => removePos(record.postId)}>
                            <Button size="small" >
                                <DeleteOutlined style={{color:"red"}}/>
                            </Button>
                        </Popconfirm>
                        <Button size="small" onClick={() => showModal(record)}>
                            <EditTwoTone/>
                        </Button>
                    </Space>
                );
            },
        }
    ];

    const ModifyModal = ({post, close})=> {
        return (
        <Modal title="修改岗位信息" visible={true}
            onCancel={close}
            footer={[
                <Button key="submit" htmlType="submit" type="primary" onClick={handleOk}>
                    修改
            </Button>,
                <Button key="back" onClick={handleCancel}>
                    取消
            </Button>,
            ]} onCancel={handleCancel}>
            <Form
                initialValues={post}
                style={{ marginTop: 40 }}
                ref={alertForm}
            >
                <Form.Item
                    {...CurrencyFormLayout}
                    label="岗位编码"
                    name="postCode"
                    rules={[{ required: true, message: '请输入岗位编码!' }]}
                >
                    <Input
                        // defaultValue={alertInfo.postCode} value={alertInfo.postCode}
                    />
                </Form.Item>

                <Form.Item
                    {...CurrencyFormLayout}
                    label="岗位名称"
                    name="postName"
                    rules={[{ required: true, message: '请输入岗位名称!' }]}
                >
                    <Input
                        // defaultValue={alertInfo.postName} value={alertInfo.postName}
                    />
                </Form.Item>

                <Form.Item
                    {...CurrencyFormLayout}
                    label="岗位排序"
                    name="postSort"
                    rules={[{ required: true, message: '请输入岗位排序!' }]}
                >
                    <Input
                        // defaultValue={alertInfo.postSort} value={alertInfo.postSort}
                    />
                </Form.Item>

                <Form.Item
                    {...CurrencyFormLayout}
                    label="岗位状态"
                    name="status"
                    rules={[{ required: true, message: '请输入岗位状态!' }]}
                >
                    <Input
                        // defaultValue={alertInfo.status} value={alertInfo.status}
                    />
                </Form.Item>

            </Form>
        </Modal>
        );
    }

    return (
        <PageContainer breadcrumb={false} >
            <Spin spinning={loading}>
                <Card title={'添加岗位'}>
                    <Form
                        onFinish={createPos}

                        style={{ marginTop: 40 }}
                        ref={createForm}
                    >
                        <Form.Item
                            {...CurrencyFormLayout}
                            label="岗位编码"
                            name="postCode"
                            rules={[{ required: true, message: '请输入岗位编码!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            {...CurrencyFormLayout}
                            label="岗位名称"
                            name="postName"
                            rules={[{ required: true, message: '请输入岗位名称!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            {...CurrencyFormLayout}
                            label="岗位排序"
                            name="postSort"
                            rules={[{ required: true, message: '请输入岗位排序!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            {...CurrencyFormLayout}
                            label="岗位状态"
                            name="status"
                            rules={[{ required: true, message: '请输入岗位状态!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...CurrencySubmitFormLayout} style={{ marginTop: 32 }}>
                            <Button type="primary" htmlType="submit">
                                确认创建
            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card style={{ marginTop: 10 }} title={
                    <Button
                        type="primary"
                        onClick={queryPostReq}
                    >
                        查询
                    </Button>
                }>
                    <Table columns={accListColumns} dataSource={allPost} bordered />
                </Card>
                {isModalVisible? <ModifyModal post={alertInfo} close={()=>setIsModalVisible(false)} />:<div/>}
            </Spin>
        </PageContainer>
    )

}

export default SystemPost;