import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getBCapagroupMove() {
    return request('/api/report/getBCapagroupMove', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addBCapagroupMove(params) {
    return request('/api/report/addBCapagroupMove', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delBCapagroupMove(params) {
    return request('/api/report/delBCapagroupMove', {
        method: 'POST',
        data: params,
    });
}
