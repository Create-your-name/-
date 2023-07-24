import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getWtTargetIndex() {
    return request('/api/report/getWtTargetIndex', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addWtTargetIndex(params) {
    return request('/api/report/addWtTargetIndex', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delWtTargetIndex(params) {
    return request('/api/report/delWtTargetIndex', {
        method: 'POST',
        data: params,
    });
}
