import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getBCapagroup() {
    return request('/api/report/getBCapagroup', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addBCapagroup(params) {
    return request('/api/report/addBCapagroup', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delBCapagroup(params) {
    return request('/api/report/delBCapagroup', {
        method: 'POST',
        data: params,
    });
}
