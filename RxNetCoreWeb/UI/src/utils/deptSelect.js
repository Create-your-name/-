import React, { Component, useState } from 'react';
import { TreeSelect } from 'antd';
import { apiGetDeptTreeSelectData } from '@/services/serviceAPI';

export const DepartmentSelect = () => {
    const [treeValue, setTreeValue] = useState();

    const onChange = (value) => {
        console.log(value);
        setTreeValue(value);
      };

    const treeData = [{
        "title": "若依科技",
        "value": "100",
        "children": [
            {
                "title": "深圳总公司",
                "value": "101",
                "children": [
                    {
                        "title": "研发部门",
                        "value": "103",
                        "children": []
                    },
                    {
                        "title": "市场部门",
                        "value": "104",
                        "children": []
                    },
                    {
                        "title": "测试部门",
                        "value": "105",
                        "children": []
                    },
                    {
                        "title": "财务部门",
                        "value": "106",
                        "children": []
                    },
                    {
                        "title": "运维部门",
                        "value": "107",
                        "children": []
                    }
                ]
            },
            {
                "title": "长沙分公司",
                "value": "102",
                "children": [
                    {
                        "title": "市场部门",
                        "value": "108",
                        "children": []
                    },
                    {
                        "title": "财务部门",
                        "value": "109",
                        "children": []
                    }
                ]
            }
        ]
    }];
    return (
        <TreeSelect style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="请选择"
            treeData={treeData}
            value={treeValue}
            onChange={onChange}
        ></TreeSelect>
    );
}