import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getBCapagroupType() {
    return request('/api/report/getBCapagroupType', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addBCapagroupType(params) {
    return request('/api/report/addBCapagroupType', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delBCapagroupType(params) {
    return request('/api/report/delBCapagroupType', {
        method: 'POST',
        data: params,
    });
}
