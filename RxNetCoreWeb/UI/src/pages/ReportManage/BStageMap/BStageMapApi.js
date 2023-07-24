import { request } from 'umi';

/**
 * 查询
 * @param {Object} params   - 
 */
export async function getBStageMap() {
    return request('/api/report/getBStageMap', {
        method: 'POST'
    });
}

/**
 * 新增
 * @param {Object} params   - 
 */
export async function addBStageMap(params) {
    return request('/api/report/addBStageMap', {
        method: 'POST',
        data: params,
    });
}

/**
 * 删除
 * @param {Object} params   - 
 */
export async function delBStageMap(params) {
    return request('/api/report/delBStageMap', {
        method: 'POST',
        data: params,
    });
}
