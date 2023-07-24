import { request } from 'umi';

/**
 * 查询PmBm历史数据
 * @param {Object} params   - 
 */
 export async function getPMBMHis(params) {
    return request('/api/bm/getPMBMHis', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询PmBm历史数据Checklist
 * @param {Object} params   - 
 */
 export async function getPMBMHisCheckList(params) {
    return request('/api/bm/getPMBMHisCheckList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询Pm历史数据
 * @param {Object} params   - 
 */
 export async function getPMHis(params) {
    return request('/api/pm/getPMHis', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询Pm类型为数值的checklist
 * @param {Object} params   - 
 */
 export async function getPMHisChartCheckList(params) {
    return request('/api/pm/getPMHisChartCheckList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询Pm表单图点
 * @param {Object} params   - 
 */
 export async function getPMChartPoint(params) {
    return request('/api/pm/getPMChartPoint', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询Bm历史数据
 * @param {Object} params   - 
 */
 export async function getBMHis(params) {
    return request('/api/bm/getBMHis', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询Bm类型为数值的checklist
 * @param {Object} params   - 
 */
 export async function getBMHisChartCheckList(params) {
    return request('/api/bm/getBMHisChartCheckList', {
        method: 'POST',
        data: params,
    });
}

/**
 * 查询Bm表单图点
 * @param {Object} params   - 
 */
 export async function getBMChartPoint(params) {
    return request('/api/bm/getBMChartPoint', {
        method: 'POST',
        data: params,
    });
}