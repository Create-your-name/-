import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getBCapagroupMap() {
    return request('/api/report/getBCapagroupMap', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addBCapagroupMap(params) {
    return request('/api/report/addBCapagroupMap', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delBCapagroupMap(params) {
    return request('/api/report/delBCapagroupMap', {
        method: 'POST',
        data: params,
    });
}
