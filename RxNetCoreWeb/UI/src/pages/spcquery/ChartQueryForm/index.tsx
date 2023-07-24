
import React, { Component, useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { PageContainer } from '@ant-design/pro-layout';
import {Layout, Tree, Transfer, Typography, Popconfirm, Radio, Form, Input, Button, List, Card, Spin, Table, Select, message, Tabs, Divider, Space, Checkbox, Row } from 'antd';
import { CurrencyFormLayout, CurrencySubmitFormLayout } from '../../../utils/formLayout';
import { create, queryUser, remove } from '@/services/serviceAPI';
import { netNotify } from '@/utils/err';
import { appendOption } from '@/utils/dateUtils';
import { Line, LineConfig, Scatter, ScatterConfig, Box, BoxConfig } from '@ant-design/charts';
import { apiGetCatagory, apiQueryCatagoryMSpec } from '@/pages/edcspc/SpcCatagory/service';
import XBarRChart from '../../ChartComponents/XBarRChart';
import XBarChart from '../../ChartComponents/XBarChart';
import ScatterChart from '../../ChartComponents/ScatterChart';
import { DataNode, DirectoryTreeProps } from 'antd/lib/tree';
import {PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { TransferDirection } from 'antd/es/transfer';
import { ModalForm, ProFormRadio, ProFormText } from '@ant-design/pro-form';
import { ProCard } from '@ant-design/pro-card';

const ChartQueryForm = () => {

    return (
        <div/>
    )
}

export default ChartQueryForm;