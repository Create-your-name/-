import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getCustProductSetting() {
    return request('/api/report/getCustProductSetting', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addCustProductSetting(params) {
    return request('/api/report/addCustProductSetting', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delCustProductSetting(params) {
    return request('/api/report/delCustProductSetting', {
        method: 'POST',
        data: params,
    });
}
