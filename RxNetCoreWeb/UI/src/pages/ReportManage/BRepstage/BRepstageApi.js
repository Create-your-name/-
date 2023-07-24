import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getBRepstage() {
    return request('/api/report/getBRepstage', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addBRepstage(params) {
    return request('/api/report/addBRepstage', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delBRepstage(params) {
    return request('/api/report/delBRepstage', {
        method: 'POST',
        data: params,
    });
}
